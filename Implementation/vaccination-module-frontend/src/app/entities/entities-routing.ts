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
import { Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
export const ENTITIES_ROUTE: Routes = [
  {
    path: '',
    loadComponent: () => import('../layouts/welcome/welcome.component').then(c => c.WelcomeComponent),
    title: 'VACCINATION.TITLE',
  },
  {
    path: 'vaccination-record',
    loadComponent: () => import('./vaccintion-record/record/vaccination-record.component').then(c => c.VaccinationRecordComponent),
    canActivate: [AuthGuard],
  },

  {
    path: 'vaccination',
    loadChildren: () => import('./vaccination/vaccination-routing').then(r => r.VACCINATION_ROUTE),
    canActivate: [AuthGuard],
  },
  {
    path: 'allergy',
    loadChildren: () => import('./adverse_event/adverse-event-routing').then(r => r.ADVERSE_EVENT_ROUTE),
    canActivate: [AuthGuard],
  },
  {
    path: 'infectious-diseases',
    loadChildren: () => import('./infectious_diseases/infectious-diseases-routing').then(r => r.INFECTIOUS_DISEASES_ROUTE),
    canActivate: [AuthGuard],
  },

  {
    path: 'medical-problem',
    loadChildren: () => import('./medical-problem/medical-problem.routing').then(r => r.PROBLEM_ROUTE),
    canActivate: [AuthGuard],
  },
];
