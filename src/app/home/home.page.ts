import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { addIcons } from 'ionicons';
import { add, close } from 'ionicons/icons';
import { sharedIonComponents } from '../shared';

interface IExpense {
  reason: string;
  amount: number;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [...sharedIonComponents, ReactiveFormsModule, CommonModule],
})
export class HomePage {
  expensesSig = signal<IExpense[]>([]);
  totalAmountSig = computed(() =>
    this.expensesSig().reduce((prev, cur) => {
      console.log(cur.amount + prev);
      console.log(typeof prev);
      console.log(typeof cur.amount);

      return cur.amount + prev;
    }, 0)
  );

  fb = inject(FormBuilder);

  form: FormGroup;

  constructor() {
    addIcons({ add, close });
    this.form = this.fb.group({
      reason: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.min(1), Validators.required]),
    });
  }

  addExpense() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const newExpense: IExpense = this.form.value;
    this.expensesSig.update((expenses) => [...expenses, newExpense]);
    this.form.reset();
  }

  cancel() {
    this.form.reset();
  }
}
