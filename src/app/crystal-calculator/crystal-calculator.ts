import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-crystal-calculator',
  imports: [ReactiveFormsModule],
  templateUrl: './crystal-calculator.html',
  styleUrl: './crystal-calculator.css',
})
export class CrystalCalculator {
  leftOverCrystals: number = 0;
  leftOverJewels: number = 0;
  leftOverPlatinum: number = 0;
  leftOverMili: number = 0;
  pullsLeftChara: number = 0;
  pullsLeftWeapon: number = 0;

  finishCalc = false;

  weaponsPity = 160;

  currentCharaMax: number = 160;
  form: FormGroup = new FormGroup({
    pulling: new FormControl('Character'), // Determines which data to show [Charac, Weapon, Both]
    pityType: new FormControl('160'), // Charac Only

    crystalCount: new FormControl(0), // Both
    jewelCount: new FormControl(0), // Both
    platinumTicketCount: new FormControl(0), // Charac Only
    platinumMiliCount: new FormControl(0), // Weapon Only

    charaPity: new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(159),
    ]), // Charac Only
    weaponPity: new FormControl(0), // Weapon Only
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
    this.leftOverCrystals = this.form.get('crystalCount')?.value;
    this.leftOverJewels = this.form.get('jewelCount')?.value;
    switch (this.form.get('pulling')?.value) {
      case 'Character':
        this.#calculateCharacter();
        break;
      case 'Weapon':
        this.#calculateWeapon();
        break;
      case 'Both':
        this.#calculateCharacter();
        this.#calculateWeapon();
        break;
      default:
        break;
    }
    this.finishCalc = true;
  }

  #calculateCharacter() {
    this.pullsLeftChara = 0;
    const pityType = this.form.get('pityType')?.value;
    const currentPity = this.form.get('charaPity')?.value;
    this.leftOverPlatinum = this.form.get('platinumTicketCount')?.value;
    let pulls = pityType - currentPity;
    console.log('let pulls = pityType - currentPity;', pulls);

    if (pulls - this.leftOverPlatinum <= 0) {
      this.leftOverPlatinum -= pulls;
      return;
    }
    pulls -= this.leftOverPlatinum;
    this.leftOverPlatinum = 0;

    const jewelsAsTickets = Math.floor(this.leftOverJewels / 150); // 1 ticket == 150 jewels
    console.log(jewelsAsTickets, 'jewelsAsTickets', this.leftOverJewels / 150);
    if (pulls - jewelsAsTickets <= 0) {
      this.leftOverJewels -= pulls * 150;
      return;
    }
    this.leftOverJewels -= jewelsAsTickets * 150;
    pulls -= jewelsAsTickets;
    console.log(pulls);

    const crystalsAsTickets = Math.floor(this.leftOverCrystals / 150); // 1 ticket == 150 jewels
    console.log(
      crystalsAsTickets,
      'crystalsAsTickets',
      this.leftOverCrystals / 150,
    );
    if (pulls - crystalsAsTickets <= 0) {
      console.log(pulls * 150);
      this.leftOverCrystals -= pulls * 150;
      return;
    }
    this.leftOverCrystals -= crystalsAsTickets * 150;
    console.log(pulls);
    pulls -= jewelsAsTickets;
    this.pullsLeftChara = pulls;
  }
  #calculateWeapon() {
    this.pullsLeftWeapon = 0;
    const currentPity = this.form.get('weaponPity')?.value;
    this.leftOverMili = this.form.get('platinumMiliCount')?.value;
    let pulls = 160 - currentPity;
    if (pulls - this.leftOverMili <= 0) {
      this.leftOverMili -= pulls;
      return;
    }
    pulls -= this.leftOverMili;
    this.leftOverMili = 0;
    const jewelsAsMili = Math.floor(this.leftOverJewels / 150);
    if (pulls - jewelsAsMili <= 0) {
      this.leftOverJewels -= pulls * 150;
      return;
    }
    this.leftOverJewels -= jewelsAsMili * 150;
    pulls -= jewelsAsMili;
    const crystalsAsMili = Math.floor(this.leftOverCrystals / 150);
    if (pulls - crystalsAsMili <= 0) {
      this.leftOverCrystals -= pulls * 150;
      return;
    }
    this.leftOverCrystals -= crystalsAsMili * 150;
    pulls -= crystalsAsMili;
    this.pullsLeftWeapon = pulls;
  }
  clearLeftOver() {
    this.leftOverPlatinum = 0;
    this.leftOverCrystals = 0;
    this.leftOverJewels = 0;
    this.leftOverMili = 0;
    this.pullsLeftChara = 0;
    this.pullsLeftWeapon = 0;
    this.finishCalc = false;
  }
}
