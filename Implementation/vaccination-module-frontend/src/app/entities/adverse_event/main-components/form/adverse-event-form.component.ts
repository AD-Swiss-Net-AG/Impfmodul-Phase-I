﻿/**
 * Copyright (c) 2023 eHealth Suisse
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the “Software”), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
 * NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, Observable, ReplaySubject } from 'rxjs';
import { IAdverseEvent } from '../../../../model';
import { FormOptionsService, IValueDTO } from '../../../../shared';
import { filterDropdownList, initializeActionData, openSnackBar, setDropDownInitialValue } from '../../../../shared/function';
import { SharedDataService } from '../../../../shared/services/shared-data.service';
import { SharedComponentModule } from '../../../../shared/shared-component.module';
import { SharedLibsModule } from '../../../../shared/shared-libs.module';
import { AdverseEventConfirmComponent } from '../../helper-components/confirm/adverse-event-confirm.component';
import { AdverseEventFormGroup, AdverseEventFormService } from '../../services/adverse-event-form.service';
import { AdverseEventService } from '../../services/adverse-event.service';
import { BreakPointSensorComponent } from '../../../../shared/component/break-point-sensor/break-point-sensor.component';
import { FilterPipePipe } from '../../../../shared/pipes/filter-pipe.pipe';
import { ReusableDateFieldComponent } from '../../../../shared/component/resuable-fields/reusable-date-field/reusable-date-field.component';
import { ReusableRecorderFieldComponent } from '../../../../shared/component/resuable-fields/reusable-recorder-field/reusable-recorder-field.component';
import { SessionInfoService } from '../../../../core/security/session-info.service';
import { ConfidentialityService } from '../../../../shared/component/confidentiality/confidentiality.service';

@Component({
  standalone: true,
  selector: 'vm-allergy-form',
  templateUrl: './adverse-event-form.component.html',
  styleUrls: ['./adverse-event-form.component.scss'],
  imports: [SharedLibsModule, SharedComponentModule, FilterPipePipe, ReusableDateFieldComponent, ReusableRecorderFieldComponent],
})
export class AdverseEventFormComponent extends BreakPointSensorComponent implements OnInit, AfterViewInit {
  filteredAllergies: ReplaySubject<IValueDTO[]> = new ReplaySubject<IValueDTO[]>(1);
  sharedDataService: SharedDataService = inject(SharedDataService);
  allergiesControl: FormControl = new FormControl();
  @ViewChild('singleSelect', { static: true }) singleSelect!: MatSelect;

  isSaving = false;
  editForm: AdverseEventFormGroup = inject(AdverseEventFormService).createAllergyFormGroup();
  formOptionsService: FormOptionsService = inject(FormOptionsService);
  adverseEvent: IAdverseEvent | null = null;
  router = inject(Router);
  formOptions: Map<string, IValueDTO[]> = new Map<string, IValueDTO[]>();
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  adverseEventService: AdverseEventService = inject(AdverseEventService);
  helpDialogTitle = 'HELP.ALLERGY.DETAIL.TITLE';
  helpDialogBody = 'HELP.ALLERGY.DETAIL.BODY';
  searchControl = new FormControl();
  sessionInfoService: SessionInfoService = inject(SessionInfoService);
  confidentialityService: ConfidentialityService = inject(ConfidentialityService);

  private allergyFormService: AdverseEventFormService = inject(AdverseEventFormService);
  private matDialog: MatDialog = inject(MatDialog);

  ngOnInit(): void {
    initializeActionData('', this.sharedDataService);
    let id = this.activatedRoute.snapshot.params['id'];
    this.adverseEventService.find(id).subscribe(allergy => {
      if (allergy) {
        this.adverseEvent = allergy;
        this.updateForm(this.adverseEvent);
      } else {
        this.adverseEventService.query().subscribe({
          next: list => {
            this.adverseEvent = list.find(filteredAllergy => filteredAllergy.id === id)!;
            this.updateForm(this.adverseEvent);
          },
        });
      }
    });

    this.allergiesControl.valueChanges.subscribe(() => {
      filterDropdownList(this.formOptions.get('allergyCode')!, this.filteredAllergies, this.allergiesControl);
    });
    this.processFormOptions();
  }

  ngAfterViewInit(): void {
    setDropDownInitialValue(this.filteredAllergies, this.singleSelect);
  }

  save(): void {
    if (this.editForm.value.commentMessage) {
      const commentObj = {
        text: this.editForm.value.commentMessage,
        author: this.sessionInfoService.author.getValue(),
      };
      this.editForm.value.comments = Object.assign([], this.editForm.value.comments);
      this.editForm.value.comments!.push(commentObj);
    }
    const allergy = { ...this.adverseEvent, ...this.allergyFormService.getAllergy(this.editForm) };
    allergy.category = this.formOptionsService.getOption('allergyCategory', 'medication');
    allergy.verificationStatus = this.formOptionsService.getOption('allergyVerificationStatus', 'unconfirmed');
    allergy.clinicalStatus = this.formOptionsService.getOption('allergyClinicalStatus', 'active');
    allergy.criticality = this.formOptionsService.getOption('allergyCriticality', 'unable-to-assess');

    /* eslint-disable-next-line security/detect-non-literal-fs-filename -- Safe as no value holds user input */
    this.matDialog
      .open(AdverseEventConfirmComponent, {
        width: '60vw',
        data: { value: { ...allergy }, button: { save: 'buttons.SAVE', saveAndStay: 'buttons.SAVE_AND_STAY' } },
        disableClose: true,
      })
      .afterClosed()
      .subscribe((result: { action?: string } = {}) => {
        allergy.confidentiality = this.confidentialityService.confidentialityStatus;
        if (result.action === 'SAVE') {
          if (allergy.id) {
            this.subscribeToSaveResponse(this.adverseEventService.update(allergy), true, true);
          } else {
            this.subscribeToSaveResponse(this.adverseEventService.create(allergy), true, false);
          }
        }
        if (result.action === 'SAVE_AND_STAY') {
          this.subscribeToSaveResponse(this.adverseEventService.create(allergy), false, false);
        }
      });
  }

  private processFormOptions(): void {
    this.formOptionsService.getAllOptions().subscribe({
      next: options =>
        options.map(option => {
          this.formOptions.set(option.name, option.entries!);
          this.filteredAllergies.next(this.formOptions.get('allergyCode')!);
        }),
    });
  }

  private updateForm(allergy: IAdverseEvent): void {
    this.adverseEvent = allergy;
    this.allergyFormService.resetForm(this.editForm, allergy);
  }

  private subscribeToSaveResponse(result: Observable<IAdverseEvent>, navigate: boolean, isUpdate: boolean): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(navigate, isUpdate),
      error: () => this.onSaveError(),
    });
  }

  private onSaveError(): void {
    alert('error');
  }

  private onSaveSuccess(navigate: boolean, isUpdate: boolean): void {
    if (isUpdate) {
      this.router.navigate(['/allergy']);
    }

    if (navigate) {
      window.history.back();
    }
    if (!navigate) {
      openSnackBar(this.translateService, this.snackBar, 'HELP.ALLERGY.SAVE_AND_STAY.BODY');
    }
    this.isSaving = false;
  }

  private onSaveFinalize(): void {
    this.isSaving = false;
  }
}
