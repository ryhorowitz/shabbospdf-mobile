# App Publishing Checklist

## Google Play Store (Android) ✅ READY

### ✅ Completed

- [x] Production AAB built: `shabbospdf-mobile-production.aab`
- [x] App configuration updated
- [x] Privacy policy created
- [x] Store listing content prepared

### 🔄 Next Steps

1. **Create Google Play Console Account** ($25 one-time)
   - Go to <https://play.google.com/console>
   - Sign up and pay $25 registration fee

2. **Create App in Play Console**
   - Bundle ID: `com.shabbospdf.weather`
   - App name: "Erev Shabbos Weather Report"

3. **Upload AAB File**
   - Upload: `shabbospdf-mobile-production.aab`

4. **Fill Store Listing**
   - Use content from `play-store-assets/README.md`
   - Upload screenshots and app icon

5. **Submit for Review** (1-7 days)

---

## Apple App Store (iOS) 🔄 NEEDS SETUP

### ❌ Prerequisites Needed

- [ ] **Apple Developer Account** ($99/year)
  - Sign up at <https://developer.apple.com/programs/>
  - Required for App Store publishing

### 🔄 Next Steps After Getting Developer Account

1. **Build iOS Production Version**

   ```bash
   eas build --platform ios --profile production
   ```

2. **Create App in App Store Connect**
   - Bundle ID: `com.shabbospdf.weather`
   - App name: "Erev Shabbos Weather Report"

3. **Upload iOS Build**
   - Upload the .ipa file from EAS build

4. **Fill App Store Listing**
   - Use content from `app-store-assets/README.md`
   - Upload screenshots and app icon

5. **Submit for Review** (1-7 days typically)

---

## Required Assets for Both Stores

### App Icons

- **Android**: 512x512 px (adaptive icon)
- **iOS**: 1024x1024 px (no transparency)

### Screenshots

- **Android**: Phone (1080x1920), Tablet (1200x1920, 1920x1200)
- **iOS**: Multiple iPhone sizes, iPad sizes

### Privacy Policy

- ✅ Created: `PRIVACY_POLICY.md`
- Need to host online (GitHub Pages, website, etc.)

---

## Cost Summary

- **Google Play Store**: $25 (one-time)
- **Apple App Store**: $99/year
- **Total First Year**: $124

---

## Timeline Estimate

- **Google Play Store**: 1-2 weeks (including review)
- **Apple App Store**: 2-3 weeks (including account setup and review)

---

## Notes

- Both stores require privacy policies
- Apple is generally stricter about app quality
- iOS reviews are typically faster than Android
- Consider creating promotional videos for both stores
- Test thoroughly on multiple devices before submission
