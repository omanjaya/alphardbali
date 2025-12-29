<?php

namespace App\Listeners;

use App\Events\BookingCreated;
use App\Mail\BookingConfirmation;
use App\Models\NotificationLog;
use App\Services\WhatsAppService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SendBookingNotifications implements ShouldQueue
{
    use InteractsWithQueue;

    public function __construct(
        protected WhatsAppService $whatsAppService
    ) {}

    public function handle(BookingCreated $event): void
    {
        $booking = $event->booking;

        // Send email confirmation to customer
        $this->sendEmailConfirmation($booking);

        // Send WhatsApp notification to admin
        $this->sendWhatsAppToAdmin($booking);
    }

    protected function sendEmailConfirmation($booking): void
    {
        try {
            Mail::to($booking->customer_email)->send(new BookingConfirmation($booking));

            NotificationLog::create([
                'booking_id' => $booking->id,
                'type' => 'email',
                'recipient' => $booking->customer_email,
                'subject' => 'Booking Confirmation - ' . $booking->booking_number,
                'status' => 'sent',
                'sent_at' => now(),
            ]);

            Log::info('Booking confirmation email sent', ['booking' => $booking->booking_number]);
        } catch (\Exception $e) {
            NotificationLog::create([
                'booking_id' => $booking->id,
                'type' => 'email',
                'recipient' => $booking->customer_email,
                'subject' => 'Booking Confirmation - ' . $booking->booking_number,
                'status' => 'failed',
                'error_message' => $e->getMessage(),
            ]);

            Log::error('Failed to send booking confirmation email', [
                'booking' => $booking->booking_number,
                'error' => $e->getMessage(),
            ]);
        }
    }

    protected function sendWhatsAppToAdmin($booking): void
    {
        try {
            $message = $this->whatsAppService->formatBookingMessage($booking);
            $result = $this->whatsAppService->sendToAdmin($message);

            NotificationLog::create([
                'booking_id' => $booking->id,
                'type' => 'whatsapp',
                'recipient' => config('services.fonnte.admin_phone'),
                'subject' => 'New Booking: ' . $booking->booking_number,
                'status' => $result['success'] ? 'sent' : 'failed',
                'error_message' => $result['error'] ?? null,
                'sent_at' => $result['success'] ? now() : null,
            ]);
        } catch (\Exception $e) {
            NotificationLog::create([
                'booking_id' => $booking->id,
                'type' => 'whatsapp',
                'recipient' => config('services.fonnte.admin_phone'),
                'subject' => 'New Booking: ' . $booking->booking_number,
                'status' => 'failed',
                'error_message' => $e->getMessage(),
            ]);

            Log::error('Failed to send WhatsApp notification', [
                'booking' => $booking->booking_number,
                'error' => $e->getMessage(),
            ]);
        }
    }
}
