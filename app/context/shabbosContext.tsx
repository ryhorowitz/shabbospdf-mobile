import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Location from 'expo-location';

interface GeoData {
  loc: string;
  timezone: string;
  city: string;
  region: string;
}

interface CandleItem {
  title: string;
  date: string;
  hdate: string;
  category: string;
  hebrew: string;
}

interface CandleData {
  items: CandleItem[];
}

interface WeatherPeriod {
  number: number;
  name: string;
  startTime: string;
  endTime: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: string;
  windSpeed: string;
  windDirection: string;
  icon: string;
  shortForecast: string;
  detailedForecast: string;
}

interface WeatherData {
  properties: {
    periods: WeatherPeriod[];
  };
}

interface ShabbosContextType {
  candleData: CandleData | null;
  geoData: GeoData | null;
  candleLoading: boolean;
  candleError: string | null;
  weatherData: WeatherData | null;
  weatherLoading: boolean;
  weatherError: string | null;
  getShabbosForecasts: (candleData: CandleData) => { friday: WeatherPeriod[], saturday: WeatherPeriod[] };
  getShabbosDailySummaries: (candleData: CandleData) => { friday: any, saturday: any };
  getShabbosHourlyForecasts: (candleData: CandleData) => { friday: any[], saturday: any[] };
}

const ShabbosContext = createContext<ShabbosContextType | undefined>(undefined);

export const useShabbos = () => {
  const context = useContext(ShabbosContext);
  if (!context) {
    throw new Error('useShabbos must be used within a ShabbosProvider');
  }
  return context;
};

export const ShabbosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [candleData, setCandleData] = useState<CandleData | null>(null);
  const [geoData, setGeoData] = useState<GeoData | null>(null);
  const [candleLoading, setCandleLoading] = useState(true);
  const [candleError, setCandleError] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  // Get location and geo data
  useEffect(() => {
    const getGeoData = async () => {
      try {
        // Request location permissions
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setCandleError('Location permission denied');
          setCandleLoading(false);
          return;
        }

        // Get current location
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        
        console.log(`Location: Latitude: ${latitude}, Longitude: ${longitude}`);

        // Get timezone
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        // Try to get city and region from coordinates using reverse geocoding
        let city = 'Unknown';
        let region = 'Unknown';

        try {
          const reverseGeocodeResponse = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          if (reverseGeocodeResponse.ok) {
            const geoData = await reverseGeocodeResponse.json();
            city = geoData.city || geoData.locality || 'Unknown';
            region = geoData.principalSubdivision || geoData.countryName || 'Unknown';
            console.log('Reverse geocoding result:', geoData);
          }
        } catch (reverseError) {
          console.error('Reverse geocoding failed:', reverseError);
        }

        // Create geoData object
        const fallbackGeoData: GeoData = {
          loc: `${latitude},${longitude}`,
          timezone,
          city,
          region,
        };
        setGeoData(fallbackGeoData);
      } catch (error) {
        console.error('Geolocation error:', error);
        setCandleError('Failed to get location data');
        setCandleLoading(false);
      }
    };

    getGeoData();
  }, []);

  // Fetch candle times when geo data is available
  useEffect(() => {
    if (!geoData) return;

    const fetchCandleTimes = async () => {
      try {
        setCandleLoading(true);
        setCandleError(null);
        
        const [lat, lon] = geoData.loc.split(',');
        const timezone = geoData.timezone;
        
        const response = await fetch(
          `https://www.hebcal.com/shabbat?cfg=json&latitude=${lat}&longitude=${lon}&tzid=${timezone}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch candle times');
        }
        
        const data: CandleData = await response.json();
        setCandleData(data);
      } catch (err) {
        console.error('Error fetching candle times:', err);
        setCandleError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setCandleLoading(false);
      }
    };

    fetchCandleTimes();
  }, [geoData]);

  // Fetch weather data when geo data is available
  useEffect(() => {
    if (!geoData) return;

    const fetchWeatherData = async () => {
      try {
        setWeatherLoading(true);
        setWeatherError(null);
        
        const [lat, lon] = geoData.loc.split(',');
        
        const response = await fetch(
          `https://api.weather.gov/points/${lat},${lon}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch weather points');
        }
        
        const pointsData = await response.json();
        const forecastUrl = pointsData.properties.forecast;
        
        const forecastResponse = await fetch(forecastUrl);
        if (!forecastResponse.ok) {
          throw new Error('Failed to fetch weather forecast');
        }
        
        const weatherData: WeatherData = await forecastResponse.json();
        setWeatherData(weatherData);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setWeatherError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setWeatherLoading(false);
      }
    };

    fetchWeatherData();
  }, [geoData]);

  // Helper functions for processing data
  const getShabbosForecasts = (candleData: CandleData) => {
    if (!candleData || !weatherData) {
      return { friday: [], saturday: [] };
    }

    const candleItem = candleData.items.find(item => item.category === 'candles');
    const havdalahItem = candleData.items.find(item => item.category === 'havdalah');

    if (!candleItem || !havdalahItem) {
      return { friday: [], saturday: [] };
    }

    const candleDate = new Date(candleItem.date);
    const havdalahDate = new Date(havdalahItem.date);

    const fridayPeriods = weatherData.properties.periods.filter(period => {
      const periodDate = new Date(period.startTime);
      return periodDate.toDateString() === candleDate.toDateString();
    });

    const saturdayPeriods = weatherData.properties.periods.filter(period => {
      const periodDate = new Date(period.startTime);
      return periodDate.toDateString() === havdalahDate.toDateString();
    });

    return { friday: fridayPeriods, saturday: saturdayPeriods };
  };

  const getShabbosDailySummaries = (candleData: CandleData) => {
    // Placeholder for daily summaries
    return { friday: null, saturday: null };
  };

  const getShabbosHourlyForecasts = (candleData: CandleData) => {
    // Placeholder for hourly forecasts
    return { friday: [], saturday: [] };
  };

  const value: ShabbosContextType = {
    candleData,
    geoData,
    candleLoading,
    candleError,
    weatherData,
    weatherLoading,
    weatherError,
    getShabbosForecasts,
    getShabbosDailySummaries,
    getShabbosHourlyForecasts,
  };

  return (
    <ShabbosContext.Provider value={value}>
      {children}
    </ShabbosContext.Provider>
  );
}; 