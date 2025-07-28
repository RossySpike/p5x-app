import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CrystalCalculatorService {
  leftOverCrystals: number = 0;
  leftOverJewels: number = 0;
  leftOverPlatinum: number = 0;
  leftOverMili: number = 0;
  pullsLeftChara: number = 0;
  pullsLeftWeapon: number = 0;
  pityType: '160' | '110' = '160';

  platinumTicketCount: number = 0;
  platinumMiliCount: number = 0;
  charaPity: number = 0;
  weaponPity: number = 0;
  weaponsPity = 140;
  constructor() {}
  calculate(
    option: 'Character' | 'Weapon' | 'Both',
    crystalCount: number,
    jewelCount: number,
    characArgs?: {
      pityType: '160' | '110';
      charaPity: number;
      platinumTicketCount: number;
    },
    weaponArgs?: {
      platinumMiliCount: number;
      weaponPity: number;
    },
  ) {
    this.leftOverCrystals = crystalCount;
    this.leftOverJewels = jewelCount;
    switch (option) {
      case 'Character':
        this.platinumTicketCount = characArgs?.platinumTicketCount || 0;
        this.pityType = characArgs?.pityType || '160';
        this.charaPity = characArgs?.charaPity || 0;

        this.#calculateCharacter();
        break;
      case 'Weapon':
        this.platinumMiliCount = weaponArgs?.platinumMiliCount || 0;
        this.platinumMiliCount = weaponArgs?.platinumMiliCount || 0;
        this.weaponPity = weaponArgs?.weaponPity || 0;
        this.#calculateWeapon();
        break;
      case 'Both':
        this.platinumTicketCount = characArgs?.platinumTicketCount || 0;
        this.pityType = characArgs?.pityType || '160';
        this.charaPity = characArgs?.charaPity || 0;
        this.platinumMiliCount = weaponArgs?.platinumMiliCount || 0;
        this.weaponPity = weaponArgs?.weaponPity || 0;
        this.#calculateCharacter();
        this.#calculateWeapon();
        break;
      default:
        break;
    }
  }

  #calculateCharacter() {
    this.pullsLeftChara = 0;
    const pityType = Number.parseInt(this.pityType);
    const currentPity = this.charaPity;
    this.leftOverPlatinum = this.platinumTicketCount;
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
    pulls -= crystalsAsTickets;
    this.pullsLeftChara = pulls;
  }
  #calculateWeapon() {
    this.pullsLeftWeapon = 0;
    const currentPity = this.weaponPity;
    this.leftOverMili = this.platinumMiliCount;
    let pulls = this.weaponsPity - currentPity;
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
  }
}
