import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CrystalCalculatorService } from '../crystal-calculator.service';
@Component({
  selector: 'app-crystal-calculator',
  imports: [ReactiveFormsModule],
  templateUrl: './crystal-calculator.html',
  styleUrl: './crystal-calculator.css',
})
export class CrystalCalculator {
  calculator: CrystalCalculatorService = new CrystalCalculatorService();
  finishCalc = false;

  currentCharaMax: number = 160;
  form: FormGroup = new FormGroup({
    pulling: new FormControl('Character', [Validators.required]), // Determines which data to show [Charac, Weapon, Both]
    pityType: new FormControl('160', [Validators.required]), // Charac Only

    crystalCount: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.min(0), Validators.required],
    }), // Both
    jewelCount: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.min(0), Validators.required],
    }), // Both
    platinumTicketCount: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.min(0), Validators.required],
    }), // Charac Only
    platinumMiliCount: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.min(0), Validators.required],
    }), // Weapon Only

    charaPity: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0), Validators.max(159)],
    }), // Charac Only
    weaponPity: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0), Validators.max(139)],
    }), // Weapon Only
  });
  constructor() {}
  updateMax(): void {
    const charaPity = this.form.get('charaPity');
    this.currentCharaMax =
      this.form.get('pityType')?.value === '160' ? 159 : 109;
    charaPity?.setValidators(Validators.max(this.currentCharaMax));
    document
      .getElementById('chara-pity')
      ?.setAttribute('max', `${this.currentCharaMax}`);
  }

  calculate() {
    if (this.form.invalid) {
      this.finishCalc = false;
      return;
    }
    const crystalCount = this.form.get('crystalCount')?.value;
    const jewelCount = this.form.get('jewelCount')?.value;
    const option = this.form.get('pulling')?.value;
    this.calculator.calculate(
      option,
      crystalCount,
      jewelCount,
      {
        pityType: this.form.get('pityType')?.value,
        charaPity: this.form.get('charaPity')?.value,
        platinumTicketCount: this.form.get('platinumTicketCount')?.value,
      },
      {
        platinumMiliCount: this.form.get('platinumMiliCount')?.value,
        weaponPity: this.form.get('weaponPity')?.value,
      },
    );
    this.finishCalc = true;
  }

  clearLeftOver() {
    this.finishCalc = false;
    this.calculator.clearLeftOver();
  }
}
