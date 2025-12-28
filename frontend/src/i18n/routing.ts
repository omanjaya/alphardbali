import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['id', 'en', 'zh', 'ja', 'ko', 'ru', 'fr', 'de', 'nl'],
  defaultLocale: 'id',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/armada': {
      id: '/armada',
      en: '/fleet',
      zh: '/fleet',
      ja: '/fleet',
      ko: '/fleet',
      ru: '/fleet',
      fr: '/flotte',
      de: '/flotte',
      nl: '/vloot'
    },
    '/layanan': {
      id: '/layanan',
      en: '/services',
      zh: '/services',
      ja: '/services',
      ko: '/services',
      ru: '/services',
      fr: '/services',
      de: '/dienstleistungen',
      nl: '/diensten'
    },
    '/tentang': {
      id: '/tentang',
      en: '/about',
      zh: '/about',
      ja: '/about',
      ko: '/about',
      ru: '/about',
      fr: '/a-propos',
      de: '/uber-uns',
      nl: '/over-ons'
    },
    '/kontak': {
      id: '/kontak',
      en: '/contact',
      zh: '/contact',
      ja: '/contact',
      ko: '/contact',
      ru: '/contact',
      fr: '/contact',
      de: '/kontakt',
      nl: '/contact'
    }
  }
});

export type Locale = (typeof routing.locales)[number];
export type Pathnames = keyof typeof routing.pathnames;
