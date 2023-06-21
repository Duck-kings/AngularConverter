import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Currency } from 'src/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule],
})
export class ConverterComponent implements OnChanges {
  @Input() currencies: Currency[] = [];
  validCurrencies: string[] = [];
  baseCurrency = '';
  currency = '';
  fromRate = 0;
  toRate = 0;
  resultRate = 0;

  ngOnChanges(changes: SimpleChanges): void {
    this.currencies = changes['currencies'].currentValue;
    this.validCurrencies = changes['currencies'].currentValue.map(
      (item: Currency) => item.cc
    );

    this.validCurrencies.push('UAH');
  }

  onKeyBaseCurrency(event: KeyboardEvent) {
    this.baseCurrency = (event.target as HTMLInputElement).value;
    this.totalRate();
    this.currency = String(this.resultRate * +this.baseCurrency);
  }

  onKeyCurrency(event: KeyboardEvent) {
    this.currency = (event.target as HTMLInputElement).value;
    this.totalRate();
    this.baseCurrency = String(+this.currency / this.resultRate);
  }

  onChangeBaseCurrency(event: any) {
    this.baseCurrency = '1';
    const rate = this.currencies.find((item) => item.cc === event)?.rate;
    this.fromRate = rate ? rate : 1;
    this.totalRate();
    this.currency = String(this.resultRate * +this.baseCurrency);
  }

  onChangeCurrency(event: any) {
    const rate = this.currencies.find((item) => item.cc === event)?.rate;
    this.toRate = rate ? rate : 1;
    this.totalRate();
    this.currency = String(this.resultRate * +this.baseCurrency);
  }

  totalRate() {
    this.resultRate = this.fromRate / this.toRate;
  }
}
