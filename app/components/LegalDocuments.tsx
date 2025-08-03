import { useState } from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useThemeColor } from '../../hooks/useThemeColor';

interface LegalDocument {
  title: string;
  content: string;
}

const legalDocuments: LegalDocument[] = [
  {
    title: 'Terms of Service',
    content: `# Terms of Service

**Last Updated: August 2025**

## 1. Acceptance of Terms

By downloading, installing, or using the "Shabbos Weather" mobile application (the "App"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the App.

## 2. Description of Service

The App provides weather forecasts and candle lighting times for Shabbos preparation. The App uses your device's location to provide accurate, location-based weather information and Jewish calendar data.

## 3. License and Usage

### 3.1 Personal Use License
We grant you a limited, non-exclusive, non-transferable, revocable license to use the App for personal, non-commercial purposes only.

### 3.2 Third-Party Usage Restrictions
**IMPORTANT**: This App is free for personal use but may not be used by any third party without explicit written permission from the App owner. This includes but is not limited to:
- Commercial use
- Integration into other applications
- Redistribution or resale
- Use in business or organizational settings without permission
- Any form of commercial exploitation

### 3.3 Prohibited Uses
You agree not to:
- Reverse engineer, decompile, or disassemble the App
- Modify, adapt, or create derivative works
- Remove or alter any copyright, trademark, or other proprietary notices
- Use the App for any illegal or unauthorized purpose
- Attempt to gain unauthorized access to any systems or networks

## 4. Location Services

### 4.1 Location Permission
The App requires access to your device's location to provide accurate weather forecasts and candle lighting times. You may grant or deny location permissions at any time through your device settings.

### 4.2 Location Data Usage
- Location data is used solely to provide weather and candle lighting information
- No location data is stored on our servers
- Location data is not shared with third parties
- Location data is processed in real-time and immediately discarded

## 5. Data and Privacy

### 5.1 No Data Storage
The App does not store any personal data, location information, or usage patterns on our servers. All data processing occurs locally on your device or through secure third-party weather APIs.

### 5.2 Third-Party Services
The App may use third-party services for weather data and location services. These services have their own privacy policies and terms of service.

## 6. Disclaimers

### 6.1 Weather Information
Weather forecasts are provided "as is" and may not be 100% accurate. We are not responsible for any decisions made based on weather information provided by the App.

### 6.2 Candle Lighting Times
Candle lighting times are calculated based on standard Jewish calendar algorithms and your location. While we strive for accuracy, we cannot guarantee the precision of these times.

### 6.3 Service Availability
We do not guarantee that the App will be available at all times or that it will be free from errors or interruptions.

## 7. Limitation of Liability

To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising out of or relating to your use of the App.

## 8. Intellectual Property

The App and its content, including but not limited to text, graphics, logos, and software, are owned by us or our licensors and are protected by copyright, trademark, and other intellectual property laws.

## 9. Termination

We may terminate or suspend your access to the App at any time, with or without cause, with or without notice. Upon termination, your right to use the App will cease immediately.

## 10. Changes to Terms

We reserve the right to modify these Terms at any time. We will notify users of any material changes by updating the "Last Updated" date at the top of these Terms. Your continued use of the App after such changes constitutes acceptance of the new Terms.

## 11. Governing Law

These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which the App owner resides, without regard to its conflict of law provisions.

## 12. Contact Information

If you have any questions about these Terms of Service, please contact us at:
- Email: [Your Contact Email]
- Website: [Your Website]

## 13. Severability

If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.

---

**By using the App, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.**`,
  },
  {
    title: 'Privacy Policy',
    content: `# Privacy Policy

**Last Updated: December 2024**

## 1. Introduction

This Privacy Policy describes how the "Shabbos Weather" mobile application (the "App") collects, uses, and protects your information. We are committed to protecting your privacy and being transparent about our data practices.

## 2. Information We Collect

### 2.1 Location Information
- **What we collect**: Your device's GPS coordinates or approximate location
- **How we collect it**: Through your device's location services with your explicit permission
- **Why we collect it**: To provide accurate weather forecasts and candle lighting times for your specific location
- **How long we keep it**: **We do not store any location data**. Location information is processed in real-time and immediately discarded.

### 2.2 Device Information
- **What we collect**: Basic device information (operating system, app version)
- **How we collect it**: Automatically through the app
- **Why we collect it**: To ensure compatibility and provide technical support
- **How long we keep it**: **We do not store this information on our servers**

### 2.3 Usage Information
- **What we collect**: App usage patterns and feature interactions
- **How we collect it**: Through app analytics (if enabled)
- **Why we collect it**: To improve app functionality and user experience
- **How long we keep it**: **We do not store this information on our servers**

## 3. How We Use Your Information

We use the information we collect solely to:
- Provide weather forecasts for your location
- Calculate accurate candle lighting times
- Improve app functionality and user experience
- Provide technical support

## 4. Data Storage and Retention

### 4.1 No Server Storage
**Important**: Our App does not store any personal data, location information, or usage patterns on our servers. All data processing occurs:
- Locally on your device
- Through secure third-party weather APIs
- In real-time with immediate disposal

### 4.2 Data Retention Policy
- **Location Data**: Not stored - processed and discarded immediately
- **Personal Information**: Not collected or stored
- **Usage Data**: Not stored on our servers
- **Analytics Data**: Not collected or stored

### 4.3 Third-Party Services
The App may use third-party services for:
- Weather data (e.g., OpenWeatherMap, WeatherAPI)
- Location services (device GPS)
- App analytics (optional, user-controlled)

These services have their own privacy policies and data retention practices.

## 5. Data Sharing and Disclosure

### 5.1 No Data Sharing
We do not share, sell, rent, or trade your personal information with third parties, except as described in this policy.

### 5.2 Third-Party Services
We may use third-party services that process data on our behalf:
- Weather data providers
- Location services
- Analytics services (if enabled by user)

These services are bound by their own privacy policies and data protection standards.

### 5.3 Legal Requirements
We may disclose information if required by law or to protect our rights, property, or safety.

## 6. Your Rights and Choices

### 6.1 Location Permissions
You can control location access through your device settings:
- **iOS**: Settings > Privacy & Security > Location Services
- **Android**: Settings > Location > App permissions

### 6.2 Data Access and Control
Since we don't store personal data, there is no personal data to access, modify, or delete from our servers.

### 6.3 Opt-Out Options
- Disable location services in your device settings
- Uninstall the app to stop all data collection

## 7. GDPR Compliance (European Union)

If you are located in the European Union, you have the following rights under GDPR:

### 7.1 Right to Access
You have the right to request information about what personal data we process. Since we don't store personal data, there is no stored data to access.

### 7.2 Right to Rectification
You have the right to correct inaccurate personal data. Since we don't store personal data, this right is not applicable.

### 7.3 Right to Erasure (Right to be Forgotten)
You have the right to request deletion of your personal data. Since we don't store personal data, there is no data to delete from our servers.

### 7.4 Right to Data Portability
You have the right to receive your personal data in a structured format. Since we don't store personal data, there is no data to export.

### 7.5 Right to Object
You have the right to object to processing of your personal data. You can do this by:
- Disabling location services
- Uninstalling the app

### 7.6 Right to Restrict Processing
You have the right to restrict processing of your personal data. Since we don't store personal data, this right is not applicable.

## 8. CCPA Compliance (California)

If you are a California resident, you have the following rights under CCPA:

### 8.1 Right to Know
You have the right to know what personal information we collect, use, and disclose. Since we don't store personal data, there is no stored data to disclose.

### 8.2 Right to Delete
You have the right to request deletion of your personal information. Since we don't store personal data, there is no data to delete from our servers.

### 8.3 Right to Opt-Out
You have the right to opt-out of the sale of personal information. We do not sell personal information.

### 8.4 Right to Non-Discrimination
You have the right to not receive discriminatory treatment for exercising your CCPA rights.

## 9. Data Security

### 9.1 Security Measures
While we don't store personal data on our servers, we implement appropriate security measures:
- Secure communication protocols (HTTPS)
- Regular security updates
- Secure third-party service integration

### 9.2 Data Breach Procedures
In the unlikely event of a data breach involving any personal information, we will:
- Notify affected users within 72 hours (GDPR requirement)
- Take immediate steps to contain and remediate the breach
- Cooperate with relevant authorities

## 10. Children's Privacy

Our App is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.

## 11. International Data Transfers

Since we don't store personal data on our servers, there are no international data transfers to disclose.

## 12. Changes to This Privacy Policy

We may update this Privacy Policy from time to time. We will notify you of any material changes by:
- Updating the "Last Updated" date
- Posting the updated policy in the app
- Sending a notification (if applicable)

## 13. Contact Information

If you have any questions about this Privacy Policy or our data practices, please contact us:

- **Email**: [Your Contact Email]
- **Website**: [Your Website]
- **Address**: [Your Business Address]

For GDPR-related inquiries, you may also contact your local data protection authority.

## 14. Data Protection Officer

Since we don't process personal data on a large scale, we are not required to appoint a Data Protection Officer under GDPR.

---

**By using the App, you acknowledge that you have read and understood this Privacy Policy and consent to the collection and use of information as described herein.**`,
  },
  {
    title: 'Data Retention Policy',
    content: `# Data Retention Policy

**Last Updated: December 2024**

## 1. Overview

This Data Retention Policy outlines how the "Shabbos Weather" mobile application handles data retention and storage practices. Our approach is designed to protect user privacy while providing essential app functionality.

## 2. Core Principle: No Data Storage

**Fundamental Policy**: Our App operates on a "no data storage" principle. We do not collect, store, or retain any personal information, location data, or usage patterns on our servers.

## 3. Data Categories and Retention Periods

### 3.1 Location Data
- **Collection**: Real-time GPS coordinates or approximate location
- **Processing**: Immediate processing for weather and candle lighting calculations
- **Storage**: **Zero retention** - data is processed and immediately discarded
- **Retention Period**: **0 seconds** - no storage occurs

### 3.2 Personal Information
- **Collection**: None
- **Processing**: Not applicable
- **Storage**: **None**
- **Retention Period**: **Not applicable** - no personal data is collected

### 3.3 Usage Analytics
- **Collection**: None (optional user-controlled analytics may be available)
- **Processing**: Not applicable
- **Storage**: **None**
- **Retention Period**: **Not applicable** - no usage data is stored

### 3.4 Device Information
- **Collection**: Basic device info (OS, app version) for compatibility
- **Processing**: Local processing only
- **Storage**: **None on servers**
- **Retention Period**: **0 seconds** - not stored

## 4. Data Processing Workflow

### 4.1 Real-Time Processing
\`\`\`
User Location → Weather API → Display Results → Discard Data
     ↓
Candle Times API → Display Results → Discard Data
\`\`\`

### 4.2 No Persistent Storage
- All data processing occurs in memory
- No databases or file systems store user data
- No logs contain personal information
- No backups contain user data

## 5. Third-Party Service Data Retention

### 5.1 Weather Data Providers
- **Service**: OpenWeatherMap, WeatherAPI, or similar
- **Data Sent**: Location coordinates only
- **Our Retention**: **0 seconds** - we don't store responses
- **Provider Retention**: Governed by their privacy policies

### 5.2 Location Services
- **Service**: Device GPS, Apple/Google Location Services
- **Data Processed**: Real-time location
- **Our Retention**: **0 seconds** - immediate disposal
- **Provider Retention**: Governed by device manufacturer policies

### 5.3 Analytics Services (Optional)
- **Service**: App analytics (if user enables)
- **Data Collected**: Usage patterns (user-controlled)
- **Our Retention**: **0 seconds** - we don't store analytics data
- **Provider Retention**: Governed by analytics service policies

## 6. Data Disposal Procedures

### 6.1 Immediate Disposal
Since we don't store data, disposal occurs automatically:
- Location data: Discarded after API call completion
- Weather data: Discarded after display
- Candle times: Discarded after calculation

### 6.2 No Manual Disposal Required
- No databases to clean
- No files to delete
- No logs to purge
- No backups to remove

## 7. Data Subject Rights Compliance

### 7.1 Right to Access
- **Request**: "What data do you have about me?"
- **Response**: "We don't store any personal data about you."

### 7.2 Right to Deletion
- **Request**: "Delete all my data"
- **Response**: "There is no stored data to delete."

### 7.3 Right to Portability
- **Request**: "Give me my data"
- **Response**: "We don't have any stored data to provide."

### 7.4 Right to Rectification
- **Request**: "Correct my data"
- **Response**: "We don't store data that can be corrected."

## 8. Audit and Compliance

### 8.1 Regular Reviews
We conduct quarterly reviews to ensure:
- No data storage systems are implemented
- Third-party services remain compliant
- Privacy policies remain accurate

### 8.2 Compliance Verification
- **GDPR**: No personal data storage = minimal compliance burden
- **CCPA**: No personal information collection = minimal compliance burden
- **COPPA**: No data collection from children under 13

### 8.3 Documentation
We maintain documentation of our no-storage approach:
- This Data Retention Policy
- Privacy Policy
- Terms of Service
- Technical architecture documentation

## 9. Data Breach Response

### 9.1 Breach Assessment
In the unlikely event of a data breach:
1. Assess what data (if any) was compromised
2. Since we don't store data, impact should be minimal
3. Notify relevant authorities if required
4. Notify users if any data was involved

### 9.2 Response Timeline
- **Detection**: Immediate (automated monitoring)
- **Assessment**: Within 24 hours
- **Notification**: Within 72 hours (if applicable)
- **Remediation**: Immediate (if applicable)

## 10. Changes to Retention Policy

### 10.1 Policy Updates
If we ever change our no-storage approach:
- 30-day advance notice to users
- Clear explanation of changes
- Updated privacy policy
- User consent for new data practices

### 10.2 Version Control
- All policy changes are versioned
- Change history is maintained
- Previous versions are archived

## 11. Contact Information

For questions about this Data Retention Policy:

- **Email**: [Your Contact Email]
- **Website**: [Your Website]
- **Address**: [Your Business Address]

## 12. Policy Review Schedule

- **Annual Review**: Complete policy review
- **Quarterly Check**: Verify no-storage compliance
- **Monthly Monitoring**: Ensure no data storage systems are added

---

**This Data Retention Policy reflects our commitment to user privacy through a zero-data-storage approach. By not storing personal information, we eliminate the risks associated with data retention and provide maximum privacy protection to our users.**`,
  },
];

interface LegalDocumentsProps {
  visible: boolean;
  onClose: () => void;
}

export default function LegalDocuments({ visible, onClose }: LegalDocumentsProps) {
  const [selectedDocument, setSelectedDocument] = useState<LegalDocument | null>(null);
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const renderMarkdownContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('# ')) {
        return (
          <Text key={index} style={[styles.heading1, { color: textColor }]}>
            {line.substring(2)}
          </Text>
        );
      } else if (line.startsWith('## ')) {
        return (
          <Text key={index} style={[styles.heading2, { color: textColor }]}>
            {line.substring(3)}
          </Text>
        );
      } else if (line.startsWith('### ')) {
        return (
          <Text key={index} style={[styles.heading3, { color: textColor }]}>
            {line.substring(4)}
          </Text>
        );
      } else if (line.startsWith('- ')) {
        return (
          <Text key={index} style={[styles.bulletPoint, { color: textColor }]}>
            • {line.substring(2)}
          </Text>
        );
      } else if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <Text key={index} style={[styles.boldText, { color: textColor }]}>
            {line.substring(2, line.length - 2)}
          </Text>
        );
      } else if (line.trim() === '') {
        return <View key={index} style={styles.emptyLine} />;
      } else if (line.startsWith('```')) {
        return <View key={index} style={styles.codeBlock} />;
      } else {
        return (
          <Text key={index} style={[styles.paragraph, { color: textColor }]}>
            {line}
          </Text>
        );
      }
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={[styles.container, { backgroundColor }]}>
        {selectedDocument ? (
          <View style={styles.documentView}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setSelectedDocument(null)}>
                <Text style={[styles.backButton, { color: textColor }]}>← Back</Text>
              </TouchableOpacity>
              <Text style={[styles.documentTitle, { color: textColor }]}>
                {selectedDocument.title}
              </Text>
              <View style={styles.placeholder} />
            </View>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
              {renderMarkdownContent(selectedDocument.content)}
            </ScrollView>
          </View>
        ) : (
          <View style={styles.listView}>
            <View style={styles.header}>
              <Text style={[styles.title, { color: textColor }]}>Legal Documents</Text>
              <TouchableOpacity onPress={onClose}>
                <Text style={[styles.closeButton, { color: textColor }]}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.documentList} showsVerticalScrollIndicator={false}>
              {legalDocuments.map((doc, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.documentItem, { borderBottomColor: textColor + '20' }]}
                  onPress={() => setSelectedDocument(doc)}
                >
                  <Text style={[styles.documentItemTitle, { color: textColor }]}>
                    {doc.title}
                  </Text>
                  <Text style={[styles.documentItemSubtitle, { color: textColor + '80' }]}>
                    Last updated: December 2024
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  backButton: {
    fontSize: 16,
    fontWeight: '600',
  },
  documentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  listView: {
    flex: 1,
  },
  documentList: {
    flex: 1,
  },
  documentItem: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  documentItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  documentItemSubtitle: {
    fontSize: 14,
  },
  documentView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  heading1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 8,
  },
  heading2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 16,
  },
  heading3: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 4,
    marginLeft: 16,
  },
  boldText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptyLine: {
    height: 8,
  },
  codeBlock: {
    height: 20,
    backgroundColor: '#f0f0f0',
    marginVertical: 8,
    borderRadius: 4,
  },
}); 