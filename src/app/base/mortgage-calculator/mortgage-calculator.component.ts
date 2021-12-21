/**
 * Angular imports
 */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

/**
 * Custom imports
 */
import { mortgageTimePeriod, mortgageTimePeriodMonths, mortgagePaymentFrequency, mortgageTerms, prepaymentFrequencies, calculationSummary } from './mocks/mockData';
@Component({
  selector: 'app-mortgage-calculator',
  templateUrl: './mortgage-calculator.component.html',
  styleUrls: ['./mortgage-calculator.component.scss']
})
export class MortgageCalculatorComponent implements OnInit {

  /**
   * Form group controlling the elemenths
   */
  public calculatorForm: FormGroup = new FormGroup({});
  
  /**
   * Public elements for persisting mortgage period in years
   */
  public mortperiods: any;

  /**
   * Public elements for persisting mortgage period in months
   */
  public mortperiodMnths: any;

  /**
   * Public elements for persisting payment frequency modes
   */
  public mortgagePaymentFrequency: any;

  /**
   * Public elements for persisting mortgage terms
   */
  public mortgageTerm: any;

  /**
   * Public elements for persisting prepayment frequency
   */
  public prepaymentFrequencies:  any;

  /**
   * Table column indicators
   */
  public displayedColumns: string[] = ['category', 'term', 'amortizationPeriod'];

  /**
   * Table column indicators
   */
  public displayedMRColumns: string[] = ['category', 'value'];

  /**
   * Data source for the table
   */
  public dataSource : any;

  /**
   * Data source for the table
   */
  public dataSourceMR : any;

  /**
   * Toggle for schedule report view
   */
  public isScheduleReport : boolean = false;

  constructor() { 
    this.mortperiods = mortgageTimePeriod;
    this.mortperiodMnths = mortgageTimePeriodMonths;
    this.mortgagePaymentFrequency =mortgagePaymentFrequency;
    this.mortgageTerm = mortgageTerms;
    this.prepaymentFrequencies = prepaymentFrequencies;
  }

  ngOnInit(): void {
    this._initializeForm();
  }

  private _initializeForm() : void {
    this.calculatorForm = new FormGroup({
      'paymentPlan': new FormGroup({
        'mAmount': new FormControl(100000),
        'mInterestRate': new FormControl(5.00),
        'mortperiodSel': new FormControl(25),
        'mortperiodMonths': new FormControl(),
        'mFrequency': new FormControl(6),
        'mTerm': new FormControl(5)
      }),
      'prePaymentPlan': new FormGroup({
        'preAmount': new FormControl(0.00),
        'preFrequency': new FormControl(1),
        'startPayment': new FormControl(1)
      })
    });
    this.calculateLoanSummary();
  }

  /**
   * Public function to calculate the loan summary
   * @return {void}
   */
  public calculateLoanSummary() : void {
    this.dataSource = calculationSummary;
  }

  /**
   * Public function to calculate Mortgage
   */
  public calculateMortgage() : void {
    this.dataSource = [{
        "category": "Number of Payments",
        "helpMessage": "The number of payments made during the Term and Amoritization period respectively.",
        "term": (this.calculatorForm.controls.paymentPlan as FormGroup).controls.mTerm.value * 12,
        "amortizationPeriod": (this.calculatorForm.controls.paymentPlan as FormGroup).controls.mortperiodSel.value * 12 + (this.calculatorForm.controls.paymentPlan as FormGroup).controls.mortperiodMonths.value
      },{
        "category": "Mortgage Payment",
        "helpMessage": "The amount you will pay per period during the Term and Amoritization respectively, which include a portion for the principal payment and a portion for the interest payment.",
        "term": (this.calculatorForm.controls.paymentPlan as FormGroup).controls.mTerm.value * 12,
        "amortizationPeriod": (this.calculatorForm.controls.paymentPlan as FormGroup).controls.mortperiodSel.value * 12
      },{
        "category": "Prepayment",
        "helpMessage": "The amount of prepayment made during the Term and Amoritization period respectively.",
        "term": (this.calculatorForm.controls.prePaymentPlan as FormGroup).controls.preAmount.value ,
        "amortizationPeriod": (this.calculatorForm.controls.prePaymentPlan as FormGroup).controls.preAmount.value 
      },{
        "category": "Principal Payments",
        "helpMessage": "The total amount of principal payment made during the Term and Amoritization period respectively.",
        "term": (this.calculatorForm.controls.paymentPlan as FormGroup).controls.mTerm.value * 12,
        "amortizationPeriod": (this.calculatorForm.controls.paymentPlan as FormGroup).controls.mortperiodSel.value * 12
      },{
        "category": "Interest Payments",
        "helpMessage": "Total of all interest paid during the Term and Amoritization period respectively, assuming that the conditions of your loan (e.g. interest rate, amortization period, term, etc.) will not change during these periods. This total interest amount also assumes that there are no prepayments of principal.",
        "term": (this.calculatorForm.controls.paymentPlan as FormGroup).controls.mTerm.value * 12,
        "amortizationPeriod": (this.calculatorForm.controls.paymentPlan as FormGroup).controls.mortperiodSel.value * 12
      },{
        "category": "Total Cost",
        "helpMessage": "Total of all payments made during the Term and Amoritization period respectively, assuming that the conditions of your loan (e.g. interest rate, amortization period, term, etc.) will not change during these periods. It is also assumed that there are no prepayments of principal.",
        "term": (this.calculatorForm.controls.paymentPlan as FormGroup).controls.mTerm.value * 12,
        "amortizationPeriod": (this.calculatorForm.controls.paymentPlan as FormGroup).controls.mortperiodSel.value * 12
      }];
    
  }

  /**
   * Public function to calculate Mortgage
   */
  public createMortgageReport() : void {
    this.dataSourceMR = [{
        "category": "Mortgage Amount:",
        "value": (this.calculatorForm.controls.paymentPlan as FormGroup).controls.mAmount.value 
      },{
        "category": "Interest Rate:",
        "value": (this.calculatorForm.controls.paymentPlan as FormGroup).controls.mInterestRate.value 
      },{
        "category": "Amortization Period:",
        "value": (this.calculatorForm.controls.paymentPlan as FormGroup).controls.mortperiodSel.value 
      },{
        "category": "Payment Frequency:",
        "value": (this.calculatorForm.controls.paymentPlan as FormGroup).controls.mFrequency.value 
      },{
        "category": "Term:",
        "value": (this.calculatorForm.controls.paymentPlan as FormGroup).controls.mTerm.value 
      },{
        "category": "Prepayment Amount:",
        "value": (this.calculatorForm.controls.prePaymentPlan as FormGroup).controls.preFrequency.value 
      }];
    
  }

  /**
   * Event listener for schedule report
   * @return {void}
   */
  public triggerScheduleReport() : void {
    this.createMortgageReport();
    this.isScheduleReport = true;
  }

}
