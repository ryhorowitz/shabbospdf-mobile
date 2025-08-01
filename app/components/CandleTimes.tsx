import React from 'react';
import { ActivityIndicator, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useShabbos } from '../context/shabbosContext';
import { extractCandleItems } from '../utils/candleDataUtils';

const CandleTimes: React.FC = () => {
  const {
    candleData,
    geoData,
    candleLoading: loading,
    candleError: error,
  } = useShabbos();

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading candle times...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error loading candle times: {error}</Text>
      </View>
    );
  }

  if (!candleData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No candle data available</Text>
      </View>
    );
  }

  const { candleItem, parshahItem, havdalahItem } = extractCandleItems(candleData);
  const parshahEnglish = parshahItem ? "Parshas " + parshahItem.title.split(" ")[1] : "Unknown";

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {parshahItem && (
          <>
            <View style={styles.parshahSection}>
              <Text style={styles.parshahEnglish}>{parshahEnglish}</Text>
              <Text style={styles.parshahHebrew}>{parshahItem.hebrew}</Text>
            </View>

            <View style={styles.dateSection}>
              {parshahItem.date ? (
                <Text style={styles.hebrewDate}>{parshahItem.hdate}</Text>
              ) : (
                <Text style={styles.noDateText}>No Hebrew Date found.</Text>
              )}
            </View>

            {geoData && (
              <View style={styles.locationSection}>
                <Text style={styles.locationText}>
                  {geoData.city}, {geoData.region}
                </Text>
              </View>
            )}

            <View style={styles.timesContainer}>
              {candleItem && (
                <View style={styles.timeItem}>
                  <Text style={styles.dateLabel}>
                    {new Date(candleItem.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Text>
                  <Text style={styles.timeText}>{candleItem.title}</Text>
                </View>
              )}

              {havdalahItem && (
                <View style={styles.timeItem}>
                  <Text style={styles.dateLabel}>
                    {new Date(havdalahItem.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Text>
                  <Text style={styles.timeText}>{havdalahItem.title}</Text>
                </View>
              )}
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 16,
  },
  parshahSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  parshahEnglish: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  parshahHebrew: {
    fontSize: 20,
    textAlign: 'center',
  },
  dateSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  hebrewDate: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  noDateText: {
    color: '#6c757d',
    fontSize: 16,
  },
  locationSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  locationText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  timesContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    ...(Platform.OS === 'ios' ? {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
    } : {
      // No shadows on Android
    }),
  },
  timeItem: {
    marginBottom: 16,
  },
  dateLabel: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 4,
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: '#6c757d',
  },
  errorText: {
    fontSize: 16,
    color: '#dc3545',
    textAlign: 'center',
  },
});

export default CandleTimes; 