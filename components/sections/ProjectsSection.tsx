'use client';

import { useRef, useState, useEffect } from 'react';

const PROJECTS = [
  {
    key: 'building',
    label: 'Immeuble Commercial',
    location: 'Casablanca, Maroc',
    cat: 'Construction',
    year: '2023',
    src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=90',
    col: 2, row: 2,
    featured: true,
  },
  {
    key: 'villa',
    label: 'Villa de Luxe',
    location: 'Rabat, Maroc',
    cat: 'Résidentiel',
    year: '2023',
    src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&q=85',
    col: 1, row: 1,
  },
  {
    key: 'electrical',
    label: 'Installation Industrielle',
    location: 'Tanger, Maroc',
    cat: 'Électricité',
    year: '2022',
    src: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=700&q=85',
    col: 1, row: 1,
  },
  {
    key: 'public',
    label: 'Infrastructure Publique',
    location: 'Agadir, Maroc',
    cat: 'Travaux Publics',
    year: '2022',
    src: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1100&q=85',
    col: 2, row: 1,
  },
  {
    key: 'luxury',
    label: 'Rénovation Résidence',
    location: 'Marrakech, Maroc',
    cat: 'Rénovation',
    year: '2023',
    src: 'https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?w=700&q=85',
    col: 1, row: 1,
  },
];

export default function ProjectsSection() {
  const ref       = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef   = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(headerRef.current,
          { y: 42, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: headerRef.current, start: 'top 82%', once: true } }
        );

        const cells = gridRef.current?.querySelectorAll('.proj-cell');
        if (cells) {
          gsap.fromTo(cells,
            { scale: 0.92, opacity: 0, y: 20 },
            {
              scale: 1, opacity: 1, y: 0,
              duration: 0.8, stagger: 0.1, ease: 'power3.out',
              scrollTrigger: { trigger: gridRef.current, start: 'top 72%', once: true }
            }
          );
        }
      });
    });
  }, []);

  return (
    <section ref={ref} className="proj-section">
      {/* Subtle noise overlay */}
      <div className="proj-noise" />

      <div className="container">

        {/* Header */}
        <div ref={headerRef} className="proj-header" style={{ opacity: 0 }}>
          <div>
            <div className="proj-eyebrow">
              <span>Nos Réalisations</span>
            </div>
            <h2 className="proj-heading">
              Projets{' '}
              <em className="proj-em">réalisés</em>
            </h2>
          </div>
          <div className="proj-header-right">
            <p className="proj-header-text">
              Plus de 200 projets livrés à travers tout le Maroc avec la plus haute exigence de qualité.
            </p>
          </div>
        </div>

        {/* Bento grid */}
        <div ref={gridRef} className="proj-grid">
          {PROJECTS.map((p) => {
            const isActive = hovered === p.key;
            return (
              <div
                key={p.key}
                className="proj-cell"
                onMouseEnter={() => setHovered(p.key)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  gridColumn: `span ${p.col}`,
                  gridRow: `span ${p.row}`,
                }}
              >
                <img
                  src={p.src}
                  alt={p.label}
                  className="proj-img"
                  style={{ transform: isActive ? 'scale(1.09)' : 'scale(1)' }}
                />
                <div className="proj-base-grad" />
                <div className="proj-active-overlay" style={{ opacity: isActive ? 1 : 0 }} />

                {/* Top: category + year */}
                <div className="proj-top">
                  <span className="proj-cat">{p.cat}</span>
                  <span className="proj-year">{p.year}</span>
                </div>

                {/* Bottom: label + arrow */}
                <div
                  className="proj-bottom"
                  style={{ transform: isActive ? 'translateY(0)' : 'translateY(8px)' }}
                >
                  <div className="proj-bottom-info">
                    <div className="proj-label">{p.label}</div>
                    <div className="proj-location" style={{ opacity: isActive ? 1 : 0 }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      {p.location}
                    </div>
                  </div>
                  <div
                    className="proj-arrow"
                    style={{
                      transform: isActive ? 'scale(1)' : 'scale(0.3)',
                      opacity: isActive ? 1 : 0,
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>

                {/* Featured */}
                {p.featured && (
                  <div className="proj-featured">
                    <span>Projet phare</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* View all link */}
        <div className="proj-footer">
          <a href="#" className="proj-view-all">
            Voir tous les projets
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .proj-section {
          background: var(--color-bg-gray);
          padding: 10rem 0;
          position: relative;
        }
        .proj-noise {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.6;
        }

        /* Header */
        .proj-header {
          display: flex; justify-content: space-between;
          align-items: flex-end; margin-bottom: 5rem;
          flex-wrap: wrap; gap: 1.5rem;
          position: relative; z-index: 1;
        }
        .proj-eyebrow {
          display: flex; align-items: center; gap: 0.85rem; margin-bottom: 1.25rem;
        }
.proj-eyebrow span {
          color: var(--color-primary); font-size: 0.65rem; font-weight: 800;
          letter-spacing: 0.24em; text-transform: uppercase;
        }
        .proj-heading {
          font-family: var(--font-heading); font-weight: 900;
          font-size: clamp(2.5rem, 5vw, 4rem);
          line-height: 1.0; letter-spacing: -0.04em; margin: 0;
          color: var(--color-secondary);
        }
        .proj-em { color: var(--color-primary); font-style: italic; }
        .proj-header-right { max-width: 300px; }
        .proj-header-text {
          font-size: 0.89rem; color: var(--color-text-muted);
          max-width: 300px; line-height: 1.78; margin: 0;
        }

        /* Grid */
        .proj-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(2, 320px);
          gap: 14px;
          position: relative; z-index: 1;
        }
        .proj-cell {
          position: relative; border-radius: 14px; overflow: hidden;
          cursor: pointer;
        }
        .proj-img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 0.7s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .proj-base-grad {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%);
        }
        .proj-active-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 60%, transparent 100%);
          transition: opacity 0.42s;
        }
        .proj-top {
          position: absolute; top: 1.1rem; left: 1.25rem;
          display: flex; align-items: center; gap: 0.5rem; z-index: 2;
        }
        .proj-cat {
          background: rgba(255,255,255,0.12); backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2);
          color: white; padding: 0.28rem 0.75rem; border-radius: 100px;
          font-size: 0.6rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
        }
        .proj-year {
          font-size: 0.6rem; font-weight: 700;
          color: rgba(255,255,255,0.45); letter-spacing: 0.1em;
        }
        .proj-bottom {
          position: absolute; bottom: 1.25rem; left: 1.25rem; right: 1.25rem;
          display: flex; align-items: flex-end; justify-content: space-between;
          gap: 0.75rem; z-index: 2;
          transition: transform 0.38s ease;
        }
        .proj-bottom-info { flex: 1; }
        .proj-label {
          font-family: var(--font-heading); font-weight: 800;
          font-size: 1.05rem; color: white; line-height: 1.2;
          margin-bottom: 0.38rem;
        }
        .proj-location {
          display: flex; align-items: center; gap: 0.38rem;
          font-size: 0.7rem; color: rgba(255,255,255,0.5); font-weight: 500;
          transition: opacity 0.38s;
        }
        .proj-arrow {
          width: 40px; height: 40px; border-radius: 50%;
          background: var(--color-primary); flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.42s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 5px 20px rgba(196,147,63,0.55);
        }
        .proj-featured {
          position: absolute; top: 1rem; right: 1rem; z-index: 3;
          background: var(--color-primary);
          padding: 0.3rem 0.8rem; border-radius: 100px;
        }
        .proj-featured span {
          font-size: 0.58rem; font-weight: 800; color: white;
          letter-spacing: 0.1em; text-transform: uppercase;
        }

        /* Footer */
        .proj-footer {
          display: flex; justify-content: center;
          margin-top: 4rem;
          position: relative; z-index: 1;
        }
        .proj-view-all {
          display: inline-flex; align-items: center; gap: 0.65rem;
          padding: 1rem 2.4rem;
          border: 1.5px solid var(--color-secondary);
          border-radius: 2px;
          font-family: var(--font-heading); font-size: 0.68rem;
          font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase;
          color: var(--color-secondary); text-decoration: none;
          transition: all 0.3s;
        }
        .proj-view-all:hover {
          background: var(--color-dark-surface); color: var(--color-text);
          transform: translateY(-3px);
          box-shadow: 0 14px 36px rgba(0,0,0,0.15);
        }

        @media (max-width: 960px) {
          .proj-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto; gap: 10px;
          }
          .proj-cell {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
            height: 230px;
          }
          .proj-section { padding: 6rem 0; }
        }
        @media (max-width: 540px) {
          .proj-grid { grid-template-columns: 1fr; }
          .proj-cell { height: 220px; }
        }
      `}} />
    </section>
  );
}
