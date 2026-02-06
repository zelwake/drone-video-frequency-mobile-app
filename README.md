# DroneFrequency 🚁

React Native application for easy VTX/VRX channel setup on drones and receivers.

## ✨ Features

- 📡 **Main Guide**: Select VTX + VRX devices → enter frequency → display settings (Band + Channel)
- 🔧 **Device Management**: Add custom VTX/VRX devices with band mapping
- 📊 **Spectrum Visualization**: Frequency chart + channel grid
- 🔍 **Find Free Channels**: Conflict detection and free frequency recommendations
- ⭐ **Favorites**: Quick access to frequently used configurations
- 📜 **History**: Automatic recording of recent searches

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm start

# Android
pnpm android

# iOS
pnpm ios
```

## 📋 Requirements

- Node.js 18+
- pnpm 10+
- Expo CLI
- Android Studio (for Android) or Xcode (for iOS)

## 🏗️ Tech Stack

- **Framework**: React Native 0.81.5 + Expo SDK 54
- **Routing**: Expo Router 6 (file-based)
- **Database**: SQLite + Drizzle ORM
- **State Management**: TanStack Query v5
- **TypeScript**: 5.9.2 (strict mode)
- **Testing**: Jest + React Testing Library

## 📚 Documentation

- [Developer Documentation](./docs/README.md) - Complete developer documentation
- [Manual Testing Plan](./docs/MANUAL_TESTING.md) - Test plans for manual testing
- [Agents Guidelines](./AGENTS.md) - Guidelines for AI coding agents

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Tests in watch mode
pnpm test:watch

# Lint
pnpm lint
```

## 📖 Official Bands

The application includes 10 pre-configured FPV bands:

- **A** - Boscam A
- **B** - Boscam B
- **E** - Boscam E
- **F** - FatShark / NexWave
- **R** - Race Band
- **D** - Boscam D / DJI
- **U** - U Band
- **O** - O Band
- **L** - Low Band
- **H** - High Band

## 🗂️ Project Structure

```
DroneFrequency/
├── app/              # Expo Router screens
├── components/       # React components
├── db/               # Database (schema, queries, seed)
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── types/            # TypeScript types
├── docs/             # Documentation
└── __tests__/        # Tests
```

## 🔄 Database

The application uses SQLite with Drizzle ORM. On first launch, it automatically:

1. Creates `frequencies.db` database
2. Runs migrations
3. Seeds with official FPV bands

```bash
# Generate new migration
npx drizzle-kit generate

# Open Drizzle Studio
npx drizzle-kit studio
```

## 🎨 Screenshots

_TODO: Add screenshots after UI completion_

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

MIT

## 🙏 Acknowledgments

- Expo team for the amazing framework
- FPV community for official band data
- Drizzle ORM team

---

## 🎯 Project Status

**Version**: 1.0.0 (MVP in development)  
**Last Update**: 2026-01-25

### ✅ Completed Features (MVP Core)

- **Database & Schema**
  - ✅ SQLite database with Drizzle ORM
  - ✅ Migrations and seed data (10 official FPV bands)
  - ✅ Schema for devices, bands, frequencies, history

- **Device Management**
  - ✅ Add/edit/delete VTX/VRX devices
  - ✅ Band mapping to devices
  - ✅ Custom band labels (band aliases)
  - ✅ Display frequencies for each band

- **Frequency Lookup**
  - ✅ Main search screen
  - ✅ Select VTX and/or VRX devices
  - ✅ Enter frequency and find channel
  - ✅ Display nearest frequencies on inexact match
  - ✅ Save last selection
  - ✅ Display custom band labels in results
  - ✅ Search history (save to DB)

- **UI/UX**
  - ✅ Light/Dark mode with toggle
  - ✅ Tab navigation (Home, Devices, Favorites, Settings)
  - ✅ Vertical BandSelector with checkboxes and inline editor
  - ✅ Responsive components (Input, Button, Dropdown, Card)
  - ✅ Edge-to-edge support (Android)

- **Code Quality**
  - ✅ TypeScript strict mode
  - ✅ ESLint + Prettier configuration
  - ✅ Type-safe routing (Expo Router)
  - ✅ TanStack Query for state management

### 🚧 In Progress Features

- **Favorites**
  - ⏳ UI ready, functionality placeholder
  - ⏳ Database structure exists, implementation pending

- **Settings**
  - ⏳ Basic screen with theme switcher
  - ⏳ Additional settings needed (units, language, etc.)

### 📋 TODO - Core Features

- [ ] **Spectrum Visualization**
  - [ ] Chart displaying all frequencies
  - [ ] Channel grid with occupied channels marked
  - [ ] Visual conflict detection

- [ ] **Find Free Channels**
  - [ ] Algorithm for conflict detection
  - [ ] Free frequency recommendations
  - [ ] Display distance between channels

- [ ] **Favorites (completion)**
  - [ ] Implement CRUD operations
  - [ ] Quick access from main screen
  - [ ] Share/export favorite configurations

- [ ] **History (expansion)**
  - [ ] UI for displaying history
  - [ ] Filtering and search
  - [ ] Ability to restore previous searches

- [ ] **Custom Bands**
  - [ ] UI for creating custom bands
  - [ ] Frequency validation (8 channels max)
  - [ ] Import/export custom bands

### 🎨 Nice to Have

- [ ] **Reverse lookup** - Enter frequency → instant channel display without device selection
- [ ] **Partial device selection** - Indicator when channel can only be set on one device (VTX or VRX)
- [ ] **Multi-device comparison** - Compare frequencies between multiple devices at once
- [ ] **Export/Import** - Backup/restore all data (devices, favorites, custom bands)
- [ ] **QR Code** - Share configuration via QR code
- [ ] **Voice input** - Voice entry for frequency
- [ ] **Widgets** - Home screen widget for quick access
- [ ] **Apple Watch/WearOS** - Companion application
- [ ] **Offline maps** - Map of nearby FPV pilots with their frequencies

### 🐛 Known Issues

_None reported yet_

---

**Status**: 🚧 MVP Core Complete - Moving to Phase 2
