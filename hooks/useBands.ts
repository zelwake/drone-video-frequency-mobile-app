import * as queries from '@/db/queries';
import { useQuery } from '@tanstack/react-query';
import { useDatabase } from './useDatabase';

/**
 * Hook to get all bands
 */
export function useBands() {
  const db = useDatabase();

  return useQuery({
    queryKey: ['bands', db],
    queryFn: () => queries.getAllBands(db),
  });
}

/**
 * Hook to get only official bands
 */
export function useOfficialBands() {
  const db = useDatabase();

  return useQuery({
    queryKey: ['bands', 'official', db],
    queryFn: () => queries.getOfficialBands(db),
  });
}
