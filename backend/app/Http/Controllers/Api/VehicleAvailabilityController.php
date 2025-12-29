<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use App\Services\AvailabilityService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VehicleAvailabilityController extends Controller
{
    public function __construct(
        protected AvailabilityService $availabilityService
    ) {}

    /**
     * Get unavailable dates for a vehicle
     * Max range: 6 months to prevent abuse
     */
    public function show(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date|before_or_equal:' . now()->addMonths(6)->format('Y-m-d'),
        ]);

        $vehicle = Vehicle::findOrFail($id);

        $unavailableDates = $this->availabilityService->getUnavailableDates(
            $id,
            $request->start_date,
            $request->end_date
        );

        return response()->json([
            'success' => true,
            'data' => [
                'vehicle_id' => $vehicle->id,
                'vehicle_name' => $vehicle->name,
                'unavailable_dates' => $unavailableDates,
            ],
        ]);
    }

    /**
     * Check if specific dates are available
     */
    public function checkAvailability(Request $request): JsonResponse
    {
        $request->validate([
            'vehicle_id' => 'required|exists:vehicles,id',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $result = $this->availabilityService->isAvailable(
            $request->vehicle_id,
            $request->start_date,
            $request->end_date
        );

        return response()->json([
            'success' => $result['available'],
            'data' => [
                'available' => $result['available'],
                'vehicle_id' => $request->vehicle_id,
                'conflicts' => $result['conflicts'],
            ],
            'message' => $result['available']
                ? 'Vehicle is available'
                : 'Vehicle is not available for the selected dates',
        ]);
    }
}
