import { Routes } from '@angular/router';
import { Home } from './home/home';
import { CrystalCalculator } from './crystal-calculator/crystal-calculator';
import { DamageCalculator } from './damage-calculator/damage-calculator';
import { Personas } from './personas/personas';
const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'P5X App',
  },

  {
    path: 'crystal-calculator',
    component: CrystalCalculator,
    title: 'Crystal Calculator',
  },
  {
    path: 'damage-calculator',
    component: DamageCalculator,
    title: 'Damage Calculator',
  },
  {
    path: 'personas',
    component: Personas,
    title: 'Personas',
  },
];
export default routes;
