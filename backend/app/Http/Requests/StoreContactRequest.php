<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactRequest extends FormRequest
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
            'name' => $this->sanitize($this->name),
            'phone' => $this->sanitize($this->phone),
            'subject' => $this->sanitize($this->subject),
            'message' => $this->sanitize($this->message),
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
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => ['nullable', 'string', 'max:50', 'regex:/^[\d\s\+\-\(\)]+$/'],
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string|max:2000',
            // Honeypot field - must be empty
            'website' => 'nullable|max:0',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Please enter your name',
            'email.required' => 'Please enter your email address',
            'email.email' => 'Please enter a valid email address',
            'phone.regex' => 'Please enter a valid phone number',
            'message.required' => 'Please enter your message',
            'website.max' => 'Spam detected',
        ];
    }
}
