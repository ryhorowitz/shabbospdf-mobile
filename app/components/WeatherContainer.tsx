import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ErrorState from '../../components/common/ErrorState';
import LoadingState from '../../components/common/LoadingState';
import OfflineState from '../../components/common/OfflineState';
import { useShabbos } from '../context/shabbosContext';
import DailyForecastTable from './DailyForecastTable';
import HourlyForecastCard from './HourlyForecastCard';
import PDFGenerator from './PDFGenerator';

interface WeatherContainerProps {
  forecastType: 'daily' | 'hourly';
  setForecastType: (type: 'daily' | 'hourly') => void;
}

const WeatherContainer: React.FC<WeatherContainerProps> = ({ 
  forecastType, 
  setForecastType 
}) => {
  const {
    weatherLoading: loading,
    weatherError: error,
    isOffline,
    retryWeather,
    getShabbosForecasts,
    getShabbosDailySummaries,
    getShabbosHourlyForecasts,
    candleData,
  } = useShabbos();

  // Show offline state if no internet connection
  if (isOffline) {
    return (
      <OfflineState 
        onRetry={retryWeather}
        message="Weather data requires an internet connection. Please check your network and try again."
      />
    );
  }

  // Show loading state
  if (loading) {
    return (
      <LoadingState 
        loadingType="weather"
        message="Loading weather forecast..."
      />
    );
  }

  // Show error state
  if (error) {
    return (
      <ErrorState 
        message={error}
        onRetry={retryWeather}
        errorType="weather"
        showRetry={true}
        showReportIssue={true}
      />
    );
  }

  if (!candleData) {
    return (
      <ErrorState 
        message="No candle data available. Please try refreshing the app."
        onRetry={retryWeather}
        errorType="general"
        showRetry={true}
        showReportIssue={true}
      />
    );
  }

  const { friday: fridayPeriods, saturday: saturdayPeriods } = getShabbosForecasts(candleData);
  const { friday: fridaySummary, saturday: saturdaySummary } = getShabbosDailySummaries(candleData);
  const { friday: fridayHourly, saturday: saturdayHourly } = getShabbosHourlyForecasts(candleData);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>

        {/* Forecast Type Toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              forecastType === 'daily' && styles.activeToggleButton
            ]}
            onPress={() => setForecastType('daily')}
          >
            <Text style={[
              styles.toggleButtonText,
              forecastType === 'daily' && styles.activeToggleButtonText
            ]}>
              Hourly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              forecastType === 'hourly' && styles.activeToggleButton
            ]}
            onPress={() => setForecastType('hourly')}
          >
            <Text style={[
              styles.toggleButtonText,
              forecastType === 'hourly' && styles.activeToggleButtonText
            ]}>
              General
            </Text>
          </TouchableOpacity>
        </View>

        {/* PDF Generator */}
        <PDFGenerator forecastType={forecastType} />

        {forecastType === 'daily' ? (
          <View style={styles.forecastContainer}>
            {fridayHourly && fridayHourly.length > 0 && (
              <HourlyForecastCard
                dayString="Friday"
                periods={fridayHourly}
                summary={fridaySummary}
                loading={loading}
              />
            )}
            {saturdayHourly && saturdayHourly.length > 0 && (
              <HourlyForecastCard
                dayString="Saturday"
                periods={saturdayHourly}
                summary={saturdaySummary}
                loading={loading}
              />
            )}
          </View>
        ) : (
          <View style={styles.forecastContainer}>
            {fridayPeriods && fridayPeriods.length > 0 && (
              <DailyForecastTable
                dayString="Friday"
                hourlyData={fridayPeriods}
                summary={fridaySummary}
                loading={loading}
                customTimeLabels={{
                  "4:00 PM": "4pm Afternoon",
                  "8:00 PM": "8pm Evening", 
                  "12:00 AM": "12am Night",
                  "8:00 AM": "8am Morning",
                  "12:00 PM": "12pm Noon"
                }}
              />
            )}
            {saturdayPeriods && saturdayPeriods.length > 0 && (
              <DailyForecastTable
                dayString="Saturday"
                hourlyData={saturdayPeriods}
                summary={saturdaySummary}
                loading={loading}
                customTimeLabels={{
                  "4:00 PM": "4pm Afternoon",
                  "8:00 PM": "8pm Evening", 
                  "12:00 AM": "12am Night",
                  "8:00 AM": "8am Morning",
                  "12:00 PM": "12pm Noon"
                }}
              />
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 12,
  },

  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#e9ecef',
    borderRadius: 8,
    padding: 4,
    marginBottom: 8,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeToggleButton: {
    backgroundColor: '#007AFF',
  },
  toggleButtonText: {
    fontSize: 16,
    color: '#6c757d',
    fontWeight: '500',
  },
  activeToggleButtonText: {
    color: 'white',
  },
  forecastContainer: {
    gap: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#dc3545',
    textAlign: 'center',
  },
  comingSoonText: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default WeatherContainer; 