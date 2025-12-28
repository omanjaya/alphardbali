'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Phone, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mainNavigation } from '@/constants/data';
import { siteConfig } from '@/config/site';
import { gsap } from '@/lib/gsap/config';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(logoRef.current, {
                opacity: 0,
                x: -30,
                duration: 0.8,
                ease: 'power3.out',
                delay: 0.2,
            });

            gsap.from(navRef.current?.querySelectorAll('a') || [], {
                opacity: 0,
                y: -20,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out',
                delay: 0.4,
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <header
            ref={headerRef}
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
                isScrolled
                    ? 'bg-black/90 backdrop-blur-md py-4 border-b border-white/5'
                    : 'bg-transparent py-6'
            )}
        >
            <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
                {/* Logo */}
                <div ref={logoRef}>
                    <Link
                        href="/"
                        className="text-2xl font-light tracking-tight text-white"
                    >
                        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">ALPHARD</span>
                        <span className="text-white/80 ml-1">BALI</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav ref={navRef} className="hidden lg:flex items-center gap-10">
                    {mainNavigation.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'text-sm uppercase tracking-[0.15em] font-light transition-colors relative group',
                                'text-white/70 hover:text-white'
                            )}
                        >
                            {item.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-500 transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}

                    <Button
                        asChild
                        className="bg-transparent border border-amber-500/50 text-amber-400 hover:bg-amber-500 hover:text-black rounded-none px-6 py-5 text-xs uppercase tracking-[0.2em] transition-all"
                    >
                        <a href={`tel:${siteConfig.contact.phone}`}>
                            <Phone className="w-4 h-4 mr-2" />
                            Contact
                        </a>
                    </Button>
                </nav>

                {/* Mobile Menu Trigger */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="lg:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-white/10"
                        >
                            <Menu className="w-6 h-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-full max-w-sm bg-black border-white/10">
                        <div className="flex flex-col h-full pt-8">
                            <div className="mb-12">
                                <span className="text-2xl font-light text-white">
                                    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">ALPHARD</span>
                                    <span className="text-white/80 ml-1">BALI</span>
                                </span>
                            </div>

                            <nav className="flex flex-col gap-1">
                                {mainNavigation.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-xl text-white/70 hover:text-amber-400 transition-colors py-4 border-b border-white/5 uppercase tracking-[0.15em] font-light"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>

                            <div className="mt-auto pb-8 pt-12">
                                <Button
                                    asChild
                                    className="w-full bg-amber-500 hover:bg-amber-600 text-black rounded-none py-6 text-sm uppercase tracking-[0.2em]"
                                >
                                    <a href={`https://wa.me/${siteConfig.contact.whatsapp}`} target="_blank" rel="noopener noreferrer">
                                        Book Now
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
