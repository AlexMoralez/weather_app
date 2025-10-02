import { Injectable } from '@angular/core';

export interface City {
  name: string;
  country: string;
  state?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  private readonly cities: City[] = [
    // Major world cities
    { name: 'London', country: 'GB' },
    { name: 'New York', country: 'US', state: 'NY' },
    { name: 'Tokyo', country: 'JP' },
    { name: 'Paris', country: 'FR' },
    { name: 'Sydney', country: 'AU' },
    { name: 'Berlin', country: 'DE' },
    { name: 'Moscow', country: 'RU' },
    { name: 'Barcelona', country: 'ES' },
    { name: 'Rome', country: 'IT' },
    { name: 'Amsterdam', country: 'NL' },
    { name: 'Toronto', country: 'CA' },
    { name: 'Vancouver', country: 'CA' },
    { name: 'Los Angeles', country: 'US', state: 'CA' },
    { name: 'Chicago', country: 'US', state: 'IL' },
    { name: 'Dubai', country: 'AE' },
    { name: 'Singapore', country: 'SG' },
    { name: 'Mumbai', country: 'IN' },
    { name: 'Delhi', country: 'IN' },
    { name: 'Seoul', country: 'KR' },
    { name: 'Bangkok', country: 'TH' },
    { name: 'Madrid', country: 'ES' },
    { name: 'Vienna', country: 'AT' },
    { name: 'Prague', country: 'CZ' },
    { name: 'Budapest', country: 'HU' },
    { name: 'Warsaw', country: 'PL' },
    { name: 'Stockholm', country: 'SE' },
    { name: 'Oslo', country: 'NO' },
    { name: 'Helsinki', country: 'FI' },
    { name: 'Copenhagen', country: 'DK' },
    { name: 'Zurich', country: 'CH' },
    { name: 'Geneva', country: 'CH' },
    { name: 'Brussels', country: 'BE' },
    { name: 'Athens', country: 'GR' },
    { name: 'Istanbul', country: 'TR' },
    { name: 'Cairo', country: 'EG' },
    { name: 'Cape Town', country: 'ZA' },
    { name: 'Johannesburg', country: 'ZA' },
    { name: 'Nairobi', country: 'KE' },

    // US Cities
    { name: 'San Francisco', country: 'US', state: 'CA' },
    { name: 'Las Vegas', country: 'US', state: 'NV' },
    { name: 'Miami', country: 'US', state: 'FL' },
    { name: 'Boston', country: 'US', state: 'MA' },
    { name: 'Seattle', country: 'US', state: 'WA' },
    { name: 'Denver', country: 'US', state: 'CO' },
    { name: 'Phoenix', country: 'US', state: 'AZ' },
    { name: 'Houston', country: 'US', state: 'TX' },
    { name: 'Dallas', country: 'US', state: 'TX' },
    { name: 'Austin', country: 'US', state: 'TX' },
    { name: 'Atlanta', country: 'US', state: 'GA' },
    { name: 'Philadelphia', country: 'US', state: 'PA' },
    { name: 'Washington', country: 'US', state: 'DC' },
    { name: 'Portland', country: 'US', state: 'OR' },
    { name: 'San Diego', country: 'US', state: 'CA' },

    // European Cities
    { name: 'Lisbon', country: 'PT' },
    { name: 'Porto', country: 'PT' },
    { name: 'Valencia', country: 'ES' },
    { name: 'Seville', country: 'ES' },
    { name: 'Milan', country: 'IT' },
    { name: 'Naples', country: 'IT' },
    { name: 'Florence', country: 'IT' },
    { name: 'Venice', country: 'IT' },
    { name: 'Munich', country: 'DE' },
    { name: 'Hamburg', country: 'DE' },
    { name: 'Cologne', country: 'DE' },
    { name: 'Frankfurt', country: 'DE' },
    { name: 'Lyon', country: 'FR' },
    { name: 'Marseille', country: 'FR' },
    { name: 'Nice', country: 'FR' },
    { name: 'Bordeaux', country: 'FR' },
    { name: 'Manchester', country: 'GB' },
    { name: 'Birmingham', country: 'GB' },
    { name: 'Edinburgh', country: 'GB' },
    { name: 'Glasgow', country: 'GB' },
    { name: 'Dublin', country: 'IE' },
    { name: 'Cork', country: 'IE' },

    // Asian Cities
    { name: 'Shanghai', country: 'CN' },
    { name: 'Beijing', country: 'CN' },
    { name: 'Hong Kong', country: 'HK' },
    { name: 'Taipei', country: 'TW' },
    { name: 'Osaka', country: 'JP' },
    { name: 'Kyoto', country: 'JP' },
    { name: 'Busan', country: 'KR' },
    { name: 'Kuala Lumpur', country: 'MY' },
    { name: 'Jakarta', country: 'ID' },
    { name: 'Manila', country: 'PH' },
    { name: 'Ho Chi Minh City', country: 'VN' },
    { name: 'Hanoi', country: 'VN' },
    { name: 'Bangalore', country: 'IN' },
    { name: 'Chennai', country: 'IN' },
    { name: 'Kolkata', country: 'IN' },
    { name: 'Hyderabad', country: 'IN' },
    { name: 'Pune', country: 'IN' },

    // Canadian Cities
    { name: 'Montreal', country: 'CA' },
    { name: 'Calgary', country: 'CA' },
    { name: 'Edmonton', country: 'CA' },
    { name: 'Ottawa', country: 'CA' },
    { name: 'Winnipeg', country: 'CA' },
    { name: 'Quebec City', country: 'CA' },

    // Australian Cities
    { name: 'Melbourne', country: 'AU' },
    { name: 'Brisbane', country: 'AU' },
    { name: 'Perth', country: 'AU' },
    { name: 'Adelaide', country: 'AU' },
    { name: 'Auckland', country: 'NZ' },
    { name: 'Wellington', country: 'NZ' },

    // South American Cities
    { name: 'São Paulo', country: 'BR' },
    { name: 'Rio de Janeiro', country: 'BR' },
    { name: 'Buenos Aires', country: 'AR' },
    { name: 'Santiago', country: 'CL' },
    { name: 'Lima', country: 'PE' },
    { name: 'Bogotá', country: 'CO' },
    { name: 'Caracas', country: 'VE' },
    { name: 'Quito', country: 'EC' },

    // Middle East & Africa
    { name: 'Tel Aviv', country: 'IL' },
    { name: 'Jerusalem', country: 'IL' },
    { name: 'Riyadh', country: 'SA' },
    { name: 'Doha', country: 'QA' },
    { name: 'Kuwait City', country: 'KW' },
    { name: 'Abu Dhabi', country: 'AE' },
    { name: 'Casablanca', country: 'MA' },
    { name: 'Marrakech', country: 'MA' },
    { name: 'Tunis', country: 'TN' },
    { name: 'Algiers', country: 'DZ' },
    { name: 'Lagos', country: 'NG' },
    { name: 'Accra', country: 'GH' },
    { name: 'Addis Ababa', country: 'ET' }
  ];

  searchCities(query: string, limit: number = 10): City[] {
    if (!query || query.length < 2) {
      return [];
    }

    const searchTerm = query.toLowerCase();
    return this.cities
      .filter(city =>
        city.name.toLowerCase().includes(searchTerm) ||
        city.country.toLowerCase().includes(searchTerm) ||
        (city.state && city.state.toLowerCase().includes(searchTerm))
      )
      .slice(0, limit);
  }

  getAllCities(): City[] {
    return [...this.cities];
  }

  formatCityName(city: City): string {
    if (city.state) {
      return `${city.name}, ${city.state}, ${city.country}`;
    }
    return `${city.name}, ${city.country}`;
  }
}
