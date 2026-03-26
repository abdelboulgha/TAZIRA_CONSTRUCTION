import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export const metadata: Metadata = {
  title: 'TAZIRA CONSTRUCTION SARL — Expert en Construction au Maroc',
  description:
    'TAZIRA CONSTRUCTION SARL, votre partenaire de confiance pour tous vos projets de construction, rénovation et travaux publics au Maroc.',
  keywords: 'construction, travaux publics, rénovation, Maroc, bâtiment, villa, immeuble',
  icons: { icon: '/assets/logo.png' },
  openGraph: {
    title: 'TAZIRA CONSTRUCTION SARL',
    description: 'Expert en construction et travaux publics au Maroc',
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
      <body>
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
