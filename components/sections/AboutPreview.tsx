'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

/* ─── Image data ─────────────────────────────────────────────── */
const IMAGES = [
  { src: '/assets/image1.png', alt: 'Chantier au coucher du soleil' },
  { src: '/assets/image2.png', alt: 'Équipe sur chantier' },
  { src: '/assets/image3.png', alt: 'Matériel de construction' },
  { src: '/assets/image4.png', alt: 'Travaux en hauteur' },
  { src: '/assets/image5.png', alt: 'Opérateur sur chantier' },
  { src: '/assets/image6.png', alt: 'Travaux de terrassement' },
];

/* ─── Pillars ─────────────────────────────────────────────────── */
const PILLARS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    label: 'Qualité certifiée',
    desc: 'Processus rigoureux et matériaux premium.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: 'Délais respectés',
    desc: 'Planification précise, livraison ponctuelle.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    label: 'Expertise humaine',
    desc: 'Une équipe expérimentée et passionnée.',
  },
];

export default function AboutPreview() {
  const { isRTL } = useLanguage();

  const sectionRef   = useRef<HTMLElement>(null);
  const eyebrowRef   = useRef<HTMLDivElement>(null);
  const headlineRef  = useRef<HTMLHeadingElement>(null);
  const paraRef      = useRef<HTMLParagraphElement>(null);
  const pillarsRef   = useRef<HTMLDivElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const col1Ref      = useRef<HTMLDivElement>(null);
  const col2Ref      = useRef<HTMLDivElement>(null);
  const col3Ref      = useRef<HTMLDivElement>(null);
  const lineRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;
    (async () => {
      const gsapMod = await import('gsap');
      const stMod   = await import('gsap/ScrollTrigger');
      const gsap    = gsapMod.default || gsapMod.gsap;
      const ST      = stMod.ScrollTrigger || stMod.default;
      gsap.registerPlugin(ST);

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            once: true,
          },
        });

        /* eyebrow line */
        tl.fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.7, ease: 'power3.out' },
          0,
        );
        tl.fromTo(
          eyebrowRef.current,
          { opacity: 0, x: -18 },
          { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' },
          0.2,
        );

        /* headline word-by-word */
        tl.fromTo(
          headlineRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power4.out' },
          0.35,
        );

        /* paragraph */
        tl.fromTo(
          paraRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          0.55,
        );

        /* pillars stagger */
        const pillars = pillarsRef.current?.querySelectorAll('.about-pillar');
        if (pillars) {
          tl.fromTo(
            pillars,
            { opacity: 0, x: -24 },
            { opacity: 1, x: 0, stagger: 0.13, duration: 0.6, ease: 'power3.out' },
            0.7,
          );
        }

        /* cta */
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' },
          1.1,
        );

        /* image columns – clip-path reveal */
        const makeColTl = (el: HTMLDivElement | null, delay: number) => {
          if (!el) return;
          const imgs = el.querySelectorAll('.about-img-wrap');
          gsap.fromTo(
            imgs,
            { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              opacity: 1,
              stagger: 0.18,
              duration: 1,
              ease: 'power4.inOut',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                once: true,
              },
              delay,
            },
          );
          /* subtle parallax on scroll */
          imgs.forEach((img, i) => {
            gsap.to(img, {
              yPercent: i % 2 === 0 ? -6 : 6,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
              },
            });
          });
        };

        makeColTl(col1Ref.current, 0);
        makeColTl(col2Ref.current, 0.22);
        makeColTl(col3Ref.current, 0.44);
      }, sectionRef);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="about-root"
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      {/* ═══════════════════════════════════════════
          INNER WRAPPER
      ═══════════════════════════════════════════ */}
      <div className="about-inner">

        {/* ── LEFT: editorial text ── */}
        <div className="about-text-col">

          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <div
              ref={lineRef}
              style={{ width: 40, height: 2, background: 'var(--color-primary)', flexShrink: 0 }}
            />
            <span ref={eyebrowRef} className="about-eyebrow">
              À PROPOS DE NOUS
            </span>
          </div>

          {/* Headline */}
          <h2 ref={headlineRef} className="about-headline">
            Construire avec<br />
            <span style={{ color: 'var(--color-primary)' }}>précision</span>{' '}
            &amp; vision.
          </h2>

          {/* Body */}
          <p ref={paraRef} className="about-para">
            Depuis notre création, TAZIRA CONSTRUCTION SARL s&apos;impose comme
            un acteur incontournable du secteur du bâtiment en Algérie. Nous
            conjuguons expertise technique, rigueur et engagement humain pour
            réaliser des projets qui durent et qui marquent les territoires.
          </p>

          {/* Pillars */}
          <div ref={pillarsRef} className="about-pillars">
            {PILLARS.map((p) => (
              <div key={p.label} className="about-pillar">
                <div className="about-pillar-icon">{p.icon}</div>
                <div>
                  <div className="about-pillar-label">{p.label}</div>
                  <div className="about-pillar-desc">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>


        </div>

        {/* ── RIGHT: mosaic gallery ── */}
        <div className="about-gallery">

          {/* Column 1 — tall single image */}
          <div ref={col1Ref} className="about-col about-col-1">
            <div className="about-img-wrap about-img-tall">
              <img src={IMAGES[0].src} alt={IMAGES[0].alt} className="about-img" />
            </div>
          </div>

          {/* Column 2 — two images stacked (offset down) */}
          <div ref={col2Ref} className="about-col about-col-2">
            <div className="about-img-wrap about-img-medium">
              <img src={IMAGES[1].src} alt={IMAGES[1].alt} className="about-img" />
            </div>
            <div className="about-img-wrap about-img-medium">
              <img src={IMAGES[2].src} alt={IMAGES[2].alt} className="about-img" />
            </div>
          </div>

          {/* Column 3 — three compact images */}
          <div ref={col3Ref} className="about-col about-col-3">
            <div className="about-img-wrap about-img-compact">
              <img src={IMAGES[3].src} alt={IMAGES[3].alt} className="about-img" />
            </div>
            <div className="about-img-wrap about-img-compact">
              <img src={IMAGES[4].src} alt={IMAGES[4].alt} className="about-img" />
            </div>
            <div className="about-img-wrap about-img-compact">
              <img src={IMAGES[5].src} alt={IMAGES[5].alt} className="about-img" />
            </div>
          </div>
        </div>
      </div>

      {/* ─── Scoped styles ─────────────────────────────────────── */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Root */
        .about-root {
          background: #fff;
          padding: 7rem 0 3rem;
          overflow: hidden;
          position: relative;
        }
        .about-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(0,0,0,0.045) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
        }

        /* Inner layout */
        .about-inner {
          max-width: 1340px;
          margin: 0 auto;
          padding: 0 2.5rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }

        /* ── Left text col ── */
        .about-text-col {
          position: relative;
          z-index: 1;
        }
        .about-eyebrow {
          font-family: var(--font-heading);
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.26em;
          color: var(--color-primary);
          opacity: 0;
        }
        .about-headline {
          font-family: var(--font-heading);
          font-size: clamp(2.6rem, 4vw, 4rem);
          font-weight: 900;
          line-height: 1.06;
          letter-spacing: -0.03em;
          color: var(--color-secondary);
          margin-bottom: 1.75rem;
          opacity: 0;
        }
        .about-para {
          font-size: 0.97rem;
          line-height: 1.88;
          color: var(--color-text-muted);
          margin-bottom: 2.75rem;
          max-width: 480px;
          opacity: 0;
        }

        /* Pillars */
        .about-pillars {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          margin-bottom: 3rem;
        }
        .about-pillar {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          opacity: 0;
        }
        .about-pillar-icon {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: var(--color-primary-light);
          border: 1px solid rgba(212,43,43,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-primary);
          flex-shrink: 0;
        }
        .about-pillar-label {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.88rem;
          color: var(--color-secondary);
          letter-spacing: 0.01em;
          margin-bottom: 0.18rem;
        }
        .about-pillar-desc {
          font-size: 0.82rem;
          color: var(--color-text-muted);
          line-height: 1.55;
        }

        /* CTA */
        .about-cta {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
          opacity: 0;
        }
        .about-tel-link {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--color-secondary);
          letter-spacing: 0.04em;
          text-decoration: none;
          border-bottom: 1.5px solid var(--color-border);
          padding-bottom: 2px;
          transition: border-color 0.25s, color 0.25s;
        }
        .about-tel-link:hover {
          color: var(--color-primary);
          border-color: var(--color-primary);
        }

        /* ── Gallery ── */
        .about-gallery {
          display: grid;
          grid-template-columns: 1.1fr 1fr 0.9fr;
          gap: 12px;
          align-items: stretch;
          height: 620px;
        }
        .about-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .about-col-2 {
          margin-top: 48px;
        }
        .about-col-3 {
          margin-top: -32px;
        }

        /* Image wrappers */
        .about-img-wrap {
          border-radius: 6px;
          overflow: hidden;
          position: relative;
          clip-path: inset(100% 0% 0% 0%);
          opacity: 0;
          flex-shrink: 0;
        }
        .about-img-tall   { flex: 1; }
        .about-img-medium { flex: 1; }
        .about-img-compact { flex: 1; }

        .about-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .about-img-wrap:hover .about-img {
          transform: scale(1.05);
        }

        /* ── Responsive ── */
        @media (max-width: 1100px) {
          .about-inner {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
          .about-gallery {
            height: 420px;
          }
          .about-para { max-width: 100%; }
        }
        @media (max-width: 680px) {
          .about-root { padding: 5rem 0 6rem; }
          .about-inner { padding: 0 1.25rem; gap: 3rem; }
          .about-gallery {
            grid-template-columns: 1fr 1fr;
            height: 360px;
          }
          .about-col-3 { display: none; }
          .about-col-2 { margin-top: 28px; }
        }
      `}} />
    </section>
  );
}
