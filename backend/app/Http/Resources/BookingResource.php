<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'booking_number' => $this->booking_number,
            'customer_name' => $this->customer_name,
            'customer_email' => $this->customer_email,
            'customer_phone' => $this->customer_phone,
            'vehicle' => new VehicleResource($this->whenLoaded('vehicle')),
            'service' => new ServiceResource($this->whenLoaded('service')),
            'start_date' => $this->start_date->format('Y-m-d'),
            'end_date' => $this->end_date->format('Y-m-d'),
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'pickup_location' => $this->pickup_location,
            'dropoff_location' => $this->dropoff_location,
            'notes' => $this->notes,
            'total_price' => $this->total_price,
            'formatted_total_price' => $this->formatted_total_price,
            'status' => $this->status,
            'duration_days' => $this->duration_days,
            'created_at' => $this->created_at->toISOString(),
        ];
    }
}
