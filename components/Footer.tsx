'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

export default function Footer() {
  const { t, isRTL } = useLanguage();
  const year = new Date().getFullYear();

  const serviceKeys = ['construction', 'renovation', 'electrical', 'publicWorks', 'maintenance', 'design'];

  return (
    <footer style={{
      background: 'var(--color-secondary)',
      color: 'rgba(255,255,255,0.7)',
      direction: isRTL ? 'rtl' : 'ltr',
    }}>
      {/* Main Footer */}
      <div className="container" style={{ padding: '4rem 1.5rem 3rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
          gap: '3rem',
        }}
        className="footer-grid"
        >
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <Image src="/assets/logo.png" alt="TAZIRA" width={44} height={44} style={{ objectFit: 'contain' }} />
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1rem', color: 'white' }}>TAZIRA</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: '0.65rem', color: 'var(--color-primary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>CONSTRUCTION</div>
              </div>
            </Link>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '260px' }}>
              {t.footer.description}
            </p>
            {/* Social */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { href: 'https://wa.me/212650596613', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
                { href: '#', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg> },
                { href: '#', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
              ].map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" style={{
                  width: '38px', height: '38px', borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.7)',
                  transition: 'all 0.2s ease',
                }}
                className="social-link"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9rem', color: 'white', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              {t.footer.links}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { href: '/', label: t.nav.home },
                { href: '/about', label: t.nav.about },
                { href: '/services', label: t.nav.services },
                { href: '/contact', label: t.nav.contact },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} style={{
                    fontSize: '0.875rem',
                    color: 'rgba(255,255,255,0.6)',
                    transition: 'color 0.2s',
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                  }}
                  className="footer-link"
                  >
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-primary)', display: 'inline-block' }} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9rem', color: 'white', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              {t.footer.services}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {serviceKeys.map((key) => (
                <li key={key}>
                  <Link href="/services" style={{
                    fontSize: '0.875rem',
                    color: 'rgba(255,255,255,0.6)',
                    transition: 'color 0.2s',
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                  }}
                  className="footer-link"
                  >
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-primary)', display: 'inline-block' }} />
                    {t.services.items[key as keyof typeof t.services.items].title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9rem', color: 'white', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              {t.footer.contact}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                { icon: '📞', value: '+212 650 596 613', href: 'tel:+212650596613' },
                { icon: '✉️', value: 'contact@tazira-construction.ma', href: 'mailto:contact@tazira-construction.ma' },
                { icon: '📍', value: 'Maroc', href: '#' },
              ].map((item) => (
                <a key={item.value} href={item.href} style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)',
                  textDecoration: 'none', transition: 'color 0.2s',
                }}
                className="footer-link"
                >
                  <span>{item.icon}</span>
                  {item.value}
                </a>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/212650596613"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                marginTop: '1.25rem',
                padding: '0.6rem 1.25rem',
                background: '#25d366',
                color: 'white',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: 600,
                transition: 'all 0.2s',
              }}
              className="wa-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '1.25rem 1.5rem',
      }}>
        <div className="container" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '0.5rem',
        }}>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
            © {year} TAZIRA CONSTRUCTION SARL. {t.footer.rights}
          </p>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)' }}>
            {t.footer.madeWith} 🇲🇦
          </p>
        </div>
      </div>

      <style jsx>{`
        .footer-link:hover { color: white !important; }
        .social-link:hover { background: var(--color-primary) !important; border-color: var(--color-primary) !important; color: white !important; }
        .wa-btn:hover { background: #1ebe5d !important; transform: translateY(-2px); }
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
