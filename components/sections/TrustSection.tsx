'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const POINTS = [
  { text: 'Spécialisée dans les travaux de construction et d\'infrastructure au Maroc', num: '01' },
  { text: 'Conformité aux normes marocaines et internationales en vigueur',             num: '02' },
  { text: 'Solutions durables et techniques adaptées à chaque projet',                  num: '03' },
  { text: 'Équipe d\'ingénieurs et techniciens certifiés et expérimentés',              num: '04' },
];

export default function TrustSection() {
  const { t: _t, isRTL } = useLanguage();
  const t = _t as any;
  const sectionRef  = useRef<HTMLElement>(null);
  const textRef     = useRef<HTMLDivElement>(null);
  const imgRef      = useRef<HTMLDivElement>(null);
  const pointRefs   = useRef<(HTMLLIElement | null)[]>([]);
  const statsRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        const trigger = { trigger: sectionRef.current, start: 'top 72%', once: true };

        gsap.fromTo(textRef.current,
          { x: isRTL ? 70 : -70, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.1, ease: 'power3.out', scrollTrigger: trigger });

        gsap.fromTo(imgRef.current,
          { x: isRTL ? -70 : 70, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: trigger });

        pointRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.fromTo(el,
            { x: isRTL ? 30 : -30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.65, delay: 0.3 + i * 0.1, ease: 'power3.out',
              scrollTrigger: trigger });
        });

        gsap.fromTo(statsRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: 0.6, ease: 'power3.out',
            scrollTrigger: trigger });
      });
    });
  }, [isRTL]);

  return (
    <section
      ref={sectionRef}
      style={{ background: 'white', padding: '9rem 0', direction: isRTL ? 'rtl' : 'ltr', overflow: 'hidden' }}
    >
      <div className="container">
        <div className="trust-layout">

          {/* ── Text column ────────────────────────── */}
          <div ref={textRef} className="trust-text" style={{ opacity: 0 }}>

            {/* Eyebrow */}
            <div className="trust-eyebrow">
              <div className="trust-eyebrow-line" />
              <span>À PROPOS DE NOUS</span>
            </div>

            {/* Heading */}
            <h2 className="trust-heading">
              {t.aboutPreview.title}{' '}
              <span style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>
                {t.aboutPreview.titleHighlight}
              </span>
            </h2>

            {/* Body paragraphs */}
            <p className="trust-body">{t.aboutPreview.description}</p>
            <p className="trust-body" style={{ marginTop: '0.85rem', marginBottom: '2.75rem' }}>
              {t.aboutPreview.description2}
            </p>

            {/* Numbered key points */}
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

            {/* Mini stats row */}
            <div ref={statsRef} className="trust-stats" style={{ opacity: 0 }}>
              {[
                { value: '200+', label: t.aboutPreview.stats.projects },
                { value: '10+',  label: t.aboutPreview.stats.years    },
                { value: '150+', label: t.aboutPreview.stats.clients  },
              ].map((s, i) => (
                <div key={i} className="trust-stat">
                  <div className="trust-stat-val"
                    style={{ color: i === 0 ? 'var(--color-primary)' : 'var(--color-secondary)' }}>
                    {s.value}
                  </div>
                  <div className="trust-stat-lbl">{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link href="/about" className="trust-cta">
              {t.aboutPreview.learnMore}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d={isRTL ? 'M19 12H5M12 19l-7-7 7-7' : 'M5 12h14M12 5l7 7-7 7'}/>
              </svg>
            </Link>
          </div>

          {/* ── Image column ───────────────────────── */}
          <div ref={imgRef} className="trust-img-col" style={{ opacity: 0 }}>

            {/* Main image */}
            <div className="trust-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1541888081198-b80c102a9eb7?w=900&q=88"
                alt="Ingénieurs TAZIRA"
                className="trust-img"
              />
              {/* Gradient overlay */}
              <div className="trust-img-overlay" />
              {/* Red frame accent */}
              <div className="trust-img-frame" />
            </div>

            {/* Small secondary image */}
            <div className="trust-img-sm">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=80"
                alt="Chantier TAZIRA"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.28)' }} />
              <div className="trust-img-sm-badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '0.95rem', color: 'white', lineHeight: 1 }}>ISO</div>
                  <div style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Certifié</div>
                </div>
              </div>
            </div>

            {/* Experience pill */}
            <div className="trust-exp-pill">
              <span className="trust-exp-num">10+</span>
              <span className="trust-exp-lbl">ans d'expertise</span>
            </div>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .trust-layout {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 7rem;
          align-items: center;
        }
        .trust-eyebrow {
          display: flex; align-items: center; gap: 0.85rem;
          margin-bottom: 1.5rem;
        }
        .trust-eyebrow-line {
          width: 36px; height: 1.5px;
          background: var(--color-primary); flex-shrink: 0;
        }
        .trust-eyebrow span {
          font-size: 0.66rem; font-weight: 800;
          letter-spacing: 0.24em; text-transform: uppercase;
          color: var(--color-primary);
        }
        .trust-heading {
          font-family: var(--font-heading); font-weight: 900;
          font-size: clamp(2.4rem, 4.2vw, 3.6rem);
          line-height: 1.04; letter-spacing: -0.03em;
          color: var(--color-secondary); margin-bottom: 1.5rem;
        }
        .trust-body {
          font-size: 0.975rem; line-height: 1.85;
          color: var(--color-text-muted);
        }
        .trust-points {
          list-style: none; display: flex; flex-direction: column;
          gap: 0.85rem; margin-bottom: 3rem;
        }
        .trust-point {
          display: flex; align-items: flex-start; gap: 1rem;
          padding: 1rem 1.25rem;
          border: 1px solid var(--color-border-light);
          border-radius: 8px;
          background: var(--color-bg-light);
          transition: border-color 0.25s, transform 0.25s;
        }
        .trust-point:hover {
          border-color: rgba(212,43,43,0.2);
          transform: translateX(4px);
        }
        .trust-point-num {
          font-family: var(--font-heading); font-size: 0.65rem;
          font-weight: 900; color: var(--color-primary);
          letter-spacing: 0.08em; flex-shrink: 0;
          margin-top: 2px;
        }
        .trust-point-text {
          font-size: 0.86rem; color: var(--color-text-muted);
          line-height: 1.6;
        }
        .trust-stats {
          display: flex; gap: 0;
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
          margin-bottom: 2.5rem;
        }
        .trust-stat {
          flex: 1; padding: 1.15rem 0.75rem;
          border-right: 1px solid var(--color-border);
          text-align: center;
        }
        .trust-stat:last-child { border-right: none; }
        .trust-stat-val {
          font-family: var(--font-heading); font-weight: 900;
          font-size: 1.65rem; line-height: 1; letter-spacing: -0.02em;
        }
        .trust-stat-lbl {
          font-size: 0.62rem; font-weight: 700;
          color: var(--color-text-muted); text-transform: uppercase;
          letter-spacing: 0.1em; margin-top: 0.35rem;
        }
        .trust-cta {
          display: inline-flex; align-items: center; gap: 0.65rem;
          padding: 0.95rem 2.1rem;
          background: var(--color-primary); color: white;
          border-radius: 2px; border: 1.5px solid var(--color-primary);
          font-family: var(--font-heading); font-size: 0.7rem;
          font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase;
          text-decoration: none; transition: all 0.3s;
        }
        .trust-cta:hover {
          background: var(--color-primary-dark);
          border-color: var(--color-primary-dark);
          transform: translateY(-3px);
          box-shadow: 0 14px 36px rgba(212,43,43,0.4);
        }

        /* Image column */
        .trust-img-col { position: relative; }
        .trust-img-wrap {
          border-radius: 16px; overflow: hidden;
          aspect-ratio: 4/5; position: relative;
        }
        .trust-img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          transition: transform 0.7s ease;
        }
        .trust-img-wrap:hover .trust-img { transform: scale(1.04); }
        .trust-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 50%);
        }
        .trust-img-frame {
          position: absolute;
          top: -14px; right: -14px;
          width: 90px; height: 90px;
          border-top: 3px solid var(--color-primary);
          border-right: 3px solid var(--color-primary);
          border-radius: 0 10px 0 0;
          opacity: 0.5; pointer-events: none;
        }
        .trust-img-sm {
          position: absolute; bottom: -1.5rem; left: -2.5rem;
          width: 170px; height: 110px;
          border-radius: 12px; overflow: hidden;
          border: 3px solid white;
          box-shadow: 0 16px 48px rgba(0,0,0,0.18);
        }
        .trust-img-sm-badge {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          gap: 0.6rem;
          background: linear-gradient(135deg, rgba(212,43,43,0.85) 0%, rgba(176,31,31,0.9) 100%);
        }
        .trust-exp-pill {
          position: absolute; top: 2rem; right: -2rem;
          background: var(--color-secondary);
          color: white;
          padding: 0.75rem 1.35rem;
          border-radius: 100px;
          display: flex; align-items: center; gap: 0.5rem;
          box-shadow: 0 12px 32px rgba(0,0,0,0.35);
        }
        .trust-exp-num {
          font-family: var(--font-heading); font-weight: 900;
          font-size: 1.25rem; color: var(--color-primary); line-height: 1;
        }
        .trust-exp-lbl {
          font-size: 0.7rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.06em;
          color: rgba(255,255,255,0.7);
        }

        @media (max-width: 1024px) {
          .trust-layout { grid-template-columns: 1fr; gap: 4rem; }
          .trust-layout > div:last-child { display: none; }
        }
        @media (max-width: 600px) {
          .trust-point { padding: 0.85rem 1rem; }
        }
      `}} />
    </section>
  );
}
