import { Platform, StyleSheet } from 'react-native';

// Theme Colors
export const Colors = {
  primary: '#007AFF',
  secondary: '#1976d2',
  background: '#f8f9fa',
  white: '#ffffff',
  text: {
    primary: '#1a1a1a',
    secondary: '#495057',
    muted: '#6c757d',
    error: '#dc3545',
  },
  border: {
    light: '#e9ecef',
    lighter: '#f8f9fa',
  },
  gradient: {
    start: '#ff9a9e',
    end: '#fecfef',
  },
};

// Typography
export const Typography = {
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  body: {
    fontSize: 16,
    color: Colors.text.secondary,
  },
  caption: {
    fontSize: 14,
    color: Colors.text.muted,
  },
  small: {
    fontSize: 12,
    color: Colors.text.muted,
  },
};

// Spacing
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

// Border Radius
export const BorderRadius = {
  sm: 6,
  md: 8,
  lg: 12,
};

// Common Shadow Styles
export const Shadows = {
  light: Platform.OS === 'ios' ? {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  } : {},
  medium: Platform.OS === 'ios' ? {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  } : {},
};

// Common Layout Styles
export const Layout = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.lg,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

// Common Card Styles
export const Cards = StyleSheet.create({
  base: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    marginBottom: Spacing.sm,
    ...Shadows.light,
  },
  transparent: {
    backgroundColor: 'transparent',
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    marginBottom: Spacing.sm,
    ...Shadows.medium,
  },
  weather: {
    backgroundColor: 'transparent',
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    width: '48%',
    ...Shadows.medium,
  },
});

// Common Text Styles
export const TextStyles = StyleSheet.create({
  title: {
    ...Typography.title,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  subtitle: {
    ...Typography.subtitle,
    textAlign: 'center',
  },
  heading: {
    ...Typography.heading,
    marginBottom: Spacing.xs,
  },
  body: {
    ...Typography.body,
  },
  caption: {
    ...Typography.caption,
    marginBottom: Spacing.xs,
  },
  small: {
    ...Typography.small,
  },
  center: {
    textAlign: 'center',
  },
  error: {
    fontSize: 16,
    color: Colors.text.error,
    textAlign: 'center',
  },
  loading: {
    fontSize: 16,
    color: Colors.text.muted,
    textAlign: 'center',
  },
});

// Common Button Styles
export const Buttons = StyleSheet.create({
  primary: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    backgroundColor: Colors.text.muted,
  },
  text: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

// Common Table Styles
export const Tables = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
    ...Shadows.light,
  },
  header: {
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderTopLeftRadius: BorderRadius.lg,
    borderTopRightRadius: BorderRadius.lg,
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    padding: Spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.lighter,
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: Spacing.xs,
    paddingBottom: Spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  cell: {
    flex: 1,
    fontSize: 12,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  headerCell: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  tempCell: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
  },
});

// Common Toggle Styles
export const Toggles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.border.light,
    borderRadius: BorderRadius.md,
    padding: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  button: {
    flex: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: Colors.primary,
  },
  buttonText: {
    fontSize: 16,
    color: Colors.text.muted,
    fontWeight: '500',
  },
  activeButtonText: {
    color: Colors.white,
  },
}); 