import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDatabase } from './useDatabase';
import * as queries from '@/db/queries';
import { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LAST_SELECTION_KEY = '@dronefrequency:lastSelection';

interface LastSelection {
  vtxDeviceId: number | null;
  vrxDeviceId: number | null;
  frequency: string;
}

/**
 * Hook pro hlavní frequency lookup funkci
 */
export function useFrequencyLookup(
  vtxDeviceId: number | null,
  vrxDeviceId: number | null,
  frequency: number | null
) {
  const db = useDatabase();

  return useQuery({
    queryKey: ['frequencyLookup', vtxDeviceId, vrxDeviceId, frequency],
    queryFn: () => {
      if (!vtxDeviceId || !vrxDeviceId || !frequency) return null;
      return queries.findChannelByFrequency(db, vtxDeviceId, vrxDeviceId, frequency);
    },
    enabled: vtxDeviceId !== null && vrxDeviceId !== null && frequency !== null,
  });
}

/**
 * Hook pro ukládání a načítání posledního výběru
 */
export function useLastSelection() {
  const [lastSelection, setLastSelectionState] = useState<LastSelection>({
    vtxDeviceId: null,
    vrxDeviceId: null,
    frequency: '',
  });

  // Načíst při startu
  useEffect(() => {
    AsyncStorage.getItem(LAST_SELECTION_KEY).then((saved) => {
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setLastSelectionState(parsed);
        } catch (e) {
          console.error('Failed to parse last selection:', e);
        }
      }
    });
  }, []);

  const setLastSelection = useCallback((selection: Partial<LastSelection>) => {
    setLastSelectionState((prev) => {
      const newSelection = { ...prev, ...selection };
      AsyncStorage.setItem(LAST_SELECTION_KEY, JSON.stringify(newSelection));
      return newSelection;
    });
  }, []);

  return { lastSelection, setLastSelection };
}

/**
 * Hook pro přidání do historie
 */
export function useAddToHistory() {
  const db = useDatabase();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { vtxDeviceId?: number; vrxDeviceId?: number; frequency: number }) =>
      queries.addToHistory(db, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['history'] });
    },
  });
}
