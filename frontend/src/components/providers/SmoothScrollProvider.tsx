'use client';

import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap/config';

/**
 * Smooth scroll provider using Lenis
 * Provides buttery smooth scrolling with GSAP integration
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);
    const [isClient, setIsClient] = useState(false);

    // Ensure we only run Lenis on client
    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;

        // Store lenis globally for access
        (window as Window & { lenis?: Lenis }).lenis = lenis;

        // Update ScrollTrigger on Lenis scroll
        lenis.on('scroll', ScrollTrigger.update);

        // Animation frame loop with GSAP ticker
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        // Disable GSAP lag smoothing for better sync
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            (window as Window & { lenis?: Lenis }).lenis = undefined;
        };
    }, [isClient]);

    return <>{children}</>;
}

/**
 * Scroll to element with smooth animation
 */
export function scrollTo(
    target: string | HTMLElement,
    options?: {
        offset?: number;
        duration?: number;
        immediate?: boolean;
    }
) {
    if (typeof window === 'undefined') return;

    const lenis = (window as Window & { lenis?: Lenis }).lenis;
    if (lenis) {
        lenis.scrollTo(target, {
            offset: options?.offset ?? 0,
            duration: options?.duration ?? 1.2,
            immediate: options?.immediate ?? false,
        });
    } else {
        // Fallback to native scroll
        if (typeof target === 'string') {
            const element = document.querySelector(target);
            element?.scrollIntoView({ behavior: 'smooth' });
        } else {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
}
