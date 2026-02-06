import { logger } from '@/utils/logger';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { bandFrequencies, frequencyBands } from './schema';
import { OFFICIAL_BANDS } from './seedData';

/**
 * Seeds database with official frequency bands on first launch
 * @param db Drizzle database instance
 * @returns true if seed was successful, false if data already exists
 */
export async function seedOfficialBands(
  db: ReturnType<typeof drizzle<Record<string, never>>>
): Promise<boolean> {
  try {
    // Check if official bands already exist
    const existingBands = await db.select().from(frequencyBands).limit(1);

    if (existingBands.length > 0) {
      logger.debug('[Seed] Official bands already exist, skipping seed');
      return false;
    }

    logger.debug('[Seed] Seeding official bands...');

    for (const band of OFFICIAL_BANDS) {
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
        channelNumber: index + 1, // 1-based indexing
        frequency: freq,
      }));

      await db.insert(bandFrequencies).values(frequencyValues);

      logger.debug(
        `[Seed] Added band ${band.sign} (${band.name}) with ${band.frequencies.length} channels`
      );
    }

    logger.debug('[Seed] Official bands seeded successfully!');
    return true;
  } catch (error) {
    logger.error('[Seed] Error seeding official bands:', { error });
    throw error;
  }
}

/**
 * Helper function to get count of official bands
 */
export async function getOfficialBandsCount(
  db: ReturnType<typeof drizzle<Record<string, never>>>
): Promise<number> {
  const bands = await db.select().from(frequencyBands).where(eq(frequencyBands.isCustom, false));
  return bands.length;
}
