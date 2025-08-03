import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { textStyles } from '../../constants/CommonStyles';

interface OfflineStateProps {
  onRetry?: () => void;
  message?: string;
  style?: any;
}

const OfflineState: React.FC<OfflineStateProps> = ({ 
  onRetry, 
  message = "You're currently offline. Some features may not be available.",
  style 
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.offlineIcon}>📡</Text>
      <Text style={[textStyles.error, styles.title]}>No Internet Connection</Text>
      <Text style={styles.message}>{message}</Text>
      
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>What you can do:</Text>
        <Text style={styles.tip}>• Check your Wi-Fi or cellular connection</Text>
        <Text style={styles.tip}>• Try moving to an area with better signal</Text>
        <Text style={styles.tip}>• Restart your device's network settings</Text>
        <Text style={styles.tip}>• View previously loaded data (if available)</Text>
      </View>
      
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
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
  offlineIcon: {
    fontSize: 64,
    marginBottom: 16,
    opacity: 0.7,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  tipsContainer: {
    alignSelf: 'stretch',
    marginBottom: 24,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 8,
  },
  tip: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 4,
    lineHeight: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default OfflineState; 