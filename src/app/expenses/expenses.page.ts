import { ExpensesService } from './data-access/expenses.service';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, close } from 'ionicons/icons';
import { IExpense } from './data-access';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class ExpensesPage {
  expensesService = inject(ExpensesService);

  fb = inject(FormBuilder);
  form: FormGroup;

  alertButtons = [
    {
      text: 'Okay',
      role: 'okay',
      handler: () => {},
    },
  ];
  isAlertOpen: boolean = false;

  constructor() {
    addIcons({ add, close });
    this.form = this.fb.group({
      reason: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.min(1), Validators.required]),
    });
  }

  onAdd() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.setOpen(true);
      return;
    }
    const newExpense: IExpense = this.form.value;
    this.expensesService.add(newExpense);
    this.form.reset();
  }

  cancel() {
    this.form.reset();
  }

  setOpen(arg0: boolean) {
    this.isAlertOpen = arg0;
  }
}
