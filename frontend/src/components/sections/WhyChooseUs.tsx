'use client';

import { useRef } from 'react';
import { Shield, Clock, Award, ThumbsUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FadeIn } from '@/components/animations/TextReveal';
import { useCounter, useStaggerAnimation } from '@/hooks/useGSAP';
import { cn } from '@/lib/utils';

const featureIcons = [Shield, Clock, Award, ThumbsUp];

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
    const counterRef = useRef<HTMLSpanElement>(null);
    useCounter(counterRef, value, 2.5);

    return (
        <div className="text-center px-8 py-6 border-r border-white/5 last:border-r-0">
            <div className="text-4xl lg:text-5xl font-light text-white mb-2">
                <span ref={counterRef}>0</span>
                <span className="text-amber-400">{suffix}</span>
            </div>
            <p className="text-gray-500 text-xs uppercase tracking-[0.2em]">{label}</p>
        </div>
    );
}

export function WhyChooseUs() {
    const t = useTranslations('whyChooseUs');
    const tStats = useTranslations('stats');
    const sectionRef = useRef<HTMLElement>(null);
    const featuresRef = useRef<HTMLDivElement>(null);

    useStaggerAnimation(featuresRef, '.feature-card', {
        duration: 0.6,
        stagger: 0.1,
    });

    const featureKeys = ['professional', 'premium', 'flexible', 'affordable'] as const;

    const stats = [
        { value: 6, suffix: '+', label: tStats('experience') },
        { value: 5000, suffix: '+', label: tStats('trips') },
        { value: 98, suffix: '%', label: tStats('satisfaction') },
        { value: 10, suffix: '+', label: tStats('fleet') },
    ];

    return (
        <section ref={sectionRef} className="py-24 lg:py-32 bg-white relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
                backgroundSize: '40px 40px',
            }} />

            <div className="container mx-auto px-4 lg:px-8 relative">
                {/* Stats Bar */}
                <FadeIn className="mb-20">
                    <div className="bg-gray-950 p-2">
                        <div className="grid grid-cols-2 lg:grid-cols-4">
                            {stats.map((stat, index) => (
                                <StatCounter key={index} {...stat} />
                            ))}
                        </div>
                    </div>
                </FadeIn>

                {/* Section Header */}
                <div className="grid lg:grid-cols-2 gap-12 mb-16">
                    <div>
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
                </div>

                {/* Features Grid */}
                <div ref={featuresRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100">
                    {featureKeys.map((key, index) => {
                        const Icon = featureIcons[index];
                        return (
                            <div
                                key={key}
                                className={cn(
                                    'feature-card group p-8 lg:p-10 bg-white relative',
                                    'hover:bg-gray-50 transition-all duration-300'
                                )}
                            >
                                <div className={cn(
                                    'w-14 h-14 border border-gray-200 flex items-center justify-center mb-8',
                                    'group-hover:border-amber-500 group-hover:bg-amber-500/5',
                                    'transition-all duration-300'
                                )}>
                                    <Icon className="w-6 h-6 text-amber-500" />
                                </div>
                                <h3 className="text-lg font-light text-gray-900 mb-3">
                                    {t(`items.${key}.title`)}
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    {t(`items.${key}.description`)}
                                </p>

                                {/* Number */}
                                <div className="text-6xl font-bold text-gray-100 absolute bottom-4 right-4 group-hover:text-amber-50 transition-colors">
                                    {String(index + 1).padStart(2, '0')}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
