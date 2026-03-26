'use client';

import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function CtaSection() {
  const { t: _t, isRTL } = useLanguage();
  const t = _t as any;
  const ref        = useRef<HTMLElement>(null);
  const innerRef   = useRef<HTMLDivElement>(null);
  const bgLineRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(bgLineRef.current,
          { scaleX: 0, transformOrigin: isRTL ? 'right center' : 'left center' },
          { scaleX: 1, duration: 1.8, ease: 'power2.inOut',
            scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true } }
        );

        gsap.fromTo(innerRef.current,
          { y: 55, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.05, ease: 'power3.out',
            scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true } }
        );
      });
    });
  }, [isRTL]);

  return (
    <section
      ref={ref}
      style={{ background: '#080808', padding: '9rem 0', direction: isRTL ? 'rtl' : 'ltr', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=60"
          alt=""
          aria-hidden="true"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%', opacity: 0.1 }}
        />
        {/* Dark gradient */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(8,8,8,0.97) 0%, rgba(8,8,8,0.88) 50%, rgba(8,8,8,0.95) 100%)' }} />
      </div>

      {/* Top red accent line (animated) */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', zIndex: 2, background: '#111' }}>
        <div
          ref={bgLineRef}
          style={{
            height: '100%',
            background: `linear-gradient(${isRTL ? '270deg' : '90deg'}, var(--color-primary) 0%, rgba(212,43,43,0.35) 70%, transparent 100%)`,
          }}
        />
      </div>

      {/* Radial red glow */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,43,43,0.1) 0%, transparent 70%)',
      }} />

      {/* Grid lines */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.025, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      <div
        ref={innerRef}
        className="container"
        style={{ position: 'relative', zIndex: 2, textAlign: 'center', opacity: 0 }}
      >
        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.75rem' }}>
          <div style={{ width: '44px', height: '1px', background: 'rgba(212,43,43,0.5)' }} />
          <span style={{ color: 'var(--color-primary)', fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.26em', textTransform: 'uppercase' }}>
            Passez à l&apos;action
          </span>
          <div style={{ width: '44px', height: '1px', background: 'rgba(212,43,43,0.5)' }} />
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily: 'var(--font-heading)', fontWeight: 900,
          fontSize: 'clamp(2.8rem, 6vw, 5rem)',
          lineHeight: 1.0, letterSpacing: '-0.04em',
          color: 'white', margin: '0 auto 1.5rem',
          maxWidth: '760px',
          textTransform: 'uppercase',
        }}>
          Prêt à{' '}
          <span style={{ color: 'var(--color-primary)', fontStyle: 'italic', textTransform: 'none' }}>
            concrétiser
          </span>{' '}
          votre projet ?
        </h2>

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
          lineHeight: 1.8, color: 'rgba(255,255,255,0.45)',
          margin: '0 auto 3.5rem', maxWidth: '500px',
        }}>
          {t.cta.subtitle}
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
          <Link href="/contact" className="cta-btn-primary">
            {t.cta.button}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>

          <a href="https://wa.me/212650596613" target="_blank" rel="noopener noreferrer" className="cta-btn-whatsapp">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        </div>

        {/* Trust badges */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          {[
            { icon: '✓', text: 'Devis gratuit' },
            { icon: '⏱', text: 'Réponse sous 24h' },
            { icon: '★', text: 'Sans engagement' },
            { icon: '🔒', text: 'Garantie travaux' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.35)', fontSize: '0.74rem', fontWeight: 600, letterSpacing: '0.04em' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {item.text}
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .cta-btn-primary {
          display: inline-flex; align-items: center; gap: 0.65rem;
          padding: 1.1rem 2.5rem;
          background: var(--color-primary); color: white;
          border-radius: 2px; border: 1.5px solid var(--color-primary);
          font-family: var(--font-heading); font-size: 0.72rem;
          font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase;
          text-decoration: none; transition: all 0.3s;
        }
        .cta-btn-primary:hover {
          background: var(--color-primary-dark);
          border-color: var(--color-primary-dark);
          transform: translateY(-3px);
          box-shadow: 0 18px 48px rgba(212,43,43,0.48);
        }
        .cta-btn-whatsapp {
          display: inline-flex; align-items: center; gap: 0.65rem;
          padding: 1.1rem 2.5rem;
          background: #25d366; color: white;
          border-radius: 2px; border: 1.5px solid #25d366;
          font-family: var(--font-heading); font-size: 0.72rem;
          font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase;
          text-decoration: none; transition: all 0.3s;
        }
        .cta-btn-whatsapp:hover {
          background: #1ebe5d; border-color: #1ebe5d;
          transform: translateY(-3px);
          box-shadow: 0 14px 38px rgba(37,211,102,0.45);
        }
      `}} />
    </section>
  );
}
