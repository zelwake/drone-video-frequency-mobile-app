# Project Roadmap

This document tracks MVP status, planned features, and test backlog policy. It is the source of truth for project status.

## Status

- **Version**: 1.0.0 (MVP in development)
- **Last Update**: 2026-01-25
- **Status**: MVP Core Complete - Moving to Phase 2

## MVP Completed

- **Database & Schema**
  - SQLite database with Drizzle ORM
  - Migrations and seed data (10 official FPV bands)
  - Schema for devices, bands, frequencies, history
- **Device Management**
  - Add/edit/delete VTX/VRX devices
  - Band mapping to devices
  - Custom band labels (band aliases)
  - Display frequencies for each band
- **Frequency Lookup**
  - Main search screen
  - Select VTX and/or VRX devices
  - Enter frequency and find channel
  - Display nearest frequencies on inexact match
  - Save last selection
  - Display custom band labels in results
  - Search history (save to DB)
- **UI/UX**
  - Light/Dark mode with toggle
  - Tab navigation (Home, Devices, Favorites, Settings)
  - Vertical BandSelector with checkboxes and inline editor
  - Responsive components (Input, Button, Dropdown, Card)
  - Edge-to-edge support (Android)
- **Code Quality**
  - TypeScript strict mode
  - ESLint + Prettier configuration
  - Type-safe routing (Expo Router)
  - TanStack Query for state management

## In Progress

- **Favorites**
  - UI ready, functionality placeholder
  - Database structure exists, implementation pending
- **Settings**
  - Basic screen with theme switcher
  - Additional settings needed (units, language, etc.)

## TODO - Core Features

- **Spectrum Visualization**
  - Chart displaying all frequencies
  - Channel grid with occupied channels marked
  - Visual conflict detection
- **Show band representation for devices**
  - Chart displaying all bands with frequencies for all stored devices
  - Able to select single device from each category and toggle bands
  - Visual representation of bands that are on both devices
- **Favorites (completion)**
  - Implement CRUD operations
  - Quick access from main screen
  - Share/export favorite configurations
- **History (expansion)**
  - UI for displaying history
  - Filtering and search
  - Ability to restore previous searches
- **Find Free Channels**
  - Algorithm for conflict detection
  - Free frequency recommendations
  - Display distance between channels
- **Custom Bands**
  - UI for creating custom bands
  - Frequency validation (8 channels max)
  - Import/export custom bands

## Nice to Have

- Reverse lookup - Enter frequency to show channel without device selection
- Partial device selection indicator (VTX or VRX only)
- Multi-device comparison
- Export/Import (devices, favorites, custom bands)
- QR Code sharing
- Voice input for frequency
- Home screen widgets
- Apple Watch/WearOS companion
- Offline maps for nearby FPV pilots

## Known Issues

- None reported yet

## Testing Backlog Policy

- All planned tests must be represented as `it.todo()` entries in test files.
- Avoid large commented-out blocks or placeholder tests that execute.
- `it.todo()` entries can be removed safely when scope changes.
