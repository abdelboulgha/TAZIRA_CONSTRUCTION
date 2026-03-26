'use client';

import { useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const STEPS = [
  {
    num: '01',
    key: 'study',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  },
  {
    num: '02',
    key: 'planning',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    num: '03',
    key: 'execution',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 4v16"/>
      </svg>
    ),
  },
  {
    num: '04',
    key: 'delivery',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
];

export default function ProcessSection() {
  const { t: _t, isRTL } = useLanguage();
  const t = _t as any;
  const ref       = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(headerRef.current,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: headerRef.current, start: 'top 82%', once: true } }
        );

        gsap.fromTo(lineRef.current,
          { scaleX: 0, transformOrigin: isRTL ? 'right center' : 'left center' },
          { scaleX: 1, duration: 1.4, ease: 'power2.inOut',
            scrollTrigger: { trigger: lineRef.current, start: 'top 75%', once: true } }
        );

        gsap.fromTo('.process-step',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.16, duration: 0.75, ease: 'power3.out',
            scrollTrigger: { trigger: ref.current, start: 'top 70%', once: true } }
        );
      });
    });
  }, [isRTL]);

  return (
    <section ref={ref} style={{ background: 'white', padding: '8rem 0', direction: isRTL ? 'rtl' : 'ltr' }}>
      <div className="container">

        {/* Header */}
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.85rem', marginBottom: '1.1rem' }}>
            <div style={{ height: '1px', width: '40px', background: 'var(--color-primary)' }} />
            <span style={{ color: 'var(--color-primary)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
              {t.process.badge}
            </span>
            <div style={{ height: '1px', width: '40px', background: 'var(--color-primary)' }} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', lineHeight: 1.08, letterSpacing: '-0.025em', margin: '0 auto', maxWidth: '600px' }}>
            <span style={{ color: 'var(--color-secondary)' }}>{t.process.title} </span>
            <span style={{ color: 'var(--color-primary)' }}>{t.process.titleHighlight}</span>
          </h2>
        </div>

        {/* Steps */}
        <div style={{ position: 'relative' }}>

          {/* Connector line */}
          <div style={{ position: 'absolute', top: '38px', left: '10%', right: '10%', height: '1px', background: 'var(--color-border)' }} className="process-connector-bg">
            <div ref={lineRef} style={{ height: '100%', background: 'var(--color-primary)', transformOrigin: isRTL ? 'right center' : 'left center' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.5rem', position: 'relative', zIndex: 1 }} className="process-grid">
            {STEPS.map((step, i) => {
              const item = t.process.steps[step.key as keyof typeof t.process.steps];
              return (
                <div key={step.key} className="process-step" style={{ textAlign: 'center', opacity: 0 }}>
                  {/* Circle */}
                  <div style={{
                    width: '76px', height: '76px', borderRadius: '50%',
                    background: i === 0 ? 'var(--color-primary)' : 'white',
                    border: `2px solid ${i === 0 ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    color: i === 0 ? 'white' : 'var(--color-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1.75rem',
                    boxShadow: i === 0 ? '0 8px 30px rgba(212,43,43,0.3)' : '0 2px 12px rgba(0,0,0,0.06)',
                    transition: 'all 0.3s',
                    position: 'relative', zIndex: 2,
                  }} className="process-circle">
                    {step.icon}
                  </div>

                  {/* Number */}
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '0.68rem', color: 'var(--color-primary)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                    Étape {step.num}
                  </div>

                  {/* Title */}
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-secondary)', marginBottom: '0.75rem', lineHeight: 1.25 }}>
                    {item.title}
                  </h4>

                  {/* Description */}
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0, maxWidth: '220px', marginLeft: 'auto', marginRight: 'auto' }}>
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .process-step:hover .process-circle {
          background: var(--color-primary) !important;
          border-color: var(--color-primary) !important;
          color: white !important;
          box-shadow: 0 8px 30px rgba(212,43,43,0.3) !important;
          transform: scale(1.06);
        }
        @media(max-width:900px){
          .process-grid{ grid-template-columns: repeat(2,1fr) !important; gap: 2.5rem !important; }
          .process-connector-bg{ display: none !important; }
        }
        @media(max-width:480px){
          .process-grid{ grid-template-columns: 1fr !important; }
        }
      `}} />
    </section>
  );
}
