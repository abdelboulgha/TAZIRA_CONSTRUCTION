'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const TESTIMONIALS = [
  {
    name: 'Mohammed Alaoui',
    role: 'Directeur',
    company: 'Alaoui Immobilier',
    text: 'TAZIRA CONSTRUCTION a réalisé notre immeuble résidentiel dans les délais convenus et avec une qualité exceptionnelle. Une équipe sérieuse et professionnelle à qui nous faisons entièrement confiance.',
    rating: 5,
    project: 'Immeuble résidentiel, Casablanca',
    initial: 'MA',
    accent: '#d42b2b',
  },
  {
    name: 'Karim Benali',
    role: 'Gérant',
    company: 'Benali Groupe',
    text: 'Nous avons confié nos travaux électriques à TAZIRA et nous n\'avons pas été déçus. Intervention rapide, résultat impeccable. Je recommande vivement leurs services à toute entreprise sérieuse.',
    rating: 5,
    project: 'Installation électrique industrielle',
    initial: 'KB',
    accent: '#1a1a1a',
  },
  {
    name: 'Fatima Ouahbi',
    role: 'Propriétaire',
    company: 'Villa Ouahbi, Marrakech',
    text: 'La rénovation de notre villa a été réalisée avec un soin exceptionnel. L\'équipe a parfaitement respecté notre budget et nos délais. Un travail de grande qualité que nous apprécions chaque jour.',
    rating: 5,
    project: 'Rénovation complète, Marrakech',
    initial: 'FO',
    accent: '#d42b2b',
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: '4px', marginBottom: '1.5rem' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24"
          fill={i < count ? 'var(--color-primary)' : 'rgba(0,0,0,0.1)'}
          stroke="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const { isRTL } = useLanguage();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo('.testi-header',
          { y: 38, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true } }
        );

        gsap.fromTo('.testi-card',
          { y: 52, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.16, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: ref.current, start: 'top 70%', once: true } }
        );
      });
    });
  }, []);

  return (
    <section ref={ref} style={{ background: 'white', padding: '9rem 0', direction: isRTL ? 'rtl' : 'ltr', position: 'relative', overflow: 'hidden' }}>

      {/* Subtle dot grid background */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.045) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div className="testi-header" style={{ textAlign: 'center', marginBottom: '5.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.4rem' }}>
            <div style={{ width: '40px', height: '1.5px', background: 'var(--color-primary)' }} />
            <span style={{ color: 'var(--color-primary)', fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.26em', textTransform: 'uppercase' }}>
              Témoignages clients
            </span>
            <div style={{ width: '40px', height: '1.5px', background: 'var(--color-primary)' }} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', lineHeight: 1.04, letterSpacing: '-0.035em', margin: 0, color: 'var(--color-secondary)' }}>
            Ce que disent nos{' '}
            <span style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>clients</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="testi-grid">
          {TESTIMONIALS.map((item, i) => (
            <div key={i} className="testi-card" style={{ opacity: 0 }}>

              {/* Large quote mark */}
              <div style={{
                position: 'absolute', top: '1.25rem',
                [isRTL ? 'left' : 'right']: '1.5rem',
                color: 'rgba(212,43,43,0.07)',
              }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>

              {/* Red top accent bar — full width on card */}
              <div style={{
                position: 'absolute', top: 0,
                [isRTL ? 'right' : 'left']: 0,
                width: '48px', height: '3px',
                background: 'var(--color-primary)',
                borderRadius: '0 0 2px 2px',
                transition: 'width 0.4s ease',
              }} className="testi-topbar" />

              {/* Stars */}
              <StarRating count={item.rating} />

              {/* Quote text */}
              <p style={{
                fontSize: '0.9rem', color: 'var(--color-text-muted)',
                lineHeight: 1.82, marginBottom: '2rem',
                fontStyle: 'italic', position: 'relative', zIndex: 1,
              }}>
                &ldquo;{item.text}&rdquo;
              </p>

              {/* Project tag */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                background: 'var(--color-bg-light)',
                padding: '0.35rem 0.75rem', borderRadius: '100px',
                marginBottom: '1.5rem',
              }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                </svg>
                <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', fontWeight: 600, letterSpacing: '0.04em' }}>
                  {item.project}
                </span>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: 'var(--color-border-light)', marginBottom: '1.25rem' }} />

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '50%',
                  background: item.accent === '#d42b2b' ? 'var(--color-primary)' : 'var(--color-secondary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white',
                  fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '0.85rem',
                  flexShrink: 0,
                }}>
                  {item.initial}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.92rem', color: 'var(--color-secondary)', lineHeight: 1.2 }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '0.73rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>
                    {item.role} — <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{item.company}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom trust indicator */}
        <div style={{ textAlign: 'center', marginTop: '4.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="var(--color-primary)" stroke="none">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', margin: 0 }}>
            <strong style={{ color: 'var(--color-secondary)', fontFamily: 'var(--font-heading)' }}>4.9/5</strong>
            {' '}— Basé sur plus de 150 avis clients vérifiés
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .testi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .testi-card {
          background: white;
          border-radius: 14px;
          padding: 2.25rem;
          border: 1px solid var(--color-border-light);
          box-shadow: 0 2px 16px rgba(0,0,0,0.04);
          position: relative; overflow: hidden;
          transition: box-shadow 0.35s, transform 0.35s, border-color 0.35s;
          cursor: default;
        }
        .testi-card:hover {
          box-shadow: 0 18px 52px rgba(0,0,0,0.1);
          transform: translateY(-6px);
          border-color: rgba(212,43,43,0.15);
        }
        .testi-card:hover .testi-topbar {
          width: 100% !important;
        }
        @media (max-width: 960px) { .testi-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 600px)  { .testi-grid { grid-template-columns: 1fr; } }
      `}} />
    </section>
  );
}
