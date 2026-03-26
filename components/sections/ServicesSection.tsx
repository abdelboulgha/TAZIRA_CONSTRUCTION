'use client';

import Link from 'next/link';
import { useRef, useEffect } from 'react';

/* ─── Services data ─────────────────────────────────────────── */
const SERVICES = [
  {
    num: '01',
    key: 'construction',
    title: 'Construction de bâtiments',
    desc: 'Conception et réalisation de bâtiments résidentiels, commerciaux et industriels selon les normes les plus strictes.',
    img: '/assets/image2.png',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
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
    img: '/assets/image5.png',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    num: '03',
    key: 'renovation',
    title: 'Rénovation & finition',
    desc: 'Rénovation complète et travaux de finition haut de gamme pour transformer et valoriser vos espaces.',
    img: '/assets/image4.png',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  },
  {
    num: '04',
    key: 'maintenance',
    title: 'Maintenance & dépannage',
    desc: 'Service de maintenance préventive et corrective avec intervention rapide garantie sous 24 heures.',
    img: '/assets/image6.png',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41M19.07 19.07l-1.41-1.41M6.34 6.34L4.93 4.93M21 12h-2M5 12H3M12 19v2M12 3V1"/>
      </svg>
    ),
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let ctx: any;

    (async () => {
      const gsapMod = await import('gsap');
      const stMod   = await import('gsap/ScrollTrigger');
      const gsap    = gsapMod.default || (gsapMod as any).gsap;
      const ST      = stMod.ScrollTrigger || (stMod as any).default;
      gsap.registerPlugin(ST);

      ctx = gsap.context(() => {
        /* ── Entry: header ── */
        gsap.fromTo(headerRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: headerRef.current, start: 'top 85%', once: true } }
        );

        /* ── Entry: cards stagger ── */
        gsap.fromTo(cardRefs.current,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 78%', once: true } }
        );

        /* ── Hover: horizontal accordion expand ── */
        const FLEX_ACTIVE   = 3.0;
        const FLEX_INACTIVE = 0.55;
        const FLEX_DEFAULT  = 1;

        cardRefs.current.forEach((card, idx) => {
          if (!card) return;

          const imgEl   = card.querySelector('.svc-img')       as HTMLElement;
          const numEl   = card.querySelector('.svc-num')       as HTMLElement;
          const iconEl  = card.querySelector('.svc-icon-wrap') as HTMLElement;
          const lineEl  = card.querySelector('.svc-line')      as HTMLElement;
          const descEl  = card.querySelector('.svc-desc')      as HTMLElement;
          const arrowEl = card.querySelector('.svc-arrow')     as HTMLElement;

          card.addEventListener('mouseenter', () => {
            /* Expand this card */
            gsap.to(card, { flexGrow: FLEX_ACTIVE, borderColor: 'rgba(212,43,43,0.2)', boxShadow: '0 20px 56px rgba(0,0,0,0.1)', duration: 0.52, ease: 'power3.inOut' });
            gsap.to(imgEl,    { opacity: 0.14, scale: 1.05, duration: 0.55, ease: 'power2.out' });
            gsap.to(numEl,    { color: 'rgba(212,43,43,0.14)', duration: 0.3 });
            gsap.to(iconEl,   { background: 'var(--color-primary)', color: '#fff', boxShadow: '0 10px 28px rgba(212,43,43,0.35)', duration: 0.35 });
            gsap.to(lineEl,   { width: '100%', duration: 0.52, ease: 'power3.inOut' });
            gsap.fromTo(descEl,  { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.38, delay: 0.18, ease: 'power3.out' });
            gsap.fromTo(arrowEl, { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.3,  delay: 0.25, ease: 'power3.out' });

            /* Compress other cards */
            cardRefs.current.forEach((other, oidx) => {
              if (!other || oidx === idx) return;
              gsap.to(other, { flexGrow: FLEX_INACTIVE, duration: 0.52, ease: 'power3.inOut' });
              const otherImg = other.querySelector('.svc-img') as HTMLElement;
              gsap.to(otherImg, { opacity: 0, duration: 0.3 });
            });
          });

          card.addEventListener('mouseleave', () => {
            /* Reset all */
            cardRefs.current.forEach((c) => {
              if (!c) return;
              gsap.to(c, { flexGrow: FLEX_DEFAULT, borderColor: 'var(--color-border-light)', boxShadow: 'none', duration: 0.48, ease: 'power3.inOut' });
            });
            gsap.to(imgEl,    { opacity: 0, scale: 1, duration: 0.4 });
            gsap.to(numEl,    { color: 'rgba(255,255,255,0.045)', duration: 0.3 });
            gsap.to(iconEl,   { background: 'rgba(212,43,43,0.07)', color: 'var(--color-primary)', boxShadow: 'none', duration: 0.35 });
            gsap.to(lineEl,   { width: '48px', duration: 0.45, ease: 'power3.inOut' });
            gsap.to(descEl,   { opacity: 0, y: 10, duration: 0.22 });
            gsap.to(arrowEl,  { opacity: 0, x: -8, duration: 0.18 });
          });
        });

      }, sectionRef);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section ref={sectionRef} className="svc2-section">

      {/* Subtle dot grid */}
      <div className="svc2-dots" aria-hidden="true" />

      <div className="container">

        {/* ── Header ── */}
        <div ref={headerRef} className="svc2-header" style={{ opacity: 0 }}>
          <div>
            <div className="svc2-eyebrow">
              <div className="svc2-eyeline" />
              <span>Nos Expertises</span>
            </div>
            <h2 className="svc2-heading">
              Services <em className="svc2-em">d&apos;excellence</em>
            </h2>
          </div>
          <Link href="/services" className="svc2-viewall">
            Voir tous les services
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        {/* ── Cards grid — 4 côte à côte ── */}
        <div ref={gridRef} className="svc2-grid">
          {SERVICES.map((svc, i) => (
            <div
              key={svc.key}
              ref={el => { cardRefs.current[i] = el; }}
              className="svc2-card"
              style={{ opacity: 0 }}
            >
              {/* Background image */}
              <div
                className="svc-img"
                style={{ backgroundImage: `url(${svc.img})`, opacity: 0 }}
              />

              {/* Top accent line */}
              <div className="svc-line" />

              {/* Big background number */}
              <div className="svc-num">{svc.num}</div>

              {/* Content */}
              <div className="svc2-inner">
                <div className="svc-icon-wrap">{svc.icon}</div>
                <h3 className="svc-title">{svc.title}</h3>
                <p className="svc-desc">{svc.desc}</p>
                <div className="svc-arrow">
                  <span>En savoir plus</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Styles ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Section */
        .svc2-section {
          background: var(--color-bg-light);
          padding: 4rem 0 9rem;
          position: relative;
          overflow: hidden;
        }
        .svc2-dots {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        /* Header */
        .svc2-header {
          display: flex; justify-content: space-between;
          align-items: flex-end; margin-bottom: 5rem;
          flex-wrap: wrap; gap: 1.5rem;
        }
        .svc2-eyebrow {
          display: flex; align-items: center; gap: 0.85rem; margin-bottom: 1.1rem;
        }
        .svc2-eyeline { width: 32px; height: 1.5px; background: var(--color-primary); }
        .svc2-eyebrow span {
          font-size: 0.65rem; font-weight: 800; letter-spacing: 0.24em;
          text-transform: uppercase; color: var(--color-primary);
        }
        .svc2-heading {
          font-family: var(--font-heading); font-weight: 900;
          font-size: clamp(2.2rem, 4.5vw, 3.8rem);
          line-height: 1.02; letter-spacing: -0.04em;
          color: var(--color-text); margin: 0;
        }
        .svc2-em { color: var(--color-primary); font-style: italic; }
        .svc2-viewall {
          display: flex; align-items: center; gap: 0.55rem;
          font-size: 0.68rem; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; text-decoration: none;
          color: var(--color-text-muted);
          border-bottom: 1px solid rgba(212,43,43,0.4);
          padding-bottom: 3px; transition: color 0.25s; white-space: nowrap;
        }
        .svc2-viewall:hover { color: var(--color-primary); }

        /* Grid — flexbox accordion */
        .svc2-grid {
          display: flex;
          gap: 12px;
          height: 400px;
        }

        /* Card */
        .svc2-card {
          flex: 1 1 0;
          position: relative;
          overflow: hidden;
          border-radius: 10px;
          border: 1px solid var(--color-border-light);
          background: var(--color-bg-light);
          cursor: default;
          will-change: flex-grow, box-shadow;
          min-width: 0;
        }

        /* bg image */
        .svc-img {
          position: absolute; inset: 0;
          background-size: cover; background-position: center;
          z-index: 0;
          transition: transform 0.55s ease;
          border-radius: 10px;
        }

        /* top line */
        .svc-line {
          position: absolute; top: 0; left: 0;
          height: 2.5px; width: 48px;
          background: var(--color-primary);
          z-index: 3;
          border-radius: 10px 10px 0 0;
        }

        /* big number */
        .svc-num {
          position: absolute; bottom: 1rem; right: 1.25rem;
          font-family: var(--font-heading); font-weight: 900;
          font-size: 5rem; line-height: 1; letter-spacing: -0.06em;
          color: rgba(255,255,255,0.045);
          user-select: none; pointer-events: none; z-index: 1;
          transition: color 0.35s;
        }

        /* Inner content */
        .svc2-inner {
          position: relative; z-index: 2;
          padding: 2.5rem 2rem 2rem;
          display: flex; flex-direction: column;
          height: 100%;
        }

        /* Icon */
        .svc-icon-wrap {
          width: 56px; height: 56px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(212,43,43,0.07);
          color: var(--color-primary);
          border: 1px solid rgba(212,43,43,0.15);
          margin-bottom: 1.75rem;
          flex-shrink: 0;
        }

        /* Title */
        .svc-title {
          font-family: var(--font-heading); font-weight: 800;
          font-size: 1.05rem; color: var(--color-secondary);
          line-height: 1.25; margin-bottom: 1rem;
        }

        /* Desc */
        .svc-desc {
          font-size: 0.83rem; color: var(--color-text-muted);
          line-height: 1.75; margin: 0; flex: 1;
          opacity: 0;
          transform: translateY(10px);
        }

        /* Arrow */
        .svc-arrow {
          margin-top: 1.5rem;
          display: flex; align-items: center; gap: 0.5rem;
          opacity: 0;
          transform: translateX(-8px);
        }
        .svc-arrow span {
          font-size: 0.67rem; font-weight: 700;
          letter-spacing: 0.13em; text-transform: uppercase;
          color: var(--color-primary);
        }

        /* Responsive */
        @media (max-width: 900px) {
          .svc2-grid { flex-direction: column; height: auto; }
          .svc2-card { min-height: 180px; flex-grow: 1 !important; }
        }
        @media (max-width: 640px) {
          .svc2-section { padding: 6rem 0; }
        }
      `}} />
    </section>
  );
}
