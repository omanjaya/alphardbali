import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { KontakPage } from '@/components/sections/KontakPage';

export async function generateMetadata() {
    const t = await getTranslations('contact');
    return {
        title: t('pageTitle'),
        description: t('description'),
    };
}

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
