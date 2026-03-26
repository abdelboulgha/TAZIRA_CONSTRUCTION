'use client';

import { useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const BLOCKS = [
  {
    key: 'quality',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
  },
  {
    key: 'deadline',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
        <polyline points="9 16 11 18 15 14"/>
      </svg>
    ),
  },
  {
    key: 'experience',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    key: 'support',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82a19.79 19.79 0 01-3.07-8.64A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
  },
];

export default function WhyUsSection() {
  const { t: _t, isRTL } = useLanguage();
  const t = _t as any;
  const sectionRef = useRef<HTMLElement>(null);
  const blockRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef  = useRef<HTMLDivElement>(null);
  const imgRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        // Header
        gsap.fromTo(headerRef.current,
          { x: isRTL ? 50 : -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: headerRef.current, start: 'top 82%', once: true } }
        );

        // Image panel
        gsap.fromTo(imgRef.current,
          { x: isRTL ? -60 : 60, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
            scrollTrigger: { trigger: imgRef.current, start: 'top 80%', once: true } }
        );

        // Blocks stagger
        blockRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.fromTo(el,
            { y: 45, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, delay: i * 0.13, ease: 'power3.out',
              scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true } }
          );
        });
      });
    });
  }, [isRTL]);

  return (
    <section ref={sectionRef} style={{ background: 'white', padding: '8rem 0', direction: isRTL ? 'rtl' : 'ltr' }}>
      <div className="container">

        {/* Split layout: left text + blocks, right image */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '6rem', alignItems: 'center' }} className="whyus-layout">

          {/* Left */}
          <div>
            {/* Header */}
            <div ref={headerRef} style={{ marginBottom: '4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.1rem' }}>
                <div style={{ height: '2px', width: '40px', background: 'var(--color-primary)' }} />
                <span style={{ color: 'var(--color-primary)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                  {t.whyUs.badge}
                </span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', lineHeight: 1.08, letterSpacing: '-0.025em', margin: 0 }}>
                <span style={{ color: 'var(--color-secondary)' }}>{t.whyUs.title} </span>
                <span style={{ color: 'var(--color-primary)' }}>{t.whyUs.titleHighlight}</span>
              </h2>
              <p style={{ marginTop: '1.25rem', fontSize: '0.97rem', color: 'var(--color-text-muted)', lineHeight: 1.75, maxWidth: '440px' }}>
                Spécialisée dans les travaux de construction et d&apos;infrastructure, notre entreprise s&apos;engage à fournir des solutions durables, conformes aux normes les plus exigeantes.
              </p>
            </div>

            {/* 2x2 blocks */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              {BLOCKS.map((b, i) => {
                const item = t.whyUs.items[b.key as keyof typeof t.whyUs.items];
                return (
                  <div
                    key={b.key}
                    ref={el => { blockRefs.current[i] = el; }}
                    style={{
                      padding: '1.75rem',
                      borderRadius: '14px',
                      border: '1px solid var(--color-border-light)',
                      background: '#fafafa',
                      opacity: 0,
                      transition: 'box-shadow 0.3s, border-color 0.3s, transform 0.3s',
                      cursor: 'default',
                    }}
                    className="whyus-block"
                  >
                    {/* Icon */}
                    <div style={{
                      width: '50px', height: '50px', borderRadius: '12px',
                      background: 'var(--color-primary-light)',
                      color: 'var(--color-primary)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '1.1rem',
                      border: '1px solid rgba(212,43,43,0.12)',
                    }}>
                      {b.icon}
                    </div>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-secondary)', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.65, margin: 0 }}>
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — image panel */}
          <div ref={imgRef} style={{ position: 'relative', opacity: 0 }}>
            <div style={{ borderRadius: '20px', overflow: 'hidden', aspectRatio: '3/4', position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1541888081198-b80c102a9eb7?w=800&q=85"
                alt="Expertise technique"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 50%)' }} />
            </div>

            {/* Floating stat card */}
            <div style={{
              position: 'absolute',
              bottom: '2rem',
              left: isRTL ? 'auto' : '-2.5rem',
              right: isRTL ? '-2.5rem' : 'auto',
              background: 'white',
              borderRadius: '14px',
              padding: '1.25rem 1.5rem',
              boxShadow: '0 20px 50px rgba(0,0,0,0.14)',
              display: 'flex', alignItems: 'center', gap: '1rem',
              minWidth: '200px',
            }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.4rem', color: 'var(--color-secondary)', lineHeight: 1 }}>100%</div>
                <div style={{ fontSize: '0.67rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginTop: '0.25rem' }}>
                  Qualité garantie
                </div>
              </div>
            </div>

            {/* Red chip top */}
            <div style={{
              position: 'absolute', top: '2rem',
              right: isRTL ? 'auto' : '-1.5rem',
              left: isRTL ? '-1.5rem' : 'auto',
              background: 'var(--color-secondary)',
              color: 'white',
              padding: '0.6rem 1.2rem',
              borderRadius: '100px',
              fontSize: '0.72rem', fontWeight: 700,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            }}>
              10+ ans d&apos;expertise
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .whyus-block:hover {
          box-shadow: 0 12px 40px rgba(0,0,0,0.07);
          border-color: rgba(212,43,43,0.18) !important;
          transform: translateY(-3px);
        }
        @media(max-width:1024px){
          .whyus-layout{ grid-template-columns: 1fr !important; gap: 4rem !important; }
          .whyus-layout > div:last-child{ display: none !important; }
        }
        @media(max-width:540px){
          .whyus-layout > div:first-child > div:last-child{ grid-template-columns: 1fr !important; }
        }
      `}} />
    </section>
  );
}
