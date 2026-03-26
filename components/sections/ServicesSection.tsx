'use client';

import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';

const SERVICES = [
  {
    num: '01',
    key: 'construction',
    title: 'Construction de bâtiments',
    desc: 'Conception et réalisation de bâtiments résidentiels, commerciaux et industriels selon les normes les plus strictes.',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=85',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    num: '02',
    key: 'electrical',
    title: 'Travaux électriques',
    desc: 'Installation, mise en conformité et maintenance de systèmes électriques pour tous types de bâtiments.',
    img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=900&q=85',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    num: '03',
    key: 'renovation',
    title: 'Rénovation & finition',
    desc: 'Rénovation complète et travaux de finition haut de gamme pour transformer et valoriser vos espaces.',
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=85',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  },
  {
    num: '04',
    key: 'maintenance',
    title: 'Maintenance & dépannage',
    desc: 'Service de maintenance préventive et corrective avec intervention rapide garantie sous 24 heures.',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=85',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41M19.07 19.07l-1.41-1.41M6.34 6.34L4.93 4.93M21 12h-2M5 12H3M12 19v2M12 3V1"/>
      </svg>
    ),
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(headerRef.current,
          { y: 45, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: headerRef.current, start: 'top 82%', once: true } }
        );

        cardRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.fromTo(el,
            { y: 70, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.85, delay: i * 0.13, ease: 'power3.out',
              scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', once: true } }
          );
        });
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="svc-section"
    >
      {/* Background dot pattern */}
      <div className="svc-dots" />
      {/* Red ambient glow */}
      <div className="svc-glow" />

      <div className="container svc-container">

        {/* Header */}
        <div ref={headerRef} className="svc-header" style={{ opacity: 0 }}>
          <div>
            <div className="svc-eyebrow">
              <div className="svc-eyebrow-line" />
              <span>Nos Expertises</span>
            </div>
            <h2 className="svc-heading">
              Services{' '}
              <em className="svc-em">d&apos;excellence</em>
            </h2>
          </div>
          <Link href="/services" className="svc-view-all">
            Voir tous les services
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        {/* Cards */}
        <div className="svc-grid">
          {SERVICES.map((svc, i) => {
            const isActive = hovered === svc.key;
            return (
              <div
                key={svc.key}
                ref={el => { cardRefs.current[i] = el; }}
                className="svc-card"
                onMouseEnter={() => setHovered(svc.key)}
                onMouseLeave={() => setHovered(null)}
                style={{ opacity: 0 }}
              >
                {/* Image bg */}
                <div
                  className="svc-card-bg"
                  style={{
                    backgroundImage: `url(${svc.img})`,
                    opacity: isActive ? 0.12 : 0,
                    transform: isActive ? 'scale(1.05)' : 'scale(1)',
                  }}
                />
                {/* Light overlay */}
                <div className="svc-card-overlay" style={{
                  background: isActive
                    ? 'linear-gradient(to top, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.6) 55%, rgba(255,255,255,0.1) 100%)'
                    : 'none',
                }} />
                {/* Top accent line */}
                <div className="svc-topline" style={{ width: isActive ? '100%' : '48px' }} />

                {/* Content */}
                <div className="svc-inner">
                  {/* Large background number */}
                  <div className="svc-bg-num" style={{ color: isActive ? 'rgba(212,43,43,0.12)' : 'rgba(0,0,0,0.04)' }}>
                    {svc.num}
                  </div>

                  {/* Icon box */}
                  <div className="svc-icon-box" style={{
                    background: isActive ? 'var(--color-primary)' : 'rgba(212,43,43,0.07)',
                    color: isActive ? 'white' : 'var(--color-primary)',
                    border: `1px solid ${isActive ? 'transparent' : 'rgba(212,43,43,0.15)'}`,
                    boxShadow: isActive ? '0 10px 32px rgba(212,43,43,0.35)' : 'none',
                  }}>
                    {svc.icon}
                  </div>

                  <h3 className="svc-title">{svc.title}</h3>
                  <p className="svc-desc">{svc.desc}</p>

                  {/* Arrow link */}
                  <div className="svc-link" style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0)' : 'translateY(8px)',
                  }}>
                    <span>En savoir plus</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        /* ─── Section ─── */
        .svc-section {
          background: #ffffff;
          padding: 10rem 0;
          position: relative; overflow: hidden;
        }
        .svc-dots {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(0,0,0,0.045) 1px, transparent 1px);
          background-size: 30px 30px;
        }
        .svc-glow {
          position: absolute; top: 40%; left: 50%; transform: translate(-50%,-50%);
          width: 80%; height: 60%; z-index: 0; pointer-events: none;
          background: radial-gradient(ellipse at center, rgba(212,43,43,0.05) 0%, transparent 70%);
        }
        .svc-container { position: relative; z-index: 1; }

        /* ─── Header ─── */
        .svc-header {
          display: flex; justify-content: space-between; align-items: flex-end;
          margin-bottom: 5.5rem; flex-wrap: wrap; gap: 2rem;
        }
        .svc-eyebrow {
          display: flex; align-items: center; gap: 0.85rem; margin-bottom: 1.25rem;
        }
        .svc-eyebrow-line { width: 32px; height: 1.5px; background: var(--color-primary); }
        .svc-eyebrow span {
          color: var(--color-primary); font-size: 0.65rem; font-weight: 800;
          letter-spacing: 0.24em; text-transform: uppercase;
        }
        .svc-heading {
          font-family: var(--font-heading); font-weight: 900;
          font-size: clamp(2.5rem, 5vw, 4rem);
          line-height: 1.0; letter-spacing: -0.04em; margin: 0;
          color: var(--color-secondary);
        }
        .svc-em { color: var(--color-primary); font-style: italic; }
        .svc-view-all {
          display: flex; align-items: center; gap: 0.55rem;
          color: var(--color-text-muted); font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase; text-decoration: none;
          border-bottom: 1px solid rgba(212,43,43,0.45); padding-bottom: 3px;
          transition: color 0.25s;
          white-space: nowrap;
        }
        .svc-view-all:hover { color: var(--color-primary); }

        /* ─── Cards grid ─── */
        .svc-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .svc-card {
          position: relative; overflow: hidden;
          min-height: 400px; cursor: default;
          border-radius: 8px;
          border: 1px solid var(--color-border-light);
          background: var(--color-bg-light);
          transition: transform 0.38s ease, box-shadow 0.38s ease;
        }
        .svc-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.1);
        }
        .svc-card-bg {
          position: absolute; inset: 0;
          background-size: cover; background-position: center;
          transition: opacity 0.55s ease, transform 0.7s ease;
          z-index: 0; border-radius: 8px;
        }
        .svc-card-overlay {
          position: absolute; inset: 0; z-index: 1;
          transition: background 0.45s ease; border-radius: 8px;
        }
        .svc-topline {
          position: absolute; top: 0; left: 0; height: 2px;
          background: var(--color-primary); z-index: 3;
          transition: width 0.55s cubic-bezier(0.25,1,0.5,1);
          border-radius: 8px 8px 0 0;
        }
        .svc-inner {
          position: relative; z-index: 2;
          padding: 3rem 2.75rem;
        }
        .svc-bg-num {
          position: absolute; top: 1.5rem; right: 2rem;
          font-family: var(--font-heading); font-weight: 900;
          font-size: 4rem; line-height: 1; letter-spacing: -0.06em;
          user-select: none; transition: color 0.4s; pointer-events: none;
        }
        .svc-icon-box {
          width: 62px; height: 62px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 2rem; transition: all 0.38s;
        }
        .svc-title {
          font-family: var(--font-heading); font-weight: 800;
          font-size: 1.2rem; color: var(--color-secondary);
          margin-bottom: 1rem; line-height: 1.2;
        }
        .svc-desc {
          font-size: 0.86rem; color: var(--color-text-muted);
          line-height: 1.78; margin: 0; max-width: 380px;
        }
        .svc-link {
          margin-top: 2.25rem; display: flex; align-items: center; gap: 0.55rem;
          transition: all 0.38s;
        }
        .svc-link span {
          font-size: 0.68rem; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--color-primary);
        }
        @media (max-width: 768px) {
          .svc-grid { grid-template-columns: 1fr; }
          .svc-card { min-height: 320px; }
          .svc-section { padding: 6rem 0; }
        }
      `}} />
    </section>
  );
}
