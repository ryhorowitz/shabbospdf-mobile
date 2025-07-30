import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { getWeatherIcon } from '../utils/weatherIconMapping';
import { formatTime, getWindDisplay, cleanDetailedForecast } from '../utils/forecastUtils';

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

interface HourlyForecastTableProps {
  dayString: string;
  hourlyData: WeatherPeriod[];
  loading: boolean;
  summary?: WeatherPeriod;
  customTimeLabels?: { [key: string]: string };
}

const HourlyForecastTable: React.FC<HourlyForecastTableProps> = ({
  dayString,
  hourlyData,
  loading,
  summary,
  customTimeLabels,
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

  if (!hourlyData || hourlyData.length === 0) {
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
        {summary && summary.shortForecast && (
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
        )}

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>Time</Text>
          <Text style={styles.headerCell}>Temp</Text>
          <Text style={styles.headerCell}>Weather</Text>
          <Text style={styles.headerCell}>Precip</Text>
          <Text style={styles.headerCell}>Wind</Text>
        </View>

        {/* Hourly Rows */}
        {hourlyData.map((hour, idx) => {
          const timeKey = hour && hour.startTime ? formatTime(hour.startTime) : "N/A";
          const displayTime = customTimeLabels && customTimeLabels[timeKey] ? customTimeLabels[timeKey] : timeKey;
          
          return (
            <View key={hour?.startTime || idx} style={styles.tableRow}>
              <Text style={styles.cell}>{displayTime}</Text>
            <Text style={styles.tempCell}>
              {hour && hour.temperature ? `${hour.temperature}°${hour.temperatureUnit || 'F'}` : "N/A"}
            </Text>
            <View style={styles.weatherCell}>
              <Text style={styles.weatherIcon}>
                {hour?.shortForecast ? getWeatherIcon(hour.shortForecast, hour.isDaytime) : "🌤️"}
              </Text>
              <Text style={styles.weatherText} numberOfLines={2}>
                {hour?.shortForecast || "N/A"}
              </Text>
            </View>
            <View style={styles.precipCell}>
              <Text style={styles.precipIcon}>💧</Text>
                              <Text style={styles.precipText}>
                  {hour?.probabilityOfPrecipitation && hour.probabilityOfPrecipitation.value !== null
                    ? `${hour.probabilityOfPrecipitation.value}%`
                    : "0%"}
                </Text>
            </View>
            <Text style={styles.windCell}>
              {hour && hour.windSpeed && hour.windDirection ? getWindDisplay(hour.windSpeed, hour.windDirection) : "N/A"}
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
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
    padding: 16,
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
  summaryContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
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
  tableHeader: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingBottom: 8,
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
    paddingVertical: 8,
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

export default HourlyForecastTable; 