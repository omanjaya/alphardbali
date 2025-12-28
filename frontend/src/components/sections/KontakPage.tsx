'use client';

import { useRef, useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { gsap } from '@/lib/gsap/config';
import { FadeIn } from '@/components/animations/TextReveal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

export function KontakPage() {
    const heroRef = useRef<HTMLElement>(null);
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.kontak-hero-content > *',
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.1,
                    ease: 'power3.out',
                    delay: 0.2,
                }
            );
        });

        return () => ctx.revert();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setFormState({ name: '', email: '', phone: '', message: '' });
            setTimeout(() => setIsSubmitted(false), 3000);
        }, 1500);
    };

    const contactInfo = [
        {
            icon: MapPin,
            title: 'Address',
            content: siteConfig.contact.address,
            link: `https://maps.google.com/?q=${encodeURIComponent(siteConfig.contact.address)}`,
        },
        {
            icon: Phone,
            title: 'Phone',
            content: siteConfig.contact.phone,
            link: `tel:${siteConfig.contact.phone}`,
        },
        {
            icon: Mail,
            title: 'Email',
            content: siteConfig.contact.email,
            link: `mailto:${siteConfig.contact.email}`,
        },
        {
            icon: Clock,
            title: 'Hours',
            content: '24/7, Every Day',
            link: null,
        },
    ];

    return (
        <>
            {/* Hero Section */}
            <section
                ref={heroRef}
                className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-black pt-24"
            >
                {/* Background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 via-black to-black" />
                    <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[150px]" />
                </div>

                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }} />

                <div className="kontak-hero-content relative z-10 container mx-auto px-4 lg:px-8 text-white">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-px bg-amber-500" />
                            <span className="text-amber-400 text-xs tracking-[0.3em] uppercase">Contact</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6">
                            Get in
                            <span className="font-bold block mt-2">Touch</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-xl">
                            Hubungi kami untuk booking atau pertanyaan. Tim kami siap melayani 24/7.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-24 bg-white relative">
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
                    backgroundSize: '40px 40px',
                }} />

                <div className="container mx-auto px-4 lg:px-8 relative">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Contact Info */}
                        <FadeIn direction="left">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-px bg-amber-500" />
                                    <span className="text-amber-600 text-xs tracking-[0.3em] uppercase">Info</span>
                                </div>
                                <h2 className="text-4xl font-light text-gray-900 mb-8">
                                    Contact
                                    <span className="font-bold block mt-1">Information</span>
                                </h2>

                                <div className="space-y-6 mb-12">
                                    {contactInfo.map((item, index) => {
                                        const Icon = item.icon;
                                        const Content = item.link ? 'a' : 'div';
                                        return (
                                            <Content
                                                key={index}
                                                {...(item.link && { href: item.link, target: item.link.includes('http') ? '_blank' : undefined })}
                                                className={cn(
                                                    'flex items-start gap-5 p-5 border border-gray-100 group',
                                                    item.link && 'hover:border-amber-500/30 transition-colors cursor-pointer'
                                                )}
                                            >
                                                <div className="w-12 h-12 border border-gray-200 flex items-center justify-center flex-shrink-0 group-hover:border-amber-500 transition-colors">
                                                    <Icon className="w-5 h-5 text-amber-500" />
                                                </div>
                                                <div>
                                                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-1">{item.title}</p>
                                                    <p className="text-gray-900">{item.content}</p>
                                                </div>
                                            </Content>
                                        );
                                    })}
                                </div>

                                {/* WhatsApp CTA */}
                                <Button
                                    size="lg"
                                    className="w-full bg-[#25D366] hover:bg-[#20BD5A] rounded-none text-white py-7 text-sm uppercase tracking-[0.15em]"
                                    asChild
                                >
                                    <a
                                        href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Halo, saya ingin bertanya tentang layanan Alphard Bali`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <MessageCircle className="mr-3 w-5 h-5" />
                                        WhatsApp Us
                                    </a>
                                </Button>
                            </div>
                        </FadeIn>

                        {/* Contact Form */}
                        <FadeIn direction="right" delay={0.2}>
                            <div className="bg-gray-50 p-8 lg:p-10 relative">
                                {/* Corner Decorations */}
                                <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-amber-500" />
                                <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-amber-500" />

                                <h3 className="text-2xl font-light text-gray-900 mb-8">
                                    Send a <span className="font-bold">Message</span>
                                </h3>

                                {isSubmitted ? (
                                    <div className="flex flex-col items-center justify-center py-16 text-center">
                                        <div className="w-16 h-16 bg-green-500 flex items-center justify-center mb-6">
                                            <CheckCircle className="w-8 h-8 text-white" />
                                        </div>
                                        <h4 className="text-xl font-medium text-gray-900 mb-2">Message Sent!</h4>
                                        <p className="text-gray-500">We'll get back to you shortly.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <label className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2 block">
                                                Full Name
                                            </label>
                                            <Input
                                                type="text"
                                                placeholder="Your name"
                                                value={formState.name}
                                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                                required
                                                className="bg-white border-gray-200 rounded-none h-12 focus:border-amber-500"
                                            />
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-6">
                                            <div>
                                                <label className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2 block">
                                                    Email
                                                </label>
                                                <Input
                                                    type="email"
                                                    placeholder="email@example.com"
                                                    value={formState.email}
                                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                                    required
                                                    className="bg-white border-gray-200 rounded-none h-12 focus:border-amber-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2 block">
                                                    Phone
                                                </label>
                                                <Input
                                                    type="tel"
                                                    placeholder="+62"
                                                    value={formState.phone}
                                                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                                                    required
                                                    className="bg-white border-gray-200 rounded-none h-12 focus:border-amber-500"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2 block">
                                                Message
                                            </label>
                                            <Textarea
                                                placeholder="Your message..."
                                                value={formState.message}
                                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                                required
                                                rows={5}
                                                className="bg-white border-gray-200 rounded-none resize-none focus:border-amber-500"
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="w-full bg-black hover:bg-amber-500 rounded-none py-6 text-sm uppercase tracking-[0.15em]"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="mr-3 w-4 h-4" />
                                                    Send Message
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                )}
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="h-[400px] bg-gray-100 relative">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d252731.0769498887!2d115.08938!3d-8.6524973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2409b0e5e80c7%3A0x1e1f45e7b6e6d0a0!2sBali%2C%20Indonesia!5e0!3m2!1sen!2sid!4v1703000000000!5m2!1sen!2sid"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(100%)' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                />
            </section>
        </>
    );
}
