<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TestimonialResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'customer_name' => $this->customer_name,
            'customer_role' => $this->customer_role,
            'customer_photo' => $this->customer_photo ? asset('storage/' . $this->customer_photo) : null,
            'content' => $this->content,
            'rating' => $this->rating,
            'is_featured' => $this->is_featured,
        ];
    }
}
