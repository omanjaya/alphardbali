<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VehicleResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'type' => $this->type,
            'description' => $this->description,
            'short_description' => $this->short_description,
            'specifications' => $this->specifications,
            'price_per_day' => $this->price_per_day,
            'price_per_hour' => $this->price_per_hour,
            'formatted_price' => $this->formatted_price,
            'images' => $this->whenLoaded('images', function () {
                return $this->images->map(fn ($image) => [
                    'id' => $image->id,
                    'url' => asset('storage/' . $image->image_path),
                    'alt' => $image->alt_text,
                    'is_primary' => $image->is_primary,
                ]);
            }),
            'primary_image' => $this->when($this->images->isNotEmpty(), function () {
                $primary = $this->images->firstWhere('is_primary', true) ?? $this->images->first();
                return $primary ? asset('storage/' . $primary->image_path) : null;
            }),
        ];
    }
}
