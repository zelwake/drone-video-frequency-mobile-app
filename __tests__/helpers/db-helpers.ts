/**
 * Database helpers for tests
 * Providers functions for setting up in-memory SQLite database and seeding test data
 */

import { bandFrequencies, deviceBands, devices, frequencyBands } from '@/db/schema';
import migrations from '@/drizzle/migrations';
import type { CreateDeviceInput } from '@/types';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { migrate } from 'drizzle-orm/expo-sqlite/migrator';
import * as SQLite from 'expo-sqlite';
import { TEST_BANDS } from './mock-data';

type Database = ReturnType<typeof drizzle<Record<string, never>>>;

let testDbInstance: Database | null = null;
let testSqliteInstance: SQLite.SQLiteDatabase | null = null;

/**
 * Create and initialize in-memory testing database
 */
export async function setupTestDatabase(): Promise<Database> {
  // Every test will have fresh database
  const dbName = `:memory:`;

  try {
    testSqliteInstance = await SQLite.openDatabaseAsync(dbName);
    testDbInstance = drizzle(testSqliteInstance);

    await migrate(testDbInstance, migrations);

    console.log('[Test DB] In-memory database created and migrated');

    return testDbInstance;
  } catch (error) {
    console.error('[Test DB] Failed to setup database:', error);
    throw error;
  }
}

/**
 * Seed database with testing frequency bands
 */
export async function seedTestBands(db: Database): Promise<void> {
  for (const band of TEST_BANDS) {
    const [insertedBand] = await db
      .insert(frequencyBands)
      .values({
        bandSign: band.sign,
        name: band.name,
        shortName: band.shortName,
        isCustom: false,
      })
      .returning({ id: frequencyBands.id });

    const frequencyValues = band.frequencies.map((freq, index) => ({
      bandId: insertedBand.id,
      channelNumber: index + 1,
      frequency: freq,
    }));

    await db.insert(bandFrequencies).values(frequencyValues);
  }

  console.log('[Test DB] Test bands seeded');
}

/**
 * Create testing device
 */
export async function createTestDevice(db: Database, input: CreateDeviceInput): Promise<number> {
  const [device] = await db
    .insert(devices)
    .values({
      name: input.name,
      type: input.type,
    })
    .returning({ id: devices.id });

  if (input.bandIds.length > 0) {
    const deviceBandValues = input.bandIds.map((bandId) => ({
      deviceId: device.id,
      bandId,
      bandLabel: input.bandLabels?.[bandId] || `Band ${bandId}`,
    }));

    await db.insert(deviceBands).values(deviceBandValues);
  }

  console.log(`[Test DB] Created test device: ${input.name} (ID: ${device.id})`);

  return device.id;
}

/**
 * Clear database
 */
export async function clearDatabase(db: Database): Promise<void> {
  await db.delete(deviceBands);
  await db.delete(devices);
  await db.delete(bandFrequencies);
  await db.delete(frequencyBands);

  console.log('[Test DB] Database cleared');
}

/**
 * Close testing database
 */
export async function closeTestDatabase(): Promise<void> {
  if (testSqliteInstance) {
    await testSqliteInstance.closeAsync();
    testSqliteInstance = null;
    testDbInstance = null;
    console.log('[Test DB] Database closed');
  }
}

/**
 * Return current database instance
 */
export function getTestDb(): Database {
  if (!testDbInstance) {
    throw new Error('Test database not initialized. Call setupTestDatabase() first.');
  }
  return testDbInstance;
}

/**
 * Returns all mocked bands
 */
export async function getTestBands(db: Database) {
  return await db.select().from(frequencyBands);
}

/**
 * Returns all devices
 */
export async function getTestDevices(db: Database) {
  return await db.select().from(devices);
}

/**
 * Find band by band sign symbol
 */
export async function findBandBySign(db: Database, sign: string) {
  const [band] = await db.select().from(frequencyBands).where(eq(frequencyBands.bandSign, sign));
  return band;
}
