import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Home } from './home/home';

@Component({
  selector: 'app-root',
  imports: [RouterModule, Home],
  // templateUrl: './app.html',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('p5x-app');
}
