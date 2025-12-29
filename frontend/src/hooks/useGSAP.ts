'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap, ScrollTrigger, gsapConfig } from '@/lib/gsap/config';

interface UseGSAPOptions {
    scope?: React.RefObject<HTMLElement | null>;
    dependencies?: unknown[];
}

/**
 * Custom hook for GSAP animations with proper cleanup
 */
export function useGSAP(callback: (gsap: typeof import('gsap').default) => void | (() => void), options: UseGSAPOptions = {}) {
    const { scope, dependencies = [] } = options;

    useEffect(() => {
        // Create a context for proper cleanup
        const ctx = gsap.context(() => {
            const cleanup = callback(gsap);
            return cleanup;
        }, scope?.current || undefined);

        return () => {
            ctx.revert();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);
}

/**
 * Hook for scroll-triggered animations
 */
export function useScrollTrigger(
    elementRef: React.RefObject<HTMLElement | null>,
    animation: gsap.TweenVars,
    scrollOptions?: ScrollTrigger.Vars
) {
    useEffect(() => {
        if (!elementRef.current) return;

        const tween = gsap.fromTo(
            elementRef.current,
            animation.from || { opacity: 0, y: 50 },
            {
                ...animation.to,
                scrollTrigger: {
                    trigger: elementRef.current,
                    ...gsapConfig.scrollTrigger,
                    ...scrollOptions,
                },
            }
        );

        return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
        };
    }, [elementRef, animation, scrollOptions]);
}

/**
 * Hook for staggered animations on multiple elements
 */
export function useStaggerAnimation(
    containerRef: React.RefObject<HTMLElement | null>,
    selector: string,
    animation: gsap.TweenVars = {}
) {
    useEffect(() => {
        if (!containerRef.current) return;

        const elements = containerRef.current.querySelectorAll(selector);
        if (!elements.length) return;

        // Set initial state immediately to prevent flash
        gsap.set(elements, {
            opacity: 0,
            y: 25,
            willChange: 'transform, opacity'
        });

        const tween = gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: animation.duration || gsapConfig.duration.normal,
            stagger: animation.stagger || gsapConfig.stagger.normal,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 85%',
                once: true,
            },
            onComplete: () => {
                // Clean up will-change
                elements.forEach(el => {
                    (el as HTMLElement).style.willChange = 'auto';
                });
            },
        });

        return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
        };
    }, [containerRef, selector, animation]);
}

/**
 * Hook for counter animation
 */
export function useCounter(
    elementRef: React.RefObject<HTMLElement | null>,
    endValue: number,
    duration: number = 2
) {
    const counterRef = useRef({ value: 0 });
    const lastValueRef = useRef(0);

    useEffect(() => {
        if (!elementRef.current) return;

        const tween = gsap.to(counterRef.current, {
            value: endValue,
            duration,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: elementRef.current,
                start: 'top 85%',
                once: true,
            },
            onUpdate: () => {
                // Only update DOM when value actually changes (reduces layout thrashing)
                const roundedValue = Math.round(counterRef.current.value);
                if (roundedValue !== lastValueRef.current && elementRef.current) {
                    lastValueRef.current = roundedValue;
                    elementRef.current.textContent = roundedValue.toLocaleString();
                }
            },
        });

        return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
        };
    }, [elementRef, endValue, duration]);
}

/**
 * Hook for magnetic hover effect
 */
export function useMagnetic(elementRef: React.RefObject<HTMLElement | null>, strength: number = 0.3) {
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!elementRef.current) return;

        const rect = elementRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(elementRef.current, {
            x: x * strength,
            y: y * strength,
            duration: 0.3,
            ease: 'power2.out',
        });
    }, [elementRef, strength]);

    const handleMouseLeave = useCallback(() => {
        if (!elementRef.current) return;

        gsap.to(elementRef.current, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)',
        });
    }, [elementRef]);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [elementRef, handleMouseMove, handleMouseLeave]);
}
