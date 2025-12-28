import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const baseUrl = 'https://alphardbali.vercel.app';

// Define all pages with their localized paths
const pages = [
    {
        path: '/',
        localizedPaths: {
            id: '/',
            en: '/',
            zh: '/',
            ja: '/',
            ko: '/',
            ru: '/',
            fr: '/',
            de: '/',
            nl: '/',
        },
        priority: 1.0,
        changeFrequency: 'weekly' as const,
    },
    {
        path: '/armada',
        localizedPaths: {
            id: '/armada',
            en: '/fleet',
            zh: '/fleet',
            ja: '/fleet',
            ko: '/fleet',
            ru: '/fleet',
            fr: '/flotte',
            de: '/flotte',
            nl: '/vloot',
        },
        priority: 0.9,
        changeFrequency: 'weekly' as const,
    },
    {
        path: '/layanan',
        localizedPaths: {
            id: '/layanan',
            en: '/services',
            zh: '/services',
            ja: '/services',
            ko: '/services',
            ru: '/services',
            fr: '/services',
            de: '/dienstleistungen',
            nl: '/diensten',
        },
        priority: 0.9,
        changeFrequency: 'weekly' as const,
    },
    {
        path: '/tentang',
        localizedPaths: {
            id: '/tentang',
            en: '/about',
            zh: '/about',
            ja: '/about',
            ko: '/about',
            ru: '/about',
            fr: '/a-propos',
            de: '/uber-uns',
            nl: '/over-ons',
        },
        priority: 0.8,
        changeFrequency: 'monthly' as const,
    },
    {
        path: '/kontak',
        localizedPaths: {
            id: '/kontak',
            en: '/contact',
            zh: '/contact',
            ja: '/contact',
            ko: '/contact',
            ru: '/contact',
            fr: '/contact',
            de: '/kontakt',
            nl: '/contact',
        },
        priority: 0.8,
        changeFrequency: 'monthly' as const,
    },
];

export default function sitemap(): MetadataRoute.Sitemap {
    const sitemapEntries: MetadataRoute.Sitemap = [];
    const lastModified = new Date();

    // Generate entries for each page in each language
    for (const page of pages) {
        for (const locale of routing.locales) {
            const localizedPath = page.localizedPaths[locale as keyof typeof page.localizedPaths];

            // For default locale (id), don't add locale prefix
            const url = locale === 'id'
                ? `${baseUrl}${localizedPath}`
                : `${baseUrl}/${locale}${localizedPath}`;

            // Generate alternates for hreflang
            const alternates: { languages: Record<string, string> } = {
                languages: {},
            };

            for (const altLocale of routing.locales) {
                const altPath = page.localizedPaths[altLocale as keyof typeof page.localizedPaths];
                alternates.languages[altLocale] = altLocale === 'id'
                    ? `${baseUrl}${altPath}`
                    : `${baseUrl}/${altLocale}${altPath}`;
            }

            // Add x-default pointing to Indonesian version
            alternates.languages['x-default'] = `${baseUrl}${page.localizedPaths.id}`;

            sitemapEntries.push({
                url,
                lastModified,
                changeFrequency: page.changeFrequency,
                priority: page.priority,
                alternates,
            });
        }
    }

    return sitemapEntries;
}
