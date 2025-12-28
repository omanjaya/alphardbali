import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FleetPage } from '@/components/sections/FleetPage';

export const metadata: Metadata = {
    title: 'Armada - Pilihan Mobil Alphard Premium',
    description: 'Lihat koleksi armada Toyota Alphard premium kami. Tersedia berbagai tipe Alphard dengan interior mewah untuk kebutuhan sewa mobil di Bali.',
    keywords: ['armada alphard bali', 'mobil alphard', 'toyota alphard rental', 'alphard executive lounge'],
};

export default function ArmadaPage() {
    return (
        <>
            <Header />
            <main>
                <FleetPage />
            </main>
            <Footer />
        </>
    );
}
