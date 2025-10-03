import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ForecastData } from '../../models/weather.model';
import { capitalizeWords, formatForecastDate, getWeatherIconUrl } from '../../utils/weather.utils';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.scss',

  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ]
})
export class ForecastComponent {
  readonly forecastData = input<ForecastData[] | null>(null);

  // Utility functions (imported from utils)
  getWeatherIconUrl = getWeatherIconUrl;
  formatForecastDate = formatForecastDate;
  capitalizeWords = capitalizeWords;
}
