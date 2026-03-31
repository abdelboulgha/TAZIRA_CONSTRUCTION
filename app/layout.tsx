import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import StyledJsxRegistry from './registry';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata: Metadata = {
  title: 'TAZIRA CONSTRUCTION SARL — Expert en Construction au Maroc',
  description:
    'TAZIRA CONSTRUCTION SARL, votre partenaire de confiance pour tous vos projets de construction, rénovation, travaux publics et génie civil au Maroc. Qualité premium, délais respectés.',

  keywords: [
    'construction maroc',
    'entreprise construction maroc',
    'travaux publics maroc',
    'rénovation maroc',
    'construction villa maroc',
    'construction immeuble maroc',
    'génie civil maroc',
    'bâtiment maroc',
    'tazira construction',
    'entrepreneur construction maroc',
  ],

  authors: [{ name: 'TAZIRA CONSTRUCTION SARL' }],
  creator: 'TAZIRA CONSTRUCTION SARL',

  metadataBase: new URL('https://tazira-construction.ma'),

  icons: {
    icon: '/assets/logo.png',
    shortcut: '/assets/logo.png',
    apple: '/assets/logo.png',
  },

  openGraph: {
    title: 'TAZIRA CONSTRUCTION SARL — Expert en Construction au Maroc',
    description:
      'Vos projets de construction, rénovation et travaux publics réalisés avec excellence. TAZIRA CONSTRUCTION SARL, qualité premium au Maroc.',
    url: 'https://tazira-construction.ma',
    siteName: 'TAZIRA CONSTRUCTION SARL',
    images: [
      {
        url: '/assets/logo.png',
        width: 1200,
        height: 630,
        alt: 'TAZIRA CONSTRUCTION SARL',
      },
    ],
    locale: 'fr_MA',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'TAZIRA CONSTRUCTION SARL | Construction au Maroc',
    description:
      'Construction, rénovation et travaux publics au Maroc. Qualité, expertise et délais respectés.',
    images: ['/assets/logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" dir="ltr">
      <head>
        {/* Schema SEO - LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'TAZIRA CONSTRUCTION SARL',
              image: 'https://tazira-construction.ma/assets/logo.png',
              url: 'https://tazira-construction.ma',
              telephone: '+212650596613',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'MA',
              },
              description:
                'Experts en construction, rénovation et travaux publics au Maroc.',
              areaServed: 'Morocco',
            }),
          }}
        />

        {/* Mobile SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Theme color */}
        <meta name="theme-color" content="#1a1a1a" />
      </head>
      <body suppressHydrationWarning>
        <StyledJsxRegistry>
          <LanguageProvider>
            <ScrollToTop />
            <Navbar />
            <main>{children}</main>
            <Footer />
            <WhatsAppButton />
          </LanguageProvider>
        </StyledJsxRegistry>
      </body>
    </html>
  );
}
