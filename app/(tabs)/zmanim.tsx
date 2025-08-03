import { GeoLocation, Zmanim } from '@hebcal/core';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cardStyles } from '../../constants/CommonStyles';
import { useShabbos } from '../context/shabbosContext';
import { extractCandleItems } from '../utils/candleDataUtils';

// Types
interface ZmanimData {
  [key: string]: string;
}

interface ZmanimAccordionProps {
  title: string;
  date: Date;
  time?: string;
  expanded: boolean;
  onToggle: () => void;
  loading: boolean;
  zmanimData: ZmanimData | null;
  zmanimFields: { label: string; key: string }[];
  onExpand?: () => void;
}

// Utility functions
const formatTime = (date: Date | null): string => {
  if (!date || isNaN(date.getTime())) return 'N/A';
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const createGeoLocation = (geoData: any): GeoLocation => {
  const lat = parseFloat(geoData.loc.split(",")[0]);
  const lon = parseFloat(geoData.loc.split(",")[1]);
  return new GeoLocation(null, lat, lon, 0, geoData.timezone);
};

const getZmanimTimes = (gloc: GeoLocation, date: Date, fields: string[]): ZmanimData => {
  const zmanim = new Zmanim(gloc, date, false);
  const times: ZmanimData = {};
  
  // Manual mapping for known zmanim methods
  const zmanimMethods: { [key: string]: () => Date } = {
    alotHaShachar: () => zmanim.alotHaShachar(),
    sunrise: () => zmanim.sunrise(),
    misheyakir: () => zmanim.misheyakir(),
    sofZmanShma: () => zmanim.sofZmanShma(),
    sofZmanTfilla: () => zmanim.sofZmanTfilla(),
    chatzot: () => zmanim.chatzot(),
    minchaGedola: () => zmanim.minchaGedola(),
    minchaKetana: () => zmanim.minchaKetana(),
    plagHaMincha: () => zmanim.plagHaMincha(),
    sunset: () => zmanim.sunset(),
    tzeit: () => zmanim.tzeit(),
  };
  
  fields.forEach(field => {
    const method = zmanimMethods[field];
    if (method) {
      try {
        const result = method();
        times[field] = formatTime(result);
      } catch (error) {
        times[field] = 'N/A';
      }
    }
  });
  
  return times;
};

// Reusable Components
const LoadingScreen = ({ message }: { message: string }) => (
  <LinearGradient colors={['#f5f5f5', '#e0e0e0']} style={styles.container}>
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>{message}</Text>
      </View>
    </SafeAreaView>
  </LinearGradient>
);

const ErrorScreen = ({ error }: { error: string }) => (
  <LinearGradient colors={['#f5f5f5', '#e0e0e0']} style={styles.container}>
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading candle times: {error}</Text>
      </View>
    </SafeAreaView>
  </LinearGradient>
);

const ZmanimRow = ({ label, time }: { label: string; time: string }) => (
  <View style={styles.zmanimRow}>
    <Text style={styles.zmanimLabel}>{label}</Text>
    <Text style={styles.zmanimTime}>{time}</Text>
  </View>
);

const ZmanimAccordion = ({ 
  title, 
  date, 
  time, 
  expanded, 
  onToggle, 
  loading, 
  zmanimData, 
  zmanimFields,
  onExpand
}: ZmanimAccordionProps) => (
      <View style={[cardStyles.transparent, styles.accordionContainer]}>
      <TouchableOpacity 
        style={styles.accordionHeader} 
        onPress={() => {
          onToggle();
          if (!expanded && onExpand) {
            onExpand();
          }
        }}
      >
      <View style={styles.accordionHeaderContent}>
        <View style={styles.accordionHeaderLeft}>
          <Text style={styles.accordionTitle}>{title}</Text>
          {time && <Text style={styles.candleTime}>{time}</Text>}
          <Text style={styles.accordionDate}>{formatDate(date)}</Text>
        </View>
        <Text style={styles.accordionIcon}>{expanded ? '▼' : '▶'}</Text>
      </View>
    </TouchableOpacity>
    <Collapsible collapsed={!expanded}>
      <View style={styles.accordionBody}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#007AFF" />
            <Text style={styles.loadingText}>Loading zmanim...</Text>
          </View>
        ) : zmanimData ? (
          <View style={styles.zmanimGrid}>
            {zmanimFields.map(({ label, key }) => (
              <ZmanimRow key={key} label={label} time={zmanimData[key]} />
            ))}
          </View>
        ) : (
          <Text style={styles.noDataText}>No zmanim available.</Text>
        )}
      </View>
    </Collapsible>
  </View>
);

const ZmanimScreen = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const havdalahAccordionRef = useRef<View>(null);
  
  const {
    candleData,
    geoData,
    candleLoading: loading,
    candleError: error,
  } = useShabbos();

  const [fridayZmanim, setFridayZmanim] = useState<ZmanimData | null>(null);
  const [fridayZmanimLoading, setFridayZmanimLoading] = useState(false);
  const [saturdayZmanim, setSaturdayZmanim] = useState<ZmanimData | null>(null);
  const [saturdayZmanimLoading, setSaturdayZmanimLoading] = useState(false);
  
  const [fridayExpanded, setFridayExpanded] = useState(false);
  const [saturdayExpanded, setSaturdayExpanded] = useState(false);

  const scrollToHavdalah = () => {
    if (havdalahAccordionRef.current && scrollViewRef.current) {
      setTimeout(() => {
        havdalahAccordionRef.current?.measureLayout(
          scrollViewRef.current as any,
          (x, y) => {
            scrollViewRef.current?.scrollTo({
              y: y - 100, // Offset to show some content above
              animated: true,
            });
          },
          () => {
            // Fallback: scroll to bottom
            scrollViewRef.current?.scrollToEnd({ animated: true });
          }
        );
      }, 100); // Small delay to ensure accordion is expanded
    }
  };

  // Zmanim field configurations
  const fridayZmanimFields = [
    { label: 'Plag HaMincha', key: 'plagHaMincha' },
    { label: 'Tzeit', key: 'tzeit' }
  ];

  const saturdayZmanimFields = [
    { label: 'Alot Hashachar', key: 'alotHaShachar' },
    { label: 'Sunrise', key: 'sunrise' },
    { label: 'Misheyakir', key: 'misheyakir' },
    { label: 'Sof Zman Shma', key: 'sofZmanShma' },
    { label: 'Sof Zman Tfilla', key: 'sofZmanTfilla' },
    { label: 'Chatzot', key: 'chatzot' },
    { label: 'Plag HaMincha', key: 'plagHaMincha' },
    { label: 'Sunset', key: 'sunset' }
  ];

  // Fetch Friday zmanim
  useEffect(() => {
    if (!geoData || !candleData) return;
    
    const fetchFridayZmanim = async () => {
      try {
        setFridayZmanimLoading(true);
        const { candleItem } = extractCandleItems(candleData);
        if (!candleItem?.date) return;
        
        const gloc = createGeoLocation(geoData);
        const fridayDate = new Date(candleItem.date);
        const fields = fridayZmanimFields.map(f => f.key);
        
        const zmanimTimes = getZmanimTimes(gloc, fridayDate, fields);
        setFridayZmanim(zmanimTimes);
      } catch (err) {
        console.error("Error getting Friday zmanim:", err);
      } finally {
        setFridayZmanimLoading(false);
      }
    };
    
    fetchFridayZmanim();
  }, [geoData, candleData]);

  // Fetch Saturday zmanim
  useEffect(() => {
    if (!geoData || !candleData) return;
    
    const fetchSaturdayZmanim = async () => {
      try {
        setSaturdayZmanimLoading(true);
        const { candleItem } = extractCandleItems(candleData);
        if (!candleItem?.date) return;
        
        const gloc = createGeoLocation(geoData);
        const fridayDate = new Date(candleItem.date);
        const saturdayDate = new Date(fridayDate);
        saturdayDate.setDate(fridayDate.getDate() + 1);
        
        const fields = saturdayZmanimFields.map(f => f.key);
        const zmanimTimes = getZmanimTimes(gloc, saturdayDate, fields);
        setSaturdayZmanim(zmanimTimes);
      } catch (err) {
        console.error("Error getting Saturday zmanim:", err);
      } finally {
        setSaturdayZmanimLoading(false);
      }
    };
    
    fetchSaturdayZmanim();
  }, [geoData, candleData]);

  if (loading) return <LoadingScreen message="Loading candle times..." />;
  if (error) return <ErrorScreen error={error} />;
  if (!candleData) return <ErrorScreen error="No data available" />;

  const { candleItem, parshahItem, havdalahItem } = extractCandleItems(candleData);
  if (!parshahItem || !candleItem) return <ErrorScreen error="No data available" />;

  const parshahEnglish = "Parshas " + parshahItem.title.split(" ")[1];
  const fridayDate = new Date(candleItem.date);
  const saturdayDate = new Date(fridayDate);
  saturdayDate.setDate(fridayDate.getDate() + 1);
  
  const candleTime = formatTime(new Date(candleItem.date));
  const havdalahTime = havdalahItem?.date ? formatTime(new Date(havdalahItem.date)) : undefined;
  
  return (
    <LinearGradient colors={['#f5f5f5', '#e0e0e0']} style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ScrollView ref={scrollViewRef} style={styles.scrollView}>
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

            {/* Friday Candle Lighting Accordion */}
            <ZmanimAccordion
              title="🕯️ Candle Lighting"
              date={fridayDate}
              time={candleTime}
              expanded={fridayExpanded}
              onToggle={() => setFridayExpanded(!fridayExpanded)}
              loading={fridayZmanimLoading}
              zmanimData={fridayZmanim}
              zmanimFields={fridayZmanimFields}
            />

            {/* Saturday Shabbat Accordion */}
            {saturdayZmanim && (
              <View ref={havdalahAccordionRef}>
                <ZmanimAccordion
                  title="🕯️ Havdalah"
                  date={saturdayDate}
                  time={havdalahTime}
                  expanded={saturdayExpanded}
                  onToggle={() => setSaturdayExpanded(!saturdayExpanded)}
                  loading={saturdayZmanimLoading}
                  zmanimData={saturdayZmanim}
                  zmanimFields={saturdayZmanimFields}
                  onExpand={scrollToHavdalah}
                />
              </View>
            )}
          </View>
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
    marginBottom: 0,
    borderRadius: 16,
    overflow: 'hidden',
  },
  accordionHeader: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
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
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#e9ecef',
  },
  candleTime: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 12,
    marginLeft: 40,
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