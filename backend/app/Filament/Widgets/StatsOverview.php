<?php

namespace App\Filament\Widgets;

use App\Models\Booking;
use App\Models\Vehicle;
use App\Models\ContactMessage;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $totalBookings = Booking::count();
        $pendingBookings = Booking::where('status', 'pending')->count();
        $totalVehicles = Vehicle::where('is_active', true)->count();
        $unreadMessages = ContactMessage::where('is_read', false)->count();

        // Calculate this month's revenue
        $monthlyRevenue = Booking::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->where('status', '!=', 'cancelled')
            ->sum('total_price');

        return [
            Stat::make('Total Bookings', $totalBookings)
                ->description('All time bookings')
                ->descriptionIcon('heroicon-m-calendar')
                ->color('success'),

            Stat::make('Pending Bookings', $pendingBookings)
                ->description('Awaiting confirmation')
                ->descriptionIcon('heroicon-m-clock')
                ->color($pendingBookings > 0 ? 'warning' : 'success'),

            Stat::make('Active Vehicles', $totalVehicles)
                ->description('Available for rent')
                ->descriptionIcon('heroicon-m-truck')
                ->color('info'),

            Stat::make('Monthly Revenue', 'Rp ' . number_format($monthlyRevenue, 0, ',', '.'))
                ->description('This month')
                ->descriptionIcon('heroicon-m-currency-dollar')
                ->color('success'),

            Stat::make('Unread Messages', $unreadMessages)
                ->description('Contact form')
                ->descriptionIcon('heroicon-m-envelope')
                ->color($unreadMessages > 0 ? 'warning' : 'success'),
        ];
    }
}
