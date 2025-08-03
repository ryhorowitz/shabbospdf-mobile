import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { textStyles } from '../../constants/CommonStyles';

interface LoadingStateProps {
  message?: string;
  size?: 'small' | 'large';
  color?: string;
  style?: any;
  showProgress?: boolean;
  progress?: number;
  loadingType?: 'general' | 'location' | 'weather' | 'candles' | 'network';
}

const LoadingState: React.FC<LoadingStateProps> = ({
  message,
  size = 'large',
  color = '#007AFF',
  style,
  showProgress = false,
  progress,
  loadingType = 'general'
}) => {
  const getDefaultMessage = () => {
    switch (loadingType) {
      case 'location':
        return 'Getting your location...';
      case 'weather':
        return 'Loading weather forecast...';
      case 'candles':
        return 'Loading candle times...';
      case 'network':
        return 'Checking network connection...';
      default:
        return 'Loading...';
    }
  };

  const getLoadingIcon = () => {
    switch (loadingType) {
      case 'location':
        return '📍';
      case 'weather':
        return '🌤️';
      case 'candles':
        return '🕯️';
      case 'network':
        return '📡';
      default:
        return '⏳';
    }
  };

  const displayMessage = message || getDefaultMessage();

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.loadingIcon}>{getLoadingIcon()}</Text>
      <ActivityIndicator size={size} color={color} style={styles.spinner} />
      <Text style={[textStyles.loading, styles.message]}>{displayMessage}</Text>
      
      {showProgress && progress !== undefined && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${Math.min(100, Math.max(0, progress))}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>{Math.round(progress)}%</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loadingIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  spinner: {
    marginBottom: 16,
  },
  message: {
    marginBottom: 8,
    textAlign: 'center',
    lineHeight: 20,
  },
  progressContainer: {
    width: '100%',
    marginTop: 16,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default LoadingState; 