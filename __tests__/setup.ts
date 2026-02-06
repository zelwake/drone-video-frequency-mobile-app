/**
 * Jest setup file
 * Global mocks and configurations for tests
 */

import '@testing-library/react-native';
import { Alert } from 'react-native';

// ========== Mock Expo SQLite ==========
// Implementation mock for in-memory database in tests
const mockSQLiteDatabase = {
  execAsync: jest.fn(() => Promise.resolve({ rows: [] })),
  runAsync: jest.fn(() => Promise.resolve({ lastInsertRowId: 1, changes: 1 })),
  getFirstAsync: jest.fn(() => Promise.resolve(null)),
  getAllAsync: jest.fn(() => Promise.resolve([])),
  prepareAsync: jest.fn(() =>
    Promise.resolve({
      executeAsync: jest.fn(() => Promise.resolve({ rows: [] })),
      finalizeAsync: jest.fn(() => Promise.resolve()),
    })
  ),
  closeAsync: jest.fn(() => Promise.resolve()),
  withTransactionAsync: jest.fn((cb) => cb()),
};

jest.mock('expo-sqlite', () => ({
  openDatabaseAsync: jest.fn(() => Promise.resolve(mockSQLiteDatabase)),
  openDatabaseSync: jest.fn(() => mockSQLiteDatabase),
  SQLiteProvider: ({ children }: { children: React.ReactNode }) => children,
  useSQLiteContext: jest.fn(() => mockSQLiteDatabase),
}));

// ========== Mock AsyncStorage ==========
jest.mock('expo-sqlite/kv-store', () => ({
  getItem: jest.fn((key: string) => Promise.resolve(null)),
  setItem: jest.fn((key: string, value: string) => Promise.resolve()),
  removeItem: jest.fn((key: string) => Promise.resolve()),
}));

// ========== Mock Alert ==========
jest.spyOn(Alert, 'alert').mockImplementation((title, message, buttons, options) => {
  // We can immediatelly call onPress callback of first button
  // Test can mock Alert.alert on its own if this is not enough
  console.log(`[Mock Alert] ${title}: ${message}`);
});

// ========== Mock Expo Router ==========
const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  canGoBack: jest.fn(() => true),
  setParams: jest.fn(),
};

jest.mock('expo-router', () => ({
  useRouter: () => mockRouter,
  useLocalSearchParams: jest.fn(() => ({})),
  useSegments: jest.fn(() => []),
  usePathname: jest.fn(() => '/'),
  Stack: {
    Screen: ({ children }: { children: React.ReactNode }) => children,
  },
  Tabs: {
    Screen: ({ children }: { children: React.ReactNode }) => children,
  },
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

// ========== Mock Expo Haptics ==========
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(() => Promise.resolve()),
  notificationAsync: jest.fn(() => Promise.resolve()),
  selectionAsync: jest.fn(() => Promise.resolve()),
}));

// ========== Mock Expo Font ==========
jest.mock('expo-font', () => ({
  loadAsync: jest.fn(() => Promise.resolve()),
  isLoaded: jest.fn(() => true),
}));

// ========== Mock @expo/vector-icons ==========
jest.mock('@expo/vector-icons', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Text } = require('react-native');
  return {
    Ionicons: Text,
    MaterialIcons: Text,
    FontAwesome: Text,
  };
});

// ========== Global cleanup ==========
afterEach(() => {
  jest.clearAllMocks();
});

export { mockRouter };
