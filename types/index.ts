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

// Common UI State Interfaces
export interface LoadingState {
  loading: boolean;
  error: string | null;
}

export interface AccordionState {
  expanded: boolean;
  loading: boolean;
}

// Zmanim Interfaces
export interface ZmanimData {
  [key: string]: string;
}

export interface ZmanimField {
  label: string;
  key: string;
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

// Common Component Props
export interface ScreenLayoutProps {
  children: React.ReactNode;
  gradientColors?: string[];
  safeAreaEdges?: ('top' | 'bottom' | 'left' | 'right')[];
  scrollEnabled?: boolean;
  contentPadding?: number;
  style?: any;
}

export interface LoadingStateProps {
  message?: string;
  size?: 'small' | 'large';
  color?: string;
  style?: any;
}

export interface ErrorStateProps {
  message: string;
  style?: any;
}

export interface WeatherCardProps {
  data: WeatherPeriod;
  title?: string;
  style?: any;
}

export interface CandleTimeCardProps {
  label: string;
  date: string | Date;
  style?: any;
}

export interface ZmanimAccordionProps {
  title: string;
  date: Date;
  time?: string;
  expanded: boolean;
  onToggle: () => void;
  loading: boolean;
  zmanimData: ZmanimData | null;
  zmanimFields: ZmanimField[];
  onExpand?: () => void;
} 