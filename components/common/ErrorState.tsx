import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { textStyles } from '../../constants/CommonStyles';

interface ErrorStateProps {
  message: string;
  showIcon?: boolean;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message, showIcon = true }) => {
  return (
    <View style={styles.container}>
      {showIcon && <Text style={styles.icon}>⚠️</Text>}
      <Text style={[textStyles.error, styles.message]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    fontSize: 48,
    marginBottom: 16,
  },
  message: {
    textAlign: 'center',
  },
});

export default ErrorState; 