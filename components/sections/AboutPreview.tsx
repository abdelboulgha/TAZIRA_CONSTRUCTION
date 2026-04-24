'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutPreview() {
  const { t, isRTL } = useLanguage();
  const d = t.aboutPreview;

  const sectionRef   = useRef<HTMLElement>(null);
  const eyebrowRef   = useRef<HTMLDivElement>(null);
  const headlineRef  = useRef<HTMLHeadingElement>(null);
  const paraRef      = useRef<HTMLParagraphElement>(null);
  const pillarsRef   = useRef<HTMLDivElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const lineRef      = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);

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

        /* video — clip-path reveal */
        gsap.fromTo(
          videoWrapRef.current,
          { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 1.1,
            ease: 'power4.inOut',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              once: true,
            },
            delay: 0.2,
          },
        );
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
          <div style={{ marginBottom: '2rem' }}>
            <span ref={eyebrowRef} className="about-eyebrow">
              {d.eyebrow}
            </span>
          </div>

          {/* Headline */}
          <h2 ref={headlineRef} className="about-headline">
            {d.headline}<br />
            <span style={{ color: 'var(--color-primary)' }}>{d.headlineHighlight}</span>{' '}
            {d.headlineSuffix}
          </h2>

          {/* Body */}
          <p ref={paraRef} className="about-para">{d.body}</p>

          {/* Pillars as small cards */}
          <div ref={pillarsRef} className="about-pillars">
            {d.pillars.map((p: { label: string; desc: string }) => (
              <div key={p.label} className="about-pillar">
                <div className="about-pillar-label">{p.label}</div>
                <div className="about-pillar-desc">{p.desc}</div>
              </div>
            ))}
          </div>

        </div>

        {/* ── RIGHT: reel player ── */}
        <div className="about-reel-outer">
          <div ref={videoWrapRef} className="about-reel-frame">
            <video
              className="about-video"
              src="/video/C0191.mp4"
              controls
              playsInline
              preload="metadata"
            />
          </div>
        </div>
      </div>

      {/* ─── Scoped styles ─────────────────────────────────────── */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Root */
        .about-root {
          background: var(--color-bg-light);
          padding: 7rem 0 3rem;
          overflow: hidden;
          position: relative;
        }
        .about-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px);
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
          color: var(--color-text);
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

        /* Pillars — small cards row */
        .about-pillars {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.85rem;
          margin-bottom: 0;
        }
        .about-pillar {
          background: var(--color-bg-gray);
          border-radius: 16px;
          padding: 1.25rem 1.1rem;
          opacity: 0;
          transition: box-shadow 0.25s, transform 0.25s;
        }
        .about-pillar:hover {
          box-shadow: 0 8px 28px rgba(0,0,0,0.07);
          transform: translateY(-3px);
        }
        .about-pillar-label {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--color-text);
          margin-bottom: 0.45rem;
          line-height: 1.25;
        }
        .about-pillar-desc {
          font-size: 0.78rem;
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
          color: var(--color-text);
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

        /* ── Reel ── */
        .about-reel-outer {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .about-reel-frame {
          width: 300px;
          aspect-ratio: 9 / 16;
          border-radius: 18px;
          overflow: hidden;
          background: #000;
          box-shadow: 0 24px 60px rgba(0,0,0,0.35);
          clip-path: inset(100% 0% 0% 0%);
          opacity: 0;
        }
        .about-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* ── Responsive ── */
        @media (max-width: 1100px) {
          .about-inner {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
          .about-reel-frame { width: 260px; }
          .about-para { max-width: 100%; }
        }
        @media (max-width: 680px) {
          .about-root { padding: 5rem 0 6rem; }
          .about-inner { padding: 0 1.25rem; gap: 3rem; }
          .about-reel-frame { width: 200px; border-radius: 12px; }
          .about-pillars { grid-template-columns: 1fr; gap: 1rem; }
          .about-headline { font-size: clamp(2.2rem, 8vw, 3rem); word-wrap: break-word; overflow-wrap: break-word; }
        }
      `}} />
    </section>
  );
}
