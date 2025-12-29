<?php

namespace App\Providers;

use App\Events\BookingCreated;
use App\Events\ContactCreated;
use App\Listeners\SendBookingNotifications;
use App\Listeners\SendContactNotification;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Event listeners
        Event::listen(
            BookingCreated::class,
            SendBookingNotifications::class
        );

        Event::listen(
            ContactCreated::class,
            SendContactNotification::class
        );

        // Rate limiters
        $this->configureRateLimiting();
    }

    /**
     * Configure rate limiting for the application.
     */
    protected function configureRateLimiting(): void
    {
        // General API rate limit: 60 requests per minute
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->ip());
        });

        // Strict limit for form submissions: 5 per minute
        RateLimiter::for('submissions', function (Request $request) {
            return Limit::perMinute(5)->by($request->ip())->response(function () {
                return response()->json([
                    'success' => false,
                    'message' => 'Too many requests. Please try again later.',
                ], 429);
            });
        });

        // Very strict limit for bookings: 3 per minute
        RateLimiter::for('bookings', function (Request $request) {
            return Limit::perMinute(3)->by($request->ip())->response(function () {
                return response()->json([
                    'success' => false,
                    'message' => 'Too many booking attempts. Please wait a moment.',
                ], 429);
            });
        });
    }
}
