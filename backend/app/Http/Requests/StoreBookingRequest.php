<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Prepare the data for validation.
     * Sanitize inputs to prevent XSS.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'customer_name' => $this->sanitize($this->customer_name),
            'customer_phone' => $this->sanitize($this->customer_phone),
            'pickup_location' => $this->sanitize($this->pickup_location),
            'dropoff_location' => $this->sanitize($this->dropoff_location),
            'notes' => $this->sanitize($this->notes),
        ]);
    }

    /**
     * Sanitize input by stripping HTML tags.
     */
    protected function sanitize(?string $value): ?string
    {
        if ($value === null) {
            return null;
        }
        return strip_tags(trim($value));
    }

    public function rules(): array
    {
        return [
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => ['required', 'string', 'max:50', 'regex:/^[\d\s\+\-\(\)]+$/'],
            'vehicle_id' => 'nullable|integer|exists:vehicles,id',
            'service_id' => 'nullable|integer|exists:services,id',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after_or_equal:start_date',
            'start_time' => 'nullable|date_format:H:i',
            'pickup_location' => 'required|string|max:500',
            'dropoff_location' => 'nullable|string|max:500',
            'notes' => 'nullable|string|max:1000',
            // Honeypot field - must be empty
            'website' => 'nullable|max:0',
        ];
    }

    public function messages(): array
    {
        return [
            'customer_name.required' => 'Please enter your name',
            'customer_email.required' => 'Please enter your email address',
            'customer_email.email' => 'Please enter a valid email address',
            'customer_phone.required' => 'Please enter your phone number',
            'customer_phone.regex' => 'Please enter a valid phone number',
            'start_date.required' => 'Please select a start date',
            'start_date.after_or_equal' => 'Start date must be today or later',
            'end_date.required' => 'Please select an end date',
            'end_date.after_or_equal' => 'End date must be same as or after start date',
            'pickup_location.required' => 'Please enter the pickup location',
            'website.max' => 'Spam detected',
        ];
    }
}
