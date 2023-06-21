import { Component, OnInit } from '@angular/core';
import { HttpService } from './services/http.service';
import { Currency } from 'src/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  currencies: Currency[] = [];

  constructor(private readonly httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.getCurrencies().subscribe({
      next: (data: Currency[]) => (this.currencies = data),
    });
  }
}
