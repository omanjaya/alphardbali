'use client';

import { useRef } from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { siteConfig } from '@/config/site';
import { useStaggerAnimation } from '@/hooks/useGSAP';
import { Link } from '@/i18n/navigation';
import type { Pathnames } from '@/i18n/routing';

export function Footer() {
    const t = useTranslations('footer');
    const footerRef = useRef<HTMLElement>(null);

    useStaggerAnimation(footerRef, '.footer-animate', {
        opacity: 1,
        y: 0,
    });

    const servicesLinks: { href: Pathnames; label: string }[] = [
        { href: '/layanan', label: t('dailyRental') },
        { href: '/layanan', label: t('airportTransfer') },
        { href: '/layanan', label: t('weddingCar') },
        { href: '/layanan', label: t('tourTravel') },
    ];

    const companyLinks: { href: Pathnames; label: string }[] = [
        { href: '/tentang', label: t('aboutUs') },
        { href: '/armada', label: t('ourFleet') },
        { href: '/', label: t('faq') },
    ];

    return (
        <footer ref={footerRef} className="bg-black text-white relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-amber-600/5 rounded-full blur-[120px]" />

            {/* Top Border */}
            <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

            <div className="relative container mx-auto px-4 lg:px-8 pt-20 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-4 footer-animate">
                        <Link href="/" className="inline-block mb-6">
                            <span className="text-3xl font-light">
                                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">ALPHARD</span>
                                <span className="text-white/80 ml-2">BALI</span>
                            </span>
                        </Link>
                        <p className="text-gray-500 leading-relaxed mb-8 max-w-sm">
                            {t('description')}
                        </p>
                        <div className="flex gap-4">
                            <a
                                href={siteConfig.social.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-amber-500 hover:text-amber-500 transition-all"
                            >
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a
                                href={siteConfig.social.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-amber-500 hover:text-amber-500 transition-all"
                            >
                                <Facebook className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Services */}
                    <div className="lg:col-span-2 footer-animate">
                        <h4 className="text-xs uppercase tracking-[0.2em] text-amber-400 mb-6">{t('services')}</h4>
                        <ul className="space-y-4">
                            {servicesLinks.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        href={item.href}
                                        className="text-gray-500 hover:text-white transition-colors text-sm flex items-center group"
                                    >
                                        {item.label}
                                        <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="lg:col-span-2 footer-animate">
                        <h4 className="text-xs uppercase tracking-[0.2em] text-amber-400 mb-6">{t('company')}</h4>
                        <ul className="space-y-4">
                            {companyLinks.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        href={item.href}
                                        className="text-gray-500 hover:text-white transition-colors text-sm flex items-center group"
                                    >
                                        {item.label}
                                        <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="lg:col-span-4 footer-animate">
                        <h4 className="text-xs uppercase tracking-[0.2em] text-amber-400 mb-6">{t('contact')}</h4>
                        <ul className="space-y-5">
                            <li className="flex items-start gap-4">
                                <div className="w-8 h-8 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <MapPin className="w-4 h-4 text-amber-500" />
                                </div>
                                <span className="text-gray-500 text-sm">{siteConfig.contact.address}</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="w-8 h-8 border border-white/10 flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-4 h-4 text-amber-500" />
                                </div>
                                <a
                                    href={`tel:${siteConfig.contact.phone}`}
                                    className="text-gray-500 hover:text-white transition-colors text-sm"
                                >
                                    {siteConfig.contact.phone}
                                </a>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="w-8 h-8 border border-white/10 flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-4 h-4 text-amber-500" />
                                </div>
                                <a
                                    href={`mailto:${siteConfig.contact.email}`}
                                    className="text-gray-500 hover:text-white transition-colors text-sm"
                                >
                                    {siteConfig.contact.email}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-600 text-sm">
                        © {new Date().getFullYear()} {siteConfig.name}. {t('allRightsReserved')}
                    </p>
                    <div className="flex gap-8 text-xs uppercase tracking-wider">
                        <span className="text-gray-600 hover:text-amber-400 transition-colors cursor-pointer">
                            {t('privacy')}
                        </span>
                        <span className="text-gray-600 hover:text-amber-400 transition-colors cursor-pointer">
                            {t('terms')}
                        </span>
                    </div>
                </div>

                {/* Developer Credit */}
                <div className="border-t border-white/5 mt-8 pt-6 text-center">
                    <p className="text-gray-700 text-xs">
                        {t('developedBy')} <a href="https://instagram.com/omanjayaaa" target="_blank" rel="noopener noreferrer" className="text-amber-500/70 hover:text-amber-400 transition-colors">omanjayaaa</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
