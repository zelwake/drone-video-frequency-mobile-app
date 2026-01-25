import { useQuery } from '@tanstack/react-query';
import { useDatabase } from './useDatabase';
import * as queries from '@/db/queries';

/**
 * Hook pro získání všech pásem
 */
export function useBands() {
  const db = useDatabase();

  return useQuery({
    queryKey: ['bands'],
    queryFn: () => queries.getAllBands(db),
  });
}

/**
 * Hook pro získání pouze oficiálních pásem
 */
export function useOfficialBands() {
  const db = useDatabase();

  return useQuery({
    queryKey: ['bands', 'official'],
    queryFn: () => queries.getOfficialBands(db),
  });
}
