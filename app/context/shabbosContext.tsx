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
  const [dailyForecastData, setDailyForecastData] = useState<WeatherData | null>(null);
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
        const hourlyForecastUrl = pointsData.properties.forecastHourly;
        const dailyForecastUrl = pointsData.properties.forecast;
        
        // Fetch hourly forecast for getShabbosForecasts
        const hourlyResponse = await fetch(hourlyForecastUrl);
        if (!hourlyResponse.ok) {
          throw new Error('Failed to fetch hourly weather forecast');
        }
        
        const hourlyData: WeatherData = await hourlyResponse.json();
        setWeatherData(hourlyData);
        
        // Fetch daily forecast for getShabbosDailySummaries
        const dailyResponse = await fetch(dailyForecastUrl);
        if (!dailyResponse.ok) {
          throw new Error('Failed to fetch daily weather forecast');
        }
        
        const dailyData: WeatherData = await dailyResponse.json();
        setDailyForecastData(dailyData);
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
    // Use extractCandleItems to get Friday and Saturday dates
    // Friday: 4pm (16), 8pm (20), 12am (0, Sat)
    // Saturday: 8am (8), 12pm (12), 4pm (16), 8pm (20)
    if (!candleData) return { friday: [], saturday: [] };
    // Get Friday candle lighting date (should be Friday)
    let fridayDate = null;
    let saturdayDate = null;
    try {
      const candleItem = candleData.items.find(item => item.category === 'candles');
      const havdalahItem = candleData.items.find(item => item.category === 'havdalah');
      if (candleItem && candleItem.date) fridayDate = new Date(candleItem.date);
      if (havdalahItem && havdalahItem.date)
        saturdayDate = new Date(havdalahItem.date);
      // For Saturday, use the date part of havdalah (should be Sat night)
      if (saturdayDate) saturdayDate.setHours(0, 0, 0, 0);
    } catch (e) {}
    return {
      friday: fridayDate
        ? getForecastForDateAndHours(fridayDate, [16, 20, 0]).filter((period): period is WeatherPeriod => period !== undefined)
        : [],
      saturday: fridayDate
        ? getForecastForDateAndHours(
            new Date(fridayDate.getTime() + 24 * 60 * 60 * 1000),
            [8, 12, 16, 20]
          ).filter((period): period is WeatherPeriod => period !== undefined)
        : [],
    };
  };

  const getShabbosDailySummaries = (candleData: CandleData) => {
    if (!candleData || !dailyForecastData) {
      return { friday: null, saturday: null };
    }

    const candleItem = candleData.items.find(item => item.category === 'candles');
    const havdalahItem = candleData.items.find(item => item.category === 'havdalah');

    if (!candleItem || !havdalahItem) {
      return { friday: null, saturday: null };
    }

    const candleDate = new Date(candleItem.date);
    const havdalahDate = new Date(havdalahItem.date);

    // Find the daily summary for each day
    const fridaySummary = dailyForecastData.properties.periods.find(period => {
      const periodDate = new Date(period.startTime);
      return periodDate.toDateString() === candleDate.toDateString() && period.isDaytime;
    });

    const saturdaySummary = dailyForecastData.properties.periods.find(period => {
      const periodDate = new Date(period.startTime);
      return periodDate.toDateString() === havdalahDate.toDateString() && period.isDaytime;
    });

    return { friday: fridaySummary || null, saturday: saturdaySummary || null };
  };

  const getForecastForDateAndHours = (dateObj: Date, hoursArr: number[]) => {
    if (!weatherData) return [];
    // dateObj: JS Date, hoursArr: [16, 20, 0] etc.
    return hoursArr.map((hour) => {
      // For 0 (midnight), if date is Friday, midnight is technically Saturday
      let targetDate = new Date(dateObj);
      if (hour === 0) {
        targetDate.setDate(targetDate.getDate() + 1);
      }
      targetDate.setHours(hour, 0, 0, 0);
      // Find the period with matching startTime (local)
      return weatherData.properties.periods.find((period) => {
        const periodDate = new Date(period.startTime);
        return (
          periodDate.getFullYear() === targetDate.getFullYear() &&
          periodDate.getMonth() === targetDate.getMonth() &&
          periodDate.getDate() === targetDate.getDate() &&
          periodDate.getHours() === targetDate.getHours()
        );
      });
    }).filter(Boolean); // Remove undefined entries
  };



  const getShabbosHourlyForecasts = (candleData: CandleData) => {
    // Return all hourly forecasts for Shabbos (every hour)
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

    // Friday: from 4pm to 11pm (candle lighting to end of Friday)
    const fridayStart = new Date(candleDate);
    fridayStart.setHours(16, 0, 0, 0);
    const fridayEnd = new Date(candleDate);
    fridayEnd.setHours(23, 59, 59, 999);

    // Saturday: from 8am to 8pm (morning to evening)
    const saturdayStart = new Date(candleDate.getTime() + 24 * 60 * 60 * 1000);
    saturdayStart.setHours(8, 0, 0, 0);
    const saturdayEnd = new Date(candleDate.getTime() + 24 * 60 * 60 * 1000);
    saturdayEnd.setHours(20, 59, 59, 999);

    const fridayHourly = weatherData.properties.periods.filter(period => {
      const periodDate = new Date(period.startTime);
      return periodDate >= fridayStart && periodDate <= fridayEnd;
    });

    const saturdayHourly = weatherData.properties.periods.filter(period => {
      const periodDate = new Date(period.startTime);
      return periodDate >= saturdayStart && periodDate <= saturdayEnd;
    });

    return { friday: fridayHourly, saturday: saturdayHourly };
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