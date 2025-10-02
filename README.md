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

## 🚀 Demo

Visit the live demo: [Weather App Demo](https://your-demo-url.com) *(Replace with actual deployment URL)*

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

## 🏗️ Architecture

### Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── search/          # City search component
│   │   ├── current-weather/ # Current weather display
│   │   ├── forecast/        # 5-day forecast component
│   │   ├── error-display/   # Error handling component
│   │   ├── loading/         # Loading spinner component
│   │   └── api-key-setup/   # API key configuration
│   ├── services/            # Business logic services
│   │   ├── weather.service.ts    # Weather API integration
│   │   └── favorites.service.ts  # Favorites management
│   ├── models/              # TypeScript interfaces
│   │   └── weather.model.ts # Weather data models
│   └── app.ts               # Main application component
├── styles.scss              # Global styles
└── index.html               # Application entry point
```

### Key Technologies

- **Angular 20**: Latest Angular framework with standalone components
- **Angular Material**: Material Design components and theming
- **TypeScript**: Type-safe development
- **RxJS**: Reactive programming for API calls and state management
- **SCSS**: Enhanced CSS with variables and mixins

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

## 🚀 Deployment

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `dist/weather-app` folder to Netlify

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`

### Deploy to GitHub Pages

1. Install Angular CLI GitHub Pages: `npm install -g angular-cli-ghpages`
2. Build and deploy: `npx angular-cli-ghpages --dir=dist/weather-app`

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

## 📞 Support

If you have any questions or issues:

1. Check the [Issues](https://github.com/AlexMoralez/weather_app/issues) page
2. Create a new issue with detailed information
3. Contact: [your-email@example.com](mailto:your-email@example.com)

## 🔄 Version History

- **v1.0.0** - Initial release with all core features
  - Current weather display
  - 5-day forecast
  - Favorites functionality
  - Responsive design
  - Caching system
  - Unit tests

---

Made with ❤️ by [Alex Moralez](https://github.com/AlexMoralez)