import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import WeatherContainer from '../components/WeatherContainer';
import { useShabbos } from '../context/shabbosContext';
import LocationPermissionRequest from '../components/LocationPermissionRequest';

export default function WeatherScreen() {
  const [forecastType, setForecastType] = useState<'daily' | 'hourly'>('daily');
  const { candleError, candleLoading } = useShabbos();

  // Show location permission request if there's an error or still loading
  if (candleError || candleLoading) {
    return <LocationPermissionRequest />;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.section}>
            <WeatherContainer
              forecastType={forecastType}
              setForecastType={setForecastType}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 0,
  },
  section: {
    marginBottom: 24,
  },
}); 