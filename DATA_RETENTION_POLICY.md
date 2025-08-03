# Data Retention Policy

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

```
User Location → Weather API → Display Results → Discard Data
     ↓
Candle Times API → Display Results → Discard Data
```

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

**This Data Retention Policy reflects our commitment to user privacy through a zero-data-storage approach. By not storing personal information, we eliminate the risks associated with data retention and provide maximum privacy protection to our users.**
