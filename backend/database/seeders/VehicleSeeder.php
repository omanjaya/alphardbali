<?php

namespace Database\Seeders;

use App\Models\Vehicle;
use App\Models\VehicleImage;
use Illuminate\Database\Seeder;

class VehicleSeeder extends Seeder
{
    public function run(): void
    {
        $vehicles = [
            [
                'name' => 'Toyota Alphard Executive Lounge',
                'slug' => 'alphard-executive-lounge',
                'type' => 'Premium MPV',
                'description' => 'Toyota Alphard Executive Lounge adalah pilihan terbaik untuk pengalaman perjalanan mewah di Bali. Dengan interior premium dan fitur canggih, kenyamanan Anda adalah prioritas utama kami.',
                'short_description' => 'Alphard Executive Lounge dengan interior super premium dan fitur terlengkap',
                'specifications' => [
                    'seats' => 7,
                    'transmission' => 'Automatic',
                    'fuelType' => 'Bensin',
                    'year' => 2023,
                    'color' => 'Black',
                    'engine' => '2.5L Hybrid',
                    'features' => [
                        'Executive Lounge Seats',
                        'Ottoman Leg Rest',
                        'JBL Premium Audio',
                        'Rear Entertainment',
                        'Digital Inner Mirror',
                        'Panoramic View Monitor',
                    ],
                ],
                'price_per_day' => 2500000,
                'price_per_hour' => 350000,
                'is_active' => true,
            ],
            [
                'name' => 'Toyota Alphard G',
                'slug' => 'alphard-g',
                'type' => 'Premium MPV',
                'description' => 'Toyota Alphard G menawarkan kenyamanan dan kemewahan dengan harga yang lebih terjangkau. Cocok untuk keluarga dan perjalanan bisnis di Bali.',
                'short_description' => 'Alphard G dengan harga terjangkau tanpa mengurangi kenyamanan',
                'specifications' => [
                    'seats' => 7,
                    'transmission' => 'Automatic',
                    'fuelType' => 'Bensin',
                    'year' => 2022,
                    'color' => 'White Pearl',
                    'engine' => '2.5L',
                    'features' => [
                        'Power Sliding Door',
                        'Leather Seats',
                        'Climate Control',
                        'Rear AC',
                        'Safety Sense',
                        'Cruise Control',
                    ],
                ],
                'price_per_day' => 1800000,
                'price_per_hour' => 250000,
                'is_active' => true,
            ],
        ];

        $vehicleImages = [
            'alphard-executive-lounge' => [
                ['image_path' => 'vehicles/alphard-black.png', 'alt_text' => 'Toyota Alphard Executive Lounge - Exterior', 'is_primary' => true, 'sort_order' => 1],
                ['image_path' => 'vehicles/interior.png', 'alt_text' => 'Toyota Alphard Executive Lounge - Interior', 'is_primary' => false, 'sort_order' => 2],
            ],
            'alphard-g' => [
                ['image_path' => 'vehicles/alphard-white.png', 'alt_text' => 'Toyota Alphard G - Exterior', 'is_primary' => true, 'sort_order' => 1],
                ['image_path' => 'vehicles/interior.png', 'alt_text' => 'Toyota Alphard G - Interior', 'is_primary' => false, 'sort_order' => 2],
            ],
        ];

        foreach ($vehicles as $vehicleData) {
            $vehicle = Vehicle::firstOrCreate(
                ['slug' => $vehicleData['slug']],
                $vehicleData
            );

            $images = $vehicleImages[$vehicle->slug] ?? [];
            foreach ($images as $imageData) {
                VehicleImage::firstOrCreate(
                    ['vehicle_id' => $vehicle->id, 'sort_order' => $imageData['sort_order']],
                    $imageData
                );
            }
        }
    }
}
