'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

const POINTS = [
  { num: '01', text: 'Spécialisée dans les travaux de construction et d\'infrastructure au Maroc' },
  { num: '02', text: 'Conformité aux normes marocaines et internationales en vigueur' },
  { num: '03', text: 'Solutions durables et techniques adaptées à chaque projet' },
  { num: '04', text: 'Équipe d\'ingénieurs et techniciens certifiés et expérimentés' },
];

export default function TrustSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const textRef     = useRef<HTMLDivElement>(null);
  const imgRef      = useRef<HTMLDivElement>(null);
  const pointRefs   = useRef<(HTMLLIElement | null)[]>([]);
  const statsRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        const trigger = { trigger: sectionRef.current, start: 'top 70%', once: true };

        gsap.fromTo(textRef.current,
          { x: -70, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: trigger });

        gsap.fromTo(imgRef.current,
          { x: 70, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.3, ease: 'power3.out', scrollTrigger: trigger });

        pointRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.fromTo(el,
            { x: -30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.7, delay: 0.3 + i * 0.1, ease: 'power3.out', scrollTrigger: trigger });
        });

        gsap.fromTo(statsRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, delay: 0.7, ease: 'power3.out', scrollTrigger: trigger });
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="trust-section">

      {/* Decorative bg element */}
      <div className="trust-bg-text" aria-hidden="true">SINCE</div>

      <div className="container trust-layout">

        {/* ── Text column ─────────────────────── */}
        <div ref={textRef} className="trust-text" style={{ opacity: 0 }}>

          <div className="trust-eyebrow">
            <div className="trust-eyebrow-line" />
            <span>À propos de nous</span>
          </div>

          <h2 className="trust-heading">
            Votre partenaire de{' '}
            <em className="trust-em">confiance</em>{' '}
            en construction
          </h2>

          <p className="trust-body">
            Spécialisée dans les travaux de construction et d&apos;infrastructure, notre entreprise
            s&apos;engage à fournir des solutions durables, conformes aux normes les plus exigeantes.
          </p>
          <p className="trust-body" style={{ marginTop: '0.9rem', marginBottom: '3rem' }}>
            Notre approche allie expertise technique, rigueur dans l&apos;exécution et
            transparence totale avec nos clients, du premier rendez-vous jusqu&apos;à la livraison clés en main.
          </p>

          {/* Numbered points */}
          <ul className="trust-points">
            {POINTS.map((pt, i) => (
              <li
                key={i}
                ref={el => { pointRefs.current[i] = el; }}
                className="trust-point"
                style={{ opacity: 0 }}
              >
                <span className="trust-point-num">{pt.num}</span>
                <span className="trust-point-text">{pt.text}</span>
              </li>
            ))}
          </ul>

          {/* Mini stats */}
          <div ref={statsRef} className="trust-stats" style={{ opacity: 0 }}>
            {[
              { value: '200+', label: 'Projets réalisés',   accent: true  },
              { value: '10+',  label: "Années d'expertise", accent: false },
              { value: '150+', label: 'Clients satisfaits', accent: false },
            ].map((s, i) => (
              <div key={i} className="trust-stat">
                <div className="trust-stat-val" style={{ color: s.accent ? 'var(--color-primary)' : 'var(--color-secondary)' }}>
                  {s.value}
                </div>
                <div className="trust-stat-lbl">{s.label}</div>
              </div>
            ))}
          </div>

          <Link href="/about" className="trust-cta">
            En savoir plus
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        {/* ── Image column ─────────────────────── */}
        <div ref={imgRef} className="trust-img-col" style={{ opacity: 0 }}>

          {/* Main image */}
          <div className="trust-img-wrap">
            <img
              src="https://images.unsplash.com/photo-1541888081198-b80c102a9eb7?w=900&q=88"
              alt="Ingénieurs TAZIRA sur chantier"
              className="trust-img"
            />
            <div className="trust-img-overlay" />
            {/* Red corner frame */}
            <div className="trust-frame-tr" />
            <div className="trust-frame-bl" />
          </div>

          {/* Floating card — ISO badge */}
          <div className="trust-badge-card">
            <div className="trust-badge-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div>
              <div className="trust-badge-title">ISO Certifié</div>
              <div className="trust-badge-sub">Normes internationales</div>
            </div>
          </div>

          {/* Experience pill */}
          <div className="trust-exp-pill">
            <span className="trust-exp-num">10+</span>
            <span className="trust-exp-lbl">ans d'expertise</span>
          </div>

          {/* Small secondary image */}
          <div className="trust-img-sm">
            <img
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500&q=80"
              alt="Planification de chantier"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div className="trust-img-sm-overlay" />
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        /* ─── Section ──────────────────────── */
        .trust-section {
          background: #ffffff;
          padding: 10rem 0;
          position: relative;
          overflow: hidden;
        }
        .trust-bg-text {
          position: absolute;
          top: 50%; right: -3%;
          transform: translateY(-50%);
          font-family: var(--font-heading); font-weight: 900;
          font-size: clamp(10rem, 20vw, 20rem); line-height: 1;
          letter-spacing: -0.06em;
          color: transparent;
          -webkit-text-stroke: 1px rgba(0,0,0,0.032);
          user-select: none; pointer-events: none;
        }

        /* ─── Layout ───────────────────────── */
        .trust-layout {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 7rem;
          align-items: center;
          position: relative; z-index: 1;
        }

        /* ─── Eyebrow ──────────────────────── */
        .trust-eyebrow {
          display: flex; align-items: center; gap: 0.85rem;
          margin-bottom: 1.75rem;
        }
        .trust-eyebrow-line {
          width: 36px; height: 1.5px;
          background: var(--color-primary); flex-shrink: 0;
        }
        .trust-eyebrow span {
          font-size: 0.65rem; font-weight: 800;
          letter-spacing: 0.24em; text-transform: uppercase;
          color: var(--color-primary);
        }

        /* ─── Heading ──────────────────────── */
        .trust-heading {
          font-family: var(--font-heading); font-weight: 900;
          font-size: clamp(2.5rem, 4.5vw, 3.8rem);
          line-height: 1.04; letter-spacing: -0.035em;
          color: var(--color-secondary); margin-bottom: 1.75rem;
        }
        .trust-em {
          color: var(--color-primary); font-style: italic;
        }

        /* ─── Body text ────────────────────── */
        .trust-body {
          font-size: 0.975rem; line-height: 1.88;
          color: var(--color-text-muted);
        }

        /* ─── Points ───────────────────────── */
        .trust-points {
          list-style: none; display: flex; flex-direction: column;
          gap: 0.8rem; margin-bottom: 3.5rem;
        }
        .trust-point {
          display: flex; align-items: flex-start; gap: 1rem;
          padding: 1rem 1.3rem;
          border: 1px solid var(--color-border-light);
          border-radius: 8px;
          background: var(--color-bg-light);
          transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
        }
        .trust-point:hover {
          border-color: rgba(212,43,43,0.25);
          transform: translateX(5px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        }
        .trust-point-num {
          font-family: var(--font-heading); font-size: 0.62rem;
          font-weight: 900; color: var(--color-primary);
          letter-spacing: 0.08em; flex-shrink: 0; margin-top: 3px;
        }
        .trust-point-text {
          font-size: 0.855rem; color: var(--color-text-muted); line-height: 1.6;
        }

        /* ─── Stats ────────────────────────── */
        .trust-stats {
          display: flex; gap: 0;
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
          margin-bottom: 2.75rem;
        }
        .trust-stat {
          flex: 1; padding: 1.25rem 0.85rem;
          border-right: 1px solid var(--color-border); text-align: center;
        }
        .trust-stat:last-child { border-right: none; }
        .trust-stat-val {
          font-family: var(--font-heading); font-weight: 900;
          font-size: 1.7rem; line-height: 1; letter-spacing: -0.02em;
        }
        .trust-stat-lbl {
          font-size: 0.6rem; font-weight: 700;
          color: var(--color-text-muted); text-transform: uppercase;
          letter-spacing: 0.1em; margin-top: 0.38rem;
        }

        /* ─── CTA ──────────────────────────── */
        .trust-cta {
          display: inline-flex; align-items: center; gap: 0.7rem;
          padding: 1rem 2.2rem;
          background: var(--color-primary); color: white;
          border-radius: 2px; border: 1.5px solid var(--color-primary);
          font-family: var(--font-heading); font-size: 0.68rem;
          font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase;
          text-decoration: none; transition: all 0.3s;
          box-shadow: 0 8px 28px rgba(212,43,43,0.28);
        }
        .trust-cta:hover {
          background: var(--color-primary-dark);
          border-color: var(--color-primary-dark);
          transform: translateY(-3px);
          box-shadow: 0 16px 42px rgba(212,43,43,0.44);
        }

        /* ─── Image column ─────────────────── */
        .trust-img-col { position: relative; }
        .trust-img-wrap {
          border-radius: 16px; overflow: hidden;
          aspect-ratio: 4/5; position: relative;
        }
        .trust-img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          transition: transform 0.75s ease;
        }
        .trust-img-wrap:hover .trust-img { transform: scale(1.04); }
        .trust-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 55%);
        }
        .trust-frame-tr {
          position: absolute; top: -14px; right: -14px;
          width: 80px; height: 80px;
          border-top: 2.5px solid var(--color-primary);
          border-right: 2.5px solid var(--color-primary);
          border-radius: 0 10px 0 0; opacity: 0.6; pointer-events: none;
        }
        .trust-frame-bl {
          position: absolute; bottom: -14px; left: -14px;
          width: 80px; height: 80px;
          border-bottom: 2.5px solid var(--color-primary);
          border-left: 2.5px solid var(--color-primary);
          border-radius: 0 0 0 10px; opacity: 0.6; pointer-events: none;
        }

        /* ─── Badge card ───────────────────── */
        .trust-badge-card {
          position: absolute; bottom: 2.5rem; left: -2.5rem;
          background: white;
          border-radius: 12px; padding: 1rem 1.25rem;
          display: flex; align-items: center; gap: 0.85rem;
          box-shadow: 0 18px 52px rgba(0,0,0,0.18);
          border: 1px solid var(--color-border-light);
        }
        .trust-badge-icon {
          width: 44px; height: 44px; border-radius: 10px; flex-shrink: 0;
          background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
          display: flex; align-items: center; justify-content: center;
        }
        .trust-badge-title {
          font-family: var(--font-heading); font-weight: 900;
          font-size: 0.9rem; color: var(--color-secondary); line-height: 1;
        }
        .trust-badge-sub {
          font-size: 0.65rem; color: var(--color-text-muted); margin-top: 0.2rem;
        }

        /* ─── Experience pill ──────────────── */
        .trust-exp-pill {
          position: absolute; top: 2.5rem; right: -2rem;
          background: var(--color-secondary); color: white;
          padding: 0.8rem 1.4rem; border-radius: 100px;
          display: flex; align-items: center; gap: 0.55rem;
          box-shadow: 0 12px 38px rgba(0,0,0,0.38);
        }
        .trust-exp-num {
          font-family: var(--font-heading); font-weight: 900;
          font-size: 1.3rem; color: var(--color-primary); line-height: 1;
        }
        .trust-exp-lbl {
          font-size: 0.68rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.06em;
          color: rgba(255,255,255,0.65);
        }

        /* ─── Small image ──────────────────── */
        .trust-img-sm {
          position: absolute; top: -1.5rem; right: -2rem;
          width: 140px; height: 110px;
          border-radius: 10px; overflow: hidden;
          border: 3px solid white;
          box-shadow: 0 14px 40px rgba(0,0,0,0.22);
        }
        .trust-img-sm-overlay {
          position: absolute; inset: 0;
          background: rgba(212,43,43,0.15);
        }

        /* ─── Responsive ───────────────────── */
        @media (max-width: 1100px) {
          .trust-layout { grid-template-columns: 1fr; gap: 4rem; }
          .trust-img-col { display: none; }
        }
        @media (max-width: 600px) {
          .trust-section { padding: 6rem 0; }
          .trust-point { padding: 0.85rem 1rem; }
        }
      `}} />
    </section>
  );
}
