import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { KontakPage } from '@/components/sections/KontakPage';

export const metadata: Metadata = {
    title: 'Kontak - Hubungi Alphard Bali',
    description: 'Hubungi Alphard Bali untuk booking sewa mobil Alphard di Bali. Tersedia via WhatsApp, telepon, dan email. Respons cepat 24/7.',
    keywords: ['kontak alphard bali', 'booking alphard bali', 'whatsapp alphard bali'],
};

export default function ContactPage() {
    return (
        <>
            <Header />
            <main>
                <KontakPage />
            </main>
            <Footer />
        </>
    );
}
