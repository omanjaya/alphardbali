'use client';

import { useRef, useState, useEffect } from 'react';
import { Menu, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { gsap } from '@/lib/gsap/config';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { Link, usePathname } from '@/i18n/navigation';
import type { Pathnames } from '@/i18n/routing';

export function Header() {
    const t = useTranslations('nav');
    const tCommon = useTranslations('common');
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);

    const isActive = (href: Pathnames) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    const navigation: { href: Pathnames; label: string }[] = [
        { href: '/', label: t('home') },
        { href: '/armada', label: t('fleet') },
        { href: '/layanan', label: t('services') },
        { href: '/tentang', label: t('about') },
        { href: '/kontak', label: t('contact') },
    ];

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

            gsap.from(navRef.current?.querySelectorAll('.nav-item') || [], {
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
                <nav ref={navRef} className="hidden lg:flex items-center gap-8">
                    {navigation.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'nav-item text-sm uppercase tracking-[0.15em] font-light transition-colors relative group',
                                isActive(item.href)
                                    ? 'text-amber-400'
                                    : 'text-white/70 hover:text-white'
                            )}
                        >
                            {item.label}
                            <span className={cn(
                                'absolute -bottom-1 left-0 h-px bg-amber-500 transition-all duration-300',
                                isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                            )} />
                        </Link>
                    ))}

                    <LanguageSwitcher variant="compact" className="nav-item ml-2" />

                    <Button
                        asChild
                        className="nav-item bg-transparent border border-amber-500/50 text-amber-400 hover:bg-amber-500 hover:text-black rounded-none px-6 py-5 text-xs uppercase tracking-[0.2em] transition-all"
                    >
                        <a href={`tel:${siteConfig.contact.phone}`}>
                            <Phone className="w-4 h-4 mr-2" />
                            {t('contact')}
                        </a>
                    </Button>
                </nav>

                {/* Mobile Menu Trigger */}
                <div className="flex items-center gap-2 lg:hidden">
                    <LanguageSwitcher variant="compact" />
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
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
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                'text-xl transition-colors py-4 border-b border-white/5 uppercase tracking-[0.15em] font-light',
                                                isActive(item.href)
                                                    ? 'text-amber-400 border-amber-500/30'
                                                    : 'text-white/70 hover:text-amber-400'
                                            )}
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
                                            {tCommon('bookNow')}
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
