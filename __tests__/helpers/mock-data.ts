/**
 * Mock data for tests
 */

import type { BandData } from '@/db/seedData';
import { DeviceType } from '@/types';

/**
 * Test bands - subset of official bands for faster tests
 */
export const TEST_BANDS: BandData[] = [
  {
    sign: 'F',
    name: 'FatShark / NexWave',
    shortName: 'FatShark',
    frequencies: [5740, 5760, 5780, 5800, 5820, 5840, 5860, 5880],
  },
  {
    sign: 'R',
    name: 'Race Band',
    shortName: 'Race',
    frequencies: [5658, 5695, 5732, 5769, 5806, 5843, 5880, 5917],
  },
  {
    sign: 'A',
    name: 'Boscam A',
    shortName: 'Boscam',
    frequencies: [5865, 5845, 5825, 5805, 5785, 5765, 5745, 5725],
  },
];

/**
 * Test device configurations
 */
export const TEST_DEVICES = {
  vtx: {
    name: 'Test VTX Device',
    type: DeviceType.VTX,
    bandIds: [1, 2], // F and R bands (after seeding)
    bandLabels: {
      1: 'F',
      2: 'R',
    },
  },
  vrx: {
    name: 'Test VRX Device',
    type: DeviceType.VRX,
    bandIds: [1, 2],
    bandLabels: {
      1: 'F',
      2: 'R',
    },
  },
  vtxCustomLabels: {
    name: 'VTX with Custom Labels',
    type: DeviceType.VTX,
    bandIds: [1],
    bandLabels: {
      1: 'ImmersionRC',
    },
  },
} as const;

/**
 * Test frequencies for lookup
 */
export const TEST_FREQUENCIES = {
  // Exact frequencies from FatShark band
  exact: {
    f1: 5740, // F1
    f2: 5760, // F2
    f3: 5780, // F3
    f4: 5800, // F4
    f5: 5820, // F5
  },
  // Inexact frequencies (between channels)
  inexact: {
    between_f1_f2: 5750, // Between F1 (5740) and F2 (5760)
    between_f3_f4: 5790, // Between F3 (5780) and F4 (5800)
  },
  // Invalid frequencies (out of range)
  invalid: {
    tooLow: 500,
    tooHigh: 7000,
  },
  // Race Band
  race: {
    r1: 5658, // R1
    r5: 5806, // R5
  },
} as const;

/**
 * Expected results for test frequencies
 */
export const EXPECTED_RESULTS = {
  f4: {
    bandSign: 'F',
    bandName: 'FatShark / NexWave',
    channel: 4,
    frequency: 5800,
  },
  r5: {
    bandSign: 'R',
    bandName: 'Race Band',
    channel: 5,
    frequency: 5806,
  },
} as const;
