'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const POINTS = [
  'Spécialisée dans les travaux de construction et d\'infrastructure',
  'Conformité aux normes marocaines et internationales',
  'Solutions durables adaptées à chaque projet',
  'Équipe d\'ingénieurs et techniciens certifiés',
];

export default function TrustSection() {
  const { t: _t, isRTL } = useLanguage();
  const t = _t as any;
  const ref      = useRef<HTMLElement>(null);
  const textRef  = useRef<HTMLDivElement>(null);
  const imgRef   = useRef<HTMLDivElement>(null);
  const listRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(textRef.current,
          { x: isRTL ? 60 : -60, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true } }
        );

        gsap.fromTo(imgRef.current,
          { x: isRTL ? -60 : 60, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
            scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true } }
        );

        listRefs.current.forEach((el, i) => {
          gsap.fromTo(el,
            { x: isRTL ? 30 : -30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, delay: 0.4 + i * 0.1, ease: 'power3.out',
              scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true } }
          );
        });
      });
    });
  }, [isRTL]);

  return (
    <section
      ref={ref}
      style={{ background: 'white', padding: '8rem 0', direction: isRTL ? 'rtl' : 'ltr', overflow: 'hidden' }}
    >
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '55% 1fr', gap: '6rem', alignItems: 'center' }} className="trust-layout">

          {/* Text side */}
          <div ref={textRef} style={{ opacity: 0 }}>
            {/* Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.5rem' }}>
              <div style={{ height: '2px', width: '40px', background: 'var(--color-primary)' }} />
              <span style={{ color: 'var(--color-primary)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                {t.aboutPreview.badge}
              </span>
            </div>

            {/* Title */}
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', lineHeight: 1.06, letterSpacing: '-0.025em', color: 'var(--color-secondary)', marginBottom: '1.5rem' }}>
              {t.aboutPreview.title}
              <br />
              <span style={{ color: 'var(--color-primary)' }}>{t.aboutPreview.titleHighlight}</span>
              <span style={{ color: 'var(--color-primary)' }}>.</span>
            </h2>

            {/* Intro paragraph */}
            <p style={{ fontSize: '1rem', lineHeight: 1.82, color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
              {t.aboutPreview.description}
            </p>
            <p style={{ fontSize: '0.93rem', lineHeight: 1.8, color: 'var(--color-text-muted)', marginBottom: '2.5rem' }}>
              {t.aboutPreview.description2}
            </p>

            {/* Key points */}
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '3rem' }}>
              {POINTS.map((pt, i) => (
                <li
                  key={i}
                  ref={el => { listRefs.current[i] = el; }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem', opacity: 0 }}
                >
                  <div style={{
                    width: '22px', height: '22px', borderRadius: '50%',
                    background: 'var(--color-primary-light)',
                    border: '1px solid rgba(212,43,43,0.2)',
                    color: 'var(--color-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginTop: '1px',
                  }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{pt}</span>
                </li>
              ))}
            </ul>

            {/* Inline mini stats */}
            <div style={{ display: 'flex', gap: '0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', marginBottom: '2.5rem' }}>
              {[
                { value: '200+', label: t.aboutPreview.stats.projects },
                { value: '10+',  label: t.aboutPreview.stats.years    },
                { value: '150+', label: t.aboutPreview.stats.clients  },
              ].map((s, i) => (
                <div key={i} style={{ flex: 1, padding: '1.1rem 0.75rem', borderRight: i < 2 ? '1px solid var(--color-border)' : 'none', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.55rem', color: i === 0 ? 'var(--color-primary)' : 'var(--color-secondary)', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.09em', marginTop: '0.35rem', lineHeight: 1.3 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link href="/about" className="btn btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '4px' }}>
              {t.aboutPreview.learnMore}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d={isRTL ? 'M19 12H5M12 19l-7-7 7-7' : 'M5 12h14M12 5l7 7-7 7'}/>
              </svg>
            </Link>
          </div>

          {/* Image side */}
          <div ref={imgRef} style={{ position: 'relative', opacity: 0 }}>
            <div style={{ borderRadius: '20px', overflow: 'hidden', aspectRatio: '4/5', position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1541888081198-b80c102a9eb7?w=800&q=85"
                alt="Ingénieurs TAZIRA en réunion"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              {/* subtle red frame */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 50%)' }} />
            </div>

            {/* Floating card */}
            <div style={{
              position: 'absolute',
              bottom: '2.5rem',
              left: isRTL ? 'auto' : '-2rem',
              right: isRTL ? '-2rem' : 'auto',
              background: 'white',
              borderRadius: '14px',
              padding: '1.25rem 1.5rem',
              boxShadow: '0 20px 50px rgba(0,0,0,0.13)',
              display: 'flex', alignItems: 'center', gap: '1rem',
              border: '1px solid rgba(0,0,0,0.05)',
            }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.3rem', color: 'var(--color-secondary)', lineHeight: 1 }}>ISO</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginTop: '0.2rem' }}>
                  Normes de qualité
                </div>
              </div>
            </div>

            {/* Red decorative corner */}
            <div style={{
              position: 'absolute',
              top: '-1.5rem',
              right: isRTL ? 'auto' : '-1.5rem',
              left: isRTL ? '-1.5rem' : 'auto',
              width: '100px', height: '100px',
              border: '3px solid var(--color-primary)',
              borderRadius: '16px',
              opacity: 0.15,
              pointerEvents: 'none',
            }} />
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media(max-width:900px){
          .trust-layout{ grid-template-columns: 1fr !important; gap: 3rem !important; }
          .trust-layout > div:last-child{ display: none !important; }
        }
      `}} />
    </section>
  );
}
