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
import { Directive, inject, OnDestroy, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Directive({
  // removed because linter complain about not using element as selector and in this case it is much easier.
  // eslint-disable-next-line
  selector: 'mat-datepicker',
})
export class DatepickerTranslationDirective implements OnInit, OnDestroy {
  private dateAdapter: DateAdapter<Date> = inject(DateAdapter);
  private translateService: TranslateService = inject(TranslateService);
  private subscription?: Subscription;

  ngOnInit(): void {
    this.subscription = this.translateService.onLangChange.subscribe(change => {
      this.dateAdapter.setLocale(change.lang);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
