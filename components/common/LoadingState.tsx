import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { textStyles } from '../../constants/CommonStyles';

interface LoadingStateProps {
  message?: string;
  size?: 'small' | 'large';
  color?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = 'Loading...', 
  size = 'large', 
  color = '#007AFF' 
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      <Text style={[textStyles.loading, styles.message]}>{message}</Text>
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
  message: {
    marginTop: 8,
  },
});

export default LoadingState; 