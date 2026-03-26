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

          {/* WhatsApp CTA Removed */}

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
              {/* WhatsApp Mobile Removed */}
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
