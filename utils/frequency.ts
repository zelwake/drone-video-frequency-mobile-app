import type { FrequencyMatch, NearestFrequency } from '@/types';

/**
 * Finds exact frequency match in options list
 */
export function findExactMatch(
  options: {
    bandId: number;
    bandSign: string;
    bandName: string;
    channel: number;
    frequency: number;
  }[],
  targetFrequency: number
): FrequencyMatch | null {
  const match = options.find((opt) => opt.frequency === targetFrequency);
  return match || null;
}

/**
 * Finds nearest frequencies to target frequency
 */
export function findNearestFrequencies(
  options: {
    bandId: number;
    bandSign: string;
    bandName: string;
    channel: number;
    frequency: number;
    deviceType: 'VTX' | 'VRX';
  }[],
  targetFrequency: number
): { lower: NearestFrequency[]; upper: NearestFrequency[] } {
  const lowerOptions = options
    .filter((opt) => opt.frequency < targetFrequency)
    .map((opt) => ({
      ...opt,
      distance: targetFrequency - opt.frequency,
    }))
    .sort((a, b) => a.distance - b.distance);

  const upperOptions = options
    .filter((opt) => opt.frequency > targetFrequency)
    .map((opt) => ({
      ...opt,
      distance: opt.frequency - targetFrequency,
    }))
    .sort((a, b) => a.distance - b.distance);

  // Return nearest from each side (may be multiple with same distance)
  const minLowerDistance = lowerOptions[0]?.distance;
  const minUpperDistance = upperOptions[0]?.distance;

  const lower =
    minLowerDistance !== undefined
      ? lowerOptions.filter((opt) => opt.distance === minLowerDistance)
      : [];

  const upper =
    minUpperDistance !== undefined
      ? upperOptions.filter((opt) => opt.distance === minUpperDistance)
      : [];

  return { lower, upper };
}

/**
 * Calculates interference score between used frequencies
 * Higher score = better (greater separation)
 */
export function calculateInterferenceScore(
  targetFrequency: number,
  usedFrequencies: number[]
): number {
  if (usedFrequencies.length === 0) return Infinity;

  const minDistance = Math.min(...usedFrequencies.map((freq) => Math.abs(targetFrequency - freq)));

  return minDistance;
}

/**
 * Check if frequency is valid (in reasonable range)
 */
export function isValidFrequency(frequency: number): boolean {
  // Accept wide range for different bands (1.2 GHz - 6 GHz)
  return frequency >= 1000 && frequency <= 6000;
}

/**
 * Format frequency for display
 */
export function formatFrequency(frequency: number): string {
  return `${frequency} MHz`;
}
