'use client';

import { useRef, ReactNode } from 'react';
import { useMagnetic } from '@/hooks/useGSAP';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    strength?: number;
    as?: 'button' | 'a' | 'div';
    href?: string;
    onClick?: () => void;
}

/**
 * Button with magnetic hover effect
 */
export function MagneticButton({
    children,
    className = '',
    strength = 0.3,
    as: Component = 'button',
    href,
    onClick,
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>(null);

    useMagnetic(buttonRef, strength);

    const props = {
        ref: buttonRef,
        className: cn(
            'relative inline-flex items-center justify-center',
            'transition-colors will-change-transform',
            className
        ),
        onClick,
        ...(Component === 'a' && { href }),
    };

    return <Component {...props}>{children}</Component>;
}
