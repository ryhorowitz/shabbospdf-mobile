import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useShabbos } from '../context/shabbosContext';
import LocationPermissionRequest from '../components/LocationPermissionRequest';

export default function HomeScreen() {
  const router = useRouter();
  const { geoData, candleError, candleLoading } = useShabbos();

  // Show location permission request if there's an error or still loading
  if (candleError || candleLoading) {
    return <LocationPermissionRequest />;
  }

  // Show main content if we have location data
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Erev Shabbos Weather Report</Text>
          <Text style={styles.subtitle}>
            Welcome to the Erev Shabbos Weather Report! This app provides you
            with up-to-date weather forecasts and candle lighting times to
            help you prepare for Shabbos. Download a printable PDF and stay
            informed for a peaceful and organized Shabbos experience.
          </Text>
          {geoData && (
            <Text style={styles.locationText}>
              📍 {geoData.city}, {geoData.region}
            </Text>
          )}
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Quick Access Cards */}
          <View style={styles.cardsContainer}>
            <TouchableOpacity 
              style={styles.card}
              onPress={() => router.replace('/candles')}
            >
              <Text style={styles.cardTitle}>🕯️ Candle Times</Text>
              <Text style={styles.cardDescription}>
                View candle lighting and havdalah times for your location
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.card}
              onPress={() => router.replace('/weather')}
            >
              <Text style={styles.cardTitle}>☁️ Weather Forecast</Text>
              <Text style={styles.cardDescription}>
                Get detailed weather forecasts for Friday and Saturday
              </Text>
            </TouchableOpacity>
          </View>

          {/* Features Section */}
          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>Features</Text>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📍</Text>
              <Text style={styles.featureText}>Automatic location detection</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📅</Text>
              <Text style={styles.featureText}>Current parshah and Hebrew date</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🌤️</Text>
              <Text style={styles.featureText}>General and hourly weather forecasts</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>⏰</Text>
              <Text style={styles.featureText}>Accurate candle lighting times</Text>
            </View>
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
  locationText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#28a745',
    marginTop: 8,
    fontWeight: '500',
  },
  content: {
    padding: 16,
  },
  cardsContainer: {
    marginBottom: 24,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
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
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#212529',
  },
  cardDescription: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
  },
  featuresSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#212529',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#495057',
    flex: 1,
  },
});
