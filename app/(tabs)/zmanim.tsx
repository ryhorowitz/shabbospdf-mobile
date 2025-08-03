import { GeoLocation, Zmanim } from '@hebcal/core';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cardStyles } from '../../constants/CommonStyles';
import { useShabbos } from '../context/shabbosContext';
import { extractCandleItems } from '../utils/candleDataUtils';

const ZmanimScreen = () => {
  const {
    candleData,
    geoData,
    candleLoading: loading,
    candleError: error,
  } = useShabbos();

  const [zmanimData, setZmanimData] = useState(null);
  const [zmanimLoading, setZmanimLoading] = useState(false);
  const [fridayZmanim, setFridayZmanim] = useState(null);
  const [fridayZmanimLoading, setFridayZmanimLoading] = useState(false);
  const [saturdayZmanim, setSaturdayZmanim] = useState(null);
  const [saturdayZmanimLoading, setSaturdayZmanimLoading] = useState(false);
  
  // Accordion state
  const [todayExpanded, setTodayExpanded] = useState(true);
  const [fridayExpanded, setFridayExpanded] = useState(false);
  const [saturdayExpanded, setSaturdayExpanded] = useState(false);

  // Shared formatTime function
  const formatTime = (date) => {
    if (!date || isNaN(date.getTime())) return 'N/A';
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // Get zmanim using @hebcal/core Zmanim class
  useEffect(() => {
    if (!geoData) return;
    
    const getZmanim = () => {
      try {
        setZmanimLoading(true);
        const lat = parseFloat(geoData.loc.split(",")[0]);
        const lon = parseFloat(geoData.loc.split(",")[1]);
        
        // Create GeoLocation object for zmanim calculations
        const gloc = new GeoLocation(null, lat, lon, 0, geoData.timezone);
        
        // Get today's date
        const today = new Date();
        
        // Create Zmanim instance for today
        const zmanim = new Zmanim(gloc, today, false);
        
        // Extract zmanim times using the Zmanim class methods
        const zmanimTimes = {
          sunrise: zmanim.sunrise(),
          sunset: zmanim.sunset(),
          alotHaShachar: zmanim.alotHaShachar(),
          misheyakir: zmanim.misheyakir(),
          sofZmanShma: zmanim.sofZmanShma(),
          sofZmanTfilla: zmanim.sofZmanTfilla(),
          chatzot: zmanim.chatzot(),
          minchaGedola: zmanim.minchaGedola(),
          minchaKetana: zmanim.minchaKetana(),
          plagHaMincha: zmanim.plagHaMincha(),
          tzeit: zmanim.tzeit(),
        };
        
        const formattedZmanim = {
          sunrise: formatTime(zmanimTimes.sunrise),
          sunset: formatTime(zmanimTimes.sunset),
          alotHaShachar: formatTime(zmanimTimes.alotHaShachar),
          misheyakir: formatTime(zmanimTimes.misheyakir),
          sofZmanShma: formatTime(zmanimTimes.sofZmanShma),
          sofZmanTfilla: formatTime(zmanimTimes.sofZmanTfilla),
          chatzot: formatTime(zmanimTimes.chatzot),
          minchaGedola: formatTime(zmanimTimes.minchaGedola),
          minchaKetana: formatTime(zmanimTimes.minchaKetana),
          plagHaMincha: formatTime(zmanimTimes.plagHaMincha),
          tzeit: formatTime(zmanimTimes.tzeit),
        };
        
        setZmanimData(formattedZmanim);
      } catch (err) {
        console.error("Error getting zmanim:", err);
      } finally {
        setZmanimLoading(false);
      }
    };
    
    getZmanim();
  }, [geoData]);

  // Get Friday's zmanim for candle lighting date
  useEffect(() => {
    if (!geoData || !candleData) return;
    
    const getFridayZmanim = () => {
      try {
        setFridayZmanimLoading(true);
        const lat = parseFloat(geoData.loc.split(",")[0]);
        const lon = parseFloat(geoData.loc.split(",")[1]);
        
        // Create GeoLocation object for zmanim calculations
        const gloc = new GeoLocation(null, lat, lon, 0, geoData.timezone);
        
        // Get Friday's date from candle data
        const { candleItem } = extractCandleItems(candleData);
        if (!candleItem || !candleItem.date) return;
        
        const fridayDate = new Date(candleItem.date);
        
        // Create Zmanim instance for Friday
        const zmanim = new Zmanim(gloc, fridayDate, false);
        
        // Extract Friday's zmanim times
        const fridayZmanimTimes = {
          plagHaMincha: zmanim.plagHaMincha(),
          tzeit: zmanim.tzeit(),
        };
        
        const formattedFridayZmanim = {
          plagHaMincha: formatTime(fridayZmanimTimes.plagHaMincha),
          tzeit: formatTime(fridayZmanimTimes.tzeit),
        };
        
        setFridayZmanim(formattedFridayZmanim);
      } catch (err) {
        console.error("Error getting Friday zmanim:", err);
      } finally {
        setFridayZmanimLoading(false);
      }
    };
    
    getFridayZmanim();
  }, [geoData, candleData]);

  // Get Saturday's zmanim for Shabbat
  useEffect(() => {
    if (!geoData || !candleData) return;
    
    const getSaturdayZmanim = () => {
      try {
        setSaturdayZmanimLoading(true);
        const lat = parseFloat(geoData.loc.split(",")[0]);
        const lon = parseFloat(geoData.loc.split(",")[1]);
        
        // Create GeoLocation object for zmanim calculations
        const gloc = new GeoLocation(null, lat, lon, 0, geoData.timezone);
        
        // Get Saturday's date (day after Friday candle lighting)
        const { candleItem } = extractCandleItems(candleData);
        if (!candleItem || !candleItem.date) return;
        
        const fridayDate = new Date(candleItem.date);
        const saturdayDate = new Date(fridayDate);
        saturdayDate.setDate(fridayDate.getDate() + 1);
        
        // Create Zmanim instance for Saturday
        const zmanim = new Zmanim(gloc, saturdayDate, false);
        
        // Extract Saturday's zmanim times
        const saturdayZmanimTimes = {
          alotHaShachar: zmanim.alotHaShachar(),
          sunrise: zmanim.sunrise(),
          misheyakir: zmanim.misheyakir(),
          sofZmanShma: zmanim.sofZmanShma(),
          sofZmanTfilla: zmanim.sofZmanTfilla(),
          chatzot: zmanim.chatzot(),
          plagHaMincha: zmanim.plagHaMincha(),
          sunset: zmanim.sunset(),
        };
        
        const formattedSaturdayZmanim = {
          alotHaShachar: formatTime(saturdayZmanimTimes.alotHaShachar),
          sunrise: formatTime(saturdayZmanimTimes.sunrise),
          misheyakir: formatTime(saturdayZmanimTimes.misheyakir),
          sofZmanShma: formatTime(saturdayZmanimTimes.sofZmanShma),
          sofZmanTfilla: formatTime(saturdayZmanimTimes.sofZmanTfilla),
          chatzot: formatTime(saturdayZmanimTimes.chatzot),
          plagHaMincha: formatTime(saturdayZmanimTimes.plagHaMincha),
          sunset: formatTime(saturdayZmanimTimes.sunset),
        };
        
        setSaturdayZmanim(formattedSaturdayZmanim);
      } catch (err) {
        console.error("Error getting Saturday zmanim:", err);
      } finally {
        setSaturdayZmanimLoading(false);
      }
    };
    
    getSaturdayZmanim();
  }, [geoData, candleData]);

  if (loading) {
    return (
      <LinearGradient colors={['#f5f5f5', '#e0e0e0']} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Loading candle times...</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  if (error) {
    return (
      <LinearGradient colors={['#f5f5f5', '#e0e0e0']} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Error loading candle times: {error}</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  const { candleItem, parshahItem, havdalahItem } = extractCandleItems(candleData);
  const parshahEnglish = parshahItem ? "Parshas " + parshahItem.title.split(" ")[1] : "Unknown";
  
  return (
    <LinearGradient colors={['#f5f5f5', '#e0e0e0']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          {parshahItem && (
            <View style={styles.content}>
              {/* Parshah Header */}
              <View style={styles.parshahSection}>
                <Text style={styles.parshahTitle}>{parshahEnglish}</Text>
                <Text style={styles.parshahHebrew}>{parshahItem.hebrew}</Text>
              </View>

              {/* Hebrew Date */}
              <View style={styles.dateSection}>
                {parshahItem.date ? (
                  <Text style={styles.hebrewDate}>{parshahItem.hdate}</Text>
                ) : (
                  <Text style={styles.noDateText}>No Hebrew Date found.</Text>
                )}
              </View>

              {/* Location */}
              <View style={styles.locationSection}>
                <Text style={styles.locationText}>
                  📍 {geoData?.city}, {geoData?.region}
                </Text>
              </View>

              {/* Today's Zmanim Accordion */}
              <View style={[cardStyles.transparent, styles.accordionContainer]}>
                <TouchableOpacity 
                  style={styles.accordionHeader}
                  onPress={() => setTodayExpanded(!todayExpanded)}
                >
                  <View style={styles.accordionHeaderContent}>
                    <Text style={styles.accordionTitle}>🕐 Today's Zmanim</Text>
                    <Text style={styles.accordionIcon}>{todayExpanded ? '▼' : '▶'}</Text>
                  </View>
                </TouchableOpacity>
                <Collapsible collapsed={!todayExpanded}>
                  <View style={styles.accordionBody}>
                    {zmanimLoading ? (
                      <View style={styles.loadingContainer}>
                        <ActivityIndicator size="small" color="#007AFF" />
                        <Text style={styles.loadingText}>Loading today's zmanim...</Text>
                      </View>
                    ) : zmanimData ? (
                      <View style={styles.zmanimGrid}>
                        <View style={styles.zmanimRow}>
                          <Text style={styles.zmanimLabel}>Sunrise</Text>
                          <Text style={styles.zmanimTime}>{zmanimData.sunrise}</Text>
                        </View>
                        <View style={styles.zmanimRow}>
                          <Text style={styles.zmanimLabel}>Sunset</Text>
                          <Text style={styles.zmanimTime}>{zmanimData.sunset}</Text>
                        </View>
                        <View style={styles.zmanimRow}>
                          <Text style={styles.zmanimLabel}>Alot Hashachar</Text>
                          <Text style={styles.zmanimTime}>{zmanimData.alotHaShachar}</Text>
                        </View>
                        <View style={styles.zmanimRow}>
                          <Text style={styles.zmanimLabel}>Misheyakir</Text>
                          <Text style={styles.zmanimTime}>{zmanimData.misheyakir}</Text>
                        </View>
                        <View style={styles.zmanimRow}>
                          <Text style={styles.zmanimLabel}>Sof Zman Shma</Text>
                          <Text style={styles.zmanimTime}>{zmanimData.sofZmanShma}</Text>
                        </View>
                        <View style={styles.zmanimRow}>
                          <Text style={styles.zmanimLabel}>Sof Zman Tfilla</Text>
                          <Text style={styles.zmanimTime}>{zmanimData.sofZmanTfilla}</Text>
                        </View>
                        <View style={styles.zmanimRow}>
                          <Text style={styles.zmanimLabel}>Chatzot</Text>
                          <Text style={styles.zmanimTime}>{zmanimData.chatzot}</Text>
                        </View>
                        <View style={styles.zmanimRow}>
                          <Text style={styles.zmanimLabel}>Plag HaMincha</Text>
                          <Text style={styles.zmanimTime}>{zmanimData.plagHaMincha}</Text>
                        </View>
                        <View style={styles.zmanimRow}>
                          <Text style={styles.zmanimLabel}>Tzeit</Text>
                          <Text style={styles.zmanimTime}>{zmanimData.tzeit}</Text>
                        </View>
                      </View>
                    ) : (
                      <Text style={styles.noDataText}>No zmanim available.</Text>
                    )}
                  </View>
                </Collapsible>
              </View>

              {/* Friday Candle Lighting Accordion */}
              {candleItem && candleItem.title && (
                <View style={[cardStyles.transparent, styles.accordionContainer]}>
                  <TouchableOpacity 
                    style={styles.accordionHeader}
                    onPress={() => setFridayExpanded(!fridayExpanded)}
                  >
                    <View style={styles.accordionHeaderContent}>
                      <View style={styles.accordionHeaderLeft}>
                        <Text style={styles.accordionTitle}>🕯️ Friday Candle Lighting</Text>
                        <Text style={styles.accordionDate}>
                          {new Date(candleItem.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </Text>
                      </View>
                      <Text style={styles.accordionIcon}>{fridayExpanded ? '▼' : '▶'}</Text>
                    </View>
                  </TouchableOpacity>
                  <Collapsible collapsed={!fridayExpanded}>
                    <View style={styles.accordionBody}>
                      <Text style={styles.candleTime}>
                        {new Date(candleItem.date).toLocaleTimeString('en-US', { 
                          hour: 'numeric', 
                          minute: '2-digit',
                          hour12: true 
                        })}
                      </Text>
                      
                      {fridayZmanimLoading ? (
                        <View style={styles.loadingContainer}>
                          <ActivityIndicator size="small" color="#007AFF" />
                          <Text style={styles.loadingText}>Loading Friday zmanim...</Text>
                        </View>
                      ) : fridayZmanim ? (
                        <View style={styles.fridayZmanim}>
                          <View style={styles.zmanimRow}>
                            <Text style={styles.zmanimLabel}>Plag HaMincha</Text>
                            <Text style={styles.zmanimTime}>{fridayZmanim.plagHaMincha}</Text>
                          </View>
                          <View style={styles.zmanimRow}>
                            <Text style={styles.zmanimLabel}>Tzeit</Text>
                            <Text style={styles.zmanimTime}>{fridayZmanim.tzeit}</Text>
                          </View>
                        </View>
                      ) : (
                        <Text style={styles.noDataText}>No Friday zmanim available.</Text>
                      )}
                    </View>
                  </Collapsible>
                </View>
              )}

              {/* Saturday Shabbat Accordion */}
              {saturdayZmanim && (
                <View style={[cardStyles.transparent, styles.accordionContainer]}>
                  <TouchableOpacity 
                    style={styles.accordionHeader}
                    onPress={() => setSaturdayExpanded(!saturdayExpanded)}
                  >
                    <View style={styles.accordionHeaderContent}>
                      <View style={styles.accordionHeaderLeft}>
                        <Text style={styles.accordionTitle}>🕯️ Saturday Shabbat</Text>
                        <Text style={styles.accordionDate}>
                          {(() => {
                            const fridayDate = new Date(candleItem.date);
                            const saturdayDate = new Date(fridayDate);
                            saturdayDate.setDate(fridayDate.getDate() + 1);
                            return saturdayDate.toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            });
                          })()}
                        </Text>
                      </View>
                      <Text style={styles.accordionIcon}>{saturdayExpanded ? '▼' : '▶'}</Text>
                    </View>
                  </TouchableOpacity>
                  <Collapsible collapsed={!saturdayExpanded}>
                    <View style={styles.accordionBody}>
                      {saturdayZmanimLoading ? (
                        <View style={styles.loadingContainer}>
                          <ActivityIndicator size="small" color="#007AFF" />
                          <Text style={styles.loadingText}>Loading Saturday zmanim...</Text>
                        </View>
                      ) : saturdayZmanim ? (
                        <View style={styles.zmanimGrid}>
                          <View style={styles.zmanimRow}>
                            <Text style={styles.zmanimLabel}>Alot Hashachar</Text>
                            <Text style={styles.zmanimTime}>{saturdayZmanim.alotHaShachar}</Text>
                          </View>
                          <View style={styles.zmanimRow}>
                            <Text style={styles.zmanimLabel}>Sunrise</Text>
                            <Text style={styles.zmanimTime}>{saturdayZmanim.sunrise}</Text>
                          </View>
                          <View style={styles.zmanimRow}>
                            <Text style={styles.zmanimLabel}>Misheyakir</Text>
                            <Text style={styles.zmanimTime}>{saturdayZmanim.misheyakir}</Text>
                          </View>
                          <View style={styles.zmanimRow}>
                            <Text style={styles.zmanimLabel}>Sof Zman Shma</Text>
                            <Text style={styles.zmanimTime}>{saturdayZmanim.sofZmanShma}</Text>
                          </View>
                          <View style={styles.zmanimRow}>
                            <Text style={styles.zmanimLabel}>Sof Zman Tfilla</Text>
                            <Text style={styles.zmanimTime}>{saturdayZmanim.sofZmanTfilla}</Text>
                          </View>
                          <View style={styles.zmanimRow}>
                            <Text style={styles.zmanimLabel}>Chatzot</Text>
                            <Text style={styles.zmanimTime}>{saturdayZmanim.chatzot}</Text>
                          </View>
                          <View style={styles.zmanimRow}>
                            <Text style={styles.zmanimLabel}>Plag HaMincha</Text>
                            <Text style={styles.zmanimTime}>{saturdayZmanim.plagHaMincha}</Text>
                          </View>
                          <View style={styles.zmanimRow}>
                            <Text style={styles.zmanimLabel}>Sunset</Text>
                            <Text style={styles.zmanimTime}>{saturdayZmanim.sunset}</Text>
                          </View>
                        </View>
                      ) : (
                        <Text style={styles.noDataText}>No Saturday zmanim available.</Text>
                      )}
                    </View>
                  </Collapsible>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

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
  content: {
    padding: 16,
  },
  parshahSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  parshahTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  parshahHebrew: {
    fontSize: 18,
    color: '#495057',
    textAlign: 'center',
    marginTop: 4,
  },
  dateSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  hebrewDate: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
  },
  noDateText: {
    color: '#6c757d',
    fontSize: 16,
  },
  locationSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  locationText: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: '600',
  },
  accordionContainer: {
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  accordionHeader: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  accordionHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accordionHeaderLeft: {
    flex: 1,
  },
  accordionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  accordionDate: {
    fontSize: 14,
    color: '#6c757d',
  },
  accordionIcon: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  accordionBody: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
  zmanimSection: {
    marginBottom: 20,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1a1a1a',
  },
  dateText: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 8,
  },
  candleTime: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 12,
  },
  zmanimGrid: {
    gap: 8,
  },
  zmanimRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  zmanimLabel: {
    fontSize: 14,
    color: '#6c757d',
    flex: 1,
  },
  zmanimTime: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a1a1a',
    flex: 1,
    textAlign: 'right',
  },
  fridayZmanim: {
    gap: 8,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 8,
    color: '#6c757d',
    fontSize: 14,
  },
  errorContainer: {
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#dc3545',
    fontSize: 16,
    textAlign: 'center',
  },
  noDataText: {
    color: '#6c757d',
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default ZmanimScreen; 