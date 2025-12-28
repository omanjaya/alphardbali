import { Car, Plane, PartyPopper, MapPin, Building2, Users } from 'lucide-react';

export interface NavItem {
    label: string;
    href: string;
    children?: NavItem[];
}

export const mainNavigation: NavItem[] = [
    { label: 'Beranda', href: '/' },
    { label: 'Armada', href: '/armada' },
    { label: 'Layanan', href: '/layanan' },
    { label: 'Tentang Kami', href: '/tentang' },
    { label: 'Kontak', href: '/kontak' },
];

export const footerNavigation = {
    services: [
        { label: 'Sewa Harian', href: '/layanan#harian' },
        { label: 'Airport Transfer', href: '/layanan#airport' },
        { label: 'Wedding Car', href: '/layanan#wedding' },
        { label: 'Tour & Wisata', href: '/layanan#tour' },
    ],
    company: [
        { label: 'Tentang Kami', href: '/tentang' },
        { label: 'Armada Kami', href: '/armada' },
        { label: 'Kontak', href: '/kontak' },
        { label: 'FAQ', href: '/faq' },
    ],
};

// Services data
export const services = [
    {
        id: 1,
        name: 'Sewa Harian',
        slug: 'sewa-harian',
        shortDescription: 'Rental Alphard dengan supir untuk kebutuhan harian Anda',
        icon: Car,
        image: '/images/services/tour.png',
    },
    {
        id: 2,
        name: 'Airport Transfer',
        slug: 'airport-transfer',
        shortDescription: 'Antar jemput bandara dengan kenyamanan premium',
        icon: Plane,
        image: '/images/services/airport-transfer.png',
    },
    {
        id: 3,
        name: 'Wedding Car',
        slug: 'wedding-car',
        shortDescription: 'Mobil pengantin mewah untuk hari spesial Anda',
        icon: PartyPopper,
        image: '/images/services/wedding.png',
    },
    {
        id: 4,
        name: 'Tour & Wisata',
        slug: 'tour-wisata',
        shortDescription: 'Jelajahi Bali dengan kenyamanan maksimal',
        icon: MapPin,
        image: '/images/services/tour.png',
    },
    {
        id: 5,
        name: 'Corporate',
        slug: 'corporate',
        shortDescription: 'Solusi transportasi untuk kebutuhan bisnis',
        icon: Building2,
        image: '/images/services/airport-transfer.png',
    },
    {
        id: 6,
        name: 'Event & MICE',
        slug: 'event-mice',
        shortDescription: 'Armada untuk event dan meeting dalam jumlah besar',
        icon: Users,
        image: '/images/services/wedding.png',
    },
];

// Vehicles data
export const vehicles = [
    {
        id: 1,
        name: 'Toyota Alphard Executive Lounge',
        slug: 'alphard-executive-lounge',
        type: 'Premium MPV',
        shortDescription: 'Kemewahan tertinggi dengan interior Executive Lounge',
        pricePerDay: 2500000,
        image: '/images/vehicles/alphard-white.png',
        specs: {
            seats: 7,
            transmission: 'Automatic',
            year: 2023,
        },
    },
    {
        id: 2,
        name: 'Toyota Alphard G',
        slug: 'alphard-g',
        type: 'Premium MPV',
        shortDescription: 'Kenyamanan premium dengan harga terjangkau',
        pricePerDay: 1800000,
        image: '/images/vehicles/alphard-black.png',
        specs: {
            seats: 7,
            transmission: 'Automatic',
            year: 2022,
        },
    },
];

// Stats data
export const stats = [
    { label: 'Tahun Pengalaman', value: 6, suffix: '+' },
    { label: 'Perjalanan Sukses', value: 5000, suffix: '+' },
    { label: 'Kepuasan Pelanggan', value: 98, suffix: '%' },
    { label: 'Unit Armada', value: 10, suffix: '' },
];

// Testimonials data
export const testimonials = [
    {
        id: 1,
        name: 'Budi Santoso',
        role: 'Pengusaha',
        content: 'Pelayanan sangat profesional dan mobil dalam kondisi prima. Supir ramah dan tepat waktu. Sangat recommended!',
        rating: 5,
        image: '/images/testimonials/user-1.jpg',
    },
    {
        id: 2,
        name: 'Sarah Wijaya',
        role: 'Wedding Planner',
        content: 'Sudah beberapa kali pakai Alphard Bali untuk client wedding. Selalu puas dengan pelayanan dan kondisi mobilnya.',
        rating: 5,
        image: '/images/testimonials/user-2.jpg',
    },
    {
        id: 3,
        name: 'Michael Chen',
        role: 'Tourist',
        content: 'Best car rental service in Bali! The Alphard was super comfortable and the driver was very professional.',
        rating: 5,
        image: '/images/testimonials/user-3.jpg',
    },
];

// FAQs data
export const faqs = [
    {
        question: 'Berapa harga sewa Alphard per hari?',
        answer: 'Harga sewa Alphard mulai dari Rp 1.800.000 hingga Rp 2.500.000 per hari tergantung tipe dan paket yang dipilih. Harga sudah termasuk supir profesional dan BBM.',
    },
    {
        question: 'Apakah harga sudah termasuk supir?',
        answer: 'Ya, semua harga sewa sudah termasuk supir profesional yang berpengalaman dan berlisensi. Anda tidak perlu khawatir tentang navigasi di Bali.',
    },
    {
        question: 'Bagaimana cara booking?',
        answer: 'Anda bisa booking melalui website kami, WhatsApp, atau telepon. Cukup informasikan tanggal, durasi, dan lokasi penjemputan. Kami akan konfirmasi ketersediaan dalam hitungan menit.',
    },
    {
        question: 'Apakah bisa airport transfer?',
        answer: 'Tentu! Kami menyediakan layanan airport transfer dari dan ke Bandara Ngurah Rai. Supir akan menunggu di area kedatangan dengan papan nama.',
    },
    {
        question: 'Apa saja yang termasuk dalam harga sewa?',
        answer: 'Harga sewa sudah termasuk: mobil Alphard, supir profesional, BBM, air mineral, dan tissue. Untuk tol dan parkir ditanggung oleh penyewa.',
    },
];
