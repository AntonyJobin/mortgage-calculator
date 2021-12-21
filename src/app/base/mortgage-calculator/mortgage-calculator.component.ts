/**
 * Angular imports
 */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

/**
 * Custom imports
 */
import { mortgageTimePeriod, mortgageTimePeriodMonths, mortgagePaymentFrequency, mortgageTerms, prepaymentFrequencies, calculationSummary } from '../mocks/mockData';
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
   * Data source for the table
   */
  public dataSource : any;

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

}
