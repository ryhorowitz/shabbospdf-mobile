import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { cardStyles, textStyles } from '../../constants/CommonStyles';
import { getWeatherSummary, WeatherData } from '../../utils/weatherUtils';

interface WeatherCardProps {
  data: WeatherData;
  title?: string;
  style?: any;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data, title, style }) => {
  const { icon, temperature, forecast } = getWeatherSummary(data);

  return (
    <View style={[cardStyles.weather, styles.container, style]}>
      {title && <Text style={[textStyles.heading, styles.title]}>{title}</Text>}
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.icon}>{icon}</Text>
          <Text style={styles.temperature}>{temperature}</Text>
        </View>
        <Text style={[textStyles.small, styles.forecast]} numberOfLines={2}>
          {forecast}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  title: {
    marginBottom: 8,
  },
  content: {
    flexDirection: 'column',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 36,
    marginRight: 12,
  },
  temperature: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  forecast: {
    lineHeight: 16,
  },
});

export default WeatherCard; 