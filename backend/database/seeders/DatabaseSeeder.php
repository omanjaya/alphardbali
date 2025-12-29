<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user for Filament
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@alphardbali.com',
            'password' => bcrypt('admin123'),
        ]);

        // Seed all data
        $this->call([
            VehicleSeeder::class,
            ServiceSeeder::class,
            TestimonialSeeder::class,
            FaqSeeder::class,
            SiteSettingsSeeder::class,
        ]);
    }
}
