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

- [Developer Documentation](./docs/README.md) - Start here for full docs
- [Project Roadmap](./docs/roadmap.md) - MVP status and TODOs
- [Manual Testing Plan](./docs/MANUAL_TESTING.md) - Test plans for manual testing
- [Agents Guidelines](./AGENTS.md) - AI agent overview and links

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

See [docs/database.md](./docs/database.md) for official band details.

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

SQLite + Drizzle ORM. Migrations and schema details live in [docs/database.md](./docs/database.md).

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

See [docs/roadmap.md](./docs/roadmap.md) for MVP status, TODOs, and known issues.
