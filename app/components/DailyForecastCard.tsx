import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

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

interface DailyForecastCardProps {
  dayString: string;
  periods: WeatherPeriod[];
  summary: any;
  loading: boolean;
}

const DailyForecastCard: React.FC<DailyForecastCardProps> = ({
  dayString,
  periods,
  summary,
  loading,
}) => {
  if (loading) {
    return (
      <View style={styles.card}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading forecast...</Text>
      </View>
    );
  }

  if (!periods || periods.length === 0) {
    return (
      <View style={styles.card}>
        <Text style={styles.noDataText}>No forecast data available for {dayString}</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.dayTitle}>{dayString}</Text>
      
      {periods.map((period, index) => (
        <View key={period.number} style={styles.periodContainer}>
          <View style={styles.periodHeader}>
            <Text style={styles.periodName}>{period.name}</Text>
            <Text style={styles.temperature}>
              {period.temperature}°{period.temperatureUnit}
            </Text>
          </View>
          
          <Text style={styles.forecast}>{period.shortForecast}</Text>
          
          <View style={styles.details}>
            <Text style={styles.detailText}>
              Wind: {period.windSpeed} {period.windDirection}
            </Text>
            <Text style={styles.timeRange}>
              {new Date(period.startTime).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })} - {new Date(period.endTime).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  periodContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    paddingVertical: 12,
  },
  periodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  periodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
  },
  temperature: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  forecast: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 8,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: '#6c757d',
  },
  timeRange: {
    fontSize: 12,
    color: '#6c757d',
    fontStyle: 'italic',
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
});

export default DailyForecastCard; 