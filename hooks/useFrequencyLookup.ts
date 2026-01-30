import * as queries from '@/db/queries';
import type { NearestFrequency } from '@/types';
import { findNearestFrequencies } from '@/utils/frequency';
import AsyncStorage from 'expo-sqlite/kv-store';
import { useCallback, useEffect, useState } from 'react';
import { useDatabase } from './useDatabase';

const LAST_SELECTION_KEY = '@dronefrequency:lastSelection';

interface LastSelection {
  vtxDeviceId: number | null;
  vrxDeviceId: number | null;
  frequency: string;
}

interface LookupResult {
  bandId: number;
  bandSign: string;
  bandName: string;
  bandLabel?: string;
  channel: number;
  frequency: number;
  isExactMatch: boolean;
}

/**
 * Hlavní hook pro frequency lookup s state managementem
 */
export function useFrequencyLookup() {
  const db = useDatabase();
  const [vtxDeviceId, setVtxDeviceId] = useState<number | null>(null);
  const [vrxDeviceId, setVrxDeviceId] = useState<number | null>(null);
  const [frequency, setFrequency] = useState<number | null>(null);
  const [vtxResult, setVtxResult] = useState<LookupResult | null>(null);
  const [vrxResult, setVrxResult] = useState<LookupResult | null>(null);
  const [suggestions, setSuggestions] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Načíst poslední výběr při startu
  useEffect(() => {
    AsyncStorage.getItem(LAST_SELECTION_KEY).then((saved) => {
      if (saved) {
        try {
          const parsed: LastSelection = JSON.parse(saved);
          setVtxDeviceId(parsed.vtxDeviceId);
          setVrxDeviceId(parsed.vrxDeviceId);
          if (parsed.frequency) {
            setFrequency(parseInt(parsed.frequency, 10));
          }
        } catch (e) {
          console.error('Failed to parse last selection:', e);
        }
      }
    });
  }, []);

  const handleLookup = useCallback(async () => {
    if (!frequency || !vtxDeviceId || !vrxDeviceId) return;

    setIsLoading(true);
    setVtxResult(null);
    setVrxResult(null);
    setSuggestions([]);

    try {
      // Uložit výběr
      const selection: LastSelection = {
        vtxDeviceId,
        vrxDeviceId,
        frequency: frequency.toString(),
      };
      await AsyncStorage.setItem(LAST_SELECTION_KEY, JSON.stringify(selection));

      // Najít frekvenci
      const result = await queries.findChannelByFrequency(db, vtxDeviceId, vrxDeviceId, frequency);

      if (result) {
        if ('vtx' in result && result.vtx) {
          setVtxResult({
            bandId: result.vtx.bandId,
            bandSign: result.vtx.bandSign,
            bandName: result.vtx.bandName,
            bandLabel: result.vtx.bandLabel,
            channel: result.vtx.channel,
            frequency: result.vtx.frequency,
            isExactMatch: result.exact,
          });
        }

        if ('vrx' in result && result.vrx) {
          setVrxResult({
            bandId: result.vrx.bandId,
            bandSign: result.vrx.bandSign,
            bandName: result.vrx.bandName,
            bandLabel: result.vrx.bandLabel,
            channel: result.vrx.channel,
            frequency: result.vrx.frequency,
            isExactMatch: result.exact,
          });
        }

        // Pokud není exact match, najít nejbližší frekvence
        if (!result.exact) {
          // Získat všechny dostupné frekvence pro oba devices
          const allFrequencies: NearestFrequency[] = [];

          if (vtxDeviceId) {
            const vtxDevice = await queries.getDevice(db, vtxDeviceId);
            if (vtxDevice) {
              for (const band of vtxDevice.bands) {
                for (const channel of band.channels) {
                  allFrequencies.push({
                    frequency: channel.frequency,
                    bandId: band.bandId,
                    bandSign: band.bandSign,
                    bandName: band.bandName,
                    channel: channel.number,
                    deviceType: 'VTX',
                    distance: Math.abs(channel.frequency - frequency),
                  });
                }
              }
            }
          }

          if (vrxDeviceId) {
            const vrxDevice = await queries.getDevice(db, vrxDeviceId);
            if (vrxDevice) {
              for (const band of vrxDevice.bands) {
                for (const channel of band.channels) {
                  allFrequencies.push({
                    frequency: channel.frequency,
                    bandId: band.bandId,
                    bandSign: band.bandSign,
                    bandName: band.bandName,
                    channel: channel.number,
                    deviceType: 'VRX',
                    distance: Math.abs(channel.frequency - frequency),
                  });
                }
              }
            }
          }

          const nearest = findNearestFrequencies(allFrequencies, frequency);
          if (nearest) {
            const nearestFreqs = [
              ...nearest.lower.map((f: NearestFrequency) => f.frequency),
              ...nearest.upper.map((f: NearestFrequency) => f.frequency),
            ];
            setSuggestions([...new Set(nearestFreqs)].sort((a, b) => a - b).slice(0, 5));
          }
        }
      }

      // Přidat do historie
      await queries.addToHistory(db, {
        vtxDeviceId: vtxDeviceId,
        vrxDeviceId: vrxDeviceId,
        frequency: frequency,
      });
    } catch (error) {
      console.error('Lookup error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [db, vtxDeviceId, vrxDeviceId, frequency]);

  return {
    vtxDeviceId,
    vrxDeviceId,
    frequency,
    vtxResult,
    vrxResult,
    suggestions,
    isLoading,
    setVtxDeviceId,
    setVrxDeviceId,
    setFrequency,
    handleLookup,
  };
}
