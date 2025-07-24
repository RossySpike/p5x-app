import { Routes } from '@angular/router';
import { Home } from './home/home';
import { CrystalCalculator } from './crystal-calculator/crystal-calculator';
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
];
export default routes;
