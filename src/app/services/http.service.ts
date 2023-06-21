import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Currency } from 'src/types';

@Injectable()
export class HttpService {
  private readonly validCurrency: string[] = [
    'EUR',
    'USD',
    'CZK',
    'GBP',
    'NZD',
  ];
  private apiUrl =
    'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
  errorMessage: string = '';
  constructor(private readonly http: HttpClient) {}

  getCurrencies(): Observable<any[]> {
    return this.http.get(this.apiUrl).pipe(
      map((data: any) => {
        const res = data as Currency[];
        return res.filter((currency) =>
          this.validCurrency.includes(currency.cc)
        );
        return data;
      }),
      catchError((err) => {
        console.error('@Custom Error: ', err);
        this.errorMessage = err.message;
        return [];
      })
    );
  }
}
