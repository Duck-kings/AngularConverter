import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Currency } from 'src/types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, CommonModule],
})
export class HeaderComponent implements OnChanges {
  @Input() currencies: Currency[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.currencies = changes['currencies'].currentValue.filter(
      (item: Currency) => item.cc === 'USD' || item.cc === 'EUR'
    );
  }
}
