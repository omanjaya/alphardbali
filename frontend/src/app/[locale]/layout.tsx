import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Inter } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { siteConfig } from "@/config/site";
import { generateJsonLd } from "@/lib/seo/metadata";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const messages = await getMessages();
  const t = messages as Record<string, Record<string, string>>;

  const title = t?.metadata?.title || `${siteConfig.name} - ${siteConfig.tagline}`;
  const description = t?.metadata?.description || siteConfig.description;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: title,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    keywords: siteConfig.keywords.join(', '),
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: locale === 'id' ? 'id_ID' : locale === 'en' ? 'en_US' : locale,
      url: siteConfig.url,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: `${siteConfig.url}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - Sewa Alphard Terbaik di Bali`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteConfig.url}/images/og-image.jpg`],
      creator: "@alphardbali",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: locale === 'id' ? siteConfig.url : `${siteConfig.url}/${locale}`,
      languages: {
        'x-default': siteConfig.url,
        'id': siteConfig.url,
        'en': `${siteConfig.url}/en`,
        'zh': `${siteConfig.url}/zh`,
        'ja': `${siteConfig.url}/ja`,
        'ko': `${siteConfig.url}/ko`,
        'ru': `${siteConfig.url}/ru`,
        'fr': `${siteConfig.url}/fr`,
        'de': `${siteConfig.url}/de`,
        'nl': `${siteConfig.url}/nl`,
      }
    },
    verification: {
      google: 'your-google-verification-code',
    },
    category: 'transportation',
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  // Providing all messages to the client
  const messages = await getMessages();
  const jsonLd = generateJsonLd("homepage");

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
