import { Platform, StyleSheet } from 'react-native';

// Common shadow styles for iOS only
export const iOSShadows = {
  light: Platform.OS === 'ios' ? {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  } : {},
  medium: Platform.OS === 'ios' ? {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  } : {},
};

// Common card styles
export const cardStyles = StyleSheet.create({
  base: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 8,
    ...iOSShadows.medium,
  },
  transparent: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: 20,
    marginBottom: 8,
    ...iOSShadows.medium,
  },
  weather: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    ...iOSShadows.medium,
  },
});

// Common table styles
export const tableStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    ...iOSShadows.light,
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    padding: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: 4,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  cell: {
    flex: 1,
    fontSize: 12,
    color: '#495057',
    textAlign: 'center',
  },
  headerCell: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#495057',
    textAlign: 'center',
  },
  tempCell: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
  },
});

// Common text styles
export const textStyles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 13,
    textAlign: 'center',
    color: '#495057',
    lineHeight: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#1a1a1a',
  },
  body: {
    fontSize: 16,
    color: '#495057',
  },
  caption: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 4,
  },
  small: {
    fontSize: 12,
    color: '#6c757d',
  },
  error: {
    fontSize: 16,
    color: '#dc3545',
    textAlign: 'center',
  },
  loading: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
  },
});

// Common button styles
export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    backgroundColor: '#6c757d',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

// Common toggle styles
export const toggleStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#e9ecef',
    borderRadius: 8,
    padding: 4,
    marginBottom: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    fontSize: 16,
    color: '#6c757d',
    fontWeight: '500',
  },
  activeButtonText: {
    color: 'white',
  },
}); 