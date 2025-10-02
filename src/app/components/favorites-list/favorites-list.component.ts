import { CommonModule } from '@angular/common';
import { Component, inject, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WeatherData } from '../../models/weather.model';
import { FavoritesService } from '../../services/favorites.service';
import { WeatherService } from '../../services/weather.service';

interface FavoriteWeatherData {
  cityName: string;
  weather?: WeatherData;
  loading: boolean;
  error?: string;
}

@Component({
  selector: 'app-favorites-list',
  template: `
    @if (favorites().length > 0) {
      <div class="favorites-container">
        <div class="favorites-header">
          <h3>
            <mat-icon>favorite</mat-icon>
            Favorite Cities
          </h3>
          <button
            mat-icon-button
            (click)="refreshAllFavorites()"
            [disabled]="isRefreshing()"
            matTooltip="Refresh all favorites"
          >
            <mat-icon [class.spinning]="isRefreshing()">refresh</mat-icon>
          </button>
        </div>

        <div class="favorites-grid">
          @for (favorite of favoriteWeatherData(); track favorite.cityName) {
            <mat-card class="favorite-card" [class.loading]="favorite.loading">
              <mat-card-content>
                <div class="card-header">
                  <h4 class="city-name" (click)="selectCity(favorite.cityName)">
                    {{ favorite.cityName }}
                  </h4>
                  <button
                    mat-icon-button
                    (click)="removeFavorite(favorite.cityName)"
                    matTooltip="Remove from favorites"
                    class="remove-btn"
                  >
                    <mat-icon>close</mat-icon>
                  </button>
                </div>

                @if (favorite.loading) {
                  <div class="loading-content">
                    <mat-spinner diameter="30"></mat-spinner>
                    <span>Loading...</span>
                  </div>
                } @else if (favorite.error) {
                  <div class="error-content">
                    <mat-icon>error_outline</mat-icon>
                    <span>{{ favorite.error }}</span>
                  </div>
                } @else if (favorite.weather) {
                  <div class="weather-content" (click)="selectCity(favorite.cityName)">
                    <div class="temperature">
                      {{ favorite.weather.temperature }}°C
                    </div>
                    <div class="weather-info">
                      <img
                        [src]="getWeatherIconUrl(favorite.weather.icon)"
                        [alt]="favorite.weather.description"
                        class="weather-icon"
                      />
                      <div class="description">
                        {{ favorite.weather.description | titlecase }}
                      </div>
                    </div>
                  </div>
                } @else {
                  <div class="placeholder-content" (click)="loadWeatherData(favorite.cityName)">
                    <mat-icon>wb_sunny</mat-icon>
                    <span>Click to load weather</span>
                  </div>
                }
              </mat-card-content>
            </mat-card>
          }
        </div>
      </div>
    } @else {
      <div class="no-favorites">
        <mat-icon>favorite_border</mat-icon>
        <p>No favorite cities yet</p>
        <p class="hint">Search for a city and click the heart icon to add it to favorites</p>
        <div class="help-steps">
          <div class="step">
            <mat-icon>search</mat-icon>
            <span>1. Search for a city</span>
          </div>
          <div class="step">
            <mat-icon>favorite_border</mat-icon>
            <span>2. Click the heart to favorite</span>
          </div>
          <div class="step">
            <mat-icon>dashboard</mat-icon>
            <span>3. See it appear here</span>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .favorites-container {
      margin: 32px 0;
      max-width: 1200px;
      margin: 32px auto;
      padding: 0 16px;
    }

    .favorites-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
      padding: 0 4px;
    }

    .favorites-header h3 {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0;
      font-size: 20px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.87);
    }

    .favorites-header mat-icon {
      color: var(--color-secondary, #528ab4);
    }

    .spinning {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .favorites-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      padding: 4px;
    }

    .favorite-card {
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      border-radius: 16px;
      padding: 4px;
    }

    .favorite-card:hover:not(.loading) {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0,0,0,0.15);
    }

    .card-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 16px;
      padding: 4px 0;
    }

    .city-name {
      margin: 0;
      font-size: 18px;
      font-weight: 500;
      color: var(--color-primary-dark, #15719f);
      flex: 1;
      cursor: pointer;
    }

    .city-name:hover {
      text-decoration: underline;
    }

    .remove-btn {
      color: rgba(0, 0, 0, 0.54);
      width: 32px;
      height: 32px;
      line-height: 32px;
    }

    .remove-btn:hover {
      color: #f44336;
      background-color: rgba(244, 67, 54, 0.1);
    }

    .weather-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 0;
    }

    .temperature {
      font-size: 32px;
      font-weight: 300;
      color: var(--color-primary-dark, #15719f);
    }

    .weather-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .weather-icon {
      width: 50px;
      height: 50px;
    }

    .description {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.7);
      margin-top: 4px;
    }

    .loading-content,
    .error-content,
    .placeholder-content {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 20px;
      text-align: center;
    }

    .loading-content span,
    .placeholder-content span {
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
    }

    .error-content {
      color: #f44336;
    }

    .error-content mat-icon {
      color: #f44336;
    }

    .placeholder-content {
      color: rgba(0, 0, 0, 0.6);
      cursor: pointer;
    }

    .placeholder-content:hover {
      color: var(--color-primary-dark, #15719f);
      background-color: rgba(21, 113, 159, 0.05);
      border-radius: 8px;
    }

    .no-favorites {
      text-align: center;
      padding: 40px 20px;
      color: rgba(0, 0, 0, 0.6);
    }

    .no-favorites mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: 16px;
      opacity: 0.5;
    }

    .no-favorites p {
      margin: 8px 0;
    }

    .hint {
      font-size: 14px;
      font-style: italic;
      margin-bottom: 20px;
    }

    .help-steps {
      display: flex;
      justify-content: center;
      gap: 24px;
      flex-wrap: wrap;
    }

    .step {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 16px;
      border-radius: 12px;
      background-color: rgba(255, 255, 255, 0.05);
      min-width: 120px;
    }

    .step mat-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
      color: var(--color-primary, #62a1c7);
    }

    .step span {
      font-size: 12px;
      text-align: center;
    }

    @media (max-width: 768px) {
      .favorites-grid {
        grid-template-columns: 1fr;
        gap: 12px;
      }

      .favorite-card {
        margin: 0 8px;
      }

      .temperature {
        font-size: 28px;
      }

      .weather-icon {
        width: 40px;
        height: 40px;
      }
    }
  `],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ]
})
export class FavoritesListComponent {
  private readonly favoritesService = inject(FavoritesService);
  private readonly weatherService = inject(WeatherService);

  favorites = signal<string[]>([]);
  favoriteWeatherData = signal<FavoriteWeatherData[]>([]);
  isRefreshing = signal(false);

  // Output
  citySelected = output<string>();

  constructor() {
    // Subscribe to favorites changes
    this.favoritesService.favorites$.subscribe(favorites => {
      this.favorites.set(favorites);
      this.updateFavoriteWeatherData(favorites);
    });
  }

  private updateFavoriteWeatherData(favorites: string[]): void {
    const currentData = this.favoriteWeatherData();
    const newData: FavoriteWeatherData[] = favorites.map(city => {
      // Find existing data or create new
      const existing = currentData.find(f => f.cityName === city);
      return existing || {
        cityName: city,
        loading: false
      };
    });

    this.favoriteWeatherData.set(newData);
  }

  loadWeatherData(cityName: string): void {
    const currentData = this.favoriteWeatherData();
    const updatedData = currentData.map(fav =>
      fav.cityName === cityName
        ? { ...fav, loading: true, error: undefined }
        : fav
    );
    this.favoriteWeatherData.set(updatedData);

    this.weatherService.getWeatherData(cityName).subscribe({
      next: ({ weather }) => {
        const currentData = this.favoriteWeatherData();
        const updatedData = currentData.map(fav =>
          fav.cityName === cityName
            ? { ...fav, weather, loading: false, error: undefined }
            : fav
        );
        this.favoriteWeatherData.set(updatedData);
      },
      error: (error) => {
        const currentData = this.favoriteWeatherData();
        const updatedData = currentData.map(fav =>
          fav.cityName === cityName
            ? { ...fav, loading: false, error: 'Failed to load' }
            : fav
        );
        this.favoriteWeatherData.set(updatedData);
      }
    });
  }

  refreshAllFavorites(): void {
    if (this.isRefreshing()) return;

    this.isRefreshing.set(true);
    const favorites = this.favorites();

    favorites.forEach(city => {
      this.loadWeatherData(city);
    });

    // Reset refreshing state after a delay
    setTimeout(() => this.isRefreshing.set(false), 2000);
  }

  removeFavorite(cityName: string): void {
    this.favoritesService.removeFavorite(cityName);
  }

  selectCity(cityName: string): void {
    this.citySelected.emit(cityName);
  }

  getWeatherIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }
}
