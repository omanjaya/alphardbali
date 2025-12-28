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
    path?: string;
}): Metadata {
    const {
        title = siteConfig.name,
        description = siteConfig.description,
        keywords = siteConfig.keywords,
        image = '/images/og-image.jpg',
        noIndex = false,
        path = '/',
    } = options;

    const fullTitle = title === siteConfig.name
        ? `${siteConfig.name} - ${siteConfig.tagline}`
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
            canonical: path,
        },
        openGraph: {
            type: 'website',
            locale: siteConfig.locale,
            url: `${siteConfig.url}${path}`,
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
            : {
                index: true,
                follow: true,
                googleBot: {
                    index: true,
                    follow: true,
                    'max-video-preview': -1,
                    'max-image-preview': 'large',
                    'max-snippet': -1,
                },
            },
    };
}

/**
 * Generate comprehensive JSON-LD structured data
 */
export function generateJsonLd(type: 'homepage' | 'service' | 'vehicle' | 'contact' | 'about' | 'faq', data?: Record<string, unknown>) {
    // Base Organization Schema
    const organization = {
        '@type': 'Organization',
        '@id': `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: {
            '@type': 'ImageObject',
            url: `${siteConfig.url}/images/logo.png`,
        },
        sameAs: [
            siteConfig.social.instagram,
            siteConfig.social.facebook,
            siteConfig.social.tiktok,
        ],
    };

    // LocalBusiness Schema - Most important for local SEO
    const localBusiness = {
        '@type': ['LocalBusiness', 'AutoRental'],
        '@id': `${siteConfig.url}/#localbusiness`,
        name: siteConfig.name,
        alternateName: 'Alphard Bali Rental',
        description: siteConfig.description,
        url: siteConfig.url,
        telephone: siteConfig.contact.phone,
        email: siteConfig.contact.email,
        image: `${siteConfig.url}/images/og-image.jpg`,
        logo: `${siteConfig.url}/images/logo.png`,
        priceRange: 'Rp 1.800.000 - Rp 3.000.000',
        currenciesAccepted: 'IDR',
        paymentAccepted: 'Cash, Credit Card, Bank Transfer',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Jl. Bypass Ngurah Rai No. 123',
            addressLocality: 'Kuta',
            addressRegion: 'Bali',
            postalCode: '80361',
            addressCountry: 'ID',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: siteConfig.contact.geo.latitude,
            longitude: siteConfig.contact.geo.longitude,
        },
        areaServed: [
            { '@type': 'City', name: 'Denpasar' },
            { '@type': 'City', name: 'Kuta' },
            { '@type': 'City', name: 'Seminyak' },
            { '@type': 'City', name: 'Ubud' },
            { '@type': 'City', name: 'Nusa Dua' },
            { '@type': 'City', name: 'Sanur' },
            { '@type': 'City', name: 'Canggu' },
            { '@type': 'AdministrativeArea', name: 'Bali, Indonesia' },
        ],
        openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '00:00',
            closes: '23:59',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: siteConfig.business.rating,
            bestRating: '5',
            worstRating: '1',
            ratingCount: siteConfig.business.reviewCount,
            reviewCount: siteConfig.business.reviewCount,
        },
        foundingDate: siteConfig.business.foundedYear.toString(),
        numberOfEmployees: {
            '@type': 'QuantitativeValue',
            value: 15,
        },
        slogan: siteConfig.tagline,
        knowsAbout: [
            'Sewa Mobil Alphard',
            'Rental Mobil Mewah Bali',
            'Airport Transfer Bali',
            'Wedding Car Bali',
            'Tour & Travel Bali',
        ],
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Layanan Sewa Alphard Bali',
            itemListElement: siteConfig.services.map((service, index) => ({
                '@type': 'Offer',
                '@id': `${siteConfig.url}/#service-${index + 1}`,
                name: service.name,
                description: service.description,
                price: service.price,
                priceCurrency: 'IDR',
                availability: 'https://schema.org/InStock',
                itemOffered: {
                    '@type': 'Service',
                    name: service.name,
                    description: service.description,
                    provider: { '@id': `${siteConfig.url}/#organization` },
                },
            })),
        },
    };

    // FAQ Schema - Great for featured snippets
    const faqSchema = {
        '@type': 'FAQPage',
        '@id': `${siteConfig.url}/#faq`,
        mainEntity: [
            {
                '@type': 'Question',
                name: 'Berapa harga sewa Alphard di Bali?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Harga sewa Alphard di Bali mulai dari Rp 1.800.000 per hari untuk Alphard G dan Rp 2.500.000 per hari untuk Alphard Executive Lounge. Harga sudah termasuk supir profesional dan BBM.',
                },
            },
            {
                '@type': 'Question',
                name: 'Apakah sewa Alphard sudah termasuk supir?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Ya, semua paket sewa Alphard di Alphard Bali sudah termasuk supir profesional yang berpengalaman, berlisensi, dan menguasai rute di seluruh Bali.',
                },
            },
            {
                '@type': 'Question',
                name: 'Bagaimana cara booking sewa Alphard di Bali?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Anda dapat booking melalui WhatsApp di nomor +62 812-3456-7890, melalui website kami, atau telepon langsung. Konfirmasi ketersediaan dalam hitungan menit.',
                },
            },
            {
                '@type': 'Question',
                name: 'Apakah tersedia layanan airport transfer dengan Alphard?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Ya, kami menyediakan layanan airport transfer dari dan ke Bandara Ngurah Rai dengan harga mulai Rp 500.000. Supir akan menunggu di area kedatangan dengan papan nama.',
                },
            },
            {
                '@type': 'Question',
                name: 'Area mana saja yang dilayani Alphard Bali?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Alphard Bali melayani seluruh wilayah Bali termasuk Denpasar, Kuta, Seminyak, Ubud, Nusa Dua, Sanur, Canggu, Jimbaran, Uluwatu, dan sekitarnya. Kami juga melayani tour ke destinasi wisata populer.',
                },
            },
            {
                '@type': 'Question',
                name: 'Kenapa harus sewa Alphard di Alphard Bali?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Alphard Bali adalah penyedia sewa Alphard terbaik di Bali dengan rating 5.0, pengalaman sejak 2018, lebih dari 5000 perjalanan sukses, armada terawat prima, supir profesional berpengalaman, dan harga transparan tanpa biaya tersembunyi.',
                },
            },
        ],
    };

    // WebSite Schema
    const webSite = {
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: { '@id': `${siteConfig.url}/#organization` },
        inLanguage: ['id', 'en', 'zh', 'ja', 'ko', 'ru', 'fr', 'de', 'nl'],
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    };

    // BreadcrumbList Schema
    const breadcrumb = (items: { name: string; url: string }[]) => ({
        '@type': 'BreadcrumbList',
        '@id': `${siteConfig.url}/#breadcrumb`,
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    });

    switch (type) {
        case 'homepage':
            return {
                '@context': 'https://schema.org',
                '@graph': [
                    organization,
                    localBusiness,
                    webSite,
                    faqSchema,
                    breadcrumb([
                        { name: 'Home', url: siteConfig.url },
                    ]),
                ],
            };

        case 'service':
            return {
                '@context': 'https://schema.org',
                '@graph': [
                    organization,
                    localBusiness,
                    breadcrumb([
                        { name: 'Home', url: siteConfig.url },
                        { name: 'Layanan', url: `${siteConfig.url}/layanan` },
                    ]),
                ],
            };

        case 'vehicle':
            return {
                '@context': 'https://schema.org',
                '@graph': [
                    organization,
                    localBusiness,
                    breadcrumb([
                        { name: 'Home', url: siteConfig.url },
                        { name: 'Armada', url: `${siteConfig.url}/armada` },
                    ]),
                    {
                        '@type': 'Product',
                        name: 'Toyota Alphard',
                        description: 'Sewa Toyota Alphard premium di Bali dengan supir profesional',
                        brand: { '@type': 'Brand', name: 'Toyota' },
                        category: 'MPV Premium',
                        offers: {
                            '@type': 'AggregateOffer',
                            lowPrice: siteConfig.pricing.startingPrice,
                            highPrice: 2500000,
                            priceCurrency: 'IDR',
                            availability: 'https://schema.org/InStock',
                        },
                        aggregateRating: {
                            '@type': 'AggregateRating',
                            ratingValue: siteConfig.business.rating,
                            reviewCount: siteConfig.business.reviewCount,
                        },
                    },
                ],
            };

        case 'contact':
            return {
                '@context': 'https://schema.org',
                '@graph': [
                    organization,
                    localBusiness,
                    breadcrumb([
                        { name: 'Home', url: siteConfig.url },
                        { name: 'Kontak', url: `${siteConfig.url}/kontak` },
                    ]),
                ],
            };

        case 'about':
            return {
                '@context': 'https://schema.org',
                '@graph': [
                    organization,
                    localBusiness,
                    breadcrumb([
                        { name: 'Home', url: siteConfig.url },
                        { name: 'Tentang Kami', url: `${siteConfig.url}/tentang` },
                    ]),
                ],
            };

        case 'faq':
            return {
                '@context': 'https://schema.org',
                '@graph': [
                    organization,
                    faqSchema,
                ],
            };

        default:
            return {
                '@context': 'https://schema.org',
                '@graph': [organization, localBusiness],
            };
    }
}

/**
 * Generate review schema for testimonials
 */
export function generateReviewSchema(reviews: { author: string; rating: number; text: string; date?: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: siteConfig.name,
        review: reviews.map((review) => ({
            '@type': 'Review',
            author: {
                '@type': 'Person',
                name: review.author,
            },
            reviewRating: {
                '@type': 'Rating',
                ratingValue: review.rating,
                bestRating: 5,
            },
            reviewBody: review.text,
            datePublished: review.date || new Date().toISOString().split('T')[0],
        })),
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: siteConfig.business.rating,
            reviewCount: siteConfig.business.reviewCount,
        },
    };
}
