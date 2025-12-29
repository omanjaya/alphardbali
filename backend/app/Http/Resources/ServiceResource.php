<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'short_description' => $this->short_description,
            'icon' => $this->icon,
            'image' => $this->image_path ? asset('storage/' . $this->image_path) : null,
            'price' => $this->price,
            'price_type' => $this->price_type,
            'formatted_price' => $this->formatted_price,
            'features' => $this->features,
        ];
    }
}
