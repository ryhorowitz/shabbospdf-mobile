# ShabbosPDF Mobile App

A React Native mobile app built with Expo that provides Shabbos weather forecasts and candle lighting times.

## Features

- **Candle Times**: Displays candle lighting and havdalah times for your location
- **Weather Forecast**: Shows weather forecasts for Friday and Saturday
- **Location Services**: Uses device GPS to get your current location
- **Daily/Hourly Toggle**: Switch between daily and hourly forecast views

## Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **Expo Location** for GPS services
- **Native Fetch API** for HTTP requests
- **React Context** for state management

## APIs Used

- **Hebcal API**: For candle lighting times and Jewish calendar data
- **Weather.gov API**: For weather forecasts
- **BigDataCloud API**: For reverse geocoding (city/region lookup)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Expo CLI
- iOS Simulator or Android Emulator (or physical device)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Run on your preferred platform:
   ```bash
   npm run ios     # iOS Simulator
   npm run android # Android Emulator
   npm run web     # Web browser
   ```

## Project Structure

```
app/
├── components/           # React Native components
│   ├── CandleTimes.tsx   # Candle lighting times display
│   ├── WeatherContainer.tsx # Weather forecast container
│   └── DailyForecastCard.tsx # Daily weather card
├── context/
│   └── shabbosContext.tsx # App state management
├── utils/
│   └── candleDataUtils.ts # Candle data processing utilities
└── (tabs)/
    └── index.tsx         # Main app screen
```

## Key Components

### ShabbosProvider
The main context provider that manages:
- Location data and permissions
- Candle times from Hebcal API
- Weather data from Weather.gov API
- Loading and error states

### CandleTimes
Displays:
- Current parshah (Torah portion)
- Hebrew date
- Candle lighting time
- Havdalah time
- Location information

### WeatherContainer
Shows weather forecasts with:
- Daily/hourly toggle
- Friday and Saturday forecasts
- Temperature, wind, and conditions

## Permissions

The app requires location permissions to:
- Get your current coordinates
- Fetch location-specific candle times
- Retrieve weather data for your area

## Development Notes

- Uses native `fetch()` instead of axios for HTTP requests
- Implements proper TypeScript interfaces for all data structures
- Follows React Native best practices for styling and layout
- Uses Expo's location services for GPS functionality

## Future Enhancements

- PDF generation for weather reports
- Push notifications for candle times
- Offline support
- Multiple location support
- Customizable weather alerts
