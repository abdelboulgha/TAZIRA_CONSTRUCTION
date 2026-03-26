'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, t, isRTL } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/services', label: t.nav.services },
    { href: '/contact', label: t.nav.contact },
  ];

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      <div className="container" style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
          <Image
            src="/assets/logo.png"
            alt="TAZIRA CONSTRUCTION"
            width={48}
            height={48}
            style={{ objectFit: 'contain' }}
            priority
          />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '1rem',
              color: 'var(--color-secondary)',
              letterSpacing: '-0.01em',
            }}>TAZIRA</span>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 500,
              fontSize: '0.7rem',
              color: 'var(--color-primary)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>CONSTRUCTION</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 500,
                fontSize: '0.9rem',
                color: isActive(link.href) ? 'var(--color-primary)' : 'var(--color-text)',
                position: 'relative',
                transition: 'color var(--transition-fast)',
                paddingBottom: '4px',
              }}
              className="nav-link"
            >
              {link.label}
              {isActive(link.href) && (
                <motion.span
                  layoutId="activeTab"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'var(--color-primary)',
                    borderRadius: '1px',
                  }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'fr' ? 'ar' : 'fr')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.4rem 0.85rem',
              border: '1.5px solid var(--color-border)',
              borderRadius: 'var(--radius-full)',
              background: 'transparent',
              cursor: 'pointer',
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              fontSize: '0.8rem',
              color: 'var(--color-text)',
              transition: 'all var(--transition-fast)',
            }}
            className="lang-btn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>
            <span>{language === 'fr' ? 'العربية' : 'Français'}</span>
          </button>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/212650596613"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary desktop-cta"
            style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-menu-btn"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              display: 'none',
            }}
            aria-label="Menu"
          >
            <div style={{ width: 24, height: 20, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                style={{ display: 'block', height: 2, background: 'var(--color-secondary)', borderRadius: 1 }}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                style={{ display: 'block', height: 2, background: 'var(--color-secondary)', borderRadius: 1 }}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                style={{ display: 'block', height: 2, background: 'var(--color-secondary)', borderRadius: 1 }}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: 'var(--color-bg-light)',
              borderTop: '1px solid var(--color-border)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '1rem 1.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 500,
                    fontSize: '1rem',
                    color: isActive(link.href) ? 'var(--color-primary)' : 'var(--color-text)',
                    background: isActive(link.href) ? 'var(--color-primary-light)' : 'transparent',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://wa.me/212650596613"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ marginTop: '0.5rem', justifyContent: 'center' }}
                onClick={() => setMenuOpen(false)}
              >
                WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        .nav-link:hover { color: var(--color-primary) !important; }
        .lang-btn:hover {
          border-color: var(--color-primary) !important;
          color: var(--color-primary) !important;
        }
      `}</style>
    </nav>
  );
}
