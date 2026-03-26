'use client';

import { useRef, useEffect } from 'react';

const STEPS = [
  {
    num: '01',
    key: 'study',
    title: 'Étude du projet',
    desc: 'Analyse approfondie de vos besoins, contraintes techniques et budgétaires pour définir les meilleures solutions adaptées à votre projet.',
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
    desc: "Élaboration d'un plan de travail détaillé avec calendrier précis, allocation des ressources et jalons de contrôle qualité.",
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
    desc: 'Exécution rigoureuse des travaux avec contrôles qualité continus, respect des normes et supervision technique permanente.',
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
    desc: 'Réception finale avec remise de tous les documents, garanties complètes et accompagnement post-livraison de votre projet.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
];

export default function ProcessSection() {
  const ref       = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(headerRef.current,
          { y: 42, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: headerRef.current, start: 'top 82%', once: true } }
        );

        gsap.fromTo(lineRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 1.8, ease: 'power2.inOut',
            scrollTrigger: { trigger: lineRef.current, start: 'top 76%', once: true } }
        );

        gsap.fromTo('.prc-step',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.18, duration: 0.85, ease: 'power3.out',
            scrollTrigger: { trigger: ref.current, start: 'top 66%', once: true } }
        );
      });
    });
  }, []);

  return (
    <section ref={ref} className="prc-section">

      {/* Background subtle pattern */}
      <div className="prc-pattern" />

      <div className="container">

        {/* Header */}
        <div ref={headerRef} className="prc-header" style={{ opacity: 0 }}>
          <div className="prc-eyebrow">
            <div className="prc-eyebrow-line" />
            <span>Notre Méthode</span>
            <div className="prc-eyebrow-line" />
          </div>
          <h2 className="prc-heading">
            Un processus{' '}
            <em className="prc-em">éprouvé</em>,{' '}
            des résultats garantis
          </h2>
          <p className="prc-subtext">
            Chaque étape est maîtrisée avec rigueur pour vous offrir une expérience
            transparente et un résultat à la hauteur de vos attentes.
          </p>
        </div>

        {/* Steps */}
        <div className="prc-steps">

          {/* Connecting line */}
          <div className="prc-line-wrap">
            <div className="prc-line-bg" />
            <div ref={lineRef} className="prc-line-fill" />
          </div>

          <div className="prc-grid">
            {STEPS.map((step, i) => (
              <div key={step.key} className="prc-step" style={{ opacity: 0 }}>
                {/* Step number (top) */}
                <div className="prc-num">{step.num}</div>

                {/* Circle icon */}
                <div
                  className="prc-circle"
                  style={{
                    background: i === 0 ? 'var(--color-primary)' : 'white',
                    border: `2px solid ${i === 0 ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    color: i === 0 ? 'white' : 'var(--color-primary)',
                    boxShadow: i === 0 ? '0 12px 36px rgba(212,43,43,0.38)' : '0 4px 18px rgba(0,0,0,0.07)',
                  }}
                >
                  {step.icon}
                </div>

                {/* Label */}
                <div className="prc-step-label">Étape {step.num}</div>

                {/* Title */}
                <h4 className="prc-step-title">{step.title}</h4>

                {/* Description */}
                <p className="prc-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .prc-section {
          background: white;
          padding: 10rem 0;
          position: relative; overflow: hidden;
        }
        .prc-pattern {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
        }

        /* Header */
        .prc-header { text-align: center; margin-bottom: 7rem; position: relative; z-index: 1; }
        .prc-eyebrow {
          display: flex; align-items: center; justify-content: center;
          gap: 1rem; margin-bottom: 1.6rem;
        }
        .prc-eyebrow-line { width: 40px; height: 1.5px; background: var(--color-primary); }
        .prc-eyebrow span {
          color: var(--color-primary); font-size: 0.65rem; font-weight: 800;
          letter-spacing: 0.26em; text-transform: uppercase;
        }
        .prc-heading {
          font-family: var(--font-heading); font-weight: 900;
          font-size: clamp(2.4rem, 5vw, 4rem);
          line-height: 1.04; letter-spacing: -0.04em;
          color: var(--color-secondary); margin: 0 auto 1.25rem;
          max-width: 660px;
        }
        .prc-em { color: var(--color-primary); font-style: italic; }
        .prc-subtext {
          font-size: 0.96rem; color: var(--color-text-muted);
          line-height: 1.82; max-width: 460px; margin: 0 auto;
        }

        /* Steps */
        .prc-steps { position: relative; z-index: 1; }
        .prc-line-wrap {
          position: absolute;
          top: 44px; left: 12.5%; right: 12.5%;
          height: 2px; overflow: hidden;
        }
        .prc-line-bg {
          position: absolute; inset: 0;
          background: var(--color-border);
        }
        .prc-line-fill {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, var(--color-primary) 0%, rgba(212,43,43,0.25) 100%);
        }
        .prc-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem; position: relative; z-index: 1;
        }
        .prc-step {
          text-align: center; padding-top: 0.5rem;
        }
        .prc-num {
          font-family: var(--font-heading); font-weight: 900;
          font-size: 0.6rem; color: rgba(0,0,0,0.2);
          letter-spacing: 0.18em; text-transform: uppercase;
          margin-bottom: 0.6rem;
        }
        .prc-circle {
          width: 80px; height: 80px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 2.25rem;
          transition: all 0.4s ease;
          position: relative; z-index: 2;
        }
        .prc-step:hover .prc-circle {
          background: var(--color-primary) !important;
          border-color: var(--color-primary) !important;
          color: white !important;
          box-shadow: 0 12px 36px rgba(212,43,43,0.42) !important;
          transform: scale(1.1);
        }
        .prc-step-label {
          font-family: var(--font-heading); font-weight: 900;
          font-size: 0.6rem; color: var(--color-primary);
          letter-spacing: 0.18em; text-transform: uppercase;
          margin-bottom: 0.65rem;
        }
        .prc-step-title {
          font-family: var(--font-heading); font-weight: 800;
          font-size: 1.1rem; color: var(--color-secondary);
          margin-bottom: 0.8rem; line-height: 1.2;
        }
        .prc-step-desc {
          font-size: 0.85rem; color: var(--color-text-muted);
          line-height: 1.78; margin: 0;
          max-width: 220px; margin-left: auto; margin-right: auto;
        }

        @media (max-width: 900px) {
          .prc-grid { grid-template-columns: repeat(2, 1fr); gap: 3.5rem 2rem; }
          .prc-line-wrap { display: none; }
          .prc-section { padding: 6rem 0; }
        }
        @media (max-width: 480px) {
          .prc-grid { grid-template-columns: 1fr; }
        }
      `}} />
    </section>
  );
}
