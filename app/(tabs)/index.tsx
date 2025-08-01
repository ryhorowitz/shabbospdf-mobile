import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LocationPermissionRequest from '../components/LocationPermissionRequest';
import { useShabbos } from '../context/shabbosContext';
import { extractCandleItems } from '../utils/candleDataUtils';
import { getWeatherIcon } from '../utils/weatherIconMapping';

export default function HomeScreen() {
  const router = useRouter();
  const { 
    geoData, 
    candleError, 
    candleLoading, 
    candleData,
    getShabbosDailySummaries
  } = useShabbos();

  // Extract candle items
  const { candleItem, parshahItem, havdalahItem } = extractCandleItems(candleData || { items: [] });
  const parshahEnglish = parshahItem ? "Parshas " + parshahItem.title.split(" ")[1] : "Unknown";

  // Get weather summaries
  const { friday: fridaySummary, saturday: saturdaySummary } = getShabbosDailySummaries(candleData || { items: [] });

  // Show location permission request if there's an error or still loading
  if (candleError || candleLoading) {
    return <LocationPermissionRequest />;
  }

  // Show main content if we have location data
  return (
    <LinearGradient
    colors={['#ff9a9e', '#fecfef']}     
    style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>גוט שבת • Good Shabbos</Text>
          <Text style={styles.subtitle}>
          Welcome to the Erev Shabbos Weather App! Get current weather and candle lighting times to prepare for Shabbos. Download a printable PDF and stay informed for a calm, organized Shabbos.
          </Text>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Candle Times Preview */}
          {candleItem && (
           
              <View style={styles.previewSection}>                
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
              <Text style={styles.sectionTitle}>🕯️ This Week&apos;s Candle Times</Text>

              <View style={styles.candlePreview}>
                <View style={styles.candleItem}>
                  <Text style={styles.candleLabel}>Candle Lighting</Text>
                  <Text style={styles.candleTime}>
                    {new Date(candleItem.date).toLocaleString('en-US', { 
                      hour: 'numeric', 
                      minute: '2-digit',
                      hour12: true 
                    })}
                  </Text>
                  <Text style={styles.candleDate}>
                    {new Date(candleItem.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </Text>
                </View>
                {havdalahItem && (
                  <View style={styles.candleItem}>
                    <Text style={styles.candleLabel}>Havdalah</Text>
                    <Text style={styles.candleTime}>
                      {new Date(havdalahItem.date).toLocaleString('en-US', { 
                        hour: 'numeric', 
                        minute: '2-digit',
                        hour12: true 
                      })}
                    </Text>
                    <Text style={styles.candleDate}>
                      {new Date(havdalahItem.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}

          {/* Weather Preview */}
          {(fridaySummary || saturdaySummary) && (
            <TouchableOpacity 
              style={styles.previewSection}
              onPress={() => router.replace('/weather')}
            >
                <Text style={styles.sectionTitle}>🌤️ Shabbos Weather Preview</Text>
                <View style={styles.weatherPreview}>
                  {fridaySummary && (
                    <View style={styles.weatherDay}>
                      <Text style={styles.dayTitle}>Friday</Text>
                                          <View style={styles.weatherContent}>
                      <View style={styles.weatherTopRow}>
                        <Text style={styles.weatherIcon}>
                          {getWeatherIcon(fridaySummary.shortForecast, fridaySummary.isDaytime)}
                        </Text>
                        <Text style={styles.temperature}>
                          {fridaySummary.temperature}°{fridaySummary.temperatureUnit || 'F'}
                        </Text>
                      </View>
                      <Text style={styles.forecast} numberOfLines={2}>
                        {fridaySummary.shortForecast}
                      </Text>
                    </View>
                    </View>
                  )}
                  {saturdaySummary && (
                    <View style={styles.weatherDay}>
                      <Text style={styles.dayTitle}>Saturday</Text>
                      <View style={styles.weatherContent}>
                        <View style={styles.weatherTopRow}>
                          <Text style={styles.weatherIcon}>
                            {getWeatherIcon(saturdaySummary.shortForecast, saturdaySummary.isDaytime)}
                          </Text>
                          <Text style={styles.temperature}>
                            {saturdaySummary.temperature}°{saturdaySummary.temperatureUnit || 'F'}
                          </Text>
                        </View>
                        <Text style={styles.forecast} numberOfLines={2}>
                          {saturdaySummary.shortForecast}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 8,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 13,
    textAlign: 'center',
    color: '#495057',
    lineHeight: 16,
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
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    ...(Platform.OS === 'ios' ? {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 8,
    } : {
      // No shadows on Android
    }),
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#1a1a1a',
  },
  candlePreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  candleItem: {
    alignItems: 'center',
    width: '45%',
  },
  candleLabel: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 4,
  },
  candleTime: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 4,
  },
  candleDate: {
    fontSize: 14,
    color: '#6c757d',
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
  weatherDay: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    ...(Platform.OS === 'ios' ? {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 8,
    } : {
      // No shadows on Android
    }),
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#1a1a1a',
  },
  weatherContent: {
    flexDirection: 'column',
  },
  weatherTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  weatherIcon: {
    fontSize: 36,
    marginRight: 12,
  },
  temperature: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 4,
  },
  forecast: {
    fontSize: 12,
    color: '#6c757d',
    lineHeight: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 8,
    ...(Platform.OS === 'ios' ? {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 8,
    } : {
      // No shadows on Android
    }),
  },
});
