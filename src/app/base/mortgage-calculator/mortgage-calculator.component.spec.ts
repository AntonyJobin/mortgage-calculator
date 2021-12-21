import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MortgageCalculatorComponent } from './mortgage-calculator.component';

describe('MortgageCalculatorComponent', () => {
  let component: MortgageCalculatorComponent;
  let fixture: ComponentFixture<MortgageCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MortgageCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MortgageCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the user input form', () => {
    const fixture = TestBed.createComponent(MortgageCalculatorComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    // For the payment form
    expect(compiled.querySelector('#payment-plan-card mat-card-title').textContent).toContain('Payment Plan');
    // For the pre payment form
    expect(compiled.querySelector('#prepayment-plan-card mat-card-title').textContent).toContain('Prepayment Plan');
  });

});
