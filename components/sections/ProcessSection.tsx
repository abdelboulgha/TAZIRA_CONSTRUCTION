'use client';

import { useRef, useEffect } from 'react';

const STEPS = [
  {
    num: '01',
    title: 'Étude préliminaire & Faisabilité',
    desc: 'Analyse approfondie de vos besoins, contraintes techniques et budgétaires. Nous étudions chaque détail pour concevoir des fondations solides pour votre projet architectural.',
    align: 'left'
  },
  {
    num: '02',
    title: 'Planification Stratégique',
    desc: "Élaboration d'un calendrier précis et allocation optimisée des ressources. Nous établissons les jalons stricts de contrôle qualité pour garantir l'efficacité à chaque étape.",
    align: 'right'
  },
  {
    num: '03',
    title: 'Exécution & Superfision',
    desc: 'Mise en œuvre rigoureuse sur le terrain. Nos ingénieurs supervisent la construction avec des contrôles continus, assurant le respect absolu des normes de sécurité et de la vision.',
    align: 'left'
  },
  {
    num: '04',
    title: 'Livraison & Accompagnement',
    desc: 'Réception finale avec remise des clés, documents techniques et garanties complètes. Notre engagement se poursuit avec un accompagnement post-livraison réactif.',
    align: 'right'
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        // Header animation
        gsap.fromTo(headerRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } 
          }
        );

        // Center glowing line animation
        gsap.fromTo(lineRef.current,
          { scaleY: 0, transformOrigin: 'top center' },
          { scaleY: 1, duration: 2, ease: 'power2.inOut',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', once: true } 
          }
        );

        // Alternating steps animation
        stepsRefs.current.forEach((el, i) => {
          if (!el) return;
          const direction = i % 2 === 0 ? -60 : 60; // Left steps slide right, Right steps slide left
          
          gsap.fromTo(el,
            { x: direction, y: 30, opacity: 0 },
            { x: 0, y: 0, opacity: 1, duration: 1, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 80%', once: true }
            }
          );
        });
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="timeline-section">
      {/* Dark modern grid background */}
      <div className="timeline-bg-grid" />
      
      <div className="container relative z-10">
        
        {/* Header */}
        <div ref={headerRef} className="timeline-header" style={{ opacity: 0 }}>
          <div className="timeline-eyebrow">
            <span className="timeline-dash"></span>
            NOTRE MÉTHODE
            <span className="timeline-dash"></span>
          </div>
          <h2 className="timeline-heading">
            L'art de bâtir,<br/> un processus <span>infonillible</span>.
          </h2>
          <p className="timeline-subtext">
            Découvrez notre méthodologie rigoureuse en quatre étapes. De l'idée initiale 
            à l'inauguration, la transparence et l'excellence guident chacune de nos actions.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="timeline-wrapper">
          
          {/* Central Vertical Line */}
          <div className="timeline-center-line">
            <div ref={lineRef} className="timeline-line-glow"></div>
          </div>

          <div className="timeline-steps">
            {STEPS.map((step, i) => (
              <div 
                key={step.num}
                className={`timeline-item ${step.align === 'left' ? 'item-left' : 'item-right'}`}
              >
                {/* Node dot on the center line */}
                <div className="timeline-node">
                  <div className="node-inner"></div>
                </div>

                {/* Content Card */}
                <div 
                  ref={el => { stepsRefs.current[i] = el; }} 
                  className="timeline-card"
                  style={{ opacity: 0 }}
                >
                  <div className="card-bg-number">{step.num}</div>
                  
                  <div className="card-top">
                    <span className="card-step-label">Étape {step.num}</span>
                  </div>
                  <h3 className="card-title">{step.title}</h3>
                  <div className="card-divider"></div>
                  <p className="card-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .timeline-section {
          background-color: var(--color-dark-surface); /* Dark Background */
          padding: 9rem 0;
          position: relative;
          overflow: hidden;
          color: white;
        }

        /* Subtle grid pattern for technical/architectural feel */
        .timeline-bg-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        /* Header Styles */
        .timeline-header {
          text-align: center;
          margin-bottom: 7rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .timeline-eyebrow {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.25em;
          color: var(--color-primary);
          margin-bottom: 1.5rem;
        }

        .timeline-dash {
          width: 30px;
          height: 2px;
          background-color: var(--color-primary);
        }

        .timeline-heading {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          line-height: 1.1;
          color: white;
          max-width: 800px;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }

        .timeline-heading span {
          color: var(--color-primary);
          font-style: italic;
        }

        .timeline-subtext {
          font-size: 1.05rem;
          line-height: 1.8;
          color: rgba(255,255,255,0.7);
          max-width: 600px;
        }

        /* Timeline Layout Variables */
        .timeline-wrapper {
          position: relative;
          max-width: 1100px;
          margin: 0 auto;
        }

        /* The central line */
        .timeline-center-line {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          background-color: rgba(255,255,255,0.08); /* Faded track */
          z-index: 1;
        }

        .timeline-line-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, var(--color-primary) 0%, rgba(212,43,43,0) 100%);
          box-shadow: 0 0 15px var(--color-primary);
        }

        .timeline-steps {
          display: flex;
          flex-direction: column;
          gap: 4rem;
          position: relative;
          z-index: 2;
        }

        /* Individual Items */
        .timeline-item {
          display: flex;
          justify-content: flex-end;
          padding-right: 50%;
          position: relative;
          width: 100%;
        }

        .timeline-item.item-right {
          justify-content: flex-start;
          padding-right: 0;
          padding-left: 50%;
        }

        /* The Circle Node on the timeline */
        .timeline-node {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: var(--color-dark-surface);
          border: 2px solid var(--color-primary);
          box-shadow: 0 0 0 6px rgba(212,43,43,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s ease;
          z-index: 3;
        }

        .node-inner {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: var(--color-primary);
          transition: transform 0.4s ease;
        }

        .timeline-item:hover .timeline-node {
          box-shadow: 0 0 0 10px rgba(212,43,43,0.25);
          background-color: var(--color-primary);
        }

        .timeline-item:hover .node-inner {
          background-color: white;
          transform: scale(1.2);
        }

        /* The Card */
        .timeline-card {
          width: 85%;
          max-width: 450px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 3rem;
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
        }

        .timeline-item.item-left .timeline-card {
          margin-right: 4rem;
          text-align: right;
        }

        .timeline-item.item-right .timeline-card {
          margin-left: 4rem;
          text-align: left;
        }

        .timeline-card:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(212, 43, 43, 0.3);
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        /* Huge watermark number inside card */
        .card-bg-number {
          position: absolute;
          bottom: -20px;
          right: -10px;
          font-family: var(--font-heading);
          font-size: 8rem;
          font-weight: 900;
          color: rgba(255,255,255,0.03);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          transition: color 0.4s ease;
        }

        .timeline-item.item-left .card-bg-number {
          right: auto;
          left: -10px;
        }

        .timeline-card:hover .card-bg-number {
          color: rgba(212,43,43,0.06);
        }

        /* Card Content */
        .card-top {
          margin-bottom: 1rem;
        }

        .card-step-label {
          display: inline-block;
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--color-primary);
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .card-title {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 700;
          color: white;
          margin-bottom: 1.5rem;
          line-height: 1.3;
        }

        .card-divider {
          width: 50px;
          height: 2px;
          background-color: var(--color-primary);
          margin-bottom: 1.5rem;
          margin-left: auto; /* For left alignment */
        }

        .timeline-item.item-right .card-divider {
          margin-left: 0;
        }

        .card-desc {
          font-size: 1rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.65);
          margin: 0;
          position: relative;
          z-index: 2;
        }

        /* RESPONSIVE DESIGN */
        @media (max-width: 992px) {
          .timeline-center-line {
            left: 30px;
            transform: none;
          }

          .timeline-node {
            left: 30px;
            transform: translate(-50%, -50%);
          }

          .timeline-item, .timeline-item.item-right {
            justify-content: flex-start;
            padding-left: 70px; /* Space for the line */
            padding-right: 0;
          }

          .timeline-item.item-left .timeline-card, 
          .timeline-item.item-right .timeline-card {
            margin: 0;
            width: 100%;
            max-width: 100%;
            text-align: left;
            padding: 2.5rem 2rem;
          }

          .timeline-item.item-left .card-divider,
          .timeline-item.item-right .card-divider {
            margin-left: 0;
          }

          .timeline-item.item-left .card-bg-number {
            left: auto;
            right: -10px;
          }

          .timeline-steps {
            gap: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .timeline-section {
            padding: 6rem 0;
          }
          
          .timeline-heading {
            font-size: 2.25rem;
          }

          .card-title {
            font-size: 1.35rem;
          }

          .card-desc {
            font-size: 0.95rem;
          }
        }
      `}} />
    </section>
  );
}
