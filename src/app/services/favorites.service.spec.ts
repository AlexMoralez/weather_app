import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites.service';

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with empty favorites', () => {
    expect(service.getFavorites()).toEqual([]);
  });

  it('should add a favorite city', () => {
    service.addFavorite('London');
    expect(service.getFavorites()).toContain('London');
    expect(service.isFavorite('London')).toBe(true);
  });

  it('should not add duplicate favorites', () => {
    service.addFavorite('London');
    service.addFavorite('London');
    service.addFavorite('london'); // Different case

    expect(service.getFavorites().length).toBe(1);
  });

  it('should remove a favorite city', () => {
    service.addFavorite('London');
    service.addFavorite('Paris');

    service.removeFavorite('London');

    expect(service.getFavorites()).not.toContain('London');
    expect(service.getFavorites()).toContain('Paris');
    expect(service.isFavorite('London')).toBe(false);
  });

  it('should check if city is favorite (case insensitive)', () => {
    service.addFavorite('London');

    expect(service.isFavorite('london')).toBe(true);
    expect(service.isFavorite('LONDON')).toBe(true);
    expect(service.isFavorite('London')).toBe(true);
    expect(service.isFavorite('Paris')).toBe(false);
  });

  it('should clear all favorites', () => {
    service.addFavorite('London');
    service.addFavorite('Paris');
    service.addFavorite('Tokyo');

    service.clearFavorites();

    expect(service.getFavorites()).toEqual([]);
  });

  it('should persist favorites in localStorage', () => {
    service.addFavorite('London');
    service.addFavorite('Paris');

    // Create new service instance to test persistence
    const newService = new FavoritesService();
    expect(newService.getFavorites()).toEqual(['London', 'Paris']);
  });

  it('should handle localStorage errors gracefully', () => {
    // Mock localStorage to throw an error
    spyOn(localStorage, 'setItem').and.throwError('Storage error');
    spyOn(console, 'error');

    service.addFavorite('London');

    expect(console.error).toHaveBeenCalled();
  });

  it('should emit favorites changes', (done) => {
    service.favorites$.subscribe(favorites => {
      if (favorites.length > 0) {
        expect(favorites).toContain('London');
        done();
      }
    });

    service.addFavorite('London');
  });
});
