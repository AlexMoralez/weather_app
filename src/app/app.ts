import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ApiKeySetupComponent } from './components/api-key-setup/api-key-setup.component';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { ErrorDisplayComponent } from './components/error-display/error-display.component';
import { FavoritesListComponent } from './components/favorites-list/favorites-list.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SearchComponent } from './components/search/search.component';
import { ForecastData, WeatherData } from './models/weather.model';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="app-container">
      <mat-toolbar color="primary" class="app-toolbar">
        <mat-icon class="app-icon">wb_sunny</mat-icon>
        <span class="app-title">Weather App</span>

        @if (hasApiKey()) {
          <div class="toolbar-spacer"></div>
          <button
            mat-icon-button
            (click)="clearApiKey()"
            matTooltip="Clear API Key"
          >
            <mat-icon>settings</mat-icon>
          </button>
        }
      </mat-toolbar>

      <main class="main-content">
        @if (!hasApiKey()) {
          <!-- API Key Setup -->
          <app-api-key-setup (apiKeySubmitted)="onApiKeySubmitted($event)" />
        } @else {
          <!-- Weather Application -->
          <div class="weather-app">
            <app-search (citySearch)="onCitySearch($event)" />

            <!-- Favorites List - Always Visible -->
            <app-favorites-list (citySelected)="onFavoriteCitySelected($event)" />

            <app-loading [isLoading]="isLoading()" />

            <app-error-display [errorMessage]="errorMessage()" />

            @if (currentWeather()) {
              <app-current-weather [weatherData]="currentWeather()" />
            }

            @if (forecast() && forecast()!.length > 0) {
              <app-forecast [forecastData]="forecast()" />
            }

            @if (!isLoading() && !errorMessage() && !currentWeather()) {
              <div class="welcome-message">
                <mat-icon class="welcome-icon">search</mat-icon>
                <h2>Welcome to Weather App!</h2>
                <p>Search for a city to get started with current weather and 5-day forecast.</p>
              </div>
            }
          </div>
        }
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #95d6ea 0%, #62a1c7 50%, #15719f 100%);
    }

    .app-toolbar {
      box-shadow: 0 4px 8px rgba(21, 113, 159, 0.2);
      background-color: #15719f !important;
    }

    .app-icon {
      margin-right: 8px;
    }

    .app-title {
      font-size: 20px;
      font-weight: 500;
    }

    .toolbar-spacer {
      flex: 1 1 auto;
    }

    .main-content {
      padding: 32px 16px;
      min-height: calc(100vh - 64px);
    }

    .weather-app {
      max-width: 1200px;
      margin: 0 auto;
    }

    .weather-app > * {
      margin-bottom: 24px;
    }

    .welcome-message {
      text-align: center;
      padding: 60px 20px;
      color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      backdrop-filter: blur(10px);
      margin: 24px 16px;
    }

    .welcome-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      margin-bottom: 16px;
      opacity: 0.8;
    }

    .welcome-message h2 {
      margin: 0 0 16px 0;
      font-size: 28px;
      font-weight: 300;
    }

    .welcome-message p {
      margin: 0;
      font-size: 16px;
      opacity: 0.9;
      max-width: 400px;
      margin: 0 auto;
      line-height: 1.5;
    }

    @media (max-width: 768px) {
      .main-content {
        padding: 16px 8px;
      }

      .welcome-message {
        padding: 40px 16px;
      }

      .welcome-icon {
        font-size: 48px;
        width: 48px;
        height: 48px;
      }

      .welcome-message h2 {
        font-size: 24px;
      }

      .welcome-message p {
        font-size: 14px;
      }
    }
  `],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    SearchComponent,
    FavoritesListComponent,
    CurrentWeatherComponent,
    ForecastComponent,
    ErrorDisplayComponent,
    LoadingComponent,
    ApiKeySetupComponent
  ]
})
export class App {
  private readonly weatherService = inject(WeatherService);
  private readonly snackBar = inject(MatSnackBar);

  // State signals
  hasApiKey = signal(false);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  currentWeather = signal<WeatherData | null>(null);
  forecast = signal<ForecastData[] | null>(null);

  constructor() {
    // Check if API key exists in localStorage
    const savedApiKey = localStorage.getItem('weather-app-api-key');
    if (savedApiKey) {
      this.weatherService.setApiKey(savedApiKey);
      this.hasApiKey.set(true);
    }

    // Subscribe to weather service state
    this.weatherService.loading$.subscribe(loading => {
      this.isLoading.set(loading);
    });

    this.weatherService.error$.subscribe(error => {
      this.errorMessage.set(error);
    });
  }

  onApiKeySubmitted(apiKey: string): void {
    try {
      localStorage.setItem('weather-app-api-key', apiKey);
      this.weatherService.setApiKey(apiKey);
      this.hasApiKey.set(true);

      this.snackBar.open('API key saved successfully!', 'Close', {
        duration: 3000,
        verticalPosition: 'top'
      });
    } catch (error) {
      this.snackBar.open('Failed to save API key', 'Close', {
        duration: 3000,
        verticalPosition: 'top'
      });
    }
  }

  onCitySearch(cityName: string): void {
    this.errorMessage.set(null);
    this.currentWeather.set(null);
    this.forecast.set(null);

    this.weatherService.getWeatherData(cityName).subscribe({
      next: ({ weather, forecast }) => {
        this.currentWeather.set(weather);
        this.forecast.set(forecast);

        this.snackBar.open(`Weather data loaded for ${weather.cityName}`, 'Close', {
          duration: 2000,
          verticalPosition: 'top'
        });
      },
      error: () => {
        // Error handling is done in the service
      }
    });
  }

  onFavoriteCitySelected(cityName: string): void {
    // Use the same method as regular city search
    this.onCitySearch(cityName);
  }

  clearApiKey(): void {
    localStorage.removeItem('weather-app-api-key');
    this.hasApiKey.set(false);
    this.currentWeather.set(null);
    this.forecast.set(null);
    this.errorMessage.set(null);
    this.weatherService.clearCache();

    this.snackBar.open('API key cleared', 'Close', {
      duration: 2000,
      verticalPosition: 'top'
    });
  }
}
