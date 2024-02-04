import { Injectable, computed, signal } from '@angular/core';
import { IExpense } from '.';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  private _expenses = signal<IExpense[]>([]);

  get expenses() {
    return computed(() => this._expenses());
  }

  get totalExpenses() {
    return computed(() =>
      this._expenses().reduce((prev, cur) => cur.amount + prev, 0)
    );
  }

  constructor() {}

  add(expense: IExpense) {
    this._expenses.update((expenses) => [...expenses, expense]);
  }
}
