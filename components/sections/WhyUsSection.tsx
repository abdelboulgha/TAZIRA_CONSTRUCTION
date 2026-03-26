'use client';

import { useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const BLOCKS = [
  {
    num: '01',
    key: 'quality',
    title: 'Qualité garantie',
    desc: 'Chaque projet est réalisé selon les normes les plus strictes avec des matériaux sélectionnés pour leur durabilité.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
  },
  {
    num: '02',
    key: 'deadline',
    title: 'Respect des délais',
    desc: 'Planification rigoureuse et suivi en temps réel de chaque chantier pour livrer votre projet dans les délais convenus.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
        <polyline points="9 16 11 18 15 14"/>
      </svg>
    ),
  },
  {
    num: '03',
    key: 'experience',
    title: 'Expertise technique',
    desc: "Plus de 10 ans d'expérience cumulée par nos ingénieurs et techniciens dans les domaines de la construction au Maroc.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    num: '04',
    key: 'support',
    title: 'Accompagnement 360°',
    desc: "De l'étude préliminaire à la livraison, nous vous accompagnons à chaque étape et restons disponibles après la remise des clés.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87"/>
        <path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
];

export default function WhyUsSection() {
  const { isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const blockRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const imgRef     = useRef<HTMLDivElement>(null);
  const bgNumRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(bgNumRef.current,
          { x: isRTL ? -60 : 60, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2, ease: 'power2.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
        );

        gsap.fromTo(headerRef.current,
          { x: isRTL ? 55 : -55, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: headerRef.current, start: 'top 82%', once: true } }
        );

        gsap.fromTo(imgRef.current,
          { x: isRTL ? -65 : 65, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: imgRef.current, start: 'top 80%', once: true } }
        );

        blockRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.fromTo(el,
            { y: 48, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.72, delay: i * 0.12, ease: 'power3.out',
              scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', once: true } }
          );
        });
      });
    });
  }, [isRTL]);

  return (
    <section ref={sectionRef} style={{ background: '#f9f9f9', padding: '9rem 0', direction: isRTL ? 'rtl' : 'ltr', overflow: 'hidden', position: 'relative' }}>

      {/* Background huge decorative number */}
      <div ref={bgNumRef} style={{
        position: 'absolute',
        top: '50%', [isRTL ? 'left' : 'right']: '-2%',
        transform: 'translateY(-50%)',
        fontFamily: 'var(--font-heading)', fontWeight: 900,
        fontSize: 'clamp(14rem, 26vw, 22rem)', lineHeight: 1,
        letterSpacing: '-0.06em',
        color: 'transparent',
        WebkitTextStroke: '1px rgba(0,0,0,0.04)',
        userSelect: 'none', pointerEvents: 'none', zIndex: 0,
        opacity: 0,
      }}>
        WHY
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="whyus-layout">

          {/* Left: header + blocks */}
          <div>
            <div ref={headerRef} style={{ marginBottom: '4rem', opacity: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
                <div style={{ width: '32px', height: '1.5px', background: 'var(--color-primary)' }} />
                <span style={{ color: 'var(--color-primary)', fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.24em', textTransform: 'uppercase' }}>
                  Pourquoi nous choisir
                </span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(2.4rem, 4.2vw, 3.6rem)', lineHeight: 1.04, letterSpacing: '-0.03em', margin: 0, color: 'var(--color-secondary)' }}>
                L'excellence au{' '}
                <span style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>cœur</span>{' '}
                de chaque projet
              </h2>
              <p style={{ marginTop: '1.25rem', fontSize: '0.975rem', color: 'var(--color-text-muted)', lineHeight: 1.82, maxWidth: '480px' }}>
                Spécialisée dans les travaux de construction et d&apos;infrastructure, notre entreprise
                s&apos;engage à fournir des solutions durables, conformes aux normes les plus exigeantes.
              </p>
            </div>

            {/* 2×2 blocks */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="whyus-blocks">
              {BLOCKS.map((b, i) => (
                <div
                  key={b.key}
                  ref={el => { blockRefs.current[i] = el; }}
                  className="whyus-block"
                  style={{ opacity: 0 }}
                >
                  {/* Top row: number + icon */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.62rem', fontWeight: 900, color: 'rgba(0,0,0,0.18)', letterSpacing: '0.12em' }}>
                      {b.num}
                    </span>
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '10px',
                      background: 'var(--color-primary-light)',
                      border: '1px solid rgba(212,43,43,0.15)',
                      color: 'var(--color-primary)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.3s',
                    }} className="whyus-icon">
                      {b.icon}
                    </div>
                  </div>

                  {/* Red bar accent */}
                  <div style={{ width: '28px', height: '2px', background: 'var(--color-primary)', marginBottom: '1rem', borderRadius: '1px' }} />

                  <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1rem', color: 'var(--color-secondary)', marginBottom: '0.6rem', lineHeight: 1.25 }}>
                    {b.title}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.68, margin: 0 }}>
                    {b.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image panel */}
          <div ref={imgRef} style={{ position: 'relative', opacity: 0 }}>
            <div style={{ borderRadius: '16px', overflow: 'hidden', aspectRatio: '3/4', position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1541888081198-b80c102a9eb7?w=900&q=88"
                alt="Notre expertise"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.7s ease' }}
                className="whyus-img"
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)' }} />

              {/* Stat overlay bottom */}
              <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem', display: 'flex', gap: '0.75rem' }}>
                {[{ val: '200+', lbl: 'Projets' }, { val: '10+', lbl: 'Années' }].map((s, i) => (
                  <div key={i} style={{ flex: 1, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', borderRadius: '8px', padding: '0.85rem 1rem', border: '1px solid rgba(255,255,255,0.15)' }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.4rem', color: 'white', lineHeight: 1 }}>{s.val}</div>
                    <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.6)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.25rem' }}>{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating tag */}
            <div style={{
              position: 'absolute', top: '2.5rem',
              [isRTL ? 'left' : 'right']: '-1.75rem',
              background: 'var(--color-secondary)', color: 'white',
              padding: '0.7rem 1.4rem', borderRadius: '100px',
              fontSize: '0.68rem', fontWeight: 800,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              boxShadow: '0 10px 32px rgba(0,0,0,0.35)',
              whiteSpace: 'nowrap',
            }}>
              100% Qualité garantie
            </div>

            {/* Bottom-left quality badge */}
            <div style={{
              position: 'absolute', bottom: '5.5rem',
              [isRTL ? 'right' : 'left']: '-2rem',
              background: 'var(--color-primary)',
              width: '54px', height: '54px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 28px rgba(212,43,43,0.45)',
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .whyus-layout {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 6rem;
          align-items: center;
        }
        .whyus-block {
          padding: 1.75rem;
          border-radius: 12px;
          background: white;
          border: 1px solid var(--color-border-light);
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          transition: all 0.3s;
          cursor: default;
        }
        .whyus-block:hover {
          border-color: rgba(212,43,43,0.2);
          box-shadow: 0 12px 40px rgba(0,0,0,0.08);
          transform: translateY(-4px);
        }
        .whyus-block:hover .whyus-icon {
          background: var(--color-primary) !important;
          color: white !important;
          border-color: transparent !important;
          box-shadow: 0 8px 24px rgba(212,43,43,0.35);
        }
        .whyus-img:hover { transform: scale(1.04); }
        @media (max-width: 1100px) {
          .whyus-layout { grid-template-columns: 1fr; gap: 4rem; }
          .whyus-layout > div:last-child { display: none; }
        }
        @media (max-width: 540px) {
          .whyus-blocks { grid-template-columns: 1fr !important; }
        }
      `}} />
    </section>
  );
}
