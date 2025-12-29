<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'name' => 'Sewa Harian',
                'slug' => 'sewa-harian',
                'description' => 'Layanan sewa Alphard harian dengan supir profesional. Durasi minimal 8 jam per hari dengan kilometer terbatas sesuai paket. Cocok untuk perjalanan wisata, meeting, atau acara keluarga.',
                'short_description' => 'Rental Alphard dengan supir profesional minimal 8 jam per hari',
                'icon' => 'car',
                'price' => 1800000,
                'price_type' => 'daily',
                'features' => [
                    'Supir profesional berpengalaman',
                    'BBM included',
                    'Air mineral gratis',
                    'WiFi portable (by request)',
                    'Flexible pickup location',
                ],
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Airport Transfer',
                'slug' => 'airport-transfer',
                'description' => 'Layanan antar jemput dari dan ke Bandara Ngurah Rai dengan Alphard premium. Supir akan menunggu di area kedatangan dengan papan nama.',
                'short_description' => 'Antar jemput Bandara Ngurah Rai dengan Alphard premium',
                'icon' => 'plane',
                'price' => 500000,
                'price_type' => 'fixed',
                'features' => [
                    'Meet & greet di bandara',
                    'Papan nama penjemputan',
                    'Bantuan bagasi',
                    'Tracking flight delay',
                    'Welcome drink',
                ],
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Wedding Car',
                'slug' => 'wedding-car',
                'description' => 'Mobil pengantin Alphard dengan dekorasi elegan untuk hari pernikahan Anda. Kami menyediakan paket lengkap termasuk dekorasi bunga dan red carpet.',
                'short_description' => 'Mobil pengantin Alphard dengan dekorasi untuk pernikahan',
                'icon' => 'heart',
                'price' => 3000000,
                'price_type' => 'fixed',
                'features' => [
                    'Dekorasi bunga premium',
                    'Red carpet',
                    'Supir berseragam formal',
                    'Unlimited photo session',
                    'Durasi 12 jam',
                ],
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Tour & Wisata',
                'slug' => 'tour-wisata',
                'description' => 'Paket wisata keliling Bali dengan Alphard nyaman. Supir kami menguasai rute wisata dan bisa menjadi guide informal untuk Anda.',
                'short_description' => 'Paket wisata keliling Bali dengan Alphard nyaman',
                'icon' => 'map-pin',
                'price' => 1500000,
                'price_type' => 'daily',
                'features' => [
                    'Itinerary fleksibel',
                    'Supir sebagai guide',
                    'Rekomendasi tempat wisata',
                    'Rekomendasi restoran',
                    'Durasi 10 jam',
                ],
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'Corporate',
                'slug' => 'corporate',
                'description' => 'Layanan khusus untuk kebutuhan perusahaan. Cocok untuk meeting, menjemput tamu VIP, atau roadshow perusahaan di Bali.',
                'short_description' => 'Layanan VIP untuk kebutuhan bisnis dan perusahaan',
                'icon' => 'building',
                'price' => 2000000,
                'price_type' => 'daily',
                'features' => [
                    'Invoice dan kontrak resmi',
                    'Supir profesional formal',
                    'Standby time fleksibel',
                    'Armada backup ready',
                    'Account manager dedicated',
                ],
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'name' => 'Event & MICE',
                'slug' => 'event-mice',
                'description' => 'Layanan transportasi untuk event, meeting, incentive, conference, dan exhibition. Kami menyediakan multiple unit untuk kebutuhan grup.',
                'short_description' => 'Transportasi untuk event dan MICE dengan multiple unit',
                'icon' => 'users',
                'price' => null,
                'price_type' => 'custom',
                'features' => [
                    'Multiple unit available',
                    'Koordinator tim dedicated',
                    'Branding kendaraan (by request)',
                    'Jadwal terkoordinasi',
                    'Penawaran khusus grup',
                ],
                'is_active' => true,
                'sort_order' => 6,
            ],
        ];

        foreach ($services as $serviceData) {
            Service::create($serviceData);
        }
    }
}
