import React from 'react';
import { Alert, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { textStyles } from '../../constants/CommonStyles';

interface ErrorStateProps {
  message: string;
  style?: any;
  onRetry?: () => void;
  showRetry?: boolean;
  showReportIssue?: boolean;
  errorType?: 'network' | 'location' | 'weather' | 'general';
}

const ErrorState: React.FC<ErrorStateProps> = ({ 
  message, 
  style, 
  onRetry, 
  showRetry = true,
  showReportIssue = true,
  errorType = 'general'
}) => {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    }
  };

  const handleReportIssue = () => {
    Alert.alert(
      'Report Issue',
      'Would you like to report this issue to our support team?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Email Support', 
          onPress: () => {
            const subject = encodeURIComponent(`Shabbos Weather App Issue - ${errorType}`);
            const body = encodeURIComponent(
              `Issue Type: ${errorType}\n\nError Message: ${message}\n\nPlease describe what you were doing when this error occurred:\n\n`
            );
            const mailtoUrl = `mailto:admin@shabbosweather.com?subject=${subject}&body=${body}`;
            Linking.openURL(mailtoUrl);
          }
        }
      ]
    );
  };

  const getErrorIcon = () => {
    switch (errorType) {
      case 'network':
        return '📡';
      case 'location':
        return '📍';
      case 'weather':
        return '🌤️';
      default:
        return '⚠️';
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.errorIcon}>{getErrorIcon()}</Text>
      <Text style={[textStyles.error, styles.message]}>{message}</Text>
      
      <View style={styles.buttonContainer}>
        {showRetry && onRetry && (
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        )}
        
        {showReportIssue && (
          <TouchableOpacity style={styles.reportButton} onPress={handleReportIssue}>
            <Text style={styles.reportButtonText}>Report Issue</Text>
          </TouchableOpacity>
        )}
      </View>
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
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  message: {
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  reportButton: {
    backgroundColor: '#6c757d',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  reportButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ErrorState; 