'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, Users, Cog, Calendar, Check, Star } from 'lucide-react';
import { gsap } from '@/lib/gsap/config';
import { FadeIn } from '@/components/animations/TextReveal';
import { useStaggerAnimation } from '@/hooks/useGSAP';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

const vehiclesData = [
    {
        id: 1,
        name: 'Toyota Alphard Executive Lounge',
        slug: 'alphard-executive-lounge',
        type: 'Premium MPV',
        description: 'Kemewahan tertinggi dengan interior Executive Lounge. Dilengkapi dengan kursi captain seat yang dapat direbahkan hampir 180 derajat, complete entertainment system, dan ambient lighting premium.',
        pricePerDay: 2500000,
        images: ['/images/vehicles/alphard-white.png'],
        specs: {
            seats: 7,
            transmission: 'Automatic',
            year: 2023,
            engine: '2.5L Hybrid',
        },
        features: [
            'Executive Lounge Seats',
            'Ottoman Footrest',
            'Rear Entertainment System',
            'Premium JBL Sound',
            'Ambient Lighting',
            'Moonroof',
            'Wireless Charging',
            'Auto Sliding Door',
        ],
    },
    {
        id: 2,
        name: 'Toyota Alphard G',
        slug: 'alphard-g',
        type: 'Premium MPV',
        description: 'Kenyamanan premium dengan harga lebih terjangkau. Ideal untuk perjalanan bisnis, keluarga, atau wisata dengan tingkat kenyamanan yang tetap mewah.',
        pricePerDay: 1800000,
        images: ['/images/vehicles/alphard-black.png'],
        specs: {
            seats: 7,
            transmission: 'Automatic',
            year: 2022,
            engine: '2.5L',
        },
        features: [
            'Captain Seats',
            'Leather Interior',
            'Rear A/C Control',
            'Power Sliding Door',
            'Multi-terrain Select',
            'Safety Sense',
            'Apple CarPlay',
            'Android Auto',
        ],
    },
];

export function FleetPage() {
    const heroRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.fleet-hero-content > *',
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    delay: 0.3,
                }
            );
        });

        return () => ctx.revert();
    }, []);

    useStaggerAnimation(cardsRef, '.vehicle-card', {
        duration: 0.8,
        stagger: 0.2,
    });

    return (
        <>
            {/* Hero Section */}
            <section
                ref={heroRef}
                className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-black"
            >
                <div className="absolute inset-0">
                    <Image
                        src="/images/vehicles/interior.png"
                        alt="Alphard Interior"
                        fill
                        className="object-cover opacity-30"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/50" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
                </div>

                {/* Decorative */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[150px]" />

                <div className="fleet-hero-content relative z-10 container mx-auto px-4 lg:px-8 pt-32 text-white">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-px bg-amber-500" />
                            <span className="text-amber-400 text-xs tracking-[0.3em] uppercase">Our Fleet</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6">
                            Premium
                            <span className="font-bold block mt-2">Alphard Collection</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-xl">
                            Armada terbaik dengan kondisi prima dan interior mewah untuk kenyamanan perjalanan Anda di Bali
                        </p>
                    </div>
                </div>
            </section>

            {/* Vehicle List */}
            <section className="py-24 bg-white relative">
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
                    backgroundSize: '40px 40px',
                }} />

                <div ref={cardsRef} className="container mx-auto px-4 lg:px-8 space-y-32">
                    {vehiclesData.map((vehicle, index) => (
                        <div
                            key={vehicle.id}
                            className={cn(
                                'vehicle-card grid lg:grid-cols-2 gap-12 lg:gap-20 items-center',
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
                                            src={vehicle.images[0]}
                                            alt={vehicle.name}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                    {/* Corner Decorations */}
                                    <div className="absolute -top-4 -left-4 w-16 h-16 border-l-2 border-t-2 border-amber-500" />
                                    <div className="absolute -bottom-4 -right-4 w-16 h-16 border-r-2 border-b-2 border-amber-500" />

                                    {/* Price Tag */}
                                    <div className="absolute bottom-4 left-4 bg-black text-white px-6 py-3">
                                        <div className="text-xs uppercase tracking-wider text-gray-400">Starting from</div>
                                        <div className="text-xl font-bold">
                                            <span className="text-amber-400">Rp {(vehicle.pricePerDay / 1000000).toFixed(1)}jt</span>
                                            <span className="text-sm font-normal text-gray-400">/day</span>
                                        </div>
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
                                        <div className="flex items-center gap-2 mb-4">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                                            ))}
                                            <span className="text-sm text-gray-400 ml-2">5.0</span>
                                        </div>
                                        <div className="text-xs uppercase tracking-[0.2em] text-amber-600 mb-2">{vehicle.type}</div>
                                        <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                                            {vehicle.name}
                                        </h2>
                                        <p className="text-gray-500 leading-relaxed">
                                            {vehicle.description}
                                        </p>
                                    </div>

                                    {/* Specs */}
                                    <div className="flex flex-wrap gap-4">
                                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100">
                                            <Users className="w-4 h-4 text-amber-500" />
                                            <span className="text-sm">{vehicle.specs.seats} Seats</span>
                                        </div>
                                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100">
                                            <Cog className="w-4 h-4 text-amber-500" />
                                            <span className="text-sm">{vehicle.specs.transmission}</span>
                                        </div>
                                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100">
                                            <Calendar className="w-4 h-4 text-amber-500" />
                                            <span className="text-sm">{vehicle.specs.year}</span>
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="grid grid-cols-2 gap-3">
                                        {vehicle.features.map((feature, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className="w-5 h-5 border border-amber-500 flex items-center justify-center flex-shrink-0">
                                                    <Check className="w-3 h-3 text-amber-500" />
                                                </div>
                                                <span className="text-sm text-gray-600">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA */}
                                    <Button
                                        size="lg"
                                        className="bg-black hover:bg-amber-500 text-white rounded-none px-10 py-6 group"
                                        asChild
                                    >
                                        <a href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Halo, saya tertarik dengan ${vehicle.name}`}>
                                            <span className="text-xs uppercase tracking-[0.2em]">Book Now</span>
                                            <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </Button>
                                </div>
                            </FadeIn>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
