<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class SiteSettingsSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            // Contact Group
            ['key' => 'contact_phone', 'value' => '+62 812-3456-7890', 'group' => 'contact'],
            ['key' => 'contact_whatsapp', 'value' => '6281234567890', 'group' => 'contact'],
            ['key' => 'contact_email', 'value' => 'info@alphardbali.com', 'group' => 'contact'],
            ['key' => 'contact_address', 'value' => 'Jl. Bypass Ngurah Rai No. 123, Kuta, Badung, Bali 80361', 'group' => 'contact'],
            ['key' => 'contact_latitude', 'value' => '-8.7467', 'group' => 'contact'],
            ['key' => 'contact_longitude', 'value' => '115.1753', 'group' => 'contact'],

            // Social Media Group
            ['key' => 'social_instagram', 'value' => 'https://instagram.com/alphardbali', 'group' => 'social'],
            ['key' => 'social_facebook', 'value' => 'https://facebook.com/alphardbali', 'group' => 'social'],
            ['key' => 'social_tiktok', 'value' => 'https://tiktok.com/@alphardbali', 'group' => 'social'],

            // Business Stats Group
            ['key' => 'stat_years', 'value' => '6', 'group' => 'stats'],
            ['key' => 'stat_trips', 'value' => '5000', 'group' => 'stats'],
            ['key' => 'stat_satisfaction', 'value' => '98', 'group' => 'stats'],
            ['key' => 'stat_vehicles', 'value' => '10', 'group' => 'stats'],
            ['key' => 'stat_rating', 'value' => '5.0', 'group' => 'stats'],
            ['key' => 'stat_reviews', 'value' => '328', 'group' => 'stats'],

            // Company Info Group
            ['key' => 'company_name', 'value' => 'Alphard Bali', 'group' => 'company'],
            ['key' => 'company_tagline', 'value' => 'Sewa Alphard Terbaik di Bali', 'group' => 'company'],
            ['key' => 'company_description', 'value' => 'Alphard Bali adalah penyedia jasa sewa mobil Alphard TERBAIK dan TERPERCAYA di Bali sejak 2018.', 'group' => 'company'],
            ['key' => 'company_founded', 'value' => '2018', 'group' => 'company'],

            // Pricing Group
            ['key' => 'price_starting', 'value' => '1800000', 'group' => 'pricing'],
            ['key' => 'price_airport_transfer', 'value' => '500000', 'group' => 'pricing'],
            ['key' => 'price_wedding', 'value' => '3000000', 'group' => 'pricing'],
        ];

        foreach ($settings as $setting) {
            SiteSetting::create($setting);
        }
    }
}
