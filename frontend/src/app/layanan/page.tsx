import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LayananPage } from '@/components/sections/LayananPage';

export const metadata: Metadata = {
    title: 'Layanan - Rental Alphard untuk Semua Kebutuhan',
    description: 'Layanan sewa Alphard Bali: Airport Transfer, Wedding Car, Tour Wisata, Corporate, dan Event. Supir profesional dan armada premium.',
    keywords: ['layanan rental alphard', 'airport transfer bali', 'wedding car bali', 'tour wisata bali'],
};

export default function ServicesPage() {
    return (
        <>
            <Header />
            <main>
                <LayananPage />
            </main>
            <Footer />
        </>
    );
}
