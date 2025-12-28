'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, Check, Clock, Shield, Star } from 'lucide-react';
import { gsap } from '@/lib/gsap/config';
import { FadeIn } from '@/components/animations/TextReveal';
import { useStaggerAnimation } from '@/hooks/useGSAP';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

const servicesData = [
    {
        id: 1,
        name: 'Daily Rental',
        slug: 'sewa-harian',
        description: 'Rental Alphard dengan supir profesional untuk kebutuhan harian Anda. Cocok untuk meeting, jemput tamu VIP, atau keperluan bisnis lainnya.',
        image: '/images/services/tour.png',
        features: [
            'Minimal sewa 8 jam',
            'Supir profesional berlisensi',
            'BBM sudah termasuk',
            'Free WiFi dalam kendaraan',
            'Air mineral gratis',
            'Overtime tersedia',
        ],
        priceStart: 1800000,
    },
    {
        id: 2,
        name: 'Airport Transfer',
        slug: 'airport-transfer',
        description: 'Layanan antar jemput Bandara Ngurah Rai dengan kenyamanan premium. Supir akan menunggu di area kedatangan dengan papan nama.',
        image: '/images/services/airport-transfer.png',
        features: [
            'Penjemputan tepat waktu',
            'Flight tracking aktif',
            'Bantuan bagasi',
            'Child seat tersedia',
            'Meet & greet service',
            'Free waiting 60 menit',
        ],
        priceStart: 500000,
    },
    {
        id: 3,
        name: 'Wedding Car',
        slug: 'wedding-car',
        description: 'Mobil pengantin mewah untuk hari spesial Anda. Dekorasi elegan dan supir berpakaian formal untuk menambah kesan premium.',
        image: '/images/services/wedding.png',
        features: [
            'Dekorasi bunga gratis',
            'Supir berpakaian formal',
            'Alphard putih tersedia',
            'Unlimited mileage',
            'Foto dokumentasi',
            'Red carpet service',
        ],
        priceStart: 3000000,
    },
    {
        id: 4,
        name: 'Tour & Travel',
        slug: 'tour-wisata',
        description: 'Jelajahi keindahan Bali dengan kenyamanan maksimal. Supir kami mengenal setiap destinasi wisata di Bali dengan baik.',
        image: '/images/services/tour.png',
        features: [
            'Supir sebagai guide',
            'Fleksibel destinasi',
            'Full day 10 jam',
            'Rekomendasi wisata',
            'Parkir termasuk',
            'Photo spots suggestion',
        ],
        priceStart: 1500000,
    },
];

export function LayananPage() {
    const heroRef = useRef<HTMLElement>(null);
    const servicesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.layanan-hero-content > *',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.12,
                    ease: 'power3.out',
                    delay: 0.2,
                }
            );
        });

        return () => ctx.revert();
    }, []);

    useStaggerAnimation(servicesRef, '.service-detail-card', {
        duration: 0.8,
        stagger: 0.15,
    });

    return (
        <>
            {/* Hero Section */}
            <section
                ref={heroRef}
                className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-black"
            >
                {/* Background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 via-black to-black" />
                    <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[150px]" />
                </div>

                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }} />

                <div className="layanan-hero-content relative z-10 container mx-auto px-4 lg:px-8 pt-32 text-white">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-px bg-amber-500" />
                            <span className="text-amber-400 text-xs tracking-[0.3em] uppercase">Services</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6">
                            Premium
                            <span className="font-bold block mt-2">Transportation</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-xl mb-8">
                            Berbagai layanan sewa Alphard untuk memenuhi setiap kebutuhan perjalanan Anda di Bali
                        </p>

                        {/* Quick Features */}
                        <div className="flex flex-wrap gap-6">
                            <div className="flex items-center gap-2 text-gray-400">
                                <Clock className="w-5 h-5 text-amber-500" />
                                <span className="text-sm">24/7 Service</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <Shield className="w-5 h-5 text-amber-500" />
                                <span className="text-sm">Fully Insured</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <Star className="w-5 h-5 text-amber-500" />
                                <span className="text-sm">5.0 Rating</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Detail */}
            <section className="py-24 bg-white relative">
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
                    backgroundSize: '40px 40px',
                }} />

                <div ref={servicesRef} className="container mx-auto px-4 lg:px-8 space-y-32">
                    {servicesData.map((service, index) => (
                        <div
                            key={service.id}
                            id={service.slug}
                            className={cn(
                                'service-detail-card grid lg:grid-cols-2 gap-12 lg:gap-20 items-center scroll-mt-24',
                            )}
                        >
                            {/* Image */}
                            <FadeIn
                                direction={index % 2 === 0 ? 'left' : 'right'}
                                delay={0.2}
                                className={cn(index % 2 === 1 && 'lg:order-2')}
                            >
                                <div className="relative">
                                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                                        <Image
                                            src={service.image}
                                            alt={service.name}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                    {/* Corner Decorations */}
                                    <div className="absolute -top-4 -left-4 w-16 h-16 border-l-2 border-t-2 border-amber-500" />
                                    <div className="absolute -bottom-4 -right-4 w-16 h-16 border-r-2 border-b-2 border-amber-500" />

                                    {/* Number */}
                                    <div className="absolute top-4 right-4 bg-black text-white w-12 h-12 flex items-center justify-center">
                                        <span className="text-lg font-bold text-amber-400">{String(index + 1).padStart(2, '0')}</span>
                                    </div>
                                </div>
                            </FadeIn>

                            {/* Content */}
                            <FadeIn
                                direction={index % 2 === 0 ? 'right' : 'left'}
                                delay={0.3}
                                className={cn(index % 2 === 1 && 'lg:order-1')}
                            >
                                <div className="space-y-8">
                                    <div>
                                        <div className="text-xs uppercase tracking-[0.2em] text-amber-600 mb-2">Service</div>
                                        <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                                            {service.name}
                                        </h2>
                                        <p className="text-gray-500 leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>

                                    {/* Price */}
                                    <div className="inline-flex items-baseline gap-2 bg-gray-100 px-6 py-3">
                                        <span className="text-sm text-gray-500">Starting from</span>
                                        <span className="text-2xl font-bold text-amber-600">
                                            Rp {(service.priceStart / 1000).toLocaleString()}k
                                        </span>
                                    </div>

                                    {/* Features */}
                                    <div className="grid grid-cols-2 gap-3">
                                        {service.features.map((feature, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className="w-5 h-5 border border-amber-500 flex items-center justify-center flex-shrink-0">
                                                    <Check className="w-3 h-3 text-amber-500" />
                                                </div>
                                                <span className="text-sm text-gray-600">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA */}
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Button
                                            size="lg"
                                            className="bg-black hover:bg-amber-500 text-white rounded-none px-10 py-6 group"
                                            asChild
                                        >
                                            <a href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Halo, saya tertarik dengan layanan ${service.name}`}>
                                                <span className="text-xs uppercase tracking-[0.2em]">Book Now</span>
                                                <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </a>
                                        </Button>
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="rounded-none px-10 py-6 border-gray-300 text-gray-900 hover:border-black hover:bg-gray-100 text-xs uppercase tracking-[0.2em]"
                                            asChild
                                        >
                                            <a href={`tel:${siteConfig.contact.phone}`}>
                                                Call Us
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
