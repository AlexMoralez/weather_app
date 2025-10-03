import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WeatherData } from '../../models/weather.model';
import { FavoritesService } from '../../services/favorites.service';
import { formatTimestamp, getWeatherIconUrl } from '../../utils/weather.utils';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.scss',

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

  readonly weatherData = input<WeatherData | null>(null);

  // Convert favorites to signal for reactivity
  private readonly favoritesList = toSignal(this.favoritesService.favorites$, { initialValue: [] });

  // Computed properties for better performance
  readonly isFavorite = computed(() => {
    const weather = this.weatherData();
    const favorites = this.favoritesList();

    if (!weather) return false;

    return favorites.some(fav =>
      fav.toLowerCase() === weather.cityName.toLowerCase()
    );
  });

  // Utility functions (imported from utils)
  getWeatherIconUrl = getWeatherIconUrl;
  formatTimestamp = formatTimestamp;

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
