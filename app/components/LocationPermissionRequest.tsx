import * as Location from 'expo-location';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ErrorState from '../../components/common/ErrorState';
import LoadingState from '../../components/common/LoadingState';
import OfflineState from '../../components/common/OfflineState';
import { useShabbos } from '../context/shabbosContext';

interface LocationPermissionRequestProps {
  onPermissionGranted?: () => void;
}

const LocationPermissionRequest: React.FC<LocationPermissionRequestProps> = ({ 
  onPermissionGranted 
}) => {
  const { 
    candleError, 
    candleLoading, 
    isOffline,
    retryLocation 
  } = useShabbos();

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

  // Show offline state if no internet connection
  if (isOffline) {
    return (
      <OfflineState 
        onRetry={retryLocation}
        message="Location services require an internet connection for reverse geocoding. Please check your network and try again."
      />
    );
  }

  // Show loading state
  if (candleLoading) {
    return (
      <LoadingState 
        loadingType="location"
        message="Getting your location..."
      />
    );
  }

  // Show error state
  if (candleError) {
    return (
      <ErrorState 
        message={candleError}
        onRetry={retryLocation}
        errorType="location"
        showRetry={true}
        showReportIssue={true}
      />
    );
  }

  // Show permission request UI
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 Location Permission Required</Text>
      <Text style={styles.subtitle}>
        This app needs your location to provide accurate weather forecasts and candle lighting times for your area.
      </Text>
      
      <View style={styles.featuresContainer}>
        <Text style={styles.featuresTitle}>What we use your location for:</Text>
        <Text style={styles.feature}>• Accurate weather forecasts for your area</Text>
        <Text style={styles.feature}>• Precise candle lighting times</Text>
        <Text style={styles.feature}>• Local timezone detection</Text>
        <Text style={styles.feature}>• City and region information</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={requestLocationPermission}>
        <Text style={styles.buttonText}>Grant Location Permission</Text>
      </TouchableOpacity>
      
      <Text style={styles.privacyNote}>
        Your location data is only used locally and is not stored or shared with third parties.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  featuresContainer: {
    alignSelf: 'stretch',
    marginBottom: 32,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 12,
    textAlign: 'center',
  },
  feature: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 8,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  privacyNote: {
    fontSize: 12,
    color: '#6c757d',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 16,
  },
});

export default LocationPermissionRequest; 