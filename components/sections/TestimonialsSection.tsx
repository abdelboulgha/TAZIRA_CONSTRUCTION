'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const TESTIMONIALS = [
  {
    name: 'Mohammed Alaoui',
    role: 'Directeur, Alaoui Immobilier',
    text: 'TAZIRA CONSTRUCTION a réalisé notre immeuble résidentiel dans les délais et avec une qualité exceptionnelle. Une équipe sérieuse et professionnelle à qui nous faisons entièrement confiance.',
    rating: 5,
  },
  {
    name: 'Karim Benali',
    role: 'Gérant, Benali Groupe',
    text: 'Nous avons confié nos travaux électriques à TAZIRA et nous n\'avons pas été déçus. Intervention rapide, résultat impeccable. Je recommande vivement leurs services.',
    rating: 5,
  },
  {
    name: 'Fatima Ouahbi',
    role: 'Propriétaire, Villa Ouahbi',
    text: 'La rénovation de notre villa a été réalisée avec un soin exceptionnel. L\'équipe a respecté notre budget et nos délais. Un travail de qualité que nous apprécions chaque jour.',
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: '3px', marginBottom: '1.25rem' }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="var(--color-primary)" stroke="none">
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
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true } }
        );

        gsap.fromTo('.testi-card',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.16, duration: 0.75, ease: 'power3.out',
            scrollTrigger: { trigger: ref.current, start: 'top 70%', once: true } }
        );
      });
    });
  }, []);

  return (
    <section ref={ref} style={{ background: '#f7f7f7', padding: '8rem 0', direction: isRTL ? 'rtl' : 'ltr' }}>
      <div className="container">

        {/* Header */}
        <div className="testi-header" style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.85rem', marginBottom: '1.1rem' }}>
            <div style={{ height: '1px', width: '40px', background: 'var(--color-primary)' }} />
            <span style={{ color: 'var(--color-primary)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
              Témoignages clients
            </span>
            <div style={{ height: '1px', width: '40px', background: 'var(--color-primary)' }} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', lineHeight: 1.08, letterSpacing: '-0.025em', margin: 0 }}>
            <span style={{ color: 'var(--color-secondary)' }}>Ce que disent nos </span>
            <span style={{ color: 'var(--color-primary)' }}>clients</span>
          </h2>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }} className="testi-grid">
          {TESTIMONIALS.map((item, i) => (
            <div
              key={i}
              className="testi-card"
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2.25rem',
                border: '1px solid var(--color-border-light)',
                boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
                opacity: 0,
                transition: 'box-shadow 0.3s, transform 0.3s',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-5px)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 50px rgba(0,0,0,0.09)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.04)';
              }}
            >
              {/* Quote icon */}
              <div style={{
                position: 'absolute', top: '1.5rem',
                right: isRTL ? 'auto' : '1.75rem',
                left: isRTL ? '1.75rem' : 'auto',
                color: 'rgba(212,43,43,0.08)',
              }}>
                <svg width="56" height="56" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>

              {/* Stars */}
              <Stars count={item.rating} />

              {/* Text */}
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.78, marginBottom: '2rem', fontStyle: 'italic', position: 'relative', zIndex: 1 }}>
                &ldquo;{item.text}&rdquo;
              </p>

              {/* Divider */}
              <div style={{ borderTop: '1px solid var(--color-border-light)', paddingTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                {/* Avatar placeholder */}
                <div style={{
                  width: '42px', height: '42px', borderRadius: '50%',
                  background: 'var(--color-primary-light)',
                  border: '2px solid rgba(212,43,43,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--color-primary)',
                  fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '0.9rem',
                  flexShrink: 0,
                }}>
                  {item.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-secondary)', lineHeight: 1.2 }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>
                    {item.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media(max-width:900px){ .testi-grid{ grid-template-columns: 1fr 1fr !important; } }
        @media(max-width:600px){ .testi-grid{ grid-template-columns: 1fr !important; } }
      `}} />
    </section>
  );
}
