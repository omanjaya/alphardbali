import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TentangPage } from '@/components/sections/TentangPage';

export async function generateMetadata() {
    const t = await getTranslations('about');
    return {
        title: t('pageTitle'),
        description: t('description'),
    };
}

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
