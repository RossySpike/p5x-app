import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrystalCalculator } from './crystal-calculator';

describe('CrystalCalculator', () => {
  let component: CrystalCalculator;
  let fixture: ComponentFixture<CrystalCalculator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrystalCalculator],
    }).compileComponents();

    fixture = TestBed.createComponent(CrystalCalculator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
