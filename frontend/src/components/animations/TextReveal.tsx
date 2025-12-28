'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { gsap, gsapConfig } from '@/lib/gsap/config';

interface TextRevealProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    y?: number;
    className?: string;
    once?: boolean;
}

/**
 * Text reveal animation component using GSAP
 */
export function TextReveal({
    children,
    delay = 0,
    duration = gsapConfig.duration.normal,
    y = 50,
    className = '',
    once = true,
}: TextRevealProps) {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!elementRef.current) return;

        // Set initial state
        gsap.set(elementRef.current, { opacity: 0, y });

        const ctx = gsap.context(() => {
            gsap.to(
                elementRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration,
                    delay,
                    ease: 'power2.inOut', // Smooth ease-in-out
                    scrollTrigger: {
                        trigger: elementRef.current,
                        start: 'top 90%',
                        once,
                    },
                }
            );
        });

        return () => ctx.revert();
    }, [delay, duration, y, once]);

    return (
        <div ref={elementRef} className={className}>
            {children}
        </div>
    );
}

interface SplitTextRevealProps {
    text: string;
    className?: string;
    delay?: number;
    stagger?: number;
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

/**
 * Split text into words with staggered animation
 */
export function SplitTextReveal({
    text,
    className = '',
    delay = 0,
    stagger = 0.05,
    tag: Tag = 'h2',
}: SplitTextRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const words = containerRef.current.querySelectorAll('.word');

        const ctx = gsap.context(() => {
            gsap.fromTo(
                words,
                { opacity: 0, y: 40, rotateX: -90 },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: gsapConfig.duration.normal,
                    stagger,
                    delay,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 85%',
                        once: true,
                    },
                }
            );
        });

        return () => ctx.revert();
    }, [delay, stagger]);

    const words = text.split(' ');

    return (
        <div ref={containerRef} className="overflow-hidden">
            <Tag className={className} style={{ perspective: '1000px' }}>
                {words.map((word, index) => (
                    <span
                        key={index}
                        className="word inline-block mr-[0.25em]"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {word}
                    </span>
                ))}
            </Tag>
        </div>
    );
}

interface FadeInProps {
    children: ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right';
    delay?: number;
    duration?: number;
    className?: string;
}

/**
 * Fade in animation from different directions
 */
export function FadeIn({
    children,
    direction = 'up',
    delay = 0,
    duration = gsapConfig.duration.normal,
    className = '',
}: FadeInProps) {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!elementRef.current) return;

        const directions = {
            up: { y: 60, x: 0 },
            down: { y: -60, x: 0 },
            left: { x: 60, y: 0 },
            right: { x: -60, y: 0 },
        };

        // Set initial state
        gsap.set(elementRef.current, { opacity: 0, ...directions[direction] });

        const ctx = gsap.context(() => {
            gsap.to(
                elementRef.current,
                {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    duration: duration * 1.2, // Slightly longer for smoothness
                    delay,
                    ease: 'power2.inOut', // Smooth ease-in-out
                    scrollTrigger: {
                        trigger: elementRef.current,
                        start: 'top 90%',
                        once: true,
                    },
                }
            );
        });

        return () => ctx.revert();
    }, [delay, duration, direction]);

    return (
        <div ref={elementRef} className={className}>
            {children}
        </div>
    );
}

interface ScaleInProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
}

/**
 * Scale in animation with elastic effect
 */
export function ScaleIn({
    children,
    delay = 0,
    duration = gsapConfig.duration.normal,
    className = '',
}: ScaleInProps) {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!elementRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                elementRef.current,
                { opacity: 0, scale: 0.8 },
                {
                    opacity: 1,
                    scale: 1,
                    duration,
                    delay,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: elementRef.current,
                        start: 'top 85%',
                        once: true,
                    },
                }
            );
        });

        return () => ctx.revert();
    }, [delay, duration]);

    return (
        <div ref={elementRef} className={className}>
            {children}
        </div>
    );
}
