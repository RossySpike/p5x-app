import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageCalculator } from './damage-calculator';

describe('DamageCalculator', () => {
  let component: DamageCalculator;
  let fixture: ComponentFixture<DamageCalculator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DamageCalculator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DamageCalculator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
