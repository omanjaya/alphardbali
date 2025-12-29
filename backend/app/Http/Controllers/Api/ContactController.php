<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactRequest;
use App\Models\ContactMessage;

class ContactController extends Controller
{
    public function store(StoreContactRequest $request)
    {
        ContactMessage::create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Thank you for your message. We will get back to you soon.',
        ], 201);
    }
}
