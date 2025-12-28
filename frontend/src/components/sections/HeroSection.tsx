'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Play, Shield, Clock, Award } from 'lucide-react';
import { gsap } from '@/lib/gsap/config';
import { FadeIn } from '@/components/animations/TextReveal';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

export function HeroSection() {
    const heroRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Image scale reveal
            gsap.fromTo(
                imageRef.current,
                { scale: 1.2, opacity: 0 },
                { scale: 1, opacity: 1, duration: 2, ease: 'power2.out' }
            );

            // Title reveal with clip-path
            gsap.fromTo(
                '.hero-title-line',
                {
                    y: 100,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: 'power4.out',
                    delay: 0.5,
                }
            );

            // Parallax on scroll
            gsap.to(imageRef.current, {
                yPercent: 15,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.5,
                },
            });

            // Gradient line animation
            gsap.to('.gradient-line', {
                backgroundPosition: '200% center',
                duration: 3,
                repeat: -1,
                ease: 'none',
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex items-center overflow-hidden bg-black"
        >
            {/* Background Image */}
            <div ref={imageRef} className="absolute inset-0">
                <Image
                    src="/images/hero/hero.png"
                    alt="Toyota Alphard luxury car rental in Bali"
                    fill
                    priority
                    className="object-cover object-center"
                />
                {/* Premium dark overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
                {/* Noise texture overlay for premium feel */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }} />
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-600/5 rounded-full blur-[120px]" />

            {/* Left decorative line */}
            <div className="absolute left-8 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-amber-500/30 to-transparent hidden lg:block" />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 lg:px-8 py-32">
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    {/* Left Content */}
                    <div className="lg:col-span-7">
                        {/* Premium Badge */}
                        <FadeIn delay={0.2} className="mb-8">
                            <div className="inline-flex items-center gap-3">
                                <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-500" />
                                <span className="text-amber-400 text-sm tracking-[0.3em] uppercase font-light">
                                    Premium Experience
                                </span>
                            </div>
                        </FadeIn>

                        {/* Main Title */}
                        <div className="overflow-hidden mb-8">
                            <h1 ref={titleRef} className="text-white">
                                <span className="hero-title-line block text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extralight tracking-tight">
                                    Jelajahi Bali
                                </span>
                                <span className="hero-title-line block text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mt-2">
                                    dengan{' '}
                                    <span className="relative inline-block">
                                        <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                                            Kemewahan
                                        </span>
                                        <span className="absolute -bottom-2 left-0 right-0 h-px gradient-line" style={{
                                            background: 'linear-gradient(90deg, transparent, #f59e0b, transparent)',
                                            backgroundSize: '200% 100%',
                                        }} />
                                    </span>
                                </span>
                            </h1>
                        </div>

                        {/* Subtitle */}
                        <FadeIn delay={0.9} className="mb-10">
                            <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-xl font-light">
                                Rasakan pengalaman eksklusif dengan
                                <span className="text-white font-normal"> Toyota Alphard </span>
                                dan supir profesional berlisensi. Standar kemewahan tertinggi untuk setiap perjalanan.
                            </p>
                        </FadeIn>

                        {/* Features Row */}
                        <FadeIn delay={1.0} className="flex flex-wrap gap-6 mb-10">
                            <div className="flex items-center gap-2 text-gray-400">
                                <div className="w-8 h-8 rounded-full border border-amber-500/30 flex items-center justify-center">
                                    <Shield className="w-4 h-4 text-amber-500" />
                                </div>
                                <span className="text-sm">Fully Insured</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <div className="w-8 h-8 rounded-full border border-amber-500/30 flex items-center justify-center">
                                    <Clock className="w-4 h-4 text-amber-500" />
                                </div>
                                <span className="text-sm">24/7 Service</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <div className="w-8 h-8 rounded-full border border-amber-500/30 flex items-center justify-center">
                                    <Award className="w-4 h-4 text-amber-500" />
                                </div>
                                <span className="text-sm">Professional Driver</span>
                            </div>
                        </FadeIn>

                        {/* CTAs */}
                        <FadeIn delay={1.1} className="flex flex-col sm:flex-row gap-4">
                            <Button
                                size="lg"
                                className="relative overflow-hidden bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold rounded-none px-10 py-7 text-base tracking-wide group"
                                asChild
                            >
                                <a href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Halo, saya ingin booking Alphard`}>
                                    <span className="relative z-10 flex items-center">
                                        BOOK NOW
                                        <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </a>
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                className="bg-transparent border-white/30 text-white hover:text-white hover:bg-white/10 hover:border-white/50 rounded-none px-10 py-7 text-base tracking-wide group"
                                asChild
                            >
                                <Link href="/armada">
                                    <Play className="mr-3 w-4 h-4 group-hover:scale-110 transition-transform" />
                                    VIEW FLEET
                                </Link>
                            </Button>
                        </FadeIn>
                    </div>

                    {/* Right Stats Card */}
                    <div className="lg:col-span-5 hidden lg:block">
                        <div className="relative">
                            {/* Glassmorphism Card with smooth animation */}
                            <div className="glass-card-animate relative p-8 border border-white/10 rounded-sm">
                                {/* Corner decorations */}
                                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-amber-500/50" />
                                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-amber-500/50" />

                                <div className="text-center mb-6">
                                    <span className="text-amber-400 text-xs tracking-[0.3em] uppercase">Trusted By</span>
                                </div>

                                <div className="grid grid-cols-3 gap-6 mb-8">
                                    <div className="text-center">
                                        <div className="text-3xl md:text-4xl font-bold text-white mb-1">6<span className="text-amber-500">+</span></div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wider">Years</div>
                                    </div>
                                    <div className="text-center border-x border-white/10">
                                        <div className="text-3xl md:text-4xl font-bold text-white mb-1">5K<span className="text-amber-500">+</span></div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wider">Trips</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl md:text-4xl font-bold text-white mb-1">98<span className="text-amber-500">%</span></div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wider">Happy</div>
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center justify-center gap-2 pt-6 border-t border-white/10">
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-white font-medium">5.0</span>
                                    <span className="text-gray-500 text-sm">Rating</span>
                                </div>

                                {/* Floating Price Tag */}
                                <div className="absolute -bottom-4 -left-4 bg-amber-500 text-black px-6 py-3">
                                    <div className="text-xs font-medium uppercase tracking-wider">Starting from</div>
                                    <div className="text-xl font-bold">Rp 1.8jt<span className="text-sm font-normal">/day</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
                <span className="text-xs text-gray-500 uppercase tracking-[0.2em]">Scroll</span>
                <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5">
                    <div className="w-1 h-2 bg-amber-500 rounded-full animate-bounce" />
                </div>
            </div>

            {/* Bottom Gradient Transition */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-50 to-transparent" />
        </section >
    );
}
