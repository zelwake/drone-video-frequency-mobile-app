# DroneFrequency - Developer Documentation

Documentation for developers working on the DroneFrequency application.

## Table of Contents

1. [Architecture](#architecture)
2. [Database](#database)
3. [API Reference](#api-reference)
4. [Components](#components)
5. [Testing](#testing)
6. [Deployment](#deployment)

---

## Architecture

### Tech Stack

- **Framework**: React Native 0.81.5 + Expo SDK 54
- **Routing**: Expo Router 6 (file-based)
- **Database**: SQLite (expo-sqlite) + Drizzle ORM
- **State Management**: TanStack Query v5
- **TypeScript**: 5.9.2 (strict mode)
- **Package Manager**: pnpm

### Project Structure

```
DroneFrequency/
├── app/                    # Expo Router file-based routing
│   ├── (tabs)/            # Bottom tabs navigation
│   │   ├── index.tsx      # Home - Main guide
│   │   ├── devices/       # Device management
│   │   ├── spectrum.tsx   # Spectrum visualization
│   │   ├── find.tsx       # Find free channel
│   │   └── settings.tsx   # Settings
│   └── _layout.tsx        # Root layout (DB init)
├── components/            # React components
├── db/                    # Database layer
│   ├── schema.ts          # Drizzle ORM schema
│   ├── queries.ts         # Database queries
│   ├── seedData.ts        # Official bands data
│   └── seed.ts            # Seed functions
├── hooks/                 # Custom React hooks
├── utils/                 # Utility functions
├── types/                 # TypeScript types
├── constants/             # Constants
├── docs/                  # Documentation
└── __tests__/             # Tests
```

---

## Database

### Schema

The application uses 6 main tables:

#### 1. `frequency_band`

Frequency bands (official and custom).

```typescript
{
  id: number(PK, autoincrement);
  band_sign: string; // "A", "B", "R", "F"...
  name: string; // "Boscam A", "Race Band"
  short_name: string | null; // "Boscam", "Race"
  is_custom: boolean; // false = official, true = user-defined
}
```

#### 2. `band_frequency`

Frequencies for each channel in a band (1-8 channels).

```typescript
{
  band_id: number (FK -> frequency_band.id)
  channel_number: number        // 1-8
  frequency: number             // MHz

  PK: (band_id, channel_number)
}
```

#### 3. `device`

VTX/VRX devices (always user-defined).

```typescript
{
  id: number(PK, autoincrement);
  name: string;
  type: 'VTX' | 'VRX';
  created_at: timestamp;
}
```

#### 4. `device_band`

Band mapping to devices.

```typescript
{
  device_id: number (FK -> device.id)
  band_id: number (FK -> frequency_band.id)
  band_label: string            // Label on the device ("A", "B", "1"...)

  PK: (device_id, band_id)
}
```

#### 5. `favorite`

Favorite configurations.

```typescript
{
  id: number (PK, autoincrement)
  name: string | null
  vtx_device_id: number | null (FK -> device.id)
  vrx_device_id: number | null (FK -> device.id)
  frequency: number
  created_at: timestamp
}
```

#### 6. `history`

Search history.

```typescript
{
  id: number (PK, autoincrement)
  vtx_device_id: number | null (FK -> device.id)
  vrx_device_id: number | null (FK -> device.id)
  frequency: number
  used_at: timestamp
}
```

### Official Bands

On first launch, 10 official bands are seeded:

| Sign | Name         | Frequencies (MHz)                              |
| ---- | ------------ | ---------------------------------------------- |
| A    | Boscam A     | 5865, 5845, 5825, 5805, 5785, 5765, 5745, 5725 |
| B    | Boscam B     | 5733, 5752, 5771, 5790, 5809, 5828, 5847, 5866 |
| E    | Boscam E     | 5705, 5685, 5665, 5645, 5885, 5905, 5925, 5945 |
| F    | FatShark     | 5740, 5760, 5780, 5800, 5820, 5840, 5860, 5880 |
| R    | Race Band    | 5658, 5695, 5732, 5769, 5806, 5843, 5880, 5917 |
| D    | Boscam D/DJI | 5362, 5399, 5436, 5473, 5510, 5547, 5584, 5621 |
| U    | U Band       | 5325, 5348, 5366, 5384, 5402, 5420, 5438, 5456 |
| O    | O Band       | 5474, 5492, 5510, 5528, 5546, 5564, 5582, 5600 |
| L    | Low Band     | 5333, 5373, 5413, 5453, 5493, 5533, 5573, 5613 |
| H    | High Band    | 5653, 5693, 5733, 5773, 5813, 5853, 5893, 5933 |

### Migrations

```bash
# Generate new migration after changing schema.ts
npx drizzle-kit generate

# Open Drizzle Studio (database GUI)
npx drizzle-kit studio
```

---

## API Reference

### Database Queries (`db/queries.ts`)

#### Bands

```typescript
// Get all bands including frequencies
getAllBands(db: Database): Promise<BandWithFrequencies[]>

// Get only official bands
getOfficialBands(db: Database): Promise<BandWithFrequencies[]>

// Create custom band
createCustomBand(db: Database, data: CreateCustomBandData): Promise<number>

// Delete custom band (cannot delete official bands!)
deleteCustomBand(db: Database, bandId: number): Promise<boolean>
```

#### Devices

```typescript
// Get devices by type
getDevicesByType(db: Database, type?: 'VTX' | 'VRX'): Promise<DeviceWithBands[]>

// Get single device
getDevice(db: Database, deviceId: number): Promise<DeviceWithBands | null>

// Create device
createDevice(db: Database, data: CreateDeviceData): Promise<number>

// Update device
updateDevice(db: Database, deviceId: number, data: Partial<CreateDeviceData>): Promise<void>

// Delete device
deleteDevice(db: Database, deviceId: number): Promise<void>
```

#### Frequency Lookup

```typescript
// Main search function
findChannelByFrequency(
  db: Database,
  vtxDeviceId: number,
  vrxDeviceId: number,
  frequency: number
): Promise<FrequencyLookupResult | NearestFrequenciesResult | null>
```

**Return types:**

Exact match:

```typescript
{
  vtx: { bandId, bandSign, bandName, channel, frequency },
  vrx: { bandId, bandSign, bandName, channel, frequency },
  exact: true
}
```

Nearest frequencies:

```typescript
{
  lower: NearestFrequency[],  // Frequencies lower than searched
  upper: NearestFrequency[],  // Frequencies higher than searched
  exact: false
}
```

#### Favorites

```typescript
// Add favorite
addFavorite(db: Database, data: {...}): Promise<number>

// Get all favorites
getFavorites(db: Database): Promise<Favorite[]>

// Delete favorite
deleteFavorite(db: Database, favoriteId: number): Promise<void>
```

#### History

```typescript
// Add to history
addToHistory(db: Database, data: {...}): Promise<number>

// Get recent history
getHistory(db: Database, limit?: number): Promise<History[]>

// Clean old history
cleanOldHistory(db: Database, keepLast?: number): Promise<void>
```

### Utility Functions (`utils/frequency.ts`)

```typescript
// Find exact frequency match
findExactMatch(options: {...}[], targetFrequency: number): FrequencyMatch | null

// Find nearest frequencies
findNearestFrequencies(options: {...}[], targetFrequency: number): {
  lower: NearestFrequency[],
  upper: NearestFrequency[]
}

// Calculate interference score
calculateInterferenceScore(targetFrequency: number, usedFrequencies: number[]): number

// Validate frequency
isValidFrequency(frequency: number): boolean

// Format frequency
formatFrequency(frequency: number): string
```

---

## Components

### Base UI Components (`components/ui/`)

```typescript
// Button
<Button onPress={() => {}} variant="primary" size="lg">
  Text
</Button>

// Input
<Input
  value={value}
  onChangeText={setText}
  placeholder="Enter frequency"
  keyboardType="numeric"
/>

// Card
<Card>
  <CardHeader>Title</CardHeader>
  <CardContent>Content</CardContent>
</Card>

// Dropdown
<Dropdown
  value={selected}
  onValueChange={setSelected}
  items={[
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
  ]}
/>
```

### Domain Components

```typescript
// Device Selector
<DeviceSelector
  type={DeviceType.VTX}
  value={deviceId}
  onChange={setDeviceId}
/>

// Frequency Input
<FrequencyInput
  value={frequency}
  onChange={setFrequency}
  onSubmit={handleSearch}
/>

// Setting Result
<SettingResult
  type={DeviceType.VTX}
  band="F"
  bandName="FatShark"
  channel={4}
  frequency={5800}
/>

// Frequency Suggestions
<FrequencySuggestions
  lower={[{ frequency: 5800, ...}]}
  upper={[{ frequency: 5805, ...}]}
  onSelect={(freq) => setFrequency(freq)}
/>
```

---

## Testing

### Unit Tests

Tests are located in `__tests__/` folder.

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run specific test
pnpm test frequency.test.ts
```

### Test Coverage

Current coverage:

- ✅ `utils/frequency.ts` - 100%
- ⏳ `db/queries.ts` - TODO
- ⏳ Components - TODO

### Writing Tests

```typescript
// __tests__/example.test.ts
import { functionToTest } from '../path/to/function';

describe('Function Name', () => {
  it('should do something', () => {
    const result = functionToTest(input);
    expect(result).toBe(expected);
  });

  it('should handle edge case', () => {
    const result = functionToTest(edgeCaseInput);
    expect(result).toBeNull();
  });
});
```

### Manual Testing

See [MANUAL_TESTING.md](./MANUAL_TESTING.md) for complete test plans.

---

## Deployment

### Android Build

```bash
# Development build
eas build --platform android --profile development

# Production build
eas build --platform android --profile production
```

### iOS Build

```bash
# Development build
eas build --platform ios --profile development

# Production build
eas build --platform ios --profile production
```

### Local Development

```bash
# Start Metro bundler
pnpm start

# Android
pnpm android

# iOS
pnpm ios

# Web (for quick prototyping)
pnpm web
```

---

## Best Practices

### TypeScript

- ✅ Use strict mode
- ✅ Define types for all parameters and return values
- ✅ Use `interface` for objects, `type` for unions
- ✅ Avoid `any` - use `unknown` if type is truly unknown

### React Hooks

- ✅ Always specify dependency array
- ✅ Use `useCallback` for functions passed to child components
- ✅ Use `useMemo` for expensive computations
- ✅ Custom hooks start with `use...`

### Database

- ✅ Always use transactions for multiple operations
- ✅ Index columns that are frequently searched
- ✅ Use foreign keys for data integrity
- ✅ Clean old history regularly

### Performance

- ✅ Use `FlatList` instead of `ScrollView` for long lists
- ✅ Implement `React.memo` for frequently re-rendering components
- ✅ Lazy load screens using `React.lazy` and `Suspense`
- ✅ Debounce user input (e.g., search)

### Security

- ✅ Don't store sensitive data in plain text
- ✅ Validate all user inputs
- ✅ Use prepared statements (Drizzle ORM does this automatically)

---

## Troubleshooting

### Problem: Migrations fail

**Solution:**

```bash
# Delete database and start fresh
rm -rf .expo
pnpm start --clear
```

### Problem: TypeScript errors after update

**Solution:**

```bash
# Clear cache
pnpm install
rm -rf node_modules .expo
pnpm install
```

### Problem: Metro bundler doesn't pick up changes

**Solution:**

```bash
# Restart with clear cache
pnpm start --clear
```

---

## Changelog

### v1.0.0 (2026-01-25)

**Added:**

- ✅ Database schema with 6 tables
- ✅ Seed of official 10 FPV bands
- ✅ Core business logic (queries, utils)
- ✅ Unit tests for frequency utilities
- ✅ Documentation and test plans

**TODO:**

- ⏳ Home Screen UI
- ⏳ Devices Screen UI
- ⏳ Spectrum visualization
- ⏳ Find free channel feature
- ⏳ Settings screen

---

## Contributing

1. Create feature branch from `main`
2. Implement changes
3. Write tests
4. Run `pnpm lint` and `pnpm test`
5. Create commit with descriptive message
6. Push and create pull request

### Commit Message Format

```
<type>: <short description>

<longer description if needed>
```

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `test`: Tests
- `refactor`: Refactoring
- `chore`: Build, dependencies, etc.

---

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [TanStack Query](https://tanstack.com/query/latest)
- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
