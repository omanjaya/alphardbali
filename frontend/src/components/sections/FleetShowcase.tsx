'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, Users, Cog, Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FadeIn } from '@/components/animations/TextReveal';
import { useStaggerAnimation } from '@/hooks/useGSAP';
import { Button } from '@/components/ui/button';
import { vehicles } from '@/constants/data';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';

export function FleetShowcase() {
    const t = useTranslations('fleet');
    const tCommon = useTranslations('common');
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useStaggerAnimation(cardsRef, '.fleet-card', {
        duration: 0.8,
        stagger: 0.15,
    });

    return (
        <section ref={sectionRef} className="py-24 lg:py-32 bg-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
                backgroundSize: '40px 40px',
            }} />

            <div className="container mx-auto px-4 lg:px-8 relative">
                {/* Section Header */}
                <div className="max-w-3xl mb-16">
                    <FadeIn>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-px bg-amber-500" />
                            <span className="text-amber-600 text-xs tracking-[0.3em] uppercase">{t('sectionSubtitle')}</span>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-4">
                            {t('sectionTitle')}
                        </h2>
                    </FadeIn>
                </div>

                {/* Vehicle Cards */}
                <div ref={cardsRef} className="grid md:grid-cols-2 gap-8">
                    {vehicles.map((vehicle, index) => (
                        <div
                            key={vehicle.id}
                            className={cn(
                                'fleet-card group relative bg-gray-50 overflow-hidden',
                                'border border-gray-100 hover:border-amber-500/30',
                                'transition-all duration-500'
                            )}
                        >
                            {/* Image */}
                            <div className="relative h-72 lg:h-80 overflow-hidden">
                                <Image
                                    src={vehicle.image}
                                    alt={vehicle.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                {/* Price Tag */}
                                <div className="absolute top-6 right-6">
                                    <div className="bg-black text-white px-4 py-2">
                                        <span className="text-amber-400 font-bold">Rp {(vehicle.pricePerDay / 1000000).toFixed(1)}jt</span>
                                        <span className="text-gray-400 text-sm">{t('perDay')}</span>
                                    </div>
                                </div>

                                {/* Type Badge */}
                                <div className="absolute top-6 left-6">
                                    <div className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 text-xs uppercase tracking-wider">
                                        {vehicle.type}
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <h3 className="text-xl lg:text-2xl font-light text-gray-900 mb-2">
                                    {vehicle.name}
                                </h3>
                                <p className="text-gray-500 mb-6">{vehicle.shortDescription}</p>

                                {/* Specs */}
                                <div className="flex items-center gap-6 mb-6 text-sm text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4 text-amber-500" />
                                        <span>{vehicle.specs.seats} {t('seats')}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Cog className="w-4 h-4 text-amber-500" />
                                        <span>{t('automatic')}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-amber-500" />
                                        <span>{vehicle.specs.year}</span>
                                    </div>
                                </div>

                                {/* CTA */}
                                <Button
                                    className="w-full bg-black hover:bg-amber-500 text-white rounded-none group/btn py-6"
                                    asChild
                                >
                                    <Link href="/armada">
                                        <span className="text-xs uppercase tracking-[0.2em]">{t('bookNow')}</span>
                                        <ArrowRight className="ml-3 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                            </div>

                            {/* Corner Decoration */}
                            <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-amber-500/0 group-hover:border-amber-500/50 transition-colors" />
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <FadeIn delay={0.3} className="text-center mt-16">
                    <Button
                        variant="outline"
                        className="rounded-none px-10 py-6 border-gray-300 text-gray-900 hover:border-amber-500 hover:text-amber-600 text-xs uppercase tracking-[0.2em]"
                        asChild
                    >
                        <Link href="/armada">
                            {tCommon('viewAll')}
                            <ArrowRight className="ml-3 w-4 h-4" />
                        </Link>
                    </Button>
                </FadeIn>
            </div>
        </section>
    );
}
