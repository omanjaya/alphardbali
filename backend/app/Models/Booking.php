<?php

namespace App\Models;

use App\Events\BookingCreated;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_number',
        'customer_name',
        'customer_email',
        'customer_phone',
        'vehicle_id',
        'service_id',
        'start_date',
        'end_date',
        'start_time',
        'end_time',
        'pickup_location',
        'dropoff_location',
        'notes',
        'total_price',
        // 'status' - removed from fillable for security (should only be set by admin)
        // 'admin_notes' - removed from fillable for security
        // 'confirmed_at' - managed by confirm() method
        // 'cancelled_at' - managed by cancel() method
        // 'cancellation_reason' - managed by cancel() method
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'total_price' => 'decimal:2',
        'confirmed_at' => 'datetime',
        'cancelled_at' => 'datetime',
    ];

    protected $dispatchesEvents = [
        'created' => BookingCreated::class,
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($booking) {
            if (empty($booking->booking_number)) {
                $booking->booking_number = self::generateBookingNumber();
            }
            // Always set default status for new bookings
            $booking->status = 'pending';
        });
    }

    public static function generateBookingNumber(): string
    {
        $prefix = 'ALB';
        $date = now()->format('Ymd');
        $count = self::whereDate('created_at', today())->count() + 1;
        return sprintf('%s-%s-%03d', $prefix, $date, $count);
    }

    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function notificationLogs(): HasMany
    {
        return $this->hasMany(NotificationLog::class);
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeConfirmed($query)
    {
        return $query->where('status', 'confirmed');
    }

    public function getFormattedTotalPriceAttribute(): string
    {
        return 'Rp ' . number_format($this->total_price ?? 0, 0, ',', '.');
    }

    public function getFormattedTotalAttribute(): string
    {
        return number_format($this->total_price ?? 0, 0, ',', '.');
    }

    public function getDurationDaysAttribute(): int
    {
        return $this->start_date->diffInDays($this->end_date) + 1;
    }

    public function confirm(): void
    {
        $this->update([
            'status' => 'confirmed',
            'confirmed_at' => now(),
        ]);
    }

    public function cancel(string $reason = null): void
    {
        $this->update([
            'status' => 'cancelled',
            'cancelled_at' => now(),
            'cancellation_reason' => $reason,
        ]);
    }
}
