'use client';

import { useRef, useEffect } from 'react';

const STEPS = [
  {
    num: '01',
    title: 'Étude & Faisabilité',
    desc: 'Analyse approfondie de vos besoins, contraintes techniques et budgétaires pour concevoir des fondations solides.',
  },
  {
    num: '02',
    title: 'Planification',
    desc: "Élaboration d'un calendrier précis et allocation optimisée des ressources avec des jalons de contrôle qualité.",
  },
  {
    num: '03',
    title: 'Exécution & Supervision',
    desc: 'Mise en œuvre rigoureuse sur le terrain avec contrôles continus et respect absolu des normes de sécurité.',
  },
  {
    num: '04',
    title: 'Livraison & Suivi',
    desc: 'Réception finale avec remise des clés, documents techniques et accompagnement post-livraison réactif.',
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const stepsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(headerRef.current,
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true } }
        );

        const cards = stepsRef.current?.querySelectorAll('.proc-card');
        if (cards) {
          gsap.fromTo(cards,
            { y: 48, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.14, duration: 0.85, ease: 'power3.out',
              scrollTrigger: { trigger: stepsRef.current, start: 'top 80%', once: true } }
          );
        }
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="proc-section">
      <div className="proc-noise" />

      <div className="container">

        {/* Header */}
        <div ref={headerRef} className="proc-header" style={{ opacity: 0 }}>
          <span className="proc-eyebrow">Notre Méthode</span>
          <h2 className="proc-heading">
            Un processus <em className="proc-em">rigoureux</em>,<br />
            de la conception à la livraison
          </h2>
          <p className="proc-subtext">
            Chaque projet suit quatre étapes précises pour garantir
            transparence, qualité et respect des délais.
          </p>
        </div>

        {/* Steps grid */}
        <div ref={stepsRef} className="proc-grid">
          {STEPS.map((step, i) => (
            <div key={step.num} className="proc-card" style={{ opacity: 0 }}>
              {/* Connector line between cards */}
              {i < STEPS.length - 1 && <div className="proc-connector" />}

              <div className="proc-num">{step.num}</div>
              <div className="proc-accent" />
              <h3 className="proc-title">{step.title}</h3>
              <p className="proc-desc">{step.desc}</p>
            </div>
          ))}
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .proc-section {
          background: var(--color-bg-light);
          padding: 9rem 0;
          position: relative;
          overflow: hidden;
        }
        .proc-noise {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        /* Header */
        .proc-header {
          max-width: 640px;
          margin-bottom: 5rem;
        }
        .proc-eyebrow {
          display: inline-block;
          font-size: 0.65rem; font-weight: 800;
          letter-spacing: 0.26em; text-transform: uppercase;
          color: var(--color-primary);
          margin-bottom: 1.5rem;
        }
        .proc-heading {
          font-family: var(--font-heading); font-weight: 900;
          font-size: clamp(2.2rem, 4vw, 3.4rem);
          line-height: 1.1; letter-spacing: -0.03em;
          color: var(--color-text);
          margin-bottom: 1.25rem;
        }
        .proc-em {
          color: var(--color-primary); font-style: italic;
        }
        .proc-subtext {
          font-size: 0.96rem; line-height: 1.8;
          color: var(--color-text-muted);
          max-width: 480px;
        }

        /* Grid */
        .proc-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          position: relative;
        }

        /* Card */
        .proc-card {
          position: relative;
          padding: 2.5rem 2.5rem 2.5rem 0;
          border-top: 1px solid var(--color-border);
        }
        .proc-card:not(:last-child) {
          padding-right: 3rem;
        }
        .proc-card:not(:first-child) {
          padding-left: 3rem;
          border-left: 1px solid var(--color-border);
        }

        /* Step number */
        .proc-num {
          font-family: var(--font-heading); font-weight: 900;
          font-size: 3.5rem; line-height: 1;
          color: rgba(255,255,255,0.05);
          letter-spacing: -0.04em;
          margin-bottom: 1.5rem;
          transition: color 0.3s;
        }
        .proc-card:hover .proc-num {
          color: rgba(196,147,63,0.12);
        }

        /* Gold accent line */
        .proc-accent {
          width: 32px; height: 2px;
          background: var(--color-primary);
          margin-bottom: 1.25rem;
          transition: width 0.4s ease;
        }
        .proc-card:hover .proc-accent {
          width: 56px;
        }

        /* Title */
        .proc-title {
          font-family: var(--font-heading); font-weight: 700;
          font-size: 1.05rem; color: var(--color-text);
          line-height: 1.3; margin-bottom: 0.9rem;
        }

        /* Description */
        .proc-desc {
          font-size: 0.86rem; line-height: 1.78;
          color: var(--color-text-muted);
          margin: 0;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .proc-grid { grid-template-columns: repeat(2, 1fr); }
          .proc-card:nth-child(2) { border-left: 1px solid var(--color-border); }
          .proc-card:nth-child(3) { border-top: 1px solid var(--color-border); padding-left: 0; border-left: none; }
          .proc-card:nth-child(4) { border-top: 1px solid var(--color-border); border-left: 1px solid var(--color-border); }
          .proc-card:not(:last-child) { padding-right: 2rem; }
          .proc-card:not(:first-child) { padding-left: 2rem; }
          .proc-card:nth-child(3) { padding-left: 0; }
        }
        @media (max-width: 600px) {
          .proc-section { padding: 6rem 0; }
          .proc-grid { grid-template-columns: 1fr; }
          .proc-card { padding: 2rem 0 !important; border-left: none !important; }
          .proc-card:not(:first-child) { border-top: 1px solid var(--color-border); }
        }
      `}} />
    </section>
  );
}
