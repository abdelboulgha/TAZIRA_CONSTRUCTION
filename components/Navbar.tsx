'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const { language, setLanguage, t, isRTL } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const links = [
    { href: '/',        label: t.nav.home     },
    { href: '/about',   label: t.nav.about    },
    { href: '/services',label: t.nav.services },
    { href: '/contact', label: t.nav.contact  },
  ];

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <nav
      className={`navbar${scrolled ? ' scrolled' : ''}`}
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      <div className="nb-inner container">

        {/* ── Logo ──────────────────────────────── */}
        <Link href="/" className="nb-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', flexShrink: 0, textDecoration: 'none' }}>
          <span style={{ display: 'flex', flexShrink: 0, width: 46, height: 46 }}>
            <Image
              src="/assets/logo.png"
              alt="TAZIRA CONSTRUCTION"
              width={46}
              height={46}
              style={{ objectFit: 'contain' }}
              priority
            />
          </span>
          <div className="nb-logo-text">
            <span className="nb-logo-main">TAZIRA</span>
            <span className="nb-logo-sub">CONSTRUCTION</span>
          </div>
        </Link>

        {/* ── Desktop links ─────────────────────── */}
        <div className="nb-links">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nb-link${isActive(link.href) ? ' nb-link-active' : ''}`}
            >
              {link.label}
              <span className="nb-link-bar" />
            </Link>
          ))}
        </div>

        {/* ── Right actions ─────────────────────── */}
        <div className="nb-actions">
          {/* Language toggle */}
          <button
            type="button"
            onClick={() => setLanguage(language === 'fr' ? 'ar' : 'fr')}
            className="nb-lang-btn"
            aria-label="Changer de langue"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
            </svg>
            <span>{language === 'fr' ? 'AR' : 'FR'}</span>
          </button>

          {/* Hamburger (mobile) */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="nb-hamburger"
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span className={`nb-bar nb-bar-1${menuOpen ? ' open' : ''}`} />
            <span className={`nb-bar nb-bar-2${menuOpen ? ' open' : ''}`} />
            <span className={`nb-bar nb-bar-3${menuOpen ? ' open' : ''}`} />
          </button>
        </div>
      </div>

      {/* ── Mobile menu ───────────────────────── */}
      <div className={`nb-mobile${menuOpen ? ' nb-mobile-open' : ''}`}>
        <div className="nb-mobile-inner">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nb-mobile-link${isActive(link.href) ? ' nb-mobile-link-active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* ── Base ──────────────────────────────── */
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          background: transparent;
          border-bottom: 1px solid transparent;
          transition: background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease;
        }
        .navbar.scrolled {
          background: rgba(10,10,10,0.88);
          backdrop-filter: blur(18px) saturate(160%);
          border-color: rgba(255,255,255,0.06);
        }
        .nb-inner {
          height: 80px; display: flex; align-items: center;
          justify-content: space-between;
        }

        /* ── Logo ──────────────────────────────── */
        .nb-logo {
          display: flex; align-items: center; gap: 0.7rem;
          flex-shrink: 0; text-decoration: none;
        }
        .nb-logo-text {
          display: flex; flex-direction: column; line-height: 1;
        }
        .nb-logo-main {
          font-family: var(--font-heading); font-weight: 800;
          font-size: 1rem; color: var(--color-secondary);
          letter-spacing: -0.01em;
        }
        .nb-logo-sub {
          font-family: var(--font-heading); font-weight: 500;
          font-size: 0.62rem; color: var(--color-primary);
          letter-spacing: 0.1em; text-transform: uppercase;
          margin-top: 2px;
        }

        /* ── Desktop links ─────────────────────── */
        .nb-links {
          display: flex; align-items: center; gap: 2rem;
        }
        .nb-link {
          font-family: var(--font-heading); font-weight: 500;
          font-size: 0.9rem; color: var(--color-text);
          text-decoration: none; position: relative;
          padding-bottom: 4px;
          transition: color 0.2s ease;
        }
        .nb-link:hover { color: var(--color-primary); }
        .nb-link-active { color: var(--color-primary); }
        .nb-link-bar {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 2px; background: var(--color-primary);
          border-radius: 1px;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.25s ease;
        }
        .nb-link-active .nb-link-bar { transform: scaleX(1); }
        .nb-link:hover .nb-link-bar { transform: scaleX(1); }

        /* ── Actions ───────────────────────────── */
        .nb-actions {
          display: flex; align-items: center; gap: 0.75rem;
        }
        .nb-lang-btn {
          display: flex; align-items: center; gap: 0.4rem;
          padding: 0.4rem 0.85rem;
          border: 1.5px solid var(--color-border);
          border-radius: var(--radius-full);
          background: transparent; cursor: pointer;
          font-family: var(--font-heading); font-weight: 700;
          font-size: 0.75rem; letter-spacing: 0.06em;
          color: var(--color-text);
          transition: border-color 0.2s, color 0.2s;
        }
        .nb-lang-btn:hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
        }

        /* ── Hamburger ─────────────────────────── */
        .nb-hamburger {
          display: none; flex-direction: column;
          justify-content: space-between;
          width: 24px; height: 18px;
          background: none; border: none;
          cursor: pointer; padding: 0;
        }
        .nb-bar {
          display: block; width: 100%; height: 2px;
          background: var(--color-secondary);
          border-radius: 1px;
          transition: transform 0.3s ease, opacity 0.3s ease;
          transform-origin: center;
        }
        .nb-bar-1.open  { transform: translateY(8px) rotate(45deg); }
        .nb-bar-2.open  { opacity: 0; transform: scaleX(0); }
        .nb-bar-3.open  { transform: translateY(-8px) rotate(-45deg); }

        /* ── Mobile menu ───────────────────────── */
        .nb-mobile {
          background: var(--color-bg-light);
          border-top: 1px solid var(--color-border);
          max-height: 0; overflow: hidden;
          transition: max-height 0.35s ease;
        }
        .nb-mobile-open { max-height: 400px; }
        .nb-mobile-inner {
          padding: 1rem 1.5rem 1.5rem;
          display: flex; flex-direction: column; gap: 0.25rem;
        }
        .nb-mobile-link {
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          font-family: var(--font-heading); font-weight: 500;
          font-size: 1rem; color: var(--color-text);
          text-decoration: none;
          transition: background 0.2s, color 0.2s;
        }
        .nb-mobile-link:hover {
          background: rgba(255,255,255,0.05);
          color: var(--color-secondary);
        }
        .nb-mobile-link-active {
          background: var(--color-primary-light);
          color: var(--color-primary);
        }

        /* ── Responsive ────────────────────────── */
        @media (max-width: 768px) {
          .nb-links { display: none; }
          .nb-hamburger { display: flex; }
        }
      `}</style>
    </nav>
  );
}
