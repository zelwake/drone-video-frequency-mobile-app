# Project Overview

DroneFrequency is a React Native app built with Expo Router. It uses SQLite for local storage via Drizzle ORM and TanStack Query for state management.

**Package manager:** pnpm

## How the app works

- Database is initialized on app start, then official FPV bands are seeded.
- Core flow: select VTX/VRX devices, enter frequency, and resolve band/channel.
- Devices, favorites, and history are stored locally in SQLite.

## Project Structure (high-level)

```
app/        - File-based routing (Expo Router)
components/ - Reusable React components
hooks/      - Custom React hooks
constants/  - Constants and configuration
db/         - Database schema and queries
drizzle/    - Generated migrations
assets/     - Static assets (images, fonts)
scripts/    - Build and utility scripts
docs/       - Source-of-truth documentation
```
