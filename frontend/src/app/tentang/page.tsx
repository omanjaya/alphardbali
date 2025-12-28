import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TentangPage } from '@/components/sections/TentangPage';

export const metadata: Metadata = {
    title: 'Tentang Kami - Alphard Bali Rental Terpercaya',
    description: 'Kenali Alphard Bali, penyedia layanan sewa mobil Alphard premium di Bali dengan pengalaman lebih dari 6 tahun dan kepuasan pelanggan 98%.',
    keywords: ['tentang alphard bali', 'rental mobil terpercaya bali', 'sejarah alphard bali'],
};

export default function AboutPage() {
    return (
        <>
            <Header />
            <main>
                <TentangPage />
            </main>
            <Footer />
        </>
    );
}
