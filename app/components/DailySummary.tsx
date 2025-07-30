import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getWeatherIcon } from '../utils/weatherIconMapping';
import { cleanDetailedForecast } from '../utils/forecastUtils';

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
  probabilityOfPrecipitation?: {
    value: number;
  };
  relativeHumidity?: {
    value: number;
  };
}

interface DailySummaryProps {
  summary: WeatherPeriod | null;
}

const DailySummary: React.FC<DailySummaryProps> = ({ summary }) => {
  if (!summary || !summary.shortForecast) {
    return null;
  }

  return (
    <View style={styles.summaryContainer}>
      <View style={styles.summaryContent}>
        <Text style={styles.summaryIcon}>
          {getWeatherIcon(summary.shortForecast, summary.isDaytime)}
        </Text>
        <View style={styles.summaryText}>
          <Text style={styles.summaryForecast}>
            {summary.detailedForecast ? cleanDetailedForecast(summary.detailedForecast) : summary.shortForecast || 'No forecast available'}
          </Text>
          <View style={styles.summaryDetails}>
            {summary.probabilityOfPrecipitation && summary.probabilityOfPrecipitation.value !== null && (
              <Text style={styles.summaryDetail}>
                Precip: {summary.probabilityOfPrecipitation.value}%
              </Text>
            )}
            {summary.relativeHumidity && summary.relativeHumidity.value !== null && (
              <Text style={styles.summaryDetail}>
                Humidity: {summary.relativeHumidity.value}%
              </Text>
            )}
            {summary.windSpeed && summary.windDirection && (
              <Text style={styles.summaryDetail}>
                Wind: {summary.windSpeed} {summary.windDirection}
              </Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  summaryContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  summaryContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryIcon: {
    fontSize: 40,
    marginRight: 12,
  },
  summaryText: {
    flex: 1,
  },
  summaryForecast: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 4,
  },
  summaryDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  summaryDetail: {
    fontSize: 12,
    color: '#6c757d',
  },
});

export default DailySummary; 