import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentScheduleComponent } from './payment-schedule.component';

describe('PaymentScheduleComponent', () => {
  let component: PaymentScheduleComponent;
  let fixture: ComponentFixture<PaymentScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('To check the component created successfully', () => {
    expect(component).toBeTruthy();
  });

  it('should render the caption for the Payment schedule tabular content', () => {
    const fixture = TestBed.createComponent(PaymentScheduleComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('caption').textContent).toContain('Payment Schedule');
  });

});
