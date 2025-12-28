import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FleetPage } from '@/components/sections/FleetPage';

export async function generateMetadata() {
    const t = await getTranslations('fleet');
    return {
        title: t('sectionTitle'),
        description: t('vehicles.executiveLounge.description'),
    };
}

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
