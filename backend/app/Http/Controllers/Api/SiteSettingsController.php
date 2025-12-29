<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;

class SiteSettingsController extends Controller
{
    public function index()
    {
        $settings = SiteSetting::getAllSettings();

        return response()->json([
            'success' => true,
            'data' => $settings,
        ]);
    }

    public function show(string $key)
    {
        $value = SiteSetting::get($key);

        if ($value === null) {
            return response()->json([
                'success' => false,
                'message' => 'Setting not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $value,
        ]);
    }

    public function group(string $group)
    {
        $settings = SiteSetting::getByGroup($group);

        return response()->json([
            'success' => true,
            'data' => $settings,
        ]);
    }
}
