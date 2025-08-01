// Centralized TypeScript interfaces for the entire app

export interface GeoData {
  loc: string;
  timezone: string;
  city: string;
  region: string;
}

export interface CandleItem {
  title: string;
  date: string;
  hdate: string;
  category: string;
  hebrew: string;
}

export interface CandleData {
  items: CandleItem[];
}

export interface WeatherPeriod {
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
  probabilityOfPrecipitation?: {
    value: number;
  };
  relativeHumidity?: {
    value: number;
  };
}

export interface WeatherData {
  properties: {
    periods: WeatherPeriod[];
  };
}

export interface ExtractedItems {
  candleItem: CandleItem | null;
  parshahItem: CandleItem | null;
  havdalahItem: CandleItem | null;
}

// Component Props Interfaces
export interface WeatherContainerProps {
  forecastType: 'daily' | 'hourly';
  setForecastType: (type: 'daily' | 'hourly') => void;
}

export interface DailyForecastTableProps {
  dayString: string;
  hourlyData: WeatherPeriod[];
  loading: boolean;
  summary?: WeatherPeriod;
  customTimeLabels?: { [key: string]: string };
}

export interface HourlyForecastCardProps {
  dayString: string;
  periods: WeatherPeriod[];
  summary: any;
  loading: boolean;
}

export interface DailySummaryProps {
  summary: WeatherPeriod | null;
}

export interface PDFGeneratorProps {
  forecastType: 'daily' | 'hourly';
}

export interface LocationPermissionRequestProps {
  onPermissionGranted?: () => void;
} 