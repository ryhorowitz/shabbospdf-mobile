import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { tableStyles } from '../../constants/CommonStyles';
import { WeatherPeriod } from '../../types';
import { formatTime, getWindDisplay } from '../../utils/forecastUtils';
import { getWeatherIcon } from '../../utils/weatherIconMapping';

interface WeatherTableProps {
  periods: WeatherPeriod[];
  customTimeLabels?: { [key: string]: string };
}

const WeatherTable: React.FC<WeatherTableProps> = ({ periods, customTimeLabels }) => {
  return (
    <ScrollView style={tableStyles.content}>
      {/* Table Header */}
      <View style={tableStyles.headerRow}>
        <Text style={tableStyles.headerCell}>Time</Text>
        <Text style={tableStyles.headerCell}>Temp</Text>
        <Text style={tableStyles.headerCell}>Weather</Text>
        <Text style={tableStyles.headerCell}>Precip</Text>
        <Text style={tableStyles.headerCell}>Wind</Text>
      </View>

      {/* Weather Rows */}
      {periods.map((period, idx) => {
        const timeKey = period && period.startTime ? formatTime(period.startTime) : "N/A";
        const displayTime = customTimeLabels && customTimeLabels[timeKey] ? customTimeLabels[timeKey] : timeKey;
        
        return (
          <View key={period?.startTime || idx} style={tableStyles.row}>
            <Text style={tableStyles.cell}>{displayTime}</Text>
            <Text style={tableStyles.tempCell}>
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
  );
};

const styles = StyleSheet.create({
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

export default WeatherTable; 