<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookingRequest;
use App\Http\Resources\BookingResource;
use App\Models\Booking;
use App\Models\Vehicle;
use App\Services\AvailabilityService;

class BookingController extends Controller
{
    public function __construct(
        protected AvailabilityService $availabilityService
    ) {}

    public function store(StoreBookingRequest $request)
    {
        $data = $request->validated();

        // Check availability if vehicle_id is provided
        if (isset($data['vehicle_id'])) {
            $availability = $this->availabilityService->isAvailable(
                $data['vehicle_id'],
                $data['start_date'],
                $data['end_date']
            );

            if (!$availability['available']) {
                return response()->json([
                    'success' => false,
                    'message' => 'Vehicle is not available for the selected dates',
                    'errors' => [
                        'dates' => ['The selected dates conflict with existing bookings']
                    ],
                    'conflicts' => $availability['conflicts'],
                ], 422);
            }

            // Calculate total price based on vehicle and duration
            $vehicle = Vehicle::find($data['vehicle_id']);
            if ($vehicle) {
                $startDate = new \DateTime($data['start_date']);
                $endDate = new \DateTime($data['end_date']);
                $days = $startDate->diff($endDate)->days + 1;
                $data['total_price'] = $vehicle->price_per_day * $days;
            }
        }

        $booking = Booking::create($data);

        return response()->json([
            'success' => true,
            'data' => [
                'booking_number' => $booking->booking_number,
                'status' => $booking->status,
                'total_price' => $booking->total_price,
            ],
            'message' => 'Booking submitted successfully. We will contact you shortly.',
        ], 201);
    }
}
