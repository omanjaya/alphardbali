import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Performance optimizations
    gsap.config({
        force3D: true, // Use GPU acceleration
        nullTargetWarn: false,
    });

    // ScrollTrigger performance settings
    ScrollTrigger.config({
        ignoreMobileResize: true, // Prevent recalculation on mobile address bar hide/show
    });
}

// Default GSAP configuration
export const gsapConfig = {
    // Default ease for premium feel
    defaultEase: 'power3.out',

    // Duration standards (in seconds)
    duration: {
        fast: 0.3,
        normal: 0.6,
        slow: 1.2,
        verySlow: 2.0,
    },

    // ScrollTrigger defaults
    scrollTrigger: {
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse' as const,
    },

    // Stagger defaults
    stagger: {
        fast: 0.05,
        normal: 0.1,
        slow: 0.15,
    },
} as const;

// Reusable animation presets
export const animationPresets = {
    // Fade in from bottom
    fadeInUp: {
        from: { opacity: 0, y: 50 },
        to: { opacity: 1, y: 0, duration: gsapConfig.duration.normal, ease: gsapConfig.defaultEase },
    },

    // Fade in from left
    fadeInLeft: {
        from: { opacity: 0, x: -50 },
        to: { opacity: 1, x: 0, duration: gsapConfig.duration.normal, ease: gsapConfig.defaultEase },
    },

    // Fade in from right
    fadeInRight: {
        from: { opacity: 0, x: 50 },
        to: { opacity: 1, x: 0, duration: gsapConfig.duration.normal, ease: gsapConfig.defaultEase },
    },

    // Scale in
    scaleIn: {
        from: { opacity: 0, scale: 0.8 },
        to: { opacity: 1, scale: 1, duration: gsapConfig.duration.normal, ease: 'back.out(1.7)' },
    },

    // Blur in
    blurIn: {
        from: { opacity: 0, filter: 'blur(10px)' },
        to: { opacity: 1, filter: 'blur(0px)', duration: gsapConfig.duration.slow, ease: gsapConfig.defaultEase },
    },
};

export { gsap, ScrollTrigger };
