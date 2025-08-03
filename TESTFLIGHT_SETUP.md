# TestFlight Beta Testing Setup Guide

This guide will help you set up TestFlight for beta testing your Shabbos Weather app.

## Prerequisites

1. **Apple Developer Account** ($99/year)
2. **App Store Connect Access**
3. **EAS CLI** installed and configured
4. **Expo Account** with EAS Build access

## Step 1: App Store Connect Setup

### 1.1 Create App in App Store Connect

1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Click "My Apps" → "+" → "New App"
3. Fill in the details:
   - **Platform**: iOS
   - **Name**: Shabbos Weather
   - **Bundle ID**: com.shabbospdf.weather
   - **SKU**: shabbos-weather-ios
   - **User Access**: Full Access

### 1.2 Get App Store Connect App ID

1. In App Store Connect, go to your app
2. Note the **App ID** (you'll need this for EAS configuration)
3. Update `eas.json` with your actual App ID

## Step 2: Update EAS Configuration

Update the following values in `eas.json`:

```json
{
  "submit": {
    "testflight": {
      "ios": {
        "appleId": "admin@shabbosweather.com",
        "ascAppId": "YOUR_ACTUAL_APP_STORE_CONNECT_APP_ID",
        "appleTeamId": "YOUR_APPLE_TEAM_ID"
      }
    }
  }
}
```

### 2.1 Find Your Apple Team ID

1. Go to [Apple Developer](https://developer.apple.com)
2. Click "Membership" in the left sidebar
3. Note your **Team ID** (10-character string)

## Step 3: Build for TestFlight

### 3.1 Build the App

```bash
# Build for TestFlight
npm run build:testflight

# Or use EAS CLI directly
eas build --platform ios --profile testflight
```

### 3.2 Monitor Build Progress

- Check build status at: <https://expo.dev/accounts/[your-username]/projects/shabbospdf-mobile/builds>
- Build typically takes 10-15 minutes

## Step 4: Submit to TestFlight

### 4.1 Submit the Build

```bash
# Submit to TestFlight
npm run submit:testflight

# Or use EAS CLI directly
eas submit --platform ios --profile testflight
```

### 4.2 Monitor Submission

- Check submission status in App Store Connect
- Processing typically takes 5-10 minutes

## Step 5: Configure TestFlight

### 5.1 Add Test Information

In App Store Connect → TestFlight:

1. **App Information**:
   - Description: "Shabbos Weather app for beta testing"
   - Feedback Email: <admin@shabbosweather.com>
   - Marketing URL: (optional)
   - Privacy Policy URL: (optional)

2. **Build Information**:
   - What to Test: "Test all features including location services, weather forecasts, and candle times"
   - Notes: "This is a beta version. Please report any issues to <admin@shabbosweather.com>"

### 5.2 Add Testers

#### Internal Testers (Up to 100)

1. Go to "Internal Testing" tab
2. Click "+" to add testers
3. Enter email addresses of team members
4. Testers receive email invitation

#### External Testers (Up to 10,000)

1. Go to "External Testing" tab
2. Create a new group (e.g., "Beta Testers")
3. Add test information
4. Add tester email addresses
5. Submit for Beta App Review (required for external testers)

## Step 6: Beta App Review (External Testers Only)

### 6.1 Submit for Review

1. In "External Testing", click "Submit for Beta App Review"
2. Fill out the review form:
   - **Beta App Description**: "Shabbos Weather app for beta testing"
   - **Feedback Email**: <admin@shabbosweather.com>
   - **Contact Information**: <admin@shabbosweather.com>
   - **Demo Account**: (if needed)
   - **Notes**: "This app provides weather forecasts and candle lighting times for Shabbos preparation"

### 6.2 Review Process

- Review typically takes 1-3 days
- Apple will test basic functionality
- You'll receive email notification of approval/rejection

## Step 7: Manage Beta Testing

### 7.1 Monitor Feedback

- Check TestFlight feedback in App Store Connect
- Monitor crash reports and analytics
- Respond to tester feedback via email

### 7.2 Update Builds

When you need to update the beta:

1. Update version/build number in `app.json`:

```json
{
  "version": "1.0.1",
  "ios": {
    "buildNumber": "2"
  }
}
```

2. Build and submit new version:

```bash
npm run build:testflight
npm run submit:testflight
```

### 7.3 Version Management

- **Version**: User-facing version (e.g., "1.0.0")
- **Build Number**: Internal build number (increments with each build)

## Troubleshooting

### Common Issues

1. **Build Fails**
   - Check EAS build logs
   - Verify all dependencies are properly configured
   - Ensure iOS certificates are valid

2. **Submission Fails**
   - Verify App Store Connect App ID is correct
   - Check Apple Team ID
   - Ensure app meets TestFlight requirements

3. **Testers Can't Install**
   - Verify TestFlight app is installed on testers' devices
   - Check that testers accepted invitation
   - Ensure device is running compatible iOS version

### Support Resources

- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [TestFlight Documentation](https://developer.apple.com/testflight/)
- [App Store Connect Help](https://help.apple.com/app-store-connect/)

## Best Practices

1. **Regular Updates**: Release new builds every 1-2 weeks
2. **Clear Communication**: Provide detailed test instructions
3. **Feedback Loop**: Respond promptly to tester feedback
4. **Crash Monitoring**: Monitor crash reports and fix critical issues
5. **Version Tracking**: Keep detailed changelog for each build

## Next Steps

After successful TestFlight setup:

1. **Invite Beta Testers**: Start with internal team, then expand to external
2. **Monitor Feedback**: Set up systems to track and respond to feedback
3. **Iterate Quickly**: Use feedback to improve the app
4. **Prepare for Production**: Once beta testing is complete, prepare for App Store submission

---

For support, contact: <admin@shabbosweather.com>
