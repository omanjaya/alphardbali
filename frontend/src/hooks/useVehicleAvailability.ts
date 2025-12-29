'use client';

import { useState, useEffect, useCallback } from 'react';
import { addMonths, format, startOfMonth, endOfMonth } from 'date-fns';
import { getVehicleAvailability } from '@/lib/api';

interface UseVehicleAvailabilityReturn {
  unavailableDates: Date[];
  isLoading: boolean;
  error: string | null;
  refreshAvailability: () => void;
}

export function useVehicleAvailability(
  vehicleId: number | undefined,
  monthsAhead: number = 3
): UseVehicleAvailabilityReturn {
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAvailability = useCallback(async () => {
    if (!vehicleId) {
      setUnavailableDates([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const startDate = format(startOfMonth(new Date()), 'yyyy-MM-dd');
      const endDate = format(endOfMonth(addMonths(new Date(), monthsAhead)), 'yyyy-MM-dd');

      const data = await getVehicleAvailability(vehicleId, startDate, endDate);
      const dates = (data.unavailable_dates || []).map(
        (dateStr: string) => new Date(dateStr + 'T00:00:00')
      );
      setUnavailableDates(dates);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch availability');
      setUnavailableDates([]);
    } finally {
      setIsLoading(false);
    }
  }, [vehicleId, monthsAhead]);

  useEffect(() => {
    fetchAvailability();
  }, [fetchAvailability]);

  return {
    unavailableDates,
    isLoading,
    error,
    refreshAvailability: fetchAvailability,
  };
}
