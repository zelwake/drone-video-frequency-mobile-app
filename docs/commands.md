# Development Commands

## Package Manager

This project uses **pnpm** as the package manager.

## Installation

```bash
pnpm install
```

## Development Server

```bash
pnpm start           # Choose platform interactively
pnpm android         # Start on Android emulator
pnpm ios             # Start on iOS simulator
pnpm web             # Start web version
```

## Code Quality

```bash
# Linting
pnpm lint

# TypeScript type checking
pnpm tsc --noEmit
```

## Build Commands

### Android Builds

#### Local Testing Build (APK)

For quick testing on your device or sharing with testers:

```bash
# Build and automatic installation on connected device
npx expo run:android --variant release

# Build APK only without installation
npx expo run:android --variant release --no-install
```

APK file location: `android/app/build/outputs/apk/release/app-release.apk`

#### Release Build for Google Play Store (AAB)

For uploading to Google Play Console:

```bash
# Build AAB bundle
npx expo run:android --variant release --no-build-cache bundleRelease
```

AAB file location: `android/app/build/outputs/bundle/release/app-release.aab`

#### Prerequisites for Release Build

Before first release build:

1. **Create keystore** (once only):

```bash
keytool -genkey -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. **Set passwords in `android/gradle.properties`**:

```properties
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_STORE_PASSWORD=your-password-here
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_KEY_PASSWORD=your-password-here
```

⚠️ **Important:** File `gradle.properties` contains sensitive passwords - add it to `.gitignore`!

#### Troubleshooting Release Build

- **NullPointerException at `signReleaseBundle`**: Missing keystore configuration in `gradle.properties`
- **Build fails**: Verify that passwords are correctly set and keystore file exists

### iOS Builds

#### Local Testing Build (IPA)

```bash
# Build and install on connected device (requires macOS + Xcode)
npx expo run:ios --variant release
```

#### Release Build for App Store

```bash
# Build IPA for App Store
npx expo run:ios --variant release --configuration Release
```

## Build Notes

- **APK/AAB**: For Android - APK for testing, AAB for Play Store
- **IPA**: For iOS - for testing and App Store
- **Expo Application Services (EAS)**: For cloud builds use `eas build` instead of local builds
