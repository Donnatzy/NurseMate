# NurseMate — Play Store Android wrapper

This adds a Capacitor 8 Android wrapper around the existing NurseMate web/PWA project.

## What it does

- Packages the existing root web files into `dist/`
- Creates an Android project with Capacitor 8
- Targets the current Google Play requirement (Android 16 / API 36)
- Adds the Capacitor AdMob plugin
- Uses Google's test banner ad unit during development
- Builds an Android App Bundle (`.aab`) through GitHub Actions

## Important

The AdMob app ID is intentionally left as a placeholder/test configuration. Do NOT publish using Google's demo/test IDs.

Before production:
1. Create NurseMate in AdMob.
2. Replace the test AdMob App ID in the generated Android manifest/resources with your real App ID.
3. Replace the test banner unit ID in `src/admob.ts` with your real banner unit ID.
4. Complete consent/privacy/Data Safety requirements.
5. Sign the release with your own Play App Signing/upload key.

## Local build

Install Node.js 24+ and Android Studio/JDK as required by the current Capacitor 8 toolchain, then:

```bash
npm install
npm run build
```

Open Android Studio:

```bash
npx cap open android
```

For a Play release, build a signed AAB from Android Studio or use a properly configured CI signing setup.

## GitHub

Copy these files into the NurseMate repository, commit them, and run the Android workflow under Actions.

The workflow generates the Android project on the runner from the existing NurseMate web source, so you do not need to manually create the Android folder first.
