<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\VehicleResource;
use App\Models\Vehicle;

class VehicleController extends Controller
{
    public function index()
    {
        $vehicles = Vehicle::with(['images' => fn($q) => $q->orderBy('sort_order')])
            ->active()
            ->orderBy('price_per_day')
            ->get();

        return response()->json([
            'success' => true,
            'data' => VehicleResource::collection($vehicles),
        ]);
    }

    public function show(string $slug)
    {
        $vehicle = Vehicle::with(['images' => fn($q) => $q->orderBy('sort_order')])
            ->where('slug', $slug)
            ->active()
            ->first();

        if (!$vehicle) {
            return response()->json([
                'success' => false,
                'message' => 'Vehicle not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => new VehicleResource($vehicle),
        ]);
    }
}
