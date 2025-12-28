import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';

/**
 * Generate metadata for a page
 */
export function generateMetadata(options: {
    title?: string;
    description?: string;
    keywords?: string[];
    image?: string;
    noIndex?: boolean;
}): Metadata {
    const {
        title = siteConfig.name,
        description = siteConfig.description,
        keywords = siteConfig.keywords,
        image = '/images/og-image.jpg',
        noIndex = false,
    } = options;

    const fullTitle = title === siteConfig.name
        ? title
        : `${title} | ${siteConfig.name}`;

    return {
        title: fullTitle,
        description,
        keywords: keywords.join(', '),
        authors: [{ name: siteConfig.name }],
        creator: siteConfig.name,
        publisher: siteConfig.name,
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
        },
        metadataBase: new URL(siteConfig.url),
        alternates: {
            canonical: '/',
        },
        openGraph: {
            type: 'website',
            locale: siteConfig.locale,
            url: siteConfig.url,
            title: fullTitle,
            description,
            siteName: siteConfig.name,
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description,
            images: [image],
        },
        robots: noIndex
            ? { index: false, follow: false }
            : { index: true, follow: true },
    };
}

/**
 * Generate JSON-LD structured data for a page
 */
export function generateJsonLd(type: 'homepage' | 'service' | 'vehicle' | 'contact', data?: Record<string, unknown>) {
    const baseOrganization = {
        '@context': 'https://schema.org',
        '@type': 'AutoRental',
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        telephone: siteConfig.contact.phone,
        email: siteConfig.contact.email,
        address: {
            '@type': 'PostalAddress',
            streetAddress: siteConfig.contact.address,
            addressLocality: 'Kuta',
            addressRegion: 'Bali',
            postalCode: '80361',
            addressCountry: 'ID',
        },
        areaServed: {
            '@type': 'Place',
            name: 'Bali, Indonesia',
        },
        priceRange: '$$$$',
        sameAs: [
            siteConfig.social.instagram,
            siteConfig.social.facebook,
            siteConfig.social.tiktok,
        ],
    };

    switch (type) {
        case 'homepage':
            return {
                ...baseOrganization,
                hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Layanan Sewa Alphard',
                    itemListElement: [
                        {
                            '@type': 'Offer',
                            itemOffered: {
                                '@type': 'Service',
                                name: 'Sewa Alphard Harian',
                                description: 'Rental mobil Alphard premium dengan supir profesional',
                            },
                        },
                        {
                            '@type': 'Offer',
                            itemOffered: {
                                '@type': 'Service',
                                name: 'Airport Transfer',
                                description: 'Layanan antar jemput bandara Ngurah Rai',
                            },
                        },
                    ],
                },
            };

        case 'contact':
            return {
                ...baseOrganization,
                '@type': 'LocalBusiness',
                openingHoursSpecification: {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                    opens: '00:00',
                    closes: '23:59',
                },
                contactPoint: {
                    '@type': 'ContactPoint',
                    telephone: siteConfig.contact.phone,
                    contactType: 'customer service',
                    availableLanguage: ['Indonesian', 'English'],
                },
            };

        default:
            return baseOrganization;
    }
}
