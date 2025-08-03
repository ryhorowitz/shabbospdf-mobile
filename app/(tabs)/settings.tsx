import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ScreenLayout from '../../components/common/ScreenLayout';
import { useThemeColor } from '../../hooks/useThemeColor';
import LegalDocuments from '../components/LegalDocuments';

export default function SettingsScreen() {
  const [showLegalDocuments, setShowLegalDocuments] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');

  const handleLegalDocuments = () => {
    setShowLegalDocuments(true);
  };

  const handleAbout = () => {
    Alert.alert(
      'About Shabbos Weather',
      'Version 1.0.0\n\nA free app that provides weather forecasts and candle lighting times for Shabbos preparation.\n\nThis app uses your location to provide accurate, location-based weather information and Jewish calendar data.\n\nNo personal data is stored or collected.',
      [{ text: 'OK' }]
    );
  };

  const handleContact = () => {
    Alert.alert(
      'Contact Us',
      'For support or questions about this app:\n\nEmail: [Your Contact Email]\nWebsite: [Your Website]\n\nWe\'re here to help!',
      [{ text: 'OK' }]
    );
  };

  const handlePrivacyInfo = () => {
    Alert.alert(
      'Privacy Information',
      '🔒 Your Privacy Matters\n\n• We do not store any personal data\n• Location is used only for weather and candle times\n• No data is shared with third parties\n• All processing happens in real-time\n\nYour privacy is our priority!',
      [{ text: 'OK' }]
    );
  };

  const renderSettingItem = (
    icon: string,
    title: string,
    subtitle?: string,
    onPress?: () => void,
    showSwitch?: boolean,
    switchValue?: boolean,
    onSwitchChange?: (value: boolean) => void
  ) => (
    <TouchableOpacity
      style={[styles.settingItem, { borderBottomColor: textColor + '20' }]}
      onPress={onPress}
      disabled={showSwitch}
    >
      <View style={styles.settingLeft}>
        <FontAwesome
          name={icon as any}
          size={20}
          color={tintColor}
          style={styles.settingIcon}
        />
        <View style={styles.settingText}>
          <Text style={[styles.settingTitle, { color: textColor }]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={[styles.settingSubtitle, { color: textColor + '80' }]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {showSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: '#767577', true: tintColor + '40' }}
          thumbColor={switchValue ? tintColor : '#f4f3f4'}
        />
      ) : (
        <FontAwesome
          name="chevron-right"
          size={16}
          color={textColor + '60'}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <ScreenLayout
      gradientColors={['#f5f5f5', '#e0e0e0']}
      contentPadding={0}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            App Settings
          </Text>
          {renderSettingItem(
            'bell',
            'Notifications',
            'Get weather alerts and reminders',
            undefined,
            true,
            notificationsEnabled,
            setNotificationsEnabled
          )}
          {renderSettingItem(
            'map-marker',
            'Location Services',
            'Required for accurate weather and times',
            undefined,
            true,
            locationEnabled,
            setLocationEnabled
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            Legal & Privacy
          </Text>
          {renderSettingItem(
            'shield',
            'Privacy Information',
            'Learn about our privacy practices',
            handlePrivacyInfo
          )}
          {renderSettingItem(
            'file-text-o',
            'Legal Documents',
            'Terms of Service, Privacy Policy, Data Retention',
            handleLegalDocuments
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            Support
          </Text>
          {renderSettingItem(
            'info-circle',
            'About',
            'App version and information',
            handleAbout
          )}
          {renderSettingItem(
            'envelope',
            'Contact Us',
            'Get help and support',
            handleContact
          )}
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: textColor + '60' }]}>
            Shabbos Weather v1.0.0
          </Text>
          <Text style={[styles.footerText, { color: textColor + '60' }]}>
            Free for personal use only
          </Text>
        </View>
      </ScrollView>

      <LegalDocuments
        visible={showLegalDocuments}
        onClose={() => setShowLegalDocuments(false)}
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 12,
    marginTop: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: 12,
    width: 24,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 4,
  },
}); 