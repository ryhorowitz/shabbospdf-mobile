import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CandleTimeCard from '../../components/common/CandleTimeCard';
import ScreenLayout from '../../components/common/ScreenLayout';
import UserFeedback from '../../components/common/UserFeedback';
import WeatherCard from '../../components/common/WeatherCard';
import { cardStyles, textStyles } from '../../constants/CommonStyles';
import LocationPermissionRequest from '../components/LocationPermissionRequest';
import { useShabbos } from '../context/shabbosContext';
import { extractCandleItems } from '../utils/candleDataUtils';

export default function HomeScreen() {
  const router = useRouter();
  const [showFeedback, setShowFeedback] = useState(false);
  const { 
    geoData, 
    candleError, 
    candleLoading, 
    candleData,
    getShabbosDailySummaries
  } = useShabbos();

  // Show location permission request if there's an error or still loading
  if (candleError || candleLoading) {
    return <LocationPermissionRequest />;
  }

  // Extract candle items
  const { candleItem, parshahItem, havdalahItem } = extractCandleItems(candleData || { items: [] });
  const parshahEnglish = parshahItem ? "Parshas " + parshahItem.title.split(" ")[1] : "Unknown";

  // Get weather summaries
  const { friday: fridaySummary, saturday: saturdaySummary } = getShabbosDailySummaries(candleData || { items: [] });

  return (
    <ScreenLayout>
      {/* Header */}
      <View style={styles.header}>
        <Text style={textStyles.title}>גוט שבת • Good Shabbos</Text>
        <Text style={textStyles.subtitle}>
          Welcome to the Shabbos Weather App! Get current weather and candle lighting times to prepare for Shabbos. Download a printable PDF and stay informed for a calm, organized Shabbos.
        </Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Candle Times Preview */}
        {candleItem && (
          <TouchableOpacity 
            style={styles.previewSection}
            onPress={() => router.replace('/zmanim')}
          >                
            {/* Parshah Section */}
            {parshahItem && (
              <View style={styles.parshahSection}>
                <Text style={styles.parshahText}>
                  {parshahEnglish} • {parshahItem.hebrew}
                </Text>
              </View>
            )}

            {/* Date Section */}
            {parshahItem && (
              <View style={styles.dateSection}>
                {parshahItem.date ? (
                  <Text style={styles.hebrewDate}>{parshahItem.hdate}</Text>
                ) : (
                  <Text style={styles.noDateText}>No Hebrew Date found.</Text>
                )}
              </View>
            )}

            {/* Location Section */}
            {geoData && (
              <View style={styles.locationSection}>
                <Text style={styles.locationText}>
                  📍 {geoData.city}, {geoData.region}
                </Text>
              </View>
            )}

            <Text style={textStyles.heading}>🕯️ This Week&apos;s Candle Times</Text>

            <View style={styles.candlePreview}>
              <CandleTimeCard 
                label="Candle Lighting" 
                date={candleItem.date} 
              />
              {havdalahItem && (
                <CandleTimeCard 
                  label="Havdalah" 
                  date={havdalahItem.date} 
                />
              )}
            </View>
          </TouchableOpacity>
        )}

        {/* Weather Preview */}
        {(fridaySummary || saturdaySummary) && (
          <TouchableOpacity 
            style={styles.previewSection}
            onPress={() => router.replace('/weather')}
          >
            <Text style={textStyles.heading}>🌤️ Shabbos Weather Preview</Text>
            <View style={styles.weatherPreview}>
              {fridaySummary && (
                <WeatherCard 
                  data={fridaySummary} 
                  title="Friday" 
                />
              )}
              {saturdaySummary && (
                <WeatherCard 
                  data={saturdaySummary} 
                  title="Saturday" 
                />
              )}
            </View>
          </TouchableOpacity>
        )}

        {/* Feedback Button */}
        <TouchableOpacity 
          style={styles.feedbackButton}
          onPress={() => setShowFeedback(true)}
        >
          <Text style={styles.feedbackButtonText}>💬 Send Feedback</Text>
        </TouchableOpacity>
      </View>

      {/* Feedback Modal */}
      <UserFeedback 
        visible={showFeedback}
        onClose={() => setShowFeedback(false)}
        feedbackType="general"
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 8,
    backgroundColor: 'transparent',
  },
  locationText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#007AFF',
    marginVertical: 8,
    fontWeight: '600',
  },
  parshahSection: {
    alignItems: 'center',
    marginBottom: 4,
  },
  dateSection: {
    alignItems: 'center',
  },
  hebrewDate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
  },
  noDateText: {
    color: '#6c757d',
    fontSize: 16,
  },
  locationSection: {
    alignItems: 'center',
    marginBottom: 8,
  },
  content: {
    paddingHorizontal: 8,
  },
  previewSection: {
    ...cardStyles.transparent,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  candlePreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  parshahText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1a1a1a',
  },
  weatherPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  feedbackButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  feedbackButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
