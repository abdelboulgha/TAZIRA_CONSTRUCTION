'use client';

import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function CtaSection() {
  const { t: _t, isRTL } = useLanguage();
  const t = _t as any;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo('.cta-inner',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true } }
        );
      });
    });
  }, []);

  return (
    <section
      ref={ref}
      style={{ background: 'var(--color-secondary)', padding: '8rem 0', direction: isRTL ? 'rtl' : 'ltr', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background elements */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=60"
          alt=""
          aria-hidden="true"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.08 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(26,26,26,0.95) 0%, rgba(26,26,26,0.85) 100%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, var(--color-primary) 0%, rgba(212,43,43,0.3) 60%, transparent 100%)' }} />
        {/* Radial glow */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,43,43,0.1) 0%, transparent 70%)' }} />
      </div>

      <div className="container cta-inner" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>

        {/* Badge line */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.85rem', marginBottom: '1.5rem' }}>
          <div style={{ height: '1px', width: '40px', background: 'rgba(212,43,43,0.5)' }} />
          <span style={{ color: 'var(--color-primary)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
            Passez à l&apos;action
          </span>
          <div style={{ height: '1px', width: '40px', background: 'rgba(212,43,43,0.5)' }} />
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily: 'var(--font-heading)', fontWeight: 900,
          fontSize: 'clamp(2.4rem, 5vw, 4rem)',
          lineHeight: 1.05, letterSpacing: '-0.03em',
          color: 'white', marginBottom: '1.25rem',
          maxWidth: '700px', margin: '0 auto 1.25rem',
        }}>
          {t.cta.title}
        </h2>

        {/* Subtitle */}
        <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.58)', marginBottom: '3rem', maxWidth: '480px', margin: '0 auto 3rem' }}>
          {t.cta.subtitle}
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            padding: '1rem 2.25rem',
            background: 'var(--color-primary)', color: 'white',
            borderRadius: '4px', border: '2px solid var(--color-primary)',
            fontFamily: 'var(--font-heading)', fontSize: '0.82rem',
            fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
            textDecoration: 'none', transition: 'all 0.25s',
          }} className="cta-btn-primary">
            {t.cta.button}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>

          <a href="https://wa.me/212650596613" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            padding: '1rem 2.25rem',
            background: '#25d366', color: 'white',
            borderRadius: '4px', border: '2px solid #25d366',
            fontFamily: 'var(--font-heading)', fontSize: '0.82rem',
            fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
            textDecoration: 'none', transition: 'all 0.25s',
          }} className="cta-btn-wa">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        </div>

        {/* Trust line */}
        <div style={{ marginTop: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          {['Devis gratuit', 'Réponse sous 24h', 'Sans engagement'].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem', fontWeight: 600 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {item}
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .cta-btn-primary:hover { background: var(--color-primary-dark) !important; border-color: var(--color-primary-dark) !important; transform: translateY(-2px); box-shadow: 0 14px 30px rgba(212,43,43,0.4); }
        .cta-btn-wa:hover { background: #1ebe5d !important; border-color: #1ebe5d !important; transform: translateY(-2px); box-shadow: 0 10px 28px rgba(37,211,102,0.35); }
      `}} />
    </section>
  );
}
