import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ForecastResponse, WeatherResponse } from '../models/weather.model';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  const mockWeatherResponse: WeatherResponse = {
    coord: { lon: -0.1257, lat: 51.5085 },
    weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
    base: 'stations',
    main: {
      temp: 15,
      feels_like: 14,
      temp_min: 12,
      temp_max: 18,
      pressure: 1013,
      humidity: 65
    },
    visibility: 10000,
    wind: { speed: 3.5, deg: 230 },
    clouds: { all: 0 },
    dt: 1609459200,
    sys: { type: 2, id: 2019646, country: 'GB', sunrise: 1609399200, sunset: 1609430400 },
    timezone: 0,
    id: 2643743,
    name: 'London',
    cod: 200
  };

  const mockForecastResponse: ForecastResponse = {
    cod: '200',
    message: 0,
    cnt: 40,
    list: [
      {
        dt: 1609459200,
        main: {
          temp: 15,
          feels_like: 14,
          temp_min: 12,
          temp_max: 18,
          pressure: 1013,
          humidity: 65
        },
        weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
        clouds: { all: 0 },
        wind: { speed: 3.5, deg: 230 },
        visibility: 10000,
        pop: 0,
        sys: { pod: 'd' },
        dt_txt: '2021-01-01 12:00:00'
      }
    ],
    city: {
      id: 2643743,
      name: 'London',
      coord: { lon: -0.1257, lat: 51.5085 },
      country: 'GB',
      population: 1000000,
      timezone: 0,
      sunrise: 1609399200,
      sunset: 1609430400
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set API key', () => {
    const apiKey = 'test-api-key';
    service.setApiKey(apiKey);
    expect((service as any).API_KEY).toBe(apiKey);
  });

  it('should throw error when no API key is set', (done) => {
    service.getWeatherData('London').subscribe({
      error: (error) => {
        expect(error.message).toContain('API key is required');
        done();
      }
    });
  });

  it('should fetch weather data successfully', (done) => {
    service.setApiKey('test-api-key');

    service.getWeatherData('London').subscribe({
      next: (result) => {
        expect(result.weather.cityName).toBe('London');
        expect(result.weather.temperature).toBe(15);
        expect(result.forecast).toBeDefined();
        done();
      }
    });

    const currentWeatherReq = httpMock.expectOne(req =>
      req.url.includes('/weather') && req.url.includes('q=London')
    );
    expect(currentWeatherReq.request.method).toBe('GET');
    currentWeatherReq.flush(mockWeatherResponse);

    const forecastReq = httpMock.expectOne(req =>
      req.url.includes('/forecast') && req.url.includes('q=London')
    );
    expect(forecastReq.request.method).toBe('GET');
    forecastReq.flush(mockForecastResponse);
  });

  it('should handle API errors correctly', (done) => {
    service.setApiKey('test-api-key');

    service.getWeatherData('InvalidCity').subscribe({
      error: (error) => {
        expect(error.message).toContain('City not found');
        done();
      }
    });

    const weatherReq = httpMock.expectOne(req => req.url.includes('/weather'));
    weatherReq.flush({ message: 'city not found' }, { status: 404, statusText: 'Not Found' });

    // Also expect the forecast request and fail it too
    const forecastReq = httpMock.expectOne(req => req.url.includes('/forecast'));
    forecastReq.flush({ message: 'city not found' }, { status: 404, statusText: 'Not Found' });
  });

  it('should cache weather data', (done) => {
    service.setApiKey('test-api-key');

    // First request
    service.getWeatherData('London').subscribe({
      next: (result1) => {
        // Second request (should use cache)
        service.getWeatherData('London').subscribe({
          next: (result2) => {
            expect(result1.weather.cityName).toBe(result2.weather.cityName);
            done();
          }
        });
      }
    });

    // Only expect the first set of HTTP requests
    const currentWeatherReq = httpMock.expectOne(req => req.url.includes('/weather'));
    currentWeatherReq.flush(mockWeatherResponse);

    const forecastReq = httpMock.expectOne(req => req.url.includes('/forecast'));
    forecastReq.flush(mockForecastResponse);
  });

  it('should clear cache', () => {
    service.clearCache();
    expect(service.getCachedCities()).toEqual([]);
  });
});
