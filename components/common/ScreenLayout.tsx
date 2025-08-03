import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenLayoutProps {
  children: React.ReactNode;
  gradientColors?: string[];
  safeAreaEdges?: ('top' | 'bottom' | 'left' | 'right')[];
  scrollEnabled?: boolean;
  contentPadding?: number;
  style?: any;
}

const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  children,
  gradientColors = ['#f5f5f5', '#e0e0e0'],
  safeAreaEdges = ['top', 'left', 'right'],
  scrollEnabled = true,
  contentPadding = 16,
  style,
}) => {
  const ContentWrapper = scrollEnabled ? ScrollView : View;
  const contentStyle = scrollEnabled ? { flex: 1 } : { padding: contentPadding };

  return (
    <LinearGradient colors={gradientColors} style={[styles.container, style]}>
      <SafeAreaView style={styles.safeArea} edges={safeAreaEdges}>
        <ContentWrapper style={[styles.content, contentStyle]}>
          {children}
        </ContentWrapper>
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
  content: {
    flex: 1,
  },
});

export default ScreenLayout; 