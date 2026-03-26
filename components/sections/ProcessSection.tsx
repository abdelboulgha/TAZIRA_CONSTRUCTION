'use client';

import { useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const STEPS = [
  {
    num: '01',
    key: 'study',
    title: 'Étude du projet',
    desc: 'Analyse approfondie de vos besoins, contraintes techniques et budgétaires pour définir les meilleures solutions.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  },
  {
    num: '02',
    key: 'planning',
    title: 'Planification',
    desc: 'Élaboration d\'un plan de travail détaillé avec calendrier précis, allocation des ressources et jalons de contrôle.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>
      </svg>
    ),
  },
  {
    num: '03',
    key: 'execution',
    title: 'Réalisation',
    desc: 'Exécution rigoureuse des travaux avec contrôles qualité continus, respect des normes et supervision technique.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 4v16"/>
      </svg>
    ),
  },
  {
    num: '04',
    key: 'delivery',
    title: 'Livraison',
    desc: 'Réception finale avec remise de tous les documents, garanties et accompagnement post-livraison de votre projet.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
];

export default function ProcessSection() {
  const { isRTL } = useLanguage();
  const ref       = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(headerRef.current,
          { y: 38, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: headerRef.current, start: 'top 82%', once: true } }
        );

        gsap.fromTo(lineRef.current,
          { scaleX: 0, transformOrigin: isRTL ? 'right center' : 'left center' },
          { scaleX: 1, duration: 1.6, ease: 'power2.inOut',
            scrollTrigger: { trigger: lineRef.current, start: 'top 78%', once: true } }
        );

        gsap.fromTo('.proc-step',
          { y: 44, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.15, duration: 0.78, ease: 'power3.out',
            scrollTrigger: { trigger: ref.current, start: 'top 68%', once: true } }
        );
      });
    });
  }, [isRTL]);

  return (
    <section ref={ref} style={{ background: 'white', padding: '9rem 0', direction: isRTL ? 'rtl' : 'ltr' }}>
      <div className="container">

        {/* Header */}
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '6.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.4rem' }}>
            <div style={{ width: '40px', height: '1.5px', background: 'var(--color-primary)' }} />
            <span style={{ color: 'var(--color-primary)', fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.26em', textTransform: 'uppercase' }}>
              Notre Méthode
            </span>
            <div style={{ width: '40px', height: '1.5px', background: 'var(--color-primary)' }} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', lineHeight: 1.04, letterSpacing: '-0.035em', margin: '0 auto', maxWidth: '620px', color: 'var(--color-secondary)' }}>
            Un processus{' '}
            <span style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>éprouvé</span>,{' '}
            des résultats garantis
          </h2>
        </div>

        {/* Steps */}
        <div style={{ position: 'relative' }}>

          {/* Connecting line background */}
          <div className="proc-connector-wrap">
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '100%',
              background: 'var(--color-border)',
            }} />
            <div
              ref={lineRef}
              style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '100%',
                background: `linear-gradient(${isRTL ? '270deg' : '90deg'}, var(--color-primary) 0%, rgba(212,43,43,0.3) 100%)`,
              }}
            />
          </div>

          <div className="proc-grid">
            {STEPS.map((step, i) => (
              <div key={step.key} className="proc-step" style={{ opacity: 0 }}>

                {/* Circle icon */}
                <div
                  className="proc-circle"
                  style={{
                    background: i === 0 ? 'var(--color-primary)' : 'white',
                    border: `2px solid ${i === 0 ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    color: i === 0 ? 'white' : 'var(--color-primary)',
                    boxShadow: i === 0 ? '0 10px 32px rgba(212,43,43,0.35)' : '0 4px 16px rgba(0,0,0,0.07)',
                  }}
                >
                  {step.icon}
                </div>

                {/* Step label */}
                <div style={{
                  fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '0.62rem',
                  color: 'var(--color-primary)', letterSpacing: '0.18em', textTransform: 'uppercase',
                  marginBottom: '0.65rem',
                }}>
                  Étape {step.num}
                </div>

                <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.08rem', color: 'var(--color-secondary)', marginBottom: '0.75rem', lineHeight: 1.2 }}>
                  {step.title}
                </h4>

                <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', lineHeight: 1.74, margin: 0, maxWidth: '220px', marginLeft: 'auto', marginRight: 'auto' }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .proc-connector-wrap {
          position: absolute;
          top: 38px; left: 12.5%; right: 12.5%;
          height: 2px; overflow: hidden;
        }
        .proc-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          position: relative; z-index: 1;
        }
        .proc-step {
          text-align: center;
          padding-top: 0.5rem;
        }
        .proc-circle {
          width: 76px; height: 76px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 2rem;
          transition: all 0.35s;
          position: relative; z-index: 2;
        }
        .proc-step:hover .proc-circle {
          background: var(--color-primary) !important;
          border-color: var(--color-primary) !important;
          color: white !important;
          box-shadow: 0 10px 32px rgba(212,43,43,0.4) !important;
          transform: scale(1.08);
        }
        @media (max-width: 900px) {
          .proc-grid { grid-template-columns: repeat(2, 1fr); gap: 3rem 2rem; }
          .proc-connector-wrap { display: none; }
        }
        @media (max-width: 480px) {
          .proc-grid { grid-template-columns: 1fr; }
        }
      `}} />
    </section>
  );
}
