'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { Award, Users, Car, ThumbsUp, Target, Heart, Zap } from 'lucide-react';
import { gsap } from '@/lib/gsap/config';
import { FadeIn } from '@/components/animations/TextReveal';
import { useCounter, useStaggerAnimation } from '@/hooks/useGSAP';
import { siteConfig } from '@/config/site';
import { stats } from '@/constants/data';

const values = [
    {
        icon: Target,
        title: 'Professionalism',
        description: 'Every service delivered with the highest professional standards',
    },
    {
        icon: Heart,
        title: 'Customer First',
        description: 'Your satisfaction is our top priority in every journey',
    },
    {
        icon: Zap,
        title: 'Premium Quality',
        description: 'Fleet always in prime condition, meticulously maintained',
    },
];

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    useCounter(ref, value, 2.5);

    return (
        <div className="text-center px-8 py-6 border-r border-white/5 last:border-r-0">
            <div className="text-4xl lg:text-5xl font-light text-white mb-2">
                <span ref={ref}>0</span>
                <span className="text-amber-400">{suffix}</span>
            </div>
            <p className="text-gray-500 text-xs uppercase tracking-[0.2em]">{label}</p>
        </div>
    );
}

export function TentangPage() {
    const heroRef = useRef<HTMLElement>(null);
    const valuesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.tentang-hero-content > *',
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.1,
                    ease: 'power3.out',
                    delay: 0.2,
                }
            );

            gsap.fromTo(
                '.tentang-image',
                { opacity: 0, scale: 0.95, x: 50 },
                {
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    duration: 1,
                    ease: 'power3.out',
                    delay: 0.5,
                }
            );
        });

        return () => ctx.revert();
    }, []);

    useStaggerAnimation(valuesRef, '.value-card', {
        duration: 0.6,
        stagger: 0.1,
    });

    return (
        <>
            {/* Hero Section */}
            <section
                ref={heroRef}
                className="relative min-h-screen flex items-center overflow-hidden bg-white pt-24"
            >
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
                    backgroundSize: '40px 40px',
                }} />

                {/* Decorative */}
                <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px]" />

                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Content */}
                        <div className="tentang-hero-content">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-px bg-amber-500" />
                                <span className="text-amber-600 text-xs tracking-[0.3em] uppercase">About Us</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 leading-tight">
                                Your Trusted
                                <span className="font-bold block mt-2">Travel Partner</span>
                            </h1>
                            <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                                Sejak {siteConfig.business.foundedYear}, Alphard Bali telah menjadi pilihan utama untuk layanan
                                sewa mobil premium di Bali. Dengan armada Toyota Alphard terbaik dan supir profesional
                                berpengalaman, kami berkomitmen memberikan pengalaman perjalanan yang tak terlupakan.
                            </p>
                            <p className="text-lg text-gray-500 leading-relaxed">
                                Kepercayaan ribuan pelanggan adalah bukti dedikasi kami dalam menyediakan layanan
                                berkualitas tinggi dengan harga transparan dan tanpa biaya tersembunyi.
                            </p>
                        </div>

                        {/* Image */}
                        <div className="tentang-image relative">
                            <div className="relative aspect-square overflow-hidden">
                                <Image
                                    src="/images/about-driver.png"
                                    alt="Professional Driver Alphard Bali"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {/* Corner Decorations */}
                            <div className="absolute -top-4 -left-4 w-20 h-20 border-l-2 border-t-2 border-amber-500" />
                            <div className="absolute -bottom-4 -right-4 w-20 h-20 border-r-2 border-b-2 border-amber-500" />

                            {/* Floating Badge */}
                            <div className="absolute -bottom-8 -left-8 bg-black text-white p-6">
                                <div className="text-4xl font-bold text-amber-400">6<span className="text-white">+</span></div>
                                <div className="text-xs uppercase tracking-[0.2em] text-gray-400">Years Experience</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-4 bg-black">
                <FadeIn className="container mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat, index) => (
                            <StatItem key={index} {...stat} />
                        ))}
                    </div>
                </FadeIn>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-white relative">
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
                    backgroundSize: '40px 40px',
                }} />

                <div className="container mx-auto px-4 lg:px-8 relative">
                    <div className="max-w-3xl mb-16">
                        <FadeIn>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-px bg-amber-500" />
                                <span className="text-amber-600 text-xs tracking-[0.3em] uppercase">Our Values</span>
                            </div>
                        </FadeIn>
                        <FadeIn delay={0.1}>
                            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                                Excellence in
                                <span className="font-bold block mt-1">Every Detail</span>
                            </h2>
                        </FadeIn>
                    </div>

                    <div ref={valuesRef} className="grid md:grid-cols-3 gap-px bg-gray-100">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <div
                                    key={index}
                                    className="value-card bg-white p-10 group hover:bg-gray-50 transition-all relative"
                                >
                                    <div className="w-14 h-14 border border-gray-200 flex items-center justify-center mb-8 group-hover:border-amber-500 transition-colors">
                                        <Icon className="w-6 h-6 text-amber-500" />
                                    </div>
                                    <h3 className="text-xl font-light text-gray-900 mb-3">{value.title}</h3>
                                    <p className="text-gray-500 leading-relaxed">{value.description}</p>

                                    {/* Number */}
                                    <div className="text-8xl font-bold text-gray-50 absolute bottom-4 right-4 group-hover:text-amber-50 transition-colors">
                                        {String(index + 1).padStart(2, '0')}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Why Us Section */}
            <section className="py-24 bg-gray-950 text-white relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[150px]" />
                </div>

                <div className="container mx-auto px-4 lg:px-8 relative">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <FadeIn direction="left">
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-px bg-amber-500" />
                                    <span className="text-amber-400 text-xs tracking-[0.3em] uppercase">Why Choose Us</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-light mb-8">
                                    More Than Just
                                    <span className="font-bold block mt-2">Car Rental</span>
                                </h2>
                                <div className="space-y-6">
                                    <div className="flex gap-5">
                                        <div className="w-12 h-12 border border-white/10 flex items-center justify-center flex-shrink-0">
                                            <Award className="w-5 h-5 text-amber-500" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-lg mb-1">Premium Fleet</h3>
                                            <p className="text-gray-400">All Alphard units in pristine condition, fully maintained</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-5">
                                        <div className="w-12 h-12 border border-white/10 flex items-center justify-center flex-shrink-0">
                                            <Users className="w-5 h-5 text-amber-500" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-lg mb-1">Professional Drivers</h3>
                                            <p className="text-gray-400">Experienced, licensed, and knows Bali inside out</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-5">
                                        <div className="w-12 h-12 border border-white/10 flex items-center justify-center flex-shrink-0">
                                            <Car className="w-5 h-5 text-amber-500" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-lg mb-1">Transparent Pricing</h3>
                                            <p className="text-gray-400">No hidden fees, all-inclusive with driver and fuel</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-5">
                                        <div className="w-12 h-12 border border-white/10 flex items-center justify-center flex-shrink-0">
                                            <ThumbsUp className="w-5 h-5 text-amber-500" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-lg mb-1">24/7 Support</h3>
                                            <p className="text-gray-400">Our team is always ready to assist whenever you need</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        <FadeIn direction="right" delay={0.2}>
                            <div className="relative">
                                <div className="aspect-[4/3] overflow-hidden">
                                    <Image
                                        src="/images/vehicles/interior.png"
                                        alt="Alphard Interior"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="absolute -top-4 -right-4 w-16 h-16 border-r-2 border-t-2 border-amber-500" />
                                <div className="absolute -bottom-4 -left-4 w-16 h-16 border-l-2 border-b-2 border-amber-500" />
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>
        </>
    );
}
