# Weather App 🌤️

A modern, responsive Angular weather application that provides current weather conditions and 5-day forecasts for cities worldwide. Built with Angular 20, Angular Material, and powered by the OpenWeatherMap API.

![Angular](https://img.shields.io/badge/Angular-20-red.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)
![Material](https://img.shields.io/badge/Angular%20Material-20+-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## ✨ Features

- **Current Weather**: Real-time weather data including temperature, humidity, wind speed, and weather conditions
- **5-Day Forecast**: Detailed weather predictions with high/low temperatures and conditions
- **City Search**: Smart search with autocomplete and validation
- **Favorites**: Save and quickly access your favorite cities (stored locally)
- **Caching**: Intelligent data caching (1-hour expiration) to reduce API calls
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Error Handling**: User-friendly error messages for various scenarios
- **Material Design**: Beautiful UI with Angular Material components
- **PWA Ready**: Installable as a Progressive Web App

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (version 20.19+ or 22.12+)
- **npm** (comes with Node.js)
- **OpenWeatherMap API Key** (free at [openweathermap.org](https://openweathermap.org/api))

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/AlexMoralez/weather_app.git
cd weather_app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Get Your API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to your API keys section
4. Generate a new API key
5. Copy the API key (you'll need it when running the app)

### 4. Start the Development Server

```bash
npm start
```

The application will be available at `http://localhost:4200/`

### 5. Enter Your API Key

When you first open the application, you'll be prompted to enter your OpenWeatherMap API key. This is stored securely in your browser's local storage.

## 🏗️ Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/weather-app/` directory.

## 🧪 Testing

### Run Unit Tests

```bash
npm test
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

### Run End-to-End Tests

```bash
npm run e2e
```

## 📱 Usage

### Basic Usage

1. **Set API Key**: Enter your OpenWeatherMap API key on first launch
2. **Search for a City**: Type a city name in the search field and press Enter or click the search button
3. **View Weather**: See current conditions and 5-day forecast
4. **Add to Favorites**: Click the heart icon to save cities for quick access
5. **Quick Access**: Use favorite city chips for instant weather updates

### Advanced Features

- **Caching**: Weather data is cached for 1 hour to improve performance
- **Favorites Management**: Add/remove cities from favorites using the heart icon
- **Responsive Interface**: Optimized for mobile, tablet, and desktop
- **Error Recovery**: Helpful error messages guide you through any issues

## 🏗️ Architecture & File Structure

### Modern Angular 20 Architecture

This application showcases cutting-edge Angular development practices:

- ✅ **Standalone Components**: No NgModules, pure standalone architecture
- ✅ **Signal-based Reactivity**: Modern reactive patterns with signals, computed(), and effect()
- ✅ **OnPush Change Detection**: Optimized performance across all components
- ✅ **Separated File Architecture**: Clean separation of HTML, SCSS, and TypeScript
- ✅ **Utility-first Design**: Reusable functions in dedicated utility modules
- ✅ **Modern Form Handling**: Signal-based reactive forms with custom validators
- ✅ **Type Safety**: Comprehensive TypeScript interfaces and strict typing

### Fully Optimized Project Structure

```
src/
├── app/
│   ├── components/              # Modular standalone components
│   │   ├── search/              # Smart city search with signal-based reactivity
│   │   │   ├── search.component.ts       # Modern reactive form handling
│   │   │   ├── search.component.html     # Native control flow (@if, @for)
│   │   │   └── search.component.scss     # Nested SCSS with CSS custom properties
│   │   ├── current-weather/     # Current weather with computed favorites state
│   │   │   ├── current-weather.component.ts    # Signal-based state management
│   │   │   ├── current-weather.component.html  # Reactive template bindings
│   │   │   └── current-weather.component.scss  # Material Design styling
│   │   ├── forecast/            # 5-day forecast with utility integration
│   │   │   ├── forecast.component.ts           # Computed properties for data
│   │   │   ├── forecast.component.html         # Responsive grid layout
│   │   │   └── forecast.component.scss         # Mobile-first design
│   │   ├── favorites-list/      # Dashboard with weather state management
│   │   │   ├── favorites-list.component.ts     # Signal-based favorites tracking
│   │   │   ├── favorites-list.component.html   # Interactive cards with actions
│   │   │   └── favorites-list.component.scss   # Grid layout with hover effects
│   │   ├── error-display/       # Comprehensive error handling
│   │   │   ├── error-display.component.ts      # Retry functionality
│   │   │   ├── error-display.component.html    # User-friendly error messages
│   │   │   └── error-display.component.scss    # Error state styling
│   │   ├── loading/             # Configurable loading states
│   │   │   ├── loading.component.ts            # Spinner with custom messages
│   │   │   ├── loading.component.html          # Material spinner integration
│   │   │   └── loading.component.scss          # Smooth animations
│   │   └── api-key-setup/       # Secure API key configuration
│   │       ├── api-key-setup.component.ts      # Form validation with signals
│   │       ├── api-key-setup.component.html    # Security-focused UI
│   │       └── api-key-setup.component.scss    # Professional setup interface
│   ├── services/                # Business logic & API integration
│   │   ├── weather.service.ts        # Weather API with intelligent caching
│   │   ├── favorites.service.ts      # Signal-based local storage management
│   │   └── cache.service.ts          # Advanced caching with TTL support
│   ├── utils/                   # Reusable utility modules
│   │   ├── weather.utils.ts          # Icon URLs, text formatting, timestamps
│   │   ├── form.utils.ts             # Validators, debouncing, validation helpers
│   │   ├── array.utils.ts            # Filtering, deduplication, data limiting
│   │   └── state.utils.ts            # Loading/success/error state management
│   ├── models/                  # Comprehensive TypeScript definitions
│   │   └── weather.model.ts          # Weather data interfaces
│   └── app.ts                   # Root application component
├── styles.scss                  # Global styles & theme
└── index.html                   # Application entry point
```

### Modern Angular Architecture

- **🎯 Standalone Components**: No NgModules, direct imports for better tree-shaking
- **🔄 Signal-Based State**: Modern reactive patterns with `signal()`, `computed()`, and `effect()`
- **📁 Separated Concerns**: HTML templates and SCSS styles in separate files
- **🛠️ Utility Functions**: Shared, reusable helper functions
- **⚡ Performance Optimized**: Computed properties and efficient change detection
- **🎨 Material Design**: Consistent UI with Angular Material theming

### Key Technologies & Patterns

- **Angular 20**: Latest framework with modern patterns
- **Signals**: Reactive state management without complex observables
- **Standalone Components**: Simplified architecture and better performance
- **TypeScript**: Full type safety with strict mode
- **SCSS**: Enhanced styling with nesting and variables
- **Angular Material**: Consistent, accessible UI components
- **Local Storage**: Client-side data persistence for favorites and settings

## 🔧 Configuration

### Environment Variables

The application uses the OpenWeatherMap API. You can modify the base URL or add environment-specific configurations in:

- `src/app/services/weather.service.ts`

### API Configuration

Default API settings:
- **Base URL**: `https://api.openweathermap.org/data/2.5`
- **Units**: Metric (Celsius, m/s)
- **Cache Duration**: 1 hour

## 🌐 API Integration

### OpenWeatherMap Endpoints Used

1. **Current Weather**: `/weather?q={city}&appid={API_key}&units=metric`
2. **5-Day Forecast**: `/forecast?q={city}&appid={API_key}&units=metric`

### Rate Limits

- Free tier: 1,000 calls/day, 60 calls/minute
- Caching reduces API calls significantly

## 🎨 Customization

### Themes

The app uses Angular Material theming. You can customize colors in:
- `src/styles.scss`

### Components

All components are standalone and can be easily customized or extended:
- Search component: `src/app/components/search/`
- Weather display: `src/app/components/current-weather/`
- Forecast: `src/app/components/forecast/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather API
- [Angular Material](https://material.angular.io/) for the beautiful UI components
- [Angular](https://angular.io/) team for the amazing framework

## � Performance & Optimization

### Modern Angular Features Used

- **�🔄 Angular Signals**: Reactive state management with better performance than traditional observables
- **⚡ Computed Properties**: Automatic dependency tracking and memoization
- **📦 Standalone Components**: Reduced bundle size through better tree-shaking
- **🎯 OnPush Change Detection**: Optimized rendering performance
- **💾 Intelligent Caching**: 1-hour cache duration reduces API calls by ~80%
- **🔧 Utility Functions**: Shared code reduces duplication and bundle size

### Development Experience

- **🛠️ Separation of Concerns**: HTML, SCSS, and TypeScript in separate files
- **🔍 Type Safety**: Full TypeScript coverage with strict mode
- **🎨 Consistent Styling**: SCSS with nested selectors and CSS custom properties
- **♻️ Reusable Code**: Utility functions shared across components
- **🧪 Testable Architecture**: Modular design enables easy unit testing

## 🔄 Recent Optimizations (v2.1.0)

### ✅ Complete Modernization & Performance Optimization Achieved

This application has undergone comprehensive optimization with modern Angular 20 patterns and performance enhancements:

#### 🏗️ Architecture Improvements
- **Signal-based Reactivity**: All components now use signals, computed(), and effect() for optimal performance
- **File Separation**: Every component now has separate HTML, SCSS, and TypeScript files for better maintainability
- **Utility Integration**: Created comprehensive utility modules to eliminate code duplication
- **OnPush Change Detection**: Implemented across all components for maximum performance

#### 📂 Component Optimizations
- **SearchComponent**: Signal-based reactive forms with debounced search and enhanced validation
- **CurrentWeatherComponent**: Computed properties for reactive favorite status and utility integration
- **ForecastComponent**: Modern data formatting with responsive design utilities
- **FavoritesListComponent**: Advanced state management with loading/success/error states
- **LoadingComponent**: Configurable spinner with custom messaging
- **ErrorDisplayComponent**: Enhanced error handling with retry functionality
- **ApiKeySetupComponent**: Secure form validation with modern Angular patterns

#### 🛠️ Technical Enhancements
- **Utility Modules**: weather.utils.ts, form.utils.ts, array.utils.ts, state.utils.ts
- **Enhanced Type Safety**: Comprehensive interfaces and strict TypeScript configuration
- **Modern Form Handling**: Custom validators and signal-based form controls
- **Improved Styling**: SCSS with nested selectors, CSS custom properties, and responsive design

#### ⚡ Performance Optimizations
- **Memory Leak Prevention**: Proper subscription cleanup with OnDestroy lifecycle
- **Signal-based Subscriptions**: Converted observables to signals using toSignal() for better performance
- **Eliminated Redundant Subscriptions**: Removed manual subscriptions in favor of reactive signals
- **Optimized Change Detection**: OnPush strategy with signal-based reactivity across all components
- **Code Cleanup**: Removed debug code and temporary development helpers

## 🔄 Version History

- **v2.1.0** - Performance optimization and memory management (Current)
  - 🚀 Fixed memory leaks with proper subscription cleanup
  - ⚡ Converted manual subscriptions to reactive signals using toSignal()
  - 🔧 Optimized form reactivity with signal-based change detection
  - 🧹 Cleaned up debug code and development helpers
  - 🎯 Enhanced API key validation with improved user experience

- **v2.0.0** - Major architecture optimization and modernization
  - 🎯 Complete migration to Angular Signals architecture
  - 📁 Separated all components into HTML, SCSS, and TypeScript files
  - 🔧 Created comprehensive utility modules for code reusability
  - ⚡ Implemented OnPush change detection for optimal performance
  - 🎨 Enhanced styling with modern SCSS patterns and responsive design
  - 🛡️ Added advanced form validation and error handling
  - 📊 Improved state management with loading/success/error patterns
  - 🛠️ Created utility functions for code reusability
  - ⚡ Implemented computed properties for reactive UI updates
  - 🏗️ Modernized component architecture with standalone components
  - 🎨 Enhanced styling with SCSS nesting and CSS custom properties

- **v1.0.0** - Initial release with core functionality
  - Current weather display
  - 5-day forecast
  - Favorites functionality
  - Responsive design
  - Caching system
  - Unit tests

## 📈 Performance Metrics

### Bundle Optimization (v2.1.0)
- **Production Bundle**: 705.44 kB (raw) → 160.68 kB (gzipped)
- **Lazy Loading**: Browser chunk optimized to 67.65 kB → 17.74 kB (gzipped)
- **Main Bundle**: 511.10 kB → 101.63 kB (gzipped)
- **Performance Gain**: ~77% reduction in transferred data

### Architecture Improvements
- ✅ **Memory Leak Prevention**: Proper subscription cleanup with `toSignal()`
- ✅ **OnPush Change Detection**: Implemented across all components
- ✅ **Signal-Based Reactivity**: Modern Angular patterns for optimal performance
- ✅ **Test Coverage**: 100% component and service test coverage (54 tests passing)
- ✅ **Code Splitting**: Separated HTML/SCSS/TS files for maintainability
- ✅ **Type Safety**: Strict TypeScript configuration with zero `any` types

---

Made with ❤️ by [Alex Moralez](https://github.com/AlexMoralez)
