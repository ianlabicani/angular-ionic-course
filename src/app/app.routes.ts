import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'expenses',
    loadComponent: () =>
      import('./expenses/expenses.page').then((m) => m.ExpensesPage),
  },
  {
    path: '',
    redirectTo: 'expenses',
    pathMatch: 'full',
  },
];
