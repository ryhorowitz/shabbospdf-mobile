import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { textStyles } from '../../constants/CommonStyles';
import { formatDateTime, formatShortDate, isValidDate } from '../../utils/dateTimeUtils';

interface CandleTimeCardProps {
  label: string;
  date: string | Date;
  style?: any;
}

const CandleTimeCard: React.FC<CandleTimeCardProps> = ({ label, date, style }) => {
  if (!isValidDate(date)) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <Text style={[textStyles.caption, styles.label]}>{label}</Text>
      <Text style={[textStyles.heading, styles.time]}>
        {formatDateTime(date)}
      </Text>
      <Text style={[textStyles.small, styles.date]}>
        {formatShortDate(date)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '45%',
  },
  label: {
    marginBottom: 4,
  },
  time: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 4,
  },
  date: {
    color: '#6c757d',
  },
});

export default CandleTimeCard; 