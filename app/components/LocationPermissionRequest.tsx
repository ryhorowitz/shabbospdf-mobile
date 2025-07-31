import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as Location from 'expo-location';
import { useShabbos } from '../context/shabbosContext';

interface LocationPermissionRequestProps {
  onPermissionGranted?: () => void;
}

const LocationPermissionRequest: React.FC<LocationPermissionRequestProps> = ({ 
  onPermissionGranted 
}) => {
  const { candleError, candleLoading } = useShabbos();

  const requestLocationPermission = async () => {
    try {
      // Check if location services are enabled
      const isEnabled = await Location.hasServicesEnabledAsync();
      if (!isEnabled) {
        Alert.alert(
          'Location Services Disabled',
          'Please enable location services in your device settings to get accurate weather and candle times for your area.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Location.enableNetworkProviderAsync() }
          ]
        );
        return;
      }

      // Request permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        onPermissionGranted?.();
      } else {
        Alert.alert(
          'Permission Denied',
          'Location permission is required to provide accurate weather forecasts and candle lighting times for your area. Please grant permission in your device settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Location.enableNetworkProviderAsync() }
          ]
        );
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
      Alert.alert(
        'Error',
        'Failed to request location permission. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  if (candleLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Getting Your Location...</Text>
        <Text style={styles.subtitle}>Please wait while we determine your location for accurate weather and candle times.</Text>
      </View>
    );
  }

  if (candleError) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Location Required</Text>
        <Text style={styles.subtitle}>
          This app needs your location to provide accurate weather forecasts and candle lighting times for your area.
        </Text>
        <Text style={styles.errorText}>{candleError}</Text>
        <TouchableOpacity style={styles.button} onPress={requestLocationPermission}>
          <Text style={styles.buttonText}>Grant Location Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#212529',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#6c757d',
    lineHeight: 24,
  },
  errorText: {
    fontSize: 14,
    color: '#dc3545',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 200,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default LocationPermissionRequest; 