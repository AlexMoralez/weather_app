import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, output, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';

import { CitiesService } from '../../services/cities.service';
import { FavoritesService } from '../../services/favorites.service';
import { filterBySearchTerm, limit, uniqueBy } from '../../utils/array.utils';
import { cityNameValidator } from '../../utils/form.utils';

interface AutocompleteOption {
  city: string;
  isFromCities: boolean;
  country?: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatTooltipModule
  ]
})
export class SearchComponent {
  private readonly favoritesService = inject(FavoritesService);
  private readonly citiesService = inject(CitiesService);

  // Form control with enhanced validation
  readonly searchControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    cityNameValidator
  ]);

  // Convert form control value changes to signal
  private readonly searchValue = toSignal(
    this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged()
    ),
    { initialValue: '' }
  );

  // State signals
  readonly favorites = signal<string[]>([]);
  readonly isSearching = signal(false);

  // Computed filtered options
  readonly filteredOptions = computed(() => {
    const searchTerm = this.searchValue();

    if (!searchTerm || searchTerm.length < 2) {
      return [];
    }

    const results: AutocompleteOption[] = [];

    // Add favorites first (higher priority)
    const favoriteMatches = filterBySearchTerm(
      this.favorites(),
      searchTerm,
      (fav) => fav
    ).map(fav => ({
      city: fav,
      isFromCities: false
    }));

    results.push(...favoriteMatches);

    // Add cities from service
    const cityResults = this.citiesService.searchCities(searchTerm, 15);
    const cityOptions = cityResults
      .filter(cityData => !this.isFavorite(cityData.name))
      .map(cityData => ({
        city: cityData.name,
        isFromCities: true,
        country: cityData.country
      }));

    results.push(...cityOptions);

    // Remove duplicates and limit results
    return limit(
      uniqueBy(results, option => option.city.toLowerCase()),
      10
    );
  });

  // Outputs
  readonly citySearch = output<string>();

  constructor() {
    // Effect to sync with favorites service
    effect(() => {
      const favoritesSubscription = this.favoritesService.favorites$.subscribe(favorites => {
        this.favorites.set(favorites);
      });

      return () => favoritesSubscription.unsubscribe();
    });
  }

  onSearch(): void {
    if (this.searchControl.valid && this.searchControl.value) {
      const cityName = this.searchControl.value.trim();
      if (cityName) {
        this.isSearching.set(true);
        this.citySearch.emit(cityName);

        // Reset search state after a delay
        setTimeout(() => this.isSearching.set(false), 1000);
      }
    }
  }

  onFavoriteSelected(cityName: string): void {
    this.searchControl.setValue(cityName);
    this.onSearch();
  }

  removeFavorite(event: Event, cityName: string): void {
    event.stopPropagation();
    this.favoritesService.removeFavorite(cityName);
  }

  addToFavorites(event: Event, cityName: string): void {
    event.stopPropagation();
    this.favoritesService.addFavorite(cityName);
  }

  isFavorite(cityName: string): boolean {
    return this.favorites().some(fav =>
      fav.toLowerCase() === cityName.toLowerCase()
    );
  }
}
