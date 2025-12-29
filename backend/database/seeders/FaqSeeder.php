<?php

namespace Database\Seeders;

use App\Models\Faq;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    public function run(): void
    {
        $faqs = [
            [
                'question' => 'Berapa harga sewa Alphard di Bali?',
                'answer' => 'Harga sewa Alphard di Bali mulai dari Rp 1.800.000 per hari untuk Alphard G dan Rp 2.500.000 per hari untuk Alphard Executive Lounge. Harga sudah termasuk supir profesional dan BBM.',
                'category' => 'pricing',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'question' => 'Apakah sewa Alphard sudah termasuk supir?',
                'answer' => 'Ya, semua paket sewa Alphard di Alphard Bali sudah termasuk supir profesional yang berpengalaman, berlisensi, dan menguasai rute di seluruh Bali.',
                'category' => 'service',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'question' => 'Bagaimana cara booking sewa Alphard di Bali?',
                'answer' => 'Anda dapat booking melalui WhatsApp di nomor +62 812-3456-7890, melalui website kami, atau telepon langsung. Konfirmasi ketersediaan dalam hitungan menit.',
                'category' => 'booking',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'question' => 'Apakah tersedia layanan airport transfer dengan Alphard?',
                'answer' => 'Ya, kami menyediakan layanan airport transfer dari dan ke Bandara Ngurah Rai dengan harga mulai Rp 500.000. Supir akan menunggu di area kedatangan dengan papan nama.',
                'category' => 'service',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'question' => 'Area mana saja yang dilayani Alphard Bali?',
                'answer' => 'Alphard Bali melayani seluruh wilayah Bali termasuk Denpasar, Kuta, Seminyak, Ubud, Nusa Dua, Sanur, Canggu, Jimbaran, Uluwatu, dan sekitarnya. Kami juga melayani tour ke destinasi wisata populer.',
                'category' => 'coverage',
                'sort_order' => 5,
                'is_active' => true,
            ],
            [
                'question' => 'Kenapa harus sewa Alphard di Alphard Bali?',
                'answer' => 'Alphard Bali adalah penyedia sewa Alphard terbaik di Bali dengan rating 5.0, pengalaman sejak 2018, lebih dari 5000 perjalanan sukses, armada terawat prima, supir profesional berpengalaman, dan harga transparan tanpa biaya tersembunyi.',
                'category' => 'general',
                'sort_order' => 6,
                'is_active' => true,
            ],
            [
                'question' => 'Berapa durasi minimal sewa Alphard?',
                'answer' => 'Durasi minimal sewa Alphard adalah 8 jam per hari untuk sewa harian. Untuk airport transfer, durasi menyesuaikan dengan kebutuhan perjalanan Anda.',
                'category' => 'booking',
                'sort_order' => 7,
                'is_active' => true,
            ],
            [
                'question' => 'Apakah bisa request supir yang sama untuk booking berikutnya?',
                'answer' => 'Ya, Anda bisa request supir yang sama jika tersedia. Kami akan berusaha mengakomodasi permintaan Anda untuk kenyamanan perjalanan.',
                'category' => 'service',
                'sort_order' => 8,
                'is_active' => true,
            ],
        ];

        foreach ($faqs as $faqData) {
            Faq::create($faqData);
        }
    }
}
