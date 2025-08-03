/**
 * Weather-related utility functions used across the app
 */

import { getWeatherIcon } from '../app/utils/weatherIconMapping';

export interface WeatherData {
  temperature?: number;
  temperatureUnit?: string;
  shortForecast?: string;
  isDaytime?: boolean;
  windSpeed?: string;
  windDirection?: string;
  probabilityOfPrecipitation?: {
    value: number | null;
  };
  startTime?: string;
}

export const formatTemperature = (temp: number | undefined, unit: string = 'F'): string => {
  if (temp === undefined || temp === null) return 'N/A';
  return `${temp}°${unit}`;
};

export const formatPrecipitation = (precip: { value: number | null } | undefined): string => {
  if (!precip || precip.value === null || precip.value === undefined) return '0%';
  return `${precip.value}%`;
};

export const getWindDisplay = (speed: string | undefined, direction: string | undefined): string => {
  if (!speed || !direction) return 'N/A';
  return `${speed} ${direction}`;
};

export const getWeatherDisplay = (data: WeatherData): {
  icon: string;
  temperature: string;
  forecast: string;
  precipitation: string;
  wind: string;
} => {
  return {
    icon: getWeatherIcon(data.shortForecast || '', data.isDaytime || true),
    temperature: formatTemperature(data.temperature, data.temperatureUnit),
    forecast: data.shortForecast || 'N/A',
    precipitation: formatPrecipitation(data.probabilityOfPrecipitation),
    wind: getWindDisplay(data.windSpeed, data.windDirection),
  };
};

export const getWeatherSummary = (data: WeatherData): {
  icon: string;
  temperature: string;
  forecast: string;
} => {
  return {
    icon: getWeatherIcon(data.shortForecast || '', data.isDaytime || true),
    temperature: formatTemperature(data.temperature, data.temperatureUnit),
    forecast: data.shortForecast || 'N/A',
  };
}; 