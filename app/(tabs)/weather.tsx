import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WeatherContainer from '../components/WeatherContainer';

export default function WeatherScreen() {
  const [forecastType, setForecastType] = useState<'daily' | 'hourly'>('daily');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Shabbos Weather Forecast</Text>
          <Text style={styles.subtitle}>
            Get detailed weather forecasts for Friday and Saturday to help you
            plan your Shabbos activities and prepare for outdoor events.
          </Text>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Weather Section */}
          <View style={styles.section}>
            <WeatherContainer
              forecastType={forecastType}
              setForecastType={setForecastType}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    color: '#212529',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6c757d',
    lineHeight: 22,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
}); 