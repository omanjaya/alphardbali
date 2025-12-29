<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BlockedDate extends Model
{
    use HasFactory;

    protected $fillable = [
        'vehicle_id',
        'start_date',
        'end_date',
        'reason',
        'notes',
        'created_by',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    /**
     * Sanitize notes before saving to prevent XSS
     */
    public function setNotesAttribute($value): void
    {
        $this->attributes['notes'] = $value ? strip_tags(trim($value)) : null;
    }

    /**
     * Sanitize reason before saving
     */
    public function setReasonAttribute($value): void
    {
        $this->attributes['reason'] = $value ? strip_tags(trim($value)) : null;
    }

    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function overlapsWithRange($startDate, $endDate): bool
    {
        return !($endDate < $this->start_date || $startDate > $this->end_date);
    }
}
