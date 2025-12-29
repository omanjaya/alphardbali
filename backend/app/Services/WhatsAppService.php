<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WhatsAppService
{
    protected string $apiUrl = 'https://api.fonnte.com/send';
    protected ?string $token;
    protected ?string $adminPhone;

    public function __construct()
    {
        $this->token = config('services.fonnte.token');
        $this->adminPhone = config('services.fonnte.admin_phone');
    }

    public function sendToAdmin(string $message): array
    {
        if (!$this->adminPhone) {
            Log::warning('WhatsApp admin phone not configured');
            return ['success' => false, 'error' => 'Admin phone not configured'];
        }

        return $this->send($this->adminPhone, $message);
    }

    public function send(string $phone, string $message): array
    {
        if (!$this->token) {
            Log::warning('Fonnte token not configured');
            return ['success' => false, 'error' => 'Fonnte token not configured'];
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => $this->token,
            ])->post($this->apiUrl, [
                'target' => $phone,
                'message' => $message,
                'countryCode' => '62',
            ]);

            $result = $response->json();

            if ($response->successful() && isset($result['status']) && $result['status'] === true) {
                Log::info('WhatsApp sent successfully', ['phone' => $phone]);
                return ['success' => true, 'data' => $result];
            }

            Log::error('WhatsApp send failed', ['response' => $result]);
            return ['success' => false, 'error' => $result['reason'] ?? 'Unknown error'];
        } catch (\Exception $e) {
            Log::error('WhatsApp exception', ['error' => $e->getMessage()]);
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }

    public function formatBookingMessage($booking): string
    {
        $vehicle = $booking->vehicle?->name ?? 'N/A';
        $service = $booking->service?->name ?? 'N/A';

        return <<<MSG
🚗 *BOOKING BARU - ALPHARD BALI*

*No. Booking:* {$booking->booking_number}

*Customer:*
• Nama: {$booking->customer_name}
• Email: {$booking->customer_email}
• Telp: {$booking->customer_phone}

*Detail Booking:*
• Kendaraan: {$vehicle}
• Layanan: {$service}
• Mulai: {$booking->start_date->format('d M Y')}
• Selesai: {$booking->end_date->format('d M Y')}
• Pickup: {$booking->pickup_location}

*Total:* Rp {$booking->formatted_total}

Segera hubungi customer untuk konfirmasi.
MSG;
    }

    public function formatContactMessage($contact): string
    {
        return <<<MSG
📩 *PESAN BARU - ALPHARD BALI*

*Dari:* {$contact->name}
*Email:* {$contact->email}
*Telp:* {$contact->phone}
*Subject:* {$contact->subject}

*Pesan:*
{$contact->message}
MSG;
    }
}
