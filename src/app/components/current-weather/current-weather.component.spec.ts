import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { WeatherData } from '../../models/weather.model';
import { FavoritesService } from '../../services/favorites.service';
import { CurrentWeatherComponent } from './current-weather.component';

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent;
  let fixture: ComponentFixture<CurrentWeatherComponent>;
  let favoritesService: jasmine.SpyObj<FavoritesService>;

  const mockWeatherData: WeatherData = {
    cityName: 'London',
    country: 'GB',
    temperature: 15,
    description: 'clear sky',
    icon: '01d',
    humidity: 65,
    windSpeed: 3.5,
    feelsLike: 14,
    timestamp: Date.now()
  };

  beforeEach(async () => {
    const favoritesServiceSpy = jasmine.createSpyObj('FavoritesService', [
      'addFavorite',
      'removeFavorite'
    ], {
      favorites$: of(['Paris', 'Tokyo'])
    });

    await TestBed.configureTestingModule({
      imports: [
        CurrentWeatherComponent,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: FavoritesService, useValue: favoritesServiceSpy }
      ]
    }).compileComponents();

    favoritesService = TestBed.inject(FavoritesService) as jasmine.SpyObj<FavoritesService>;
    fixture = TestBed.createComponent(CurrentWeatherComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show weather data when provided', () => {
    fixture.componentRef.setInput('weatherData', mockWeatherData);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('London');
    expect(compiled.textContent).toContain('15°C');
  });

  it('should show not favorite icon when city is not in favorites', () => {
    fixture.componentRef.setInput('weatherData', mockWeatherData);
    fixture.detectChanges();

    expect(component.isFavorite()).toBe(false);
  });

  it('should show favorite icon when city is in favorites', () => {
    // Update the spy to include London
    Object.defineProperty(favoritesService, 'favorites$', {
      value: of(['London', 'Paris'])
    });

    fixture = TestBed.createComponent(CurrentWeatherComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('weatherData', mockWeatherData);
    fixture.detectChanges();

    expect(component.isFavorite()).toBe(true);
  });

  it('should toggle favorite status', () => {
    fixture.componentRef.setInput('weatherData', mockWeatherData);
    fixture.detectChanges();

    component.toggleFavorite();

    expect(favoritesService.addFavorite).toHaveBeenCalledWith('London');
  });

  it('should not show weather when no data provided', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    // Angular may include comments, so check for actual content
    expect(compiled.textContent?.trim()).toBe('');
    expect(compiled.querySelector('.weather-card')).toBeFalsy();
  });
});
