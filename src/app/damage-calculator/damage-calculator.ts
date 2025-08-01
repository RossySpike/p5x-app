import {
  Component,
  inject,
  OnInit,
  WritableSignal,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DamageCalculatorService } from '../damage-calculator.service';
import { HeartService } from '../heart.service';

@Component({
  selector: 'app-damage-calculator',
  imports: [ReactiveFormsModule],
  templateUrl: './damage-calculator.html',
  styleUrl: './damage-calculator.css',
})
export class DamageCalculator implements OnInit {
  calculator: DamageCalculatorService = inject(DamageCalculatorService);

  heartService: HeartService = inject(HeartService);
  currentColor: WritableSignal<string> = signal(this.heartService.middle.fill);

  result: number = 0;
  displayDamage: number = 0;
  form = new FormGroup({
    attack: new FormControl(100, [Validators.min(0), Validators.required]),
    elemBonus: new FormControl(0, [Validators.min(0), Validators.required]),
    attackMult: new FormControl(0, [Validators.min(0), Validators.required]),
    increasedDmgTaken: new FormControl(0, [
      Validators.min(0),
      Validators.required,
    ]),
    pierce: new FormControl(0, [Validators.min(0), Validators.required]),
    defenseReduction: new FormControl(0, [
      Validators.min(0),
      Validators.required,
    ]),
    critDmg: new FormControl(0, [Validators.min(0), Validators.required]),
    motionValue: new FormControl(100, [Validators.min(0), Validators.required]),
    weakness: new FormControl('50%', [Validators.required]),
    finalDmgBonus: new FormControl(0, [Validators.min(0), Validators.required]),
  });
  ngOnInit(): void {
    const inputs = document.getElementsByTagName('input');
    const select = document.querySelector('select') as HTMLSelectElement;
    for (let element of inputs) {
      element.addEventListener('click', () => {
        this.currentColor.set(this.heartService.middle.fill);
      });
    }

    select.addEventListener('click', () => {
      this.currentColor.set(this.heartService.middle.fill);
    });
  }

  startHeartAnimation() {
    setTimeout(() => {
      this.currentColor.set('url(#heart-gradient-first)');
      setTimeout(() => {
        this.currentColor.set('url(#heart-gradient-second)');
        setTimeout(() => {
          this.currentColor.set('url(#heart-gradient-third)');
          setTimeout(() => {
            this.currentColor.set('url(#heart-gradient-last)');
          }, 150);
        }, 150);
      }, 150);
    }, 150);
  }

  calculate(): void {
    if (this.form.invalid) {
      return;
    }
    this.calculator.attack = this.form.get('attack')?.value || 0;
    this.calculator.elemBonus = this.form.get('elemBonus')?.value || 0;
    this.calculator.attackMult = this.form.get('attackMult')?.value || 0;
    this.calculator.increasedDmgTaken =
      this.form.get('increasedDmgTaken')?.value || 0;
    this.calculator.pierce = this.form.get('pierce')?.value || 0;
    this.calculator.defenseReduction =
      this.form.get('defenseReduction')?.value || 0;
    this.calculator.critDmg = this.form.get('critDmg')?.value || 0;
    this.calculator.motionValue = this.form.get('motionValue')?.value || 0;
    this.calculator.weakness = parseInt(
      this.form.get('weakness')?.value || '50',
      10,
    );
    this.calculator.finalDmgBonus = this.form.get('finalDmgBonus')?.value || 0;
    this.result = this.calculator.calculateDamage();
    this.displayDamage = Math.round(this.result);
    this.startHeartAnimation();
  }
}
