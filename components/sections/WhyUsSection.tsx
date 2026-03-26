'use client';

import { useRef, useEffect } from 'react';

const BLOCKS = [
  {
    num: '01',
    key: 'quality',
    title: 'Qualité garantie',
    desc: 'Chaque projet est réalisé selon les normes les plus strictes avec des matériaux sélectionnés pour leur durabilité et leur performance.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
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
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
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
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
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
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87"/>
        <path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
];

export default function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const blockRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const imgRef     = useRef<HTMLDivElement>(null);
  const bgTextRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(bgTextRef.current,
          { x: 80, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.4, ease: 'power2.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
        );
        gsap.fromTo(headerRef.current,
          { x: -60, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
            scrollTrigger: { trigger: headerRef.current, start: 'top 82%', once: true } }
        );
        gsap.fromTo(imgRef.current,
          { x: 70, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.3, ease: 'power3.out',
            scrollTrigger: { trigger: imgRef.current, start: 'top 80%', once: true } }
        );
        blockRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.fromTo(el,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.78, delay: i * 0.13, ease: 'power3.out',
              scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', once: true } }
          );
        });
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="wu-section">
      {/* Decorative text */}
      <div ref={bgTextRef} className="wu-bg-text" aria-hidden="true">WHY</div>

      <div className="container wu-layout">

        {/* Left side */}
        <div>
          <div ref={headerRef} className="wu-header" style={{ opacity: 0 }}>
            <div className="wu-eyebrow">
              <div className="wu-eyebrow-line" />
              <span>Pourquoi nous choisir</span>
            </div>
            <h2 className="wu-heading">
              L&apos;excellence au{' '}
              <em className="wu-em">cœur</em>{' '}
              de chaque projet
            </h2>
            <p className="wu-subtext">
              Spécialisée dans les travaux de construction et d&apos;infrastructure, notre entreprise
              s&apos;engage à fournir des solutions durables, conformes aux normes les plus exigeantes.
            </p>
          </div>

          {/* 2×2 blocks */}
          <div className="wu-grid">
            {BLOCKS.map((b, i) => (
              <div
                key={b.key}
                ref={el => { blockRefs.current[i] = el; }}
                className="wu-block"
                style={{ opacity: 0 }}
              >
                <div className="wu-block-top">
                  <span className="wu-block-num">{b.num}</span>
                  <div className="wu-block-icon">
                    {b.icon}
                  </div>
                </div>
                <div className="wu-block-bar" />
                <h4 className="wu-block-title">{b.title}</h4>
                <p className="wu-block-desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: image panel */}
        <div ref={imgRef} className="wu-img-col" style={{ opacity: 0 }}>
          <div className="wu-img-wrap">
            <img
              src="https://images.unsplash.com/photo-1541888081198-b80c102a9eb7?w=900&q=88"
              alt="Expertise TAZIRA Construction"
              className="wu-img"
            />
            <div className="wu-img-overlay" />

            {/* Stats overlay */}
            <div className="wu-img-stats">
              {[{ val: '200+', lbl: 'Projets' }, { val: '10+', lbl: 'Années' }].map((s, i) => (
                <div key={i} className="wu-img-stat">
                  <div className="wu-img-stat-val">{s.val}</div>
                  <div className="wu-img-stat-lbl">{s.lbl}</div>
                </div>
              ))}
            </div>

            {/* Floating corner accents */}
            <div className="wu-frame-tr" />
          </div>

          {/* Floating quality tag */}
          <div className="wu-quality-tag">
            100% Qualité garantie
          </div>

          {/* Quality badge circle */}
          <div className="wu-quality-badge">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .wu-section {
          background: #f8f8f8;
          padding: 10rem 0;
          overflow: hidden; position: relative;
        }
        .wu-bg-text {
          position: absolute;
          top: 50%; right: -3%;
          transform: translateY(-50%);
          font-family: var(--font-heading); font-weight: 900;
          font-size: clamp(14rem, 26vw, 22rem); line-height: 1;
          letter-spacing: -0.07em;
          color: transparent;
          -webkit-text-stroke: 1px rgba(0,0,0,0.04);
          user-select: none; pointer-events: none; z-index: 0;
        }
        .wu-layout {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 6rem; align-items: center;
          position: relative; z-index: 1;
        }

        /* Eyebrow */
        .wu-eyebrow {
          display: flex; align-items: center; gap: 0.85rem; margin-bottom: 1.25rem;
        }
        .wu-eyebrow-line { width: 32px; height: 1.5px; background: var(--color-primary); }
        .wu-eyebrow span {
          color: var(--color-primary); font-size: 0.65rem; font-weight: 800;
          letter-spacing: 0.24em; text-transform: uppercase;
        }

        /* Header */
        .wu-header { margin-bottom: 3.75rem; }
        .wu-heading {
          font-family: var(--font-heading); font-weight: 900;
          font-size: clamp(2.4rem, 4.5vw, 3.7rem);
          line-height: 1.04; letter-spacing: -0.035em;
          color: var(--color-secondary); margin-bottom: 1.25rem;
        }
        .wu-em { color: var(--color-primary); font-style: italic; }
        .wu-subtext {
          font-size: 0.96rem; color: var(--color-text-muted);
          line-height: 1.85; max-width: 490px;
        }

        /* 2x2 grid */
        .wu-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }
        .wu-block {
          padding: 1.85rem;
          border-radius: 14px;
          background: white;
          border: 1px solid var(--color-border-light);
          box-shadow: 0 2px 14px rgba(0,0,0,0.04);
          transition: all 0.32s; cursor: default;
        }
        .wu-block:hover {
          border-color: rgba(212,43,43,0.22);
          box-shadow: 0 14px 48px rgba(0,0,0,0.09);
          transform: translateY(-5px);
        }
        .wu-block:hover .wu-block-icon {
          background: var(--color-primary) !important;
          color: white !important;
          border-color: transparent !important;
          box-shadow: 0 8px 28px rgba(212,43,43,0.38);
        }
        .wu-block-top {
          display: flex; align-items: flex-start;
          justify-content: space-between; margin-bottom: 1.25rem;
        }
        .wu-block-num {
          font-family: var(--font-heading); font-size: 0.6rem;
          font-weight: 900; color: rgba(0,0,0,0.15); letter-spacing: 0.12em;
        }
        .wu-block-icon {
          width: 50px; height: 50px; border-radius: 10px;
          background: var(--color-primary-light);
          border: 1px solid rgba(212,43,43,0.15);
          color: var(--color-primary);
          display: flex; align-items: center; justify-content: center;
          transition: all 0.32s;
        }
        .wu-block-bar {
          width: 28px; height: 2px;
          background: var(--color-primary);
          margin-bottom: 1rem; border-radius: 1px;
        }
        .wu-block-title {
          font-family: var(--font-heading); font-weight: 800;
          font-size: 1.02rem; color: var(--color-secondary);
          margin-bottom: 0.65rem; line-height: 1.25;
        }
        .wu-block-desc {
          font-size: 0.82rem; color: var(--color-text-muted);
          line-height: 1.72; margin: 0;
        }

        /* Image col */
        .wu-img-col { position: relative; }
        .wu-img-wrap {
          border-radius: 16px; overflow: hidden;
          aspect-ratio: 3/4; position: relative;
        }
        .wu-img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          transition: transform 0.75s ease;
        }
        .wu-img-wrap:hover .wu-img { transform: scale(1.04); }
        .wu-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%);
        }
        .wu-img-stats {
          position: absolute; bottom: 1.5rem; left: 1.5rem; right: 1.5rem;
          display: flex; gap: 0.75rem;
        }
        .wu-img-stat {
          flex: 1;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(12px);
          border-radius: 10px; padding: 0.9rem 1rem;
          border: 1px solid rgba(255,255,255,0.15);
        }
        .wu-img-stat-val {
          font-family: var(--font-heading); font-weight: 900;
          font-size: 1.45rem; color: white; line-height: 1;
        }
        .wu-img-stat-lbl {
          font-size: 0.6rem; color: rgba(255,255,255,0.55);
          font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;
          margin-top: 0.3rem;
        }
        .wu-frame-tr {
          position: absolute; top: -12px; right: -12px;
          width: 72px; height: 72px;
          border-top: 2.5px solid var(--color-primary);
          border-right: 2.5px solid var(--color-primary);
          border-radius: 0 10px 0 0; opacity: 0.55; pointer-events: none;
        }
        .wu-quality-tag {
          position: absolute; top: 2.5rem; right: -1.75rem;
          background: var(--color-secondary); color: white;
          padding: 0.75rem 1.4rem; border-radius: 100px;
          font-size: 0.67rem; font-weight: 800;
          letter-spacing: 0.08em; text-transform: uppercase;
          box-shadow: 0 10px 34px rgba(0,0,0,0.38);
          white-space: nowrap;
        }
        .wu-quality-badge {
          position: absolute; bottom: 5.5rem; left: -2rem;
          background: var(--color-primary);
          width: 56px; height: 56px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 30px rgba(212,43,43,0.48);
        }

        @media (max-width: 1100px) {
          .wu-layout { grid-template-columns: 1fr; gap: 4rem; }
          .wu-img-col { display: none; }
        }
        @media (max-width: 540px) {
          .wu-grid { grid-template-columns: 1fr !important; }
          .wu-section { padding: 6rem 0; }
        }
      `}} />
    </section>
  );
}
