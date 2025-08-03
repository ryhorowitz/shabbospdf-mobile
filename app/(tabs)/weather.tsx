import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScreenLayout from '../../components/common/ScreenLayout';
import UserFeedback from '../../components/common/UserFeedback';
import LocationPermissionRequest from '../components/LocationPermissionRequest';
import WeatherContainer from '../components/WeatherContainer';
import { useShabbos } from '../context/shabbosContext';

export default function WeatherScreen() {
  const [forecastType, setForecastType] = useState<'daily' | 'hourly'>('daily');
  const [showFeedback, setShowFeedback] = useState(false);
  const { candleError, candleLoading } = useShabbos();

  // Show location permission request if there's an error or still loading
  if (candleError || candleLoading) {
    return <LocationPermissionRequest />;
  }

  return (
    <ScreenLayout 
      gradientColors={['#f5f5f5', '#e0e0e0']}
      contentPadding={0}
    >
      <View style={styles.section}>
        <WeatherContainer
          forecastType={forecastType}
          setForecastType={setForecastType}
        />
      </View>

      {/* Feedback Button */}
      <TouchableOpacity 
        style={styles.feedbackButton}
        onPress={() => setShowFeedback(true)}
      >
        <Text style={styles.feedbackButtonText}>💬 Report Issue</Text>
      </TouchableOpacity>

      {/* Feedback Modal */}
      <UserFeedback 
        visible={showFeedback}
        onClose={() => setShowFeedback(false)}
        feedbackType="bug"
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  feedbackButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  feedbackButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 