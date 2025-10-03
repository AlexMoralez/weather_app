import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, output, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WeatherData } from '../../models/weather.model';
import { FavoritesService } from '../../services/favorites.service';
import { WeatherService } from '../../services/weather.service';
import { createErrorState, createLoadingState, createSuccessState, WeatherStateItem } from '../../utils/state.utils';
import { capitalizeWords, getWeatherIconUrl } from '../../utils/weather.utils';

interface FavoriteWeatherState {
  cityName: string;
  state: WeatherStateItem<WeatherData>;
}

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrl: './favorites-list.component.scss',

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

  // Signal-based state management
  favorites = signal<FavoriteWeatherState[]>([]);
  isRefreshing = signal(false);

  // Convert favorites service observable to signal for reactivity
  favoritesCities = toSignal(this.favoritesService.favorites$, { initialValue: [] });

  // Computed properties for reactive UI state
  hasNoFavorites = computed(() => this.favorites().length === 0);
  allLoaded = computed(() =>
    this.favorites().every(fav => !fav.state.loading)
  );

  // Output events
  citySelected = output<string>();

  constructor() {
    // Watch for favorites changes and load weather data
    effect(() => {
      const cities = this.favoritesCities();
      this.loadFavoritesWithWeather(cities);
    });
  }

  private loadFavoritesWithWeather(favoritesCities: string[]): void {
    // Initialize favorites list with loading states
    const initialStates: FavoriteWeatherState[] = favoritesCities.map(city => ({
      cityName: city,
      state: createLoadingState<WeatherData>()
    }));

    this.favorites.set(initialStates);

    // Load weather data for each favorite
    favoritesCities.forEach((city, index) => {
      this.weatherService.getWeatherData(city).subscribe({
        next: ({ weather }) => {
          this.favorites.update(current => {
            const updated = [...current];
            updated[index] = {
              cityName: city,
              state: createSuccessState(weather)
            };
            return updated;
          });
        },
        error: () => {
          this.favorites.update(current => {
            const updated = [...current];
            updated[index] = {
              cityName: city,
              state: createErrorState('Failed to load weather data')
            };
            return updated;
          });
        }
      });
    });
  }

  loadWeatherData(cityName: string): void {
    this.favorites.update(current =>
      current.map(fav =>
        fav.cityName === cityName
          ? { ...fav, state: createLoadingState<WeatherData>() }
          : fav
      )
    );

    this.weatherService.getWeatherData(cityName).subscribe({
      next: ({ weather }) => {
        this.favorites.update(current =>
          current.map(fav =>
            fav.cityName === cityName
              ? { ...fav, state: createSuccessState(weather) }
              : fav
          )
        );
      },
      error: () => {
        this.favorites.update(current =>
          current.map(fav =>
            fav.cityName === cityName
              ? { ...fav, state: createErrorState('Failed to load weather data') }
              : fav
          )
        );
      }
    });
  }

  refreshAllFavorites(): void {
    if (this.isRefreshing()) return;

    this.isRefreshing.set(true);
    const cities = this.favoritesCities();
    this.loadFavoritesWithWeather(cities);

    // Reset refreshing state after animation completes
    setTimeout(() => this.isRefreshing.set(false), 1000);
  }

  removeFavorite(cityName: string): void {
    this.favoritesService.removeFavorite(cityName);
  }

  selectCity(cityName: string): void {
    this.citySelected.emit(cityName);
  }

  getWeatherIconUrl(iconCode: string): string {
    return getWeatherIconUrl(iconCode);
  }

  capitalizeText(text: string): string {
    return capitalizeWords(text);
  }
}
