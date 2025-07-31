import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CandleTimes from '../components/CandleTimes';
import { useShabbos } from '../context/shabbosContext';
import LocationPermissionRequest from '../components/LocationPermissionRequest';

export default function CandlesScreen() {
  const { geoData, candleError, candleLoading } = useShabbos();

  // Show location permission request if there's an error or still loading
  if (candleError || candleLoading) {
    return <LocationPermissionRequest />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <CandleTimes />
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
}); 