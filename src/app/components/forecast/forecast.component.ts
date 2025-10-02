import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ForecastData } from '../../models/weather.model';

@Component({
  selector: 'app-forecast',
  template: `
    @if (forecastData() && forecastData()!.length > 0) {
      <div class="forecast-container">
        <h3 class="forecast-title">5-Day Forecast</h3>
        <div class="forecast-grid">
          @for (day of forecastData(); track day.date) {
            <mat-card class="forecast-card">
              <mat-card-content>
                <div class="forecast-day">
                  <div class="date">{{ day.date }}</div>

                  <div class="weather-info">
                    <img
                      [src]="getWeatherIconUrl(day.icon)"
                      [alt]="day.description"
                      class="forecast-icon"
                    />

                    <div class="temperatures">
                      <span class="temp-high">{{ day.tempHigh }}°</span>
                      <span class="temp-low">{{ day.tempLow }}°</span>
                    </div>
                  </div>

                  <div class="description">
                    {{ day.description | titlecase }}
                  </div>

                  <div class="humidity">
                    <mat-icon class="humidity-icon">water_drop</mat-icon>
                    <span>{{ day.humidity }}%</span>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
          }
        </div>
      </div>
    }
  `,
  styles: [`
    .forecast-container {
      max-width: 1000px;
      margin: 24px auto;
      padding: 0 16px;
    }

    .forecast-title {
      text-align: center;
      margin-bottom: 24px;
      font-size: 24px;
      font-weight: 500;
      color: var(--color-neutral-dark, #333);
    }

    .forecast-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 16px;
    }

    .forecast-card {
      text-align: center;
      transition: transform 0.2s, box-shadow 0.2s;
      cursor: pointer;
    }

    .forecast-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0,0,0,0.15);
    }

    .forecast-day {
      padding: 8px;
    }

    .date {
      font-size: 14px;
      font-weight: 500;
      color: var(--color-primary-dark, #15719f);
      margin-bottom: 12px;
    }

    .weather-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 12px;
    }

    .forecast-icon {
      width: 50px;
      height: 50px;
      margin-bottom: 8px;
    }

    .temperatures {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .temp-high {
      font-size: 18px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.87);
    }

    .temp-low {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.6);
    }

    .description {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.7);
      margin-bottom: 8px;
      line-height: 1.3;
    }

    .humidity {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.6);
    }

    .humidity-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }

    @media (max-width: 768px) {
      .forecast-grid {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 12px;
      }

      .forecast-title {
        font-size: 20px;
      }

      .forecast-icon {
        width: 40px;
        height: 40px;
      }

      .temp-high {
        font-size: 16px;
      }

      .temp-low {
        font-size: 14px;
      }
    }

    @media (max-width: 480px) {
      .forecast-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ]
})
export class ForecastComponent {
  forecastData = input<ForecastData[] | null>(null);

  getWeatherIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }
}
