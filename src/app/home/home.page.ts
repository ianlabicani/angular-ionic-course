import { IonicModule } from '@ionic/angular';
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

interface IExpense {
  reason: string;
  amount: number;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, IonicModule],
})
export class HomePage {
  expensesSig = signal<IExpense[]>([]);
  totalAmountSig = computed(() =>
    this.expensesSig().reduce((prev, cur) => cur.amount + prev, 0)
  );

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

  addExpense() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.setOpen(true);
      return;
    }
    const newExpense: IExpense = this.form.value;
    this.expensesSig.update((expenses) => [...expenses, newExpense]);
    this.form.reset();
  }

  cancel() {
    this.form.reset();
  }

  setOpen(arg0: boolean) {
    this.isAlertOpen = arg0;
  }
}
