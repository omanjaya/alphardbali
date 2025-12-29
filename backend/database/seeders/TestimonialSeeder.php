<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        $testimonials = [
            [
                'customer_name' => 'Budi Santoso',
                'customer_role' => 'Pengusaha',
                'content' => 'Pelayanan sangat memuaskan! Supir ramah dan profesional, mobil bersih dan nyaman. Sangat direkomendasikan untuk perjalanan bisnis di Bali.',
                'rating' => 5,
                'is_featured' => true,
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'customer_name' => 'Sarah Wijaya',
                'customer_role' => 'Wedding Planner',
                'content' => 'Alphard Bali adalah partner terpercaya untuk wedding car. Dekorasi cantik, supir profesional, dan selalu on time. Sudah berkali-kali pakai jasa mereka.',
                'rating' => 5,
                'is_featured' => true,
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'customer_name' => 'Michael Chen',
                'customer_role' => 'Tourist from Singapore',
                'content' => 'Best Alphard rental service in Bali! The car was immaculately clean, driver was punctual and knew all the best spots. Will definitely book again for my next trip.',
                'rating' => 5,
                'is_featured' => true,
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'customer_name' => 'Dewi Lestari',
                'customer_role' => 'Ibu Rumah Tangga',
                'content' => 'Liburan keluarga jadi lebih nyaman dengan Alphard. Anak-anak senang karena mobil luas dan ada entertainment di belakang. Terima kasih Alphard Bali!',
                'rating' => 5,
                'is_featured' => false,
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'customer_name' => 'Ahmad Fadli',
                'customer_role' => 'Event Organizer',
                'content' => 'Sudah beberapa kali pakai untuk event corporate. Koordinasi mudah, armada selalu ready, dan harga kompetitif. Top!',
                'rating' => 5,
                'is_featured' => false,
                'is_active' => true,
                'sort_order' => 5,
            ],
        ];

        foreach ($testimonials as $testimonialData) {
            Testimonial::create($testimonialData);
        }
    }
}
