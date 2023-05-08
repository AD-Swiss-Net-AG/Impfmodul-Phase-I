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
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { SharedLibsModule } from '../../../../shared/shared-libs.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdverseEventDetailedInformationComponent } from '../adverse-event-detailed-information/adverse-event-detailed-information.component';
import { SharedComponentModule } from '../../../../shared/shared-component.module';
import { ConfirmComponent } from '../../../../shared/component/confirm/confirm.component';

@Component({
  selector: 'vm-adverse-event-confirm',
  standalone: true,
  imports: [SharedLibsModule, AdverseEventDetailedInformationComponent, SharedComponentModule, ConfirmComponent],
  templateUrl: './adverse-event-confirm.component.html',
  styleUrls: ['./adverse-event-confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdverseEventConfirmComponent {
  constructor(public dialogRef: MatDialogRef<AdverseEventConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}
}
