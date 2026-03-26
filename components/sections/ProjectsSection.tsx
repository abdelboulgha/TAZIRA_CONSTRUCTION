'use client';

import { useRef, useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

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
  const { isRTL } = useLanguage();
  const ref       = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef   = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(headerRef.current,
          { y: 38, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: headerRef.current, start: 'top 82%', once: true } }
        );

        const cells = gridRef.current?.querySelectorAll('.proj-cell');
        if (cells) {
          gsap.fromTo(cells,
            { scale: 0.93, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.75, stagger: 0.1, ease: 'power3.out',
              scrollTrigger: { trigger: gridRef.current, start: 'top 75%', once: true } }
          );
        }
      });
    });
  }, []);

  return (
    <section ref={ref} style={{ background: '#f3f3f3', padding: '9rem 0', direction: isRTL ? 'rtl' : 'ltr' }}>
      <div className="container">

        {/* Header */}
        <div
          ref={headerRef}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4.5rem', flexWrap: 'wrap', gap: '1.5rem' }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <div style={{ width: '32px', height: '1.5px', background: 'var(--color-primary)' }} />
              <span style={{ color: 'var(--color-primary)', fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.24em', textTransform: 'uppercase' }}>
                Nos Réalisations
              </span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', lineHeight: 1.0, letterSpacing: '-0.035em', margin: 0, color: 'var(--color-secondary)' }}>
              Projets{' '}
              <span style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>réalisés</span>
            </h2>
          </div>

          <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', maxWidth: '300px', lineHeight: 1.75, margin: 0 }}>
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
                {/* Image */}
                <img
                  src={p.src}
                  alt={p.label}
                  className="proj-img"
                  style={{ transform: isActive ? 'scale(1.08)' : 'scale(1)' }}
                />

                {/* Base gradient */}
                <div className="proj-base-grad" />

                {/* Active overlay */}
                <div className="proj-active-overlay" style={{ opacity: isActive ? 1 : 0 }} />

                {/* Category + Year — top */}
                <div className="proj-top" style={{ [isRTL ? 'right' : 'left']: '1.25rem' }}>
                  <span className="proj-cat">{p.cat}</span>
                  <span className="proj-year">{p.year}</span>
                </div>

                {/* Label + location — bottom */}
                <div
                  className="proj-bottom"
                  style={{
                    [isRTL ? 'right' : 'left']: '1.25rem',
                    transform: isActive ? 'translateY(0)' : 'translateY(6px)',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div className="proj-label">{p.label}</div>
                    <div className="proj-location" style={{ opacity: isActive ? 1 : 0 }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" style={{ flexShrink: 0 }}>
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      {p.location}
                    </div>
                  </div>

                  {/* Arrow button */}
                  <div
                    className="proj-arrow"
                    style={{
                      transform: isActive ? 'scale(1)' : 'scale(0.4)',
                      opacity: isActive ? 1 : 0,
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                      <path d={isRTL ? 'M19 12H5M12 19l-7-7 7-7' : 'M5 12h14M12 5l7 7-7 7'}/>
                    </svg>
                  </div>
                </div>

                {/* Featured ribbon */}
                {p.featured && (
                  <div className="proj-featured">
                    <span>Projet phare</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .proj-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(2, 300px);
          gap: 12px;
        }
        .proj-cell {
          position: relative; border-radius: 12px; overflow: hidden;
          cursor: pointer;
        }
        .proj-img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 0.65s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .proj-base-grad {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%);
        }
        .proj-active-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%);
          transition: opacity 0.4s;
        }
        .proj-top {
          position: absolute; top: 1.1rem;
          display: flex; align-items: center; gap: 0.5rem;
          z-index: 2;
        }
        .proj-cat {
          background: rgba(255,255,255,0.12); backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2);
          color: white; padding: 0.28rem 0.72rem; border-radius: 100px;
          font-size: 0.62rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
        }
        .proj-year {
          font-size: 0.6rem; font-weight: 700; color: rgba(255,255,255,0.5);
          letter-spacing: 0.1em;
        }
        .proj-bottom {
          position: absolute; bottom: 1.25rem; right: 1.25rem;
          display: flex; align-items: flex-end; justify-content: space-between;
          gap: 0.75rem; z-index: 2;
          transition: transform 0.35s;
        }
        .proj-label {
          font-family: var(--font-heading); font-weight: 800;
          font-size: 1rem; color: white; line-height: 1.2;
          margin-bottom: 0.35rem;
        }
        .proj-location {
          display: flex; align-items: center; gap: 0.35rem;
          font-size: 0.7rem; color: rgba(255,255,255,0.55); font-weight: 500;
          transition: opacity 0.35s;
        }
        .proj-arrow {
          width: 38px; height: 38px; border-radius: 50%;
          background: var(--color-primary); flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 4px 18px rgba(212,43,43,0.5);
        }
        .proj-featured {
          position: absolute; top: 1rem; right: 1rem; z-index: 3;
          background: var(--color-primary);
          padding: 0.3rem 0.8rem; border-radius: 100px;
        }
        .proj-featured span {
          font-size: 0.6rem; font-weight: 800; color: white;
          letter-spacing: 0.1em; text-transform: uppercase;
        }
        @media (max-width: 960px) {
          .proj-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto;
            gap: 10px;
          }
          .proj-cell {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
            height: 220px;
          }
        }
        @media (max-width: 540px) {
          .proj-grid { grid-template-columns: 1fr; }
          .proj-cell { height: 200px; }
        }
      `}} />
    </section>
  );
}
