<?php

use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\FaqController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\SiteSettingsController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\VehicleAvailabilityController;
use App\Http\Controllers\Api\VehicleController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| API v1 routes for Alphard Bali frontend
|
*/

Route::prefix('v1')->middleware(['throttle:api'])->group(function () {
    // Vehicles
    Route::get('/vehicles', [VehicleController::class, 'index']);
    Route::get('/vehicles/{slug}', [VehicleController::class, 'show']);
    Route::get('/vehicles/{id}/availability', [VehicleAvailabilityController::class, 'show'])
        ->where('id', '[0-9]+');

    // Services
    Route::get('/services', [ServiceController::class, 'index']);
    Route::get('/services/{slug}', [ServiceController::class, 'show']);

    // Bookings - stricter rate limit
    Route::post('/bookings', [BookingController::class, 'store'])
        ->middleware('throttle:bookings');
    Route::post('/bookings/check-availability', [VehicleAvailabilityController::class, 'checkAvailability'])
        ->middleware('throttle:submissions');

    // Contact - moderate rate limit
    Route::post('/contact', [ContactController::class, 'store'])
        ->middleware('throttle:submissions');

    // Testimonials
    Route::get('/testimonials', [TestimonialController::class, 'featured']);
    Route::get('/testimonials/all', [TestimonialController::class, 'index']);

    // FAQs
    Route::get('/faqs', [FaqController::class, 'index']);

    // Site Settings
    Route::get('/settings', [SiteSettingsController::class, 'index']);
    Route::get('/settings/group/{group}', [SiteSettingsController::class, 'group']);
    Route::get('/settings/{key}', [SiteSettingsController::class, 'show']);
});
