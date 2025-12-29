'use client';

import { useState } from 'react';
import { Calendar, type DateRange } from '@/components/ui/calendar';
import { useVehicleAvailability } from '@/hooks/useVehicleAvailability';
import { format, isBefore, startOfDay, isWithinInterval, isSameDay } from 'date-fns';
import { Loader2, AlertCircle } from 'lucide-react';

interface BookingCalendarProps {
  vehicleId?: number;
  onDateRangeSelect: (range: { start: string; end: string } | null) => void;
  initialStartDate?: string;
  initialEndDate?: string;
}

export function BookingCalendar({
  vehicleId,
  onDateRangeSelect,
  initialStartDate,
  initialEndDate,
}: BookingCalendarProps) {
  const { unavailableDates, isLoading, error } = useVehicleAvailability(vehicleId);

  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    if (initialStartDate && initialEndDate) {
      return {
        from: new Date(initialStartDate + 'T00:00:00'),
        to: new Date(initialEndDate + 'T00:00:00'),
      };
    }
    return undefined;
  });

  const today = startOfDay(new Date());

  const isDateDisabled = (date: Date): boolean => {
    if (isBefore(date, today)) return true;
    return unavailableDates.some((unavailable) => isSameDay(date, unavailable));
  };

  const rangeContainsUnavailable = (from: Date, to: Date): boolean => {
    return unavailableDates.some((unavailable) =>
      isWithinInterval(unavailable, { start: from, end: to })
    );
  };

  const handleSelect = (range: DateRange | undefined) => {
    if (range?.from && range?.to && rangeContainsUnavailable(range.from, range.to)) {
      setDateRange({ from: range.from, to: undefined });
      onDateRangeSelect(null);
      return;
    }

    setDateRange(range);

    if (range?.from && range?.to) {
      onDateRangeSelect({
        start: format(range.from, 'yyyy-MM-dd'),
        end: format(range.to, 'yyyy-MM-dd'),
      });
    } else {
      onDateRangeSelect(null);
    }
  };

  return (
    <div className="space-y-4">
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
          <span className="ml-2 text-sm text-gray-500">Loading availability...</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {!isLoading && (
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={handleSelect}
          disabled={isDateDisabled}
          numberOfMonths={2}
          fromDate={today}
          className="border border-gray-200 rounded-lg"
        />
      )}

      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 bg-amber-500 rounded-sm" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 bg-gray-200 rounded-sm relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-px bg-gray-400 rotate-45" />
            </div>
          </div>
          <span>Unavailable</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 bg-accent border border-gray-300 rounded-sm" />
          <span>Today</span>
        </div>
      </div>

      {dateRange?.from && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded">
          <p className="text-sm font-medium text-amber-900">
            {dateRange.to ? (
              <>
                {format(dateRange.from, 'MMM d, yyyy')} - {format(dateRange.to, 'MMM d, yyyy')}
                <span className="ml-2 text-amber-700 font-normal">
                  ({Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) + 1} days)
                </span>
              </>
            ) : (
              <>Select end date: {format(dateRange.from, 'MMM d, yyyy')}</>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
