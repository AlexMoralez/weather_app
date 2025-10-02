import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly STORAGE_KEY = 'weather-app-favorites';
  private favoritesSubject = new BehaviorSubject<string[]>(this.loadFavorites());

  public favorites$ = this.favoritesSubject.asObservable();

  private loadFavorites(): string[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  private saveFavorites(favorites: string[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
      this.favoritesSubject.next(favorites);
    } catch (error) {
      console.error('Failed to save favorites:', error);
    }
  }

  addFavorite(cityName: string): void {
    const currentFavorites = this.favoritesSubject.value;
    const normalizedCity = cityName.toLowerCase();

    if (!currentFavorites.some(city => city.toLowerCase() === normalizedCity)) {
      const newFavorites = [...currentFavorites, cityName];
      this.saveFavorites(newFavorites);
    }
  }

  removeFavorite(cityName: string): void {
    const currentFavorites = this.favoritesSubject.value;
    const normalizedCity = cityName.toLowerCase();

    const newFavorites = currentFavorites.filter(
      city => city.toLowerCase() !== normalizedCity
    );

    if (newFavorites.length !== currentFavorites.length) {
      this.saveFavorites(newFavorites);
    }
  }

  isFavorite(cityName: string): boolean {
    const normalizedCity = cityName.toLowerCase();
    return this.favoritesSubject.value.some(
      city => city.toLowerCase() === normalizedCity
    );
  }

  getFavorites(): string[] {
    return this.favoritesSubject.value;
  }

  clearFavorites(): void {
    this.saveFavorites([]);
  }
}
