import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DamageCalculatorService {
  attack: number = 0;
  elemBonus: number = 0;
  attackMult: number = 0;
  increasedDmgTaken: number = 0;
  pierce: number = 0;
  defenseReduction: number = 0;
  critDmg: number = 0;
  motionValue: number = 0;
  weakness: number = 0;
  finalDmgBonus: number = 0;

  private calcBonusDmg(): number {
    return (
      (100 + this.attackMult + this.elemBonus + this.increasedDmgTaken) / 100
    );
  }
  private calcDefense(): number {
    const enemyDefense = 100; // Placeholder
    const additionalDefenseCoefficient = 0; // Placeholder
    const winded = false; // Placeholder
    return (
      ((enemyDefense *
        ((100 + additionalDefenseCoefficient) / 100) *
        (100 - this.pierce) -
        this.defenseReduction) *
        (winded ? 0.82 : 1)) /
      100
    );
  }
  private calcDmgReduction() {
    const def = this.calcDefense();
    return 1 - def / (def + 1400);
  }
  calculateDamage(): number {
    const otherCoefficients = 1; // Placeholder for other coefficients
    const randomRangeCoefficient = 1; // Placeholder for random range coefficient
    return (
      this.attack *
      this.calcBonusDmg() *
      this.calcDmgReduction() *
      ((100 + this.critDmg) / 100) *
      this.motionValue *
      (this.weakness / 100) *
      ((100 + this.finalDmgBonus) / 100) *
      otherCoefficients *
      randomRangeCoefficient
    );
  }
}
