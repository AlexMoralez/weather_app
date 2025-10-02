import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {
  CachedWeatherData,
  ForecastData,
  ForecastItem,
  ForecastResponse,
  WeatherData,
  WeatherResponse
} from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly http = inject(HttpClient);
  private readonly API_KEY = ''; // Will be set from environment or user input
  private readonly BASE_URL = 'https://api.openweathermap.org/data/2.5';
  private readonly CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

  private weatherCache = new Map<string, CachedWeatherData>();
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  public loading$ = this.loadingSubject.asObservable();
  public error$ = this.errorSubject.asObservable();

  setApiKey(apiKey: string): void {
    (this as any).API_KEY = apiKey.trim();
    console.log('API Key set, length:', apiKey.trim().length);
  }

  getWeatherData(cityName: string): Observable<{ weather: WeatherData; forecast: ForecastData[] }> {
    if (!this.API_KEY) {
      return throwError(() => new Error('API key is required. Please set your OpenWeatherMap API key.'));
    }

    const cacheKey = cityName.toLowerCase();
    const cached = this.weatherCache.get(cacheKey);

    // Return cached data if it's still fresh
    if (cached && (Date.now() - cached.timestamp) < this.CACHE_DURATION) {
      this.loadingSubject.next(false);
      this.errorSubject.next(null);
      return new Observable(observer => {
        observer.next({ weather: cached.weather, forecast: cached.forecast });
        observer.complete();
      });
    }

    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    const currentWeather$ = this.getCurrentWeather(cityName);
    const forecast$ = this.getForecast(cityName);

    return forkJoin({
      current: currentWeather$,
      forecast: forecast$
    }).pipe(
      map(({ current, forecast }) => {
        const weather = this.transformWeatherData(current);
        const forecastData = this.transformForecastData(forecast);

        // Cache the data
        this.weatherCache.set(cacheKey, {
          weather,
          forecast: forecastData,
          timestamp: Date.now()
        });

        return { weather, forecast: forecastData };
      }),
      tap(() => this.loadingSubject.next(false)),
      catchError(error => {
        this.loadingSubject.next(false);
        const errorMessage = this.getErrorMessage(error);
        this.errorSubject.next(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  private getCurrentWeather(cityName: string): Observable<WeatherResponse> {
    const url = `${this.BASE_URL}/weather?q=${encodeURIComponent(cityName)}&appid=${this.API_KEY}&units=metric`;
    console.log('Making API request to:', url.replace(this.API_KEY, '[API_KEY_HIDDEN]'));
    return this.http.get<WeatherResponse>(url);
  }

  private getForecast(cityName: string): Observable<ForecastResponse> {
    const url = `${this.BASE_URL}/forecast?q=${encodeURIComponent(cityName)}&appid=${this.API_KEY}&units=metric`;
    return this.http.get<ForecastResponse>(url);
  }

  private transformWeatherData(response: WeatherResponse): WeatherData {
    return {
      cityName: response.name,
      country: response.sys.country,
      temperature: Math.round(response.main.temp),
      description: response.weather[0].description,
      icon: response.weather[0].icon,
      humidity: response.main.humidity,
      windSpeed: response.wind.speed,
      feelsLike: Math.round(response.main.feels_like),
      timestamp: response.dt * 1000
    };
  }

  private transformForecastData(response: ForecastResponse): ForecastData[] {
    // Group forecast items by date and get daily min/max
    const dailyForecast = new Map<string, ForecastItem[]>();

    response.list.forEach(item => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!dailyForecast.has(date)) {
        dailyForecast.set(date, []);
      }
      dailyForecast.get(date)!.push(item);
    });

    const forecastData: ForecastData[] = [];
    let dayCount = 0;

    for (const [date, items] of dailyForecast) {
      if (dayCount >= 5) break; // Limit to 5 days

      const temps = items.map(item => item.main.temp);
      const tempHigh = Math.round(Math.max(...temps));
      const tempLow = Math.round(Math.min(...temps));

      // Use the weather condition from the middle of the day (around noon)
      const middleItem = items[Math.floor(items.length / 2)] || items[0];

      forecastData.push({
        date: new Date(date).toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        }),
        tempHigh,
        tempLow,
        description: middleItem.weather[0].description,
        icon: middleItem.weather[0].icon,
        humidity: middleItem.main.humidity
      });

      dayCount++;
    }

    return forecastData;
  }

  private getErrorMessage(error: any): string {
    console.error('API Error:', error);

    if (error.status === 404) {
      return 'City not found. Please check the city name and try again.';
    } else if (error.status === 401) {
      return `Invalid API key. Please check your OpenWeatherMap API key.
        Make sure it's activated (can take up to 2 hours for new keys).
        Error details: ${error.error?.message || 'Unauthorized'}`;
    } else if (error.status === 429) {
      return 'Too many requests. Please wait a moment and try again.';
    } else if (error.status === 0) {
      return 'Network error. Please check your internet connection.';
    } else {
      return `An error occurred while fetching weather data. Status: ${error.status}. Please try again.`;
    }
  }

  clearCache(): void {
    this.weatherCache.clear();
  }

  getCachedCities(): string[] {
    return Array.from(this.weatherCache.keys());
  }
}
