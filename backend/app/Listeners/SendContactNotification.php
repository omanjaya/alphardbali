<?php

namespace App\Listeners;

use App\Events\ContactCreated;
use App\Services\WhatsAppService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class SendContactNotification implements ShouldQueue
{
    use InteractsWithQueue;

    public function __construct(
        protected WhatsAppService $whatsAppService
    ) {}

    public function handle(ContactCreated $event): void
    {
        $contact = $event->contact;

        try {
            $message = $this->whatsAppService->formatContactMessage($contact);
            $result = $this->whatsAppService->sendToAdmin($message);

            if ($result['success']) {
                Log::info('Contact WhatsApp notification sent', ['contact_id' => $contact->id]);
            }
        } catch (\Exception $e) {
            Log::error('Failed to send contact WhatsApp notification', [
                'contact_id' => $contact->id,
                'error' => $e->getMessage(),
            ]);
        }
    }
}
