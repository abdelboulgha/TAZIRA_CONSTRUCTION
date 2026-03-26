'use client';

import { useRef, useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const PROJECTS = [
  { key: 'building',   label: 'Immeuble Commercial',     cat: 'Construction',   src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=85',  col: 2, row: 2 },
  { key: 'villa',      label: 'Villa Résidentielle',      cat: 'Résidentiel',    src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&q=85',  col: 1, row: 1 },
  { key: 'electrical', label: 'Installation Électrique',  cat: 'Travaux Élec.',  src: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=700&q=85',  col: 1, row: 1 },
  { key: 'public',     label: 'Infrastructure Publique',  cat: 'Travaux Publics',src: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=900&q=85',  col: 2, row: 1 },
  { key: 'luxury',     label: 'Résidence de Luxe',        cat: 'Résidentiel',    src: 'https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?w=700&q=85', col: 1, row: 1 },
];

export default function ProjectsSection() {
  const { t: _t, isRTL } = useLanguage();
  const t = _t as any;
  const ref    = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(headerRef.current,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: headerRef.current, start: 'top 82%', once: true } }
        );

        const cells = gridRef.current?.querySelectorAll('.proj-cell');
        if (cells) {
          gsap.fromTo(cells,
            { scale: 0.94, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
              scrollTrigger: { trigger: gridRef.current, start: 'top 75%', once: true } }
          );
        }
      });
    });
  }, []);

  return (
    <section ref={ref} style={{ background: '#f7f7f7', padding: '8rem 0', direction: isRTL ? 'rtl' : 'ltr' }}>
      <div className="container">

        {/* Header */}
        <div ref={headerRef} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.1rem' }}>
              <div style={{ height: '2px', width: '40px', background: 'var(--color-primary)' }} />
              <span style={{ color: 'var(--color-primary)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                {t.projects.badge}
              </span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', lineHeight: 1.08, letterSpacing: '-0.025em', margin: 0 }}>
              <span style={{ color: 'var(--color-secondary)' }}>{t.projects.title} </span>
              <span style={{ color: 'var(--color-primary)' }}>{t.projects.titleHighlight}</span>
            </h2>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', maxWidth: '340px', lineHeight: 1.7, textAlign: isRTL ? 'right' : 'left' }}>
            {t.projects.subtitle}
          </p>
        </div>

        {/* Bento grid */}
        <div
          ref={gridRef}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gridTemplateRows: 'repeat(2,280px)', gap: '14px' }}
          className="proj-grid"
        >
          {PROJECTS.map((p) => {
            const isActive = hovered === p.key;
            return (
              <div
                key={p.key}
                className="proj-cell"
                onMouseEnter={() => setHovered(p.key)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: 'relative', borderRadius: '14px', overflow: 'hidden',
                  cursor: 'pointer',
                  gridColumn: `span ${p.col}`,
                  gridRow: `span ${p.row}`,
                }}
              >
                {/* Image */}
                <img
                  src={p.src}
                  alt={p.label}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover', display: 'block',
                    transition: 'transform 0.6s cubic-bezier(0.25,1,0.5,1)',
                    transform: isActive ? 'scale(1.07)' : 'scale(1)',
                  }}
                />

                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: isActive
                    ? 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 50%, transparent 100%)'
                    : 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)',
                  transition: 'background 0.4s',
                }} />

                {/* Category badge */}
                <div style={{
                  position: 'absolute', top: '1.1rem',
                  left: isRTL ? 'auto' : '1.1rem',
                  right: isRTL ? '1.1rem' : 'auto',
                  background: 'rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'white',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '100px',
                  fontSize: '0.65rem', fontWeight: 700,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  opacity: isActive ? 1 : 0.8,
                  transition: 'opacity 0.3s',
                }}>
                  {p.cat}
                </div>

                {/* Title + arrow */}
                <div style={{
                  position: 'absolute', bottom: '1.25rem',
                  left: isRTL ? 'auto' : '1.25rem',
                  right: isRTL ? '1.25rem' : 'auto',
                  width: 'calc(100% - 2.5rem)',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  transform: isActive ? 'translateY(0)' : 'translateY(4px)',
                  transition: 'transform 0.35s',
                }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.92rem', color: 'white', lineHeight: 1.3 }}>
                    {p.label}
                  </span>
                  <div style={{
                    width: '34px', height: '34px', borderRadius: '50%',
                    background: 'var(--color-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    transform: isActive ? 'scale(1)' : 'scale(0.5)',
                    opacity: isActive ? 1 : 0,
                    transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                      <path d={isRTL ? 'M19 12H5M12 19l-7-7 7-7' : 'M5 12h14M12 5l7 7-7 7'}/>
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media(max-width:900px){
          .proj-grid{ grid-template-columns:1fr 1fr !important; grid-template-rows:auto !important; }
          .proj-cell{ grid-column:span 1 !important; grid-row:span 1 !important; height:200px; }
        }
        @media(max-width:540px){
          .proj-grid{ grid-template-columns:1fr !important; }
          .proj-cell{ height:180px; }
        }
      `}} />
    </section>
  );
}
