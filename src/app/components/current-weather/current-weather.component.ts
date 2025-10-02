import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WeatherData } from '../../models/weather.model';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-current-weather',
  template: `
    @if (weatherData()) {
      <mat-card class="weather-card">
        <mat-card-header>
          <div class="header-content">
            <div class="location">
              <h2>{{ weatherData()!.cityName }}, {{ weatherData()!.country }}</h2>
              <button
                mat-icon-button
                [class.favorite]="isFavorite()"
                (click)="toggleFavorite()"
                [matTooltip]="isFavorite() ? 'Remove from favorites' : 'Add to favorites'"
              >
                <mat-icon>{{ isFavorite() ? 'favorite' : 'favorite_border' }}</mat-icon>
              </button>
            </div>
            <div class="timestamp">
              Last updated: {{ getFormattedTime(weatherData()!.timestamp) }}
            </div>
          </div>
        </mat-card-header>

        <mat-card-content>
          <div class="weather-main">
            <div class="temperature-section">
              <div class="temperature">
                {{ weatherData()!.temperature }}°C
              </div>
              <div class="feels-like">
                Feels like {{ weatherData()!.feelsLike }}°C
              </div>
            </div>

            <div class="weather-icon">
              <img
                [src]="getWeatherIconUrl(weatherData()!.icon)"
                [alt]="weatherData()!.description"
                class="weather-icon-img"
              />
              <div class="description">
                {{ weatherData()!.description | titlecase }}
              </div>
            </div>
          </div>

          <div class="weather-details">
            <div class="detail-item">
              <mat-icon>water_drop</mat-icon>
              <div class="detail-content">
                <span class="label">Humidity</span>
                <span class="value">{{ weatherData()!.humidity }}%</span>
              </div>
            </div>

            <div class="detail-item">
              <mat-icon>air</mat-icon>
              <div class="detail-content">
                <span class="label">Wind Speed</span>
                <span class="value">{{ weatherData()!.windSpeed }} m/s</span>
              </div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    }
  `,
  styles: [`
    .weather-card {
      max-width: 600px;
      margin: 16px auto;
      box-shadow: 0 4px 8px rgba(0,0,0,0.12);
    }

    .header-content {
      width: 100%;
    }

    .location {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
    }

    .location h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 500;
      flex: 1;
    }

    .location button {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      transition: all 0.2s ease;
      border: 2px solid transparent;
    }

    .location button:hover {
      background-color: rgba(82, 138, 180, 0.1);
      border-color: rgba(82, 138, 180, 0.2);
    }

    .location button.favorite {
      color: var(--color-secondary, #528ab4);
      background-color: rgba(82, 138, 180, 0.1);
      border-color: rgba(82, 138, 180, 0.2);
    }

    .location button:not(.favorite) {
      color: rgba(0, 0, 0, 0.54);
    }

    .location button:not(.favorite):hover {
      color: var(--color-secondary, #528ab4);
    }

    .timestamp {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.6);
    }

    .weather-main {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
      gap: 16px;
    }

    .temperature-section {
      flex: 1;
    }

    .temperature {
      font-size: 48px;
      font-weight: 300;
      line-height: 1;
      color: var(--color-primary-dark, #15719f);
    }

    .feels-like {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.6);
      margin-top: 4px;
    }

    .weather-icon {
      text-align: center;
      flex: 0 0 auto;
    }

    .weather-icon-img {
      width: 80px;
      height: 80px;
    }

    .description {
      font-size: 16px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.87);
      margin-top: 8px;
    }

    .weather-details {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      padding-top: 16px;
      border-top: 1px solid rgba(0, 0, 0, 0.12);
    }

    .detail-item {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .detail-item mat-icon {
      color: var(--color-primary, #62a1c7);
      flex-shrink: 0;
    }

    .detail-content {
      display: flex;
      flex-direction: column;
    }

    .label {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.6);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .value {
      font-size: 16px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.87);
    }

    @media (max-width: 600px) {
      .weather-main {
        flex-direction: column;
        text-align: center;
      }

      .temperature-section {
        flex: none;
      }

      .location h2 {
        font-size: 20px;
      }

      .temperature {
        font-size: 40px;
      }

      .weather-details {
        grid-template-columns: 1fr;
      }
    }
  `],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class CurrentWeatherComponent {
  private readonly favoritesService = inject(FavoritesService);

  weatherData = input<WeatherData | null>(null);

  getWeatherIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }

  getFormattedTime(timestamp: number): string {
    return new Date(timestamp).toLocaleString();
  }

  isFavorite(): boolean {
    const weather = this.weatherData();
    return weather ? this.favoritesService.isFavorite(weather.cityName) : false;
  }

  toggleFavorite(): void {
    const weather = this.weatherData();
    if (weather) {
      if (this.isFavorite()) {
        this.favoritesService.removeFavorite(weather.cityName);
      } else {
        this.favoritesService.addFavorite(weather.cityName);
      }
    }
  }
}
