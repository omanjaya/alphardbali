<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\BlockedDate;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Support\Collection;

class AvailabilityService
{
    /**
     * Get all unavailable dates for a vehicle within a date range
     */
    public function getUnavailableDates(
        int $vehicleId,
        string $startDate,
        string $endDate
    ): array {
        $start = Carbon::parse($startDate);
        $end = Carbon::parse($endDate);

        $bookedDates = $this->getBookedDates($vehicleId, $start, $end);
        $blockedDates = $this->getBlockedDates($vehicleId, $start, $end);

        $allDates = array_unique(array_merge($bookedDates, $blockedDates));
        sort($allDates);

        return $allDates;
    }

    /**
     * Get dates blocked by confirmed/pending bookings
     */
    protected function getBookedDates(int $vehicleId, Carbon $start, Carbon $end): array
    {
        $bookings = Booking::where('vehicle_id', $vehicleId)
            ->whereIn('status', ['pending', 'confirmed', 'in_progress'])
            ->where(function ($query) use ($start, $end) {
                $query->where('start_date', '<=', $end)
                      ->where('end_date', '>=', $start);
            })
            ->get(['start_date', 'end_date']);

        return $this->expandDateRanges($bookings);
    }

    /**
     * Get dates blocked by admin (maintenance, private use, etc.)
     */
    protected function getBlockedDates(int $vehicleId, Carbon $start, Carbon $end): array
    {
        $blocks = BlockedDate::where('vehicle_id', $vehicleId)
            ->where('start_date', '<=', $end)
            ->where('end_date', '>=', $start)
            ->get(['start_date', 'end_date']);

        return $this->expandDateRanges($blocks);
    }

    /**
     * Expand date ranges to individual dates array
     */
    protected function expandDateRanges(Collection $ranges): array
    {
        $dates = [];
        foreach ($ranges as $range) {
            $period = CarbonPeriod::create($range->start_date, $range->end_date);
            foreach ($period as $date) {
                $dates[] = $date->format('Y-m-d');
            }
        }
        return $dates;
    }

    /**
     * Check if a vehicle is available for a specific date range
     */
    public function isAvailable(
        int $vehicleId,
        string $startDate,
        string $endDate,
        ?int $excludeBookingId = null
    ): array {
        $start = Carbon::parse($startDate);
        $end = Carbon::parse($endDate);

        $bookingConflicts = Booking::where('vehicle_id', $vehicleId)
            ->whereIn('status', ['pending', 'confirmed', 'in_progress'])
            ->when($excludeBookingId, fn($q) => $q->where('id', '!=', $excludeBookingId))
            ->where(function ($query) use ($start, $end) {
                $query->where('start_date', '<=', $end)
                      ->where('end_date', '>=', $start);
            })
            ->get(['id', 'start_date', 'end_date']);

        $blockedConflicts = BlockedDate::where('vehicle_id', $vehicleId)
            ->where('start_date', '<=', $end)
            ->where('end_date', '>=', $start)
            ->get(['start_date', 'end_date', 'reason']);

        $conflicts = [];

        foreach ($bookingConflicts as $booking) {
            $conflicts[] = [
                'type' => 'booking',
                'start_date' => $booking->start_date->format('Y-m-d'),
                'end_date' => $booking->end_date->format('Y-m-d'),
            ];
        }

        foreach ($blockedConflicts as $block) {
            $conflicts[] = [
                'type' => 'blocked',
                'start_date' => $block->start_date->format('Y-m-d'),
                'end_date' => $block->end_date->format('Y-m-d'),
                'reason' => $block->reason,
            ];
        }

        return [
            'available' => empty($conflicts),
            'conflicts' => $conflicts,
        ];
    }
}
