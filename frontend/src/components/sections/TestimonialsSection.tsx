'use client';

import { useRef, useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FadeIn } from '@/components/animations/TextReveal';
import { gsap } from '@/lib/gsap/config';
import { Button } from '@/components/ui/button';
import { testimonials } from '@/constants/data';
import { cn } from '@/lib/utils';

export function TestimonialsSection() {
    const t = useTranslations('testimonials');
    const [activeIndex, setActiveIndex] = useState(0);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const next = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prev = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        const interval = setInterval(next, 6000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        cardRefs.current.forEach((card, index) => {
            if (!card) return;

            gsap.to(card, {
                scale: index === activeIndex ? 1 : 0.9,
                opacity: index === activeIndex ? 1 : 0.3,
                duration: 0.5,
                ease: 'power2.out',
            });
        });
    }, [activeIndex]);

    return (
        <section className="py-24 lg:py-32 bg-gray-950 text-white relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[200px]" />
            </div>

            {/* Large Quote */}
            <div className="absolute top-20 left-20 text-[300px] leading-none text-white/[0.02] font-serif pointer-events-none">
                "
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <FadeIn>
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="w-12 h-px bg-amber-500" />
                            <span className="text-amber-400 text-xs tracking-[0.3em] uppercase">{t('sectionSubtitle')}</span>
                            <div className="w-12 h-px bg-amber-500" />
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-4">
                            {t('sectionTitle')}
                        </h2>
                    </FadeIn>
                </div>

                {/* Testimonial Display */}
                <FadeIn delay={0.3}>
                    <div className="max-w-4xl mx-auto">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={testimonial.id}
                                ref={(el) => { cardRefs.current[index] = el }}
                                className={cn(
                                    'text-center',
                                    index === activeIndex ? 'block' : 'hidden'
                                )}
                            >
                                {/* Rating */}
                                <div className="flex justify-center gap-1 mb-8">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className={cn(
                                                'w-5 h-5',
                                                i < testimonial.rating
                                                    ? 'text-amber-400 fill-amber-400'
                                                    : 'text-gray-700'
                                            )}
                                        />
                                    ))}
                                </div>

                                {/* Quote */}
                                <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light text-white leading-relaxed mb-10">
                                    "{testimonial.content}"
                                </blockquote>

                                {/* Author */}
                                <div className="flex items-center justify-center gap-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                                        <span className="text-black font-bold text-lg">
                                            {testimonial.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div className="text-left">
                                        <p className="font-medium text-white">{testimonial.name}</p>
                                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </FadeIn>

                {/* Navigation */}
                <div className="flex justify-center items-center gap-8 mt-12">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={prev}
                        className="w-12 h-12 border border-white/10 hover:border-amber-500 hover:bg-transparent text-white"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Button>

                    {/* Dots */}
                    <div className="flex items-center gap-3">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                aria-label={`Go to testimonial ${index + 1}`}
                                className={cn(
                                    'h-1 transition-all duration-300',
                                    index === activeIndex
                                        ? 'w-10 bg-amber-500'
                                        : 'w-4 bg-white/20 hover:bg-white/40'
                                )}
                            />
                        ))}
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={next}
                        className="w-12 h-12 border border-white/10 hover:border-amber-500 hover:bg-transparent text-white"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
