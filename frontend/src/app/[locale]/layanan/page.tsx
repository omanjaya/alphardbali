import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LayananPage } from '@/components/sections/LayananPage';

export async function generateMetadata() {
    const t = await getTranslations('services');
    return {
        title: t('sectionTitle'),
        description: t('items.dailyRental.description'),
    };
}

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
