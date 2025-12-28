'use client';

import { useTranslations } from 'next-intl';
import { FadeIn } from '@/components/animations/TextReveal';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

export function FAQSection() {
    const t = useTranslations('faq');

    const faqKeys = ['price', 'driver', 'booking', 'airport', 'includes'] as const;

    return (
        <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
                backgroundSize: '40px 40px',
            }} />

            <div className="container mx-auto px-4 lg:px-8 relative">
                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Left Header */}
                    <div className="lg:col-span-4">
                        <div className="lg:sticky lg:top-32">
                            <FadeIn>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-px bg-amber-500" />
                                    <span className="text-amber-600 text-xs tracking-[0.3em] uppercase">{t('sectionSubtitle')}</span>
                                </div>
                            </FadeIn>
                            <FadeIn delay={0.1}>
                                <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                                    {t('sectionTitle')}
                                </h2>
                            </FadeIn>
                        </div>
                    </div>

                    {/* Right FAQ Accordion */}
                    <div className="lg:col-span-8">
                        <FadeIn delay={0.3}>
                            <Accordion type="single" collapsible className="space-y-4">
                                {faqKeys.map((key, index) => (
                                    <AccordionItem
                                        key={key}
                                        value={`item-${index}`}
                                        className="border border-gray-100 bg-gray-50 data-[state=open]:bg-white data-[state=open]:border-amber-500/30 transition-all"
                                    >
                                        <AccordionTrigger className="px-6 py-5 text-left hover:no-underline group">
                                            <div className="flex items-start gap-4">
                                                <span className="text-amber-500 text-sm font-medium mt-0.5">
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>
                                                <span className="text-lg font-light text-gray-900 group-hover:text-amber-600 transition-colors">
                                                    {t(`items.${key}.question`)}
                                                </span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="px-6 pb-6 ml-10">
                                            <p className="text-gray-500 leading-relaxed">
                                                {t(`items.${key}.answer`)}
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    );
}
