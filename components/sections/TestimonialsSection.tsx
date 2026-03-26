'use client';

import { useEffect, useRef } from 'react';

const TESTIMONIALS = [
  {
    name: 'Mohammed Alaoui',
    role: 'Directeur',
    company: 'Alaoui Immobilier',
    text: 'TAZIRA CONSTRUCTION a réalisé notre immeuble résidentiel dans les délais convenus et avec une qualité exceptionnelle. Une équipe sérieuse et professionnelle à qui nous faisons entièrement confiance.',
    rating: 5,
    project: 'Immeuble résidentiel, Casablanca',
    initial: 'MA',
    dark: true,
  },
  {
    name: 'Karim Benali',
    role: 'Gérant',
    company: 'Benali Groupe',
    text: 'Nous avons confié nos travaux électriques à TAZIRA et nous n\'avons pas été déçus. Intervention rapide, résultat impeccable. Je recommande vivement leurs services à toute entreprise sérieuse.',
    rating: 5,
    project: 'Installation électrique industrielle',
    initial: 'KB',
    dark: false,
  },
  {
    name: 'Fatima Ouahbi',
    role: 'Propriétaire',
    company: 'Villa Ouahbi, Marrakech',
    text: 'La rénovation de notre villa a été réalisée avec un soin exceptionnel. L\'équipe a parfaitement respecté notre budget et nos délais. Un travail de grande qualité que nous apprécions chaque jour.',
    rating: 5,
    project: 'Rénovation complète, Marrakech',
    initial: 'FO',
    dark: true,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: '3px', marginBottom: '1.5rem' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24"
          fill={i < count ? 'var(--color-primary)' : 'rgba(255,255,255,0.12)'}
          stroke="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo('.tsm-header',
          { y: 42, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true } }
        );
        gsap.fromTo('.tsm-card',
          { y: 56, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.18, duration: 0.85, ease: 'power3.out',
            scrollTrigger: { trigger: ref.current, start: 'top 70%', once: true } }
        );
        gsap.fromTo('.tsm-footer',
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: ref.current, start: 'top 60%', once: true } }
        );
      });
    });
  }, []);

  return (
    <section ref={ref} className="tsm-section">
      {/* Dot pattern */}
      <div className="tsm-dots" />

      <div className="container">

        {/* Header */}
        <div className="tsm-header" style={{ opacity: 0 }}>
          <div className="tsm-eyebrow">
            <span>Témoignages clients</span>
          </div>
          <h2 className="tsm-heading">
            Ce que disent nos{' '}
            <em className="tsm-em">clients</em>
          </h2>
          <p className="tsm-subtext">
            La confiance de nos clients est notre plus grande fierté.
            Voici ce qu&apos;ils pensent de notre travail.
          </p>
        </div>

        {/* Cards */}
        <div className="tsm-grid">
          {TESTIMONIALS.map((item, i) => (
            <div key={i} className="tsm-card" style={{ opacity: 0 }}>
              {/* Quote icon */}
              <div className="tsm-quote-icon">
                <svg width="52" height="52" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>

              {/* Top bar accent */}
              <div className="tsm-topbar" />

              <Stars count={item.rating} />

              <p className="tsm-text">&ldquo;{item.text}&rdquo;</p>

              {/* Project tag */}
              <div className="tsm-project-tag">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                </svg>
                <span>{item.project}</span>
              </div>

              <div className="tsm-divider" />

              {/* Author */}
              <div className="tsm-author">
                <div className="tsm-avatar" style={{
                  background: item.dark ? 'var(--color-bg-dark)' : 'var(--color-primary)',
                }}>
                  {item.initial}
                </div>
                <div>
                  <div className="tsm-author-name">{item.name}</div>
                  <div className="tsm-author-role">
                    {item.role} —{' '}
                    <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                      {item.company}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer trust indicator */}
        <div className="tsm-footer" style={{ opacity: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', marginBottom: '0.75rem' }}>
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="var(--color-primary)" stroke="none">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', margin: 0, textAlign: 'center' }}>
            <strong style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}>4.9/5</strong>
            {' '}— Basé sur plus de 150 avis clients vérifiés
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .tsm-section {
          background: var(--color-bg);
          padding: 10rem 0;
          position: relative; overflow: hidden;
        }
        .tsm-dots {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        /* Header */
        .tsm-header { text-align: center; margin-bottom: 5.5rem; position: relative; z-index: 1; }
        .tsm-eyebrow {
          display: flex; align-items: center; justify-content: center;
          gap: 1rem; margin-bottom: 1.5rem;
        }
.tsm-eyebrow span {
          color: var(--color-primary); font-size: 0.65rem; font-weight: 800;
          letter-spacing: 0.26em; text-transform: uppercase;
        }
        .tsm-heading {
          font-family: var(--font-heading); font-weight: 900;
          font-size: clamp(2.4rem, 5vw, 4rem);
          line-height: 1.04; letter-spacing: -0.04em;
          color: var(--color-text); margin: 0 auto 1.25rem;
        }
        .tsm-em { color: var(--color-primary); font-style: italic; }
        .tsm-subtext {
          font-size: 0.96rem; color: var(--color-text-muted);
          line-height: 1.8; max-width: 420px; margin: 0 auto;
        }

        /* Cards */
        .tsm-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem; margin-bottom: 4.5rem;
          position: relative; z-index: 1;
        }
        .tsm-card {
          background: var(--color-bg-light);
          border-radius: 16px; padding: 2.5rem;
          border: 1px solid var(--color-border-light);
          box-shadow: 0 2px 18px rgba(0,0,0,0.05);
          position: relative; overflow: hidden;
          transition: box-shadow 0.38s, transform 0.38s, border-color 0.38s;
          cursor: default;
        }
        .tsm-card:hover {
          box-shadow: 0 22px 60px rgba(0,0,0,0.10);
          transform: translateY(-7px);
          border-color: rgba(196,147,63,0.18);
        }
        .tsm-card:hover .tsm-topbar { width: 100%; }
        .tsm-topbar {
          position: absolute; top: 0; left: 0;
          width: 52px; height: 3px;
          background: var(--color-primary);
          border-radius: 0 0 3px 0;
          transition: width 0.45s ease;
        }
        .tsm-quote-icon {
          position: absolute; top: 1.5rem; right: 1.75rem;
          color: rgba(196,147,63,0.07);
        }
        .tsm-text {
          font-size: 0.9rem; color: var(--color-text-muted);
          line-height: 1.85; margin-bottom: 1.75rem;
          font-style: italic; position: relative; z-index: 1;
        }
        .tsm-project-tag {
          display: inline-flex; align-items: center; gap: 0.42rem;
          background: var(--color-bg-light);
          padding: 0.35rem 0.75rem; border-radius: 100px;
          margin-bottom: 1.5rem;
        }
        .tsm-project-tag span {
          font-size: 0.64rem; color: var(--color-text-muted);
          font-weight: 600; letter-spacing: 0.04em;
        }
        .tsm-divider {
          height: 1px; background: var(--color-border-light);
          margin-bottom: 1.25rem;
        }
        .tsm-author {
          display: flex; align-items: center; gap: 0.9rem;
        }
        .tsm-avatar {
          width: 46px; height: 46px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: white; font-family: var(--font-heading);
          font-weight: 900; font-size: 0.85rem; flex-shrink: 0;
        }
        .tsm-author-name {
          font-family: var(--font-heading); font-weight: 800;
          font-size: 0.92rem; color: var(--color-text); line-height: 1.2;
        }
        .tsm-author-role {
          font-size: 0.73rem; color: var(--color-text-muted); margin-top: 0.2rem;
        }

        /* Footer */
        .tsm-footer { position: relative; z-index: 1; }

        @media (max-width: 960px) { .tsm-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 600px) {
          .tsm-grid { grid-template-columns: 1fr; }
          .tsm-section { padding: 6rem 0; }
        }
      `}} />
    </section>
  );
}
