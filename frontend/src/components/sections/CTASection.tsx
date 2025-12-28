'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Phone } from 'lucide-react';
import { gsap } from '@/lib/gsap/config';
import { FadeIn } from '@/components/animations/TextReveal';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

export function CTASection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Floating animation for decorative elements
            gsap.to('.cta-float', {
                y: -15,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative py-32 overflow-hidden bg-black"
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 via-black to-black" />

            {/* Decorative Elements */}
            <div className="absolute top-1/4 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-[120px] cta-float" />
            <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-amber-600/10 rounded-full blur-[150px]" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
                backgroundSize: '60px 60px',
            }} />

            {/* Corner Decorations */}
            <div className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-amber-500/30" />
            <div className="absolute bottom-8 right-8 w-24 h-24 border-r-2 border-b-2 border-amber-500/30" />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <FadeIn>
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="w-12 h-px bg-amber-500" />
                            <span className="text-amber-400 text-xs tracking-[0.3em] uppercase">Get Started</span>
                            <div className="w-12 h-px bg-amber-500" />
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-light text-white mb-6 leading-tight">
                            Ready to Experience
                            <span className="font-bold block mt-2">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
                                    Luxury
                                </span>
                                ?
                            </span>
                        </h2>
                    </FadeIn>

                    <FadeIn delay={0.2} className="mb-12">
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Hubungi kami sekarang untuk mendapatkan penawaran terbaik.
                            Tim kami siap membantu 24/7.
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.3} className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold rounded-none px-10 py-7 text-sm uppercase tracking-[0.15em] group"
                            asChild
                        >
                            <a href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Halo, saya ingin booking Alphard`}>
                                <MessageCircle className="mr-3 w-5 h-5" />
                                WhatsApp Now
                                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </Button>

                        <Button
                            size="lg"
                            variant="outline"
                            className="bg-transparent border-white/30 text-white hover:text-white hover:bg-white/10 hover:border-white/50 rounded-none px-10 py-7 text-sm uppercase tracking-[0.15em]"
                            asChild
                        >
                            <a href={`tel:${siteConfig.contact.phone}`}>
                                <Phone className="mr-3 w-4 h-4" />
                                Call Us
                            </a>
                        </Button>
                    </FadeIn>

                    {/* Trust Badges */}
                    <FadeIn delay={0.4} className="mt-16">
                        <div className="flex flex-wrap items-center justify-center gap-8 text-gray-500 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full" />
                                <span>Available 24/7</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-amber-500 rounded-full" />
                                <span>Instant Response</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                <span>No Booking Fee</span>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
