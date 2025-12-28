export const siteConfig = {
    name: 'Alphard Bali',
    tagline: 'Sewa Alphard Terbaik di Bali',
    description: 'Alphard Bali adalah penyedia jasa sewa mobil Alphard TERBAIK dan TERPERCAYA di Bali sejak 2018. Rental Alphard premium dengan supir profesional untuk wisata, wedding, airport transfer, dan bisnis. Harga mulai Rp 1.8jt/hari. Rating 5.0 dengan 5000+ perjalanan sukses.',
    shortDescription: 'Sewa Alphard terbaik di Bali dengan supir profesional. Rental mobil mewah terpercaya #1 di Bali.',
    url: 'https://alphardbali.vercel.app',
    locale: 'id_ID',

    // Contact Information
    contact: {
        phone: '+62 812-3456-7890',
        whatsapp: '6281234567890',
        email: 'info@alphardbali.com',
        address: 'Jl. Bypass Ngurah Rai No. 123, Kuta, Badung, Bali 80361',
        geo: {
            latitude: -8.7467,
            longitude: 115.1753,
        },
    },

    // Social Media
    social: {
        instagram: 'https://instagram.com/alphardbali',
        facebook: 'https://facebook.com/alphardbali',
        tiktok: 'https://tiktok.com/@alphardbali',
    },

    // SEO Keywords - optimized for "sewa alphard terbaik di bali"
    keywords: [
        // Primary keywords
        'sewa alphard terbaik di bali',
        'rental alphard bali terpercaya',
        'sewa alphard bali murah',
        'sewa mobil alphard bali',
        'rental mobil mewah bali',
        // Long-tail keywords
        'sewa alphard dengan supir bali',
        'sewa alphard bandara ngurah rai',
        'rental alphard untuk wedding bali',
        'sewa alphard executive lounge bali',
        'alphard rental bali airport transfer',
        // Location-based
        'sewa alphard kuta bali',
        'sewa alphard seminyak',
        'sewa alphard ubud',
        'sewa alphard nusa dua',
        'sewa alphard sanur',
        // English keywords
        'best alphard rental bali',
        'alphard car hire bali',
        'luxury car rental bali',
        'alphard with driver bali',
        'premium mpv rental bali',
    ],

    // Business Info
    business: {
        foundedYear: 2018,
        totalTrips: 5000,
        satisfactionRate: 98,
        vehicles: 10,
        rating: 5.0,
        reviewCount: 328,
    },

    // Pricing
    pricing: {
        startingPrice: 1800000,
        currency: 'IDR',
        airportTransfer: 500000,
        wedding: 3000000,
    },

    // Services
    services: [
        {
            name: 'Sewa Alphard Harian',
            description: 'Rental Alphard dengan supir profesional minimal 8 jam per hari',
            price: 1800000,
        },
        {
            name: 'Airport Transfer',
            description: 'Antar jemput Bandara Ngurah Rai dengan Alphard premium',
            price: 500000,
        },
        {
            name: 'Wedding Car',
            description: 'Mobil pengantin Alphard dengan dekorasi untuk pernikahan',
            price: 3000000,
        },
        {
            name: 'Tour & Wisata',
            description: 'Paket wisata keliling Bali dengan Alphard nyaman',
            price: 1500000,
        },
    ],
};

export type SiteConfig = typeof siteConfig;
