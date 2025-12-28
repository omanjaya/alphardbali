'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Car, Plane, Heart, Compass, Briefcase, Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FadeIn } from '@/components/animations/TextReveal';
import { useStaggerAnimation } from '@/hooks/useGSAP';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';

const serviceIcons = [Car, Plane, Heart, Compass, Briefcase, Calendar];
const serviceImages = [
    '/images/vehicles/alphard-white.png',
    '/images/services/airport-transfer.png',
    '/images/services/wedding.png',
    '/images/services/tour.png',
    '/images/vehicles/alphard-black.png',
    '/images/vehicles/interior.png',
];

export function ServicesSection() {
    const t = useTranslations('services');
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useStaggerAnimation(cardsRef, '.service-card', {
        duration: 0.6,
        stagger: 0.08,
    });

    const serviceKeys = ['dailyRental', 'airportTransfer', 'weddingCar', 'tour', 'corporate', 'event'] as const;

    return (
        <section ref={sectionRef} className="py-24 lg:py-32 bg-gray-950 text-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-500/5 to-transparent" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[150px]" />
            </div>

            {/* Decorative Lines */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="container mx-auto px-4 lg:px-8 relative">
                {/* Section Header */}
                <div className="grid lg:grid-cols-2 gap-12 mb-16">
                    <div>
                        <FadeIn>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-px bg-amber-500" />
                                <span className="text-amber-400 text-xs tracking-[0.3em] uppercase">{t('sectionSubtitle')}</span>
                            </div>
                        </FadeIn>
                        <FadeIn delay={0.1}>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-4">
                                {t('sectionTitle')}
                            </h2>
                        </FadeIn>
                    </div>
                </div>

                {/* Service Cards Grid */}
                <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
                    {serviceKeys.map((key, index) => {
                        const Icon = serviceIcons[index];
                        return (
                            <Link
                                key={key}
                                href="/layanan"
                                className={cn(
                                    'service-card group relative bg-gray-950 p-8 lg:p-10',
                                    'hover:bg-gray-900 transition-all duration-500',
                                )}
                            >
                                {/* Background Image on Hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                                    <Image
                                        src={serviceImages[index]}
                                        alt={t(`items.${key}.name`)}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover"
                                    />
                                </div>

                                {/* Number */}
                                <div className="text-5xl font-bold text-white/5 absolute top-6 right-6 group-hover:text-amber-500/20 transition-colors">
                                    {String(index + 1).padStart(2, '0')}
                                </div>

                                {/* Icon */}
                                <div className={cn(
                                    'w-12 h-12 border border-white/10 flex items-center justify-center mb-8',
                                    'group-hover:border-amber-500/50 group-hover:bg-amber-500/10',
                                    'transition-all duration-300'
                                )}>
                                    <Icon className="w-5 h-5 text-amber-500" />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-light text-white mb-3 group-hover:text-amber-400 transition-colors">
                                    {t(`items.${key}.name`)}
                                </h3>
                                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                                    {t(`items.${key}.description`)}
                                </p>

                                {/* Arrow */}
                                <div className={cn(
                                    'flex items-center gap-2 text-sm',
                                    'text-gray-600 group-hover:text-amber-400 transition-colors'
                                )}>
                                    <span className="text-xs uppercase tracking-[0.2em]">Explore</span>
                                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </div>

                                {/* Bottom Border Animation */}
                                <div className="absolute bottom-0 left-0 w-0 h-px bg-amber-500 group-hover:w-full transition-all duration-500" />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
