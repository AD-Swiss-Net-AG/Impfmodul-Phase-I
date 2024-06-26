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
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { SessionInfoService } from '../../../core/security/session-info.service';
import { IBaseDTO } from '../../interfaces';
import { TranslateDirective } from '../../language';
import { MaterialModule } from '../../material.module';
import { DialogService } from '../../services';
import { BreakPointSensorComponent } from '../break-point-sensor/break-point-sensor.component';

/**
 * Used to structure all buttons in the details and edit components.
 */
@Component({
  selector: 'vm-common-card-footer',
  standalone: true,
  imports: [CommonModule, MaterialModule, FlexLayoutModule, TranslateDirective, TranslateModule],
  templateUrl: './common-card-footer.component.html',
  styleUrls: ['./common-card-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommonCardFooterComponent<T extends IBaseDTO> extends BreakPointSensorComponent implements OnInit, OnDestroy {
  @Output() edit: EventEmitter<T> = new EventEmitter<T>();
  @Output() delete: EventEmitter<T> = new EventEmitter<T>();
  @Output() help: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() save: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() download: EventEmitter<Event> = new EventEmitter<Event>();

  @Input() item: T | null = null;
  @Input() dialogTitle!: string;
  @Input() dialogBody!: string;
  @Input() isDetailsFooter!: boolean;
  @Input() isEditFooter!: boolean;
  @Input() disabled!: boolean;
  @Input() IsNewRecord!: boolean;
  @Input() canEdit: boolean = true;

  isEmergencyMode: boolean = false;

  dialog = inject(DialogService);
  private sessionInfoService = inject(SessionInfoService);

  navigateToEdit = (value: T): void => this.edit.emit(value);
  saveRecord = (event: Event): void => this.save.emit(event);
  deleteRecord = (value: T): void => this.delete.emit(value);

  previous = (): void => window.history.back();

  openDialog(event: Event): void {
    this.dialog.openDialog(this.dialogTitle, this.dialogBody);
    this.help.emit(event);
  }

  downloadRecord = (event: Event): void => this.download.emit(event);

  ngOnDestroy(): void {
    this.help.unsubscribe();
  }

  ngOnInit(): void {
    this.isEmergencyMode = this.sessionInfoService.isEmergencyMode();
  }
}
