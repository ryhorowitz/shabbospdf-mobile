import React from 'react';
import { ActivityIndicator, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { formatTime, getWindDisplay } from '../utils/forecastUtils';
import { getWeatherIcon } from '../utils/weatherIconMapping';
import DailySummary from './DailySummary';

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

interface HourlyForecastCardProps {
  dayString: string;
  periods: WeatherPeriod[];
  summary: any;
  loading: boolean;
}

const HourlyForecastCard: React.FC<HourlyForecastCardProps> = ({
  dayString,
  periods,
  summary,
  loading,
}) => {
  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{dayString} Hourly Forecast</Text>
        </View>
        <View style={styles.content}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading hourly forecast...</Text>
        </View>
      </View>
    );
  }

  if (!periods || periods.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{dayString} Hourly Forecast</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.noDataText}>No hourly forecast available</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{dayString}</Text>
      </View>
      
      <ScrollView style={styles.content}>
        {/* Daily summary */}
        <DailySummary summary={summary} />

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>Time</Text>
          <Text style={styles.headerCell}>Temp</Text>
          <Text style={styles.headerCell}>Weather</Text>
          <Text style={styles.headerCell}>Precip</Text>
          <Text style={styles.headerCell}>Wind</Text>
        </View>

        {/* Hourly Rows */}
        {periods.map((period, idx) => {
          const timeKey = period && period.startTime ? formatTime(period.startTime) : "N/A";
          
          return (
            <View key={period?.startTime || idx} style={styles.tableRow}>
              <Text style={styles.cell}>{timeKey}</Text>
              <Text style={styles.tempCell}>
                {period && period.temperature ? `${period.temperature}°${period.temperatureUnit || 'F'}` : "N/A"}
              </Text>
              <View style={styles.weatherCell}>
                <Text style={styles.weatherIcon}>
                  {period?.shortForecast ? getWeatherIcon(period.shortForecast, period.isDaytime) : "🌤️"}
                </Text>
                <Text style={styles.weatherText} numberOfLines={2}>
                  {period?.shortForecast || "N/A"}
                </Text>
              </View>
              <View style={styles.precipCell}>
                <Text style={styles.precipIcon}>💧</Text>
                <Text style={styles.precipText}>
                  {period?.probabilityOfPrecipitation && period.probabilityOfPrecipitation.value !== null
                    ? `${period.probabilityOfPrecipitation.value}%`
                    : "0%"}
                </Text>
              </View>
              <Text style={styles.windCell}>
                {period && period.windSpeed && period.windDirection ? getWindDisplay(period.windSpeed, period.windDirection) : "N/A"}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    ...(Platform.OS === 'ios' ? {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
    } : {
      // No shadows on Android
    }),
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    padding: 8,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
  },
  noDataText: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  tableHeader: {
    flexDirection: 'row',
    marginBottom: 4,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerCell: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#495057',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  cell: {
    flex: 1,
    fontSize: 12,
    color: '#495057',
    textAlign: 'center',
  },
  tempCell: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
  },
  weatherCell: {
    flex: 1,
    alignItems: 'center',
  },
  weatherIcon: {
    fontSize: 16,
    marginBottom: 2,
  },
  weatherText: {
    fontSize: 10,
    color: '#6c757d',
    textAlign: 'center',
  },
  precipCell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  precipIcon: {
    fontSize: 12,
    marginRight: 2,
    opacity: 0.7,
  },
  precipText: {
    fontSize: 12,
    color: '#495057',
  },
  windCell: {
    flex: 1,
    fontSize: 10,
    color: '#6c757d',
    textAlign: 'center',
  },
});

export default HourlyForecastCard; 