# DroneFrequency - Testing Documentation

> **Note:** All test descriptions, test names, and code comments should be written in **English** to maintain consistency with the codebase.

## 📁 Test Structure

```
__tests__/
├── helpers/                     # Test utility helpers
│   ├── test-utils.tsx          # Custom render with providers
│   ├── db-helpers.ts           # In-memory DB setup (prepared for future use)
│   └── mock-data.ts            # Test data (bands, devices, frequencies)
├── screens/                    # Screen tests
│   ├── HomeScreen.test.tsx     # Main search screen
│   ├── DevicesScreen.test.tsx  # Device list
│   ├── AddDeviceScreen.test.tsx # Add device form
│   └── EditDeviceScreen.test.tsx # Edit device form
├── components/                 # Component tests
│   ├── DeviceList.test.tsx     # List + mode switching
│   ├── DeviceCard.test.tsx     # Device card
│   ├── SettingResult.test.tsx  # Search result display
│   └── FrequencySuggestions.test.tsx # Frequency suggestions
├── frequency.test.ts           # Unit tests for frequency utils
└── setup.ts                    # Global setup and mocks
```

## 🚀 Running Tests

```bash
# All tests
pnpm test

# Watch mode (watches for changes)
pnpm test:watch

# Specific test file
pnpm test HomeScreen

# With code coverage
pnpm test -- --coverage
```

## 📋 Test Scenarios

### ✅ Implemented Tests

#### **HomeScreen**

- ✅ Alert when searching without selected device
- 📝 Todo: Frequency validation, search with VTX/VRX, suggestions

#### **Utility tests (frequency.test.ts)**

- ✅ findExactMatch - find exact frequency
- ✅ findNearestFrequencies - find nearest frequencies
- ✅ calculateInterferenceScore - calculate interference

### 📝 TODO Tests (prepared scenarios)

#### **DevicesScreen** (28 todo tests)

- Empty state
- Delete device
- Navigation
- Loading states

#### **AddDeviceScreen** (41 todo tests)

- Form validation
- Successful creation
- Navigation
- Loading states
- BandSelector interaction

#### **EditDeviceScreen** (35 todo tests)

- Data loading
- Validation
- Device update
- Error handling

#### **DeviceList** (24 todo tests)

- Edit/delete mode switching
- Visual changes
- Navigation
- Deletion

#### **SettingResult** (14 todo tests)

- VTX/VRX result display
- Band alias
- Styling

#### **FrequencySuggestions** (17 todo tests)

- Suggestion display
- Interaction
- Edge cases

#### **DeviceCard** (14 todo tests)

- Information display
- Edit/delete modes
- Styling

**Total: 168 prepared TODO tests + 12 implemented = 180 tests**

## 🛠️ Test Structure

### Basic Template

```typescript
import { renderWithProviders } from '../helpers/test-utils';
import { TEST_DATA } from '../helpers/mock-data';

describe('MyComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { getByText } = renderWithProviders(<MyComponent />);
    expect(getByText('Hello')).toBeTruthy();
  });
});
```

### With Database Query Mocks

```typescript
// At the beginning of file
jest.mock('@/db/queries', () => ({
  getDevices: jest.fn(() => Promise.resolve([])),
  createDevice: jest.fn(() => Promise.resolve(1)),
}));

// In test
import * as queries from '@/db/queries';

it('should fetch devices', async () => {
  (queries.getDevices as jest.Mock).mockResolvedValue([...testDevices]);

  const { getByText } = renderWithProviders(<DeviceList />);

  await waitFor(() => {
    expect(getByText('Test Device')).toBeTruthy();
  });
});
```

### With Alert Testing

```typescript
import { Alert } from 'react-native';

it('should show alert on error', async () => {
  const { getByText } = renderWithProviders(<MyScreen />);

  fireEvent.press(getByText('Delete'));

  await waitFor(() => {
    expect(Alert.alert).toHaveBeenCalledWith(
      'Error',
      expect.stringContaining('failed')
    );
  });
});
```

## 🔧 Mocks and Configuration

### Global Mocks (setup.ts)

- **Expo SQLite** - Mock in-memory database
- **AsyncStorage** - Mock key-value storage
- **Alert** - Mock with console.log output
- **Expo Router** - Mock navigation
- **Expo Haptics** - Mock haptic feedback
- **@expo/vector-icons** - Mock as Text component

### Custom Render (test-utils.tsx)

`renderWithProviders()` automatically wraps component with:

- `QueryClientProvider` - with fresh QueryClient for each test
- `ThemeProvider` - for theme colors
- `DeviceScreenProvider` - optionally for device context

```typescript
const { getByText, queryClient } = renderWithProviders(
  <MyComponent />,
  { withDeviceContext: true }
);
```

## 📊 Code Coverage

To generate code coverage report:

```bash
pnpm test -- --coverage --collectCoverageFrom="app/**/*.{ts,tsx}" --collectCoverageFrom="components/**/*.{ts,tsx}"
```

## ⚠️ Known Issues

### Act Warnings

Warnings like "not wrapped in act(...)" from TanStack Query are a known issue and not critical.
They relate to asynchronous updates when loading data. Can be ignored or resolved with proper notifyManager configuration.

## 🔄 Next Steps

1. **Implement remaining tests** - gradually complete TODO tests
2. **E2E tests** - consider Detox or Maestro for end-to-end tests
3. **Snapshot tests** - for UI components if needed
4. **Performance tests** - for critical operations (frequency search)

## 📚 Useful Links

- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [Jest](https://jestjs.io/)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
