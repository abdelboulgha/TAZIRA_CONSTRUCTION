'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function HeroSection() {
  const { t, isRTL } = useLanguage();
  const d = t.hero;

  const taglineRef  = useRef<HTMLDivElement>(null);
  const line1Ref    = useRef<HTMLSpanElement>(null);
  const line2Ref    = useRef<HTMLSpanElement>(null);
  const leftColRef  = useRef<HTMLDivElement>(null);
  const cardsRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl
        .fromTo(taglineRef.current,
          { opacity: 0, y: -12 },
          { opacity: 1, y: 0, duration: 0.9 }, 0.3)
        .fromTo(line1Ref.current,
          { y: 130, opacity: 0, skewY: 4 },
          { y: 0, opacity: 1, skewY: 0, duration: 1.2 }, 0.5)
        .fromTo(line2Ref.current,
          { y: 130, opacity: 0, skewY: 4 },
          { y: 0, opacity: 1, skewY: 0, duration: 1.2 }, 0.68)
        .fromTo(leftColRef.current,
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 }, 1.0)
        .fromTo(cardsRef.current,
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 }, 1.1);
    });
  }, []);

  return (
    <section className="h-root" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>

      {/* ── Background image ───────────────── */}
      <div className="h-bg">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=90"
          alt=""
          aria-hidden="true"
          className="h-bg-img"
        />
        <div className="h-overlay" />
        <div className="h-overlay-left" />
        <div className="h-vgrid" aria-hidden="true">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-vgrid-line" />
          ))}
        </div>
      </div>

      {/* ── Content wrap ───────────────────── */}
      <div className="h-content">

        {/* ── Top tagline ─────────────────── */}
        <div ref={taglineRef} className="h-tagline" style={{ opacity: 0 }}>
          <div className="h-tagline-line" />
          <span>MARRAKECH · MAROC · TAZIRA CONSTRUCTION</span>
          <div className="h-tagline-line" />
        </div>

        {/* ── Giant title ─────────────────── */}
        <div className="h-title-block">
          <h1 className="h-title">
            <span className="h-line-wrap">
              <span ref={line1Ref} className="h-line h-line-solid">{d.line1}</span>
            </span>
            <span className="h-line-wrap">
              <span ref={line2Ref} className="h-line h-line-ghost">{d.line2}</span>
            </span>
          </h1>
        </div>

        {/* ── Bottom row ──────────────────── */}
        <div className="h-bottom">

          {/* Left: subtitle + buttons */}
          <div ref={leftColRef} className="h-left" style={{ opacity: 0 }}>
            <div className="h-subtitle-wrap">
              <div className="h-subtitle-border" />
              <p className="h-subtitle">{d.subtitle}</p>
            </div>

            <div className="h-ctas">
              <Link href="/contact" className="h-btn-solid">
                {d.cta}
              </Link>
              <Link href="/services" className="h-btn-outline">
                {d.ctaSecondary}
              </Link>
            </div>
          </div>

          {/* Right: service mini-cards */}
          <div ref={cardsRef} className="h-cards" style={{ opacity: 0 }}>
            {[
              {
                label: d.cards[0].label,
                sub: d.cards[0].sub,
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.8">
                    <rect x="3" y="9" width="18" height="13" rx="1"/>
                    <path d="M3 9l9-7 9 7"/>
                    <line x1="9" y1="22" x2="9" y2="13"/><line x1="15" y1="22" x2="15" y2="13"/>
                  </svg>
                ),
              },
              {
                label: d.cards[1].label,
                sub: d.cards[1].sub,
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.8">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                ),
              },
              {
                label: d.cards[2].label,
                sub: d.cards[2].sub,
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.8">
                    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
                  </svg>
                ),
              },
            ].map((card, i) => (
              <div key={i} className="h-card">
                <div className="h-card-icon">{card.icon}</div>
                <div className="h-card-label">{card.label}</div>
                <div className="h-card-sub">{card.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .h-root {
          position: relative;
          width: 100%; min-height: 100vh;
          overflow: hidden;
          display: flex; flex-direction: column; justify-content: flex-end;
        }
        .h-bg { position: absolute; inset: 0; z-index: 0; }
        .h-bg-img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center 25%;
        }
        .h-overlay {
          position: absolute; inset: 0;
          background: rgba(4,4,4,0.72);
        }
        .h-overlay-left {
          position: absolute; inset: 0;
          background: linear-gradient(105deg,
            rgba(4,4,4,0.92) 0%,
            rgba(4,4,4,0.65) 50%,
            transparent 100%);
        }
        .h-vgrid {
          position: absolute; inset: 0;
          display: flex; justify-content: space-between;
          pointer-events: none;
        }
        .h-vgrid-line {
          width: 1px; height: 100%;
          background: rgba(255,255,255,0.045);
        }
        .h-content {
          position: relative; z-index: 2;
          display: flex; flex-direction: column;
          justify-content: space-between;
          height: 100%;
          padding: calc(var(--navbar-height) + 3.5rem) 0 0;
        }
        .h-tagline {
          display: flex; align-items: center; gap: 1rem;
          padding: 0 4rem;
        }
        .h-tagline-line {
          height: 1px; width: 36px;
          background: rgba(21, 63, 101,0.6); flex-shrink: 0;
        }
        .h-tagline span {
          font-size: 0.58rem; font-weight: 700;
          letter-spacing: 0.26em; text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          white-space: nowrap;
        }
        .h-title-block {
          padding: 0 4rem;
          flex: 1;
          display: flex; align-items: center;
        }
        .h-title {
          font-family: var(--font-heading); font-weight: 900;
          font-size: clamp(4.5rem, 9.5vw, 9rem);
          line-height: 0.88; letter-spacing: -0.04em;
          text-transform: uppercase;
          margin: 0;
        }
        .h-line-wrap {
          display: block; overflow: hidden;
          padding: 0.04em 0;
        }
        .h-line { display: block; }
        .h-line-solid { color: #ffffff; }
        .h-line-ghost {
          color: transparent;
          -webkit-text-stroke: 2px rgba(255,255,255,0.35);
        }
        .h-bottom {
          display: flex; align-items: flex-end;
          justify-content: space-between;
          padding: 0 4rem 3.5rem;
          gap: 3rem;
        }
        .h-left { max-width: 400px; flex-shrink: 0; }
        .h-subtitle-wrap {
          display: flex; gap: 1.25rem;
          margin-bottom: 2.25rem;
        }
        .h-subtitle-border {
          width: 3px; border-radius: 2px; flex-shrink: 0;
          background: var(--color-primary);
          margin: 3px 0;
        }
        .h-subtitle {
          font-size: 0.92rem; line-height: 1.82;
          color: rgba(255,255,255,0.55);
          font-weight: 400;
        }
        .h-ctas {
          display: flex; gap: 0.9rem; flex-wrap: wrap;
        }
        .h-btn-solid {
          display: inline-flex; align-items: center;
          padding: 0.9rem 2rem;
          background: white; color: #080808;
          border-radius: 2px; border: 1.5px solid white;
          font-family: var(--font-heading); font-size: 0.65rem;
          font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase;
          text-decoration: none; transition: all 0.3s;
          white-space: nowrap;
        }
        .h-btn-solid:hover {
          background: var(--color-primary); border-color: var(--color-primary);
          color: white; transform: translateY(-3px);
          box-shadow: 0 16px 42px rgba(21, 63, 101,0.45);
        }
        .h-btn-outline {
          display: inline-flex; align-items: center;
          padding: 0.9rem 2rem;
          background: transparent; color: rgba(255,255,255,0.75);
          border-radius: 2px; border: 1.5px solid rgba(255,255,255,0.3);
          font-family: var(--font-heading); font-size: 0.65rem;
          font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase;
          text-decoration: none; transition: all 0.3s;
          white-space: nowrap;
        }
        .h-btn-outline:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.6);
          color: white; transform: translateY(-3px);
        }
        .h-cards {
          display: flex; gap: 1px;
          flex-shrink: 0;
        }
        .h-card {
          padding: 1.6rem 1.75rem;
          background: rgba(5,5,5,0.72);
          backdrop-filter: blur(20px) saturate(150%);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 2px;
          min-width: 160px;
          transition: background 0.3s, border-color 0.3s;
          cursor: default;
        }
        .h-card:hover {
          background: rgba(21, 63, 101,0.12);
          border-color: rgba(21, 63, 101,0.25);
        }
        .h-card-icon {
          margin-bottom: 0.85rem; opacity: 0.9;
        }
        .h-card-label {
          font-family: var(--font-heading); font-weight: 900;
          font-size: 0.78rem; color: white;
          letter-spacing: 0.08em; margin-bottom: 0.35rem;
        }
        .h-card-sub {
          font-size: 0.68rem; color: rgba(255,255,255,0.38);
          font-weight: 500;
        }
        @media (max-width: 1100px) {
          .h-title { font-size: clamp(3.5rem, 8vw, 6.5rem); }
          .h-cards { display: none; }
        }
        @media (max-width: 900px) {
          .h-root { min-height: auto; }
          .h-content { padding-top: calc(var(--navbar-height) + 2.5rem); }
          .h-tagline { padding: 0 2rem; }
          .h-title-block { padding: 0 2rem; margin: 3rem 0; flex: none; }
          .h-bottom { padding: 0 2rem 4rem; flex-direction: column; align-items: flex-start; }
          .h-left { max-width: 100%; }
        }
        @media (max-width: 600px) {
          .h-title { font-size: clamp(2rem, 9vw, 4.5rem); word-wrap: break-word; overflow-wrap: break-word; }
          .h-line-ghost { -webkit-text-stroke: 1.5px rgba(255,255,255,0.35); }
          .h-tagline { display: none; }
          .h-title-block { margin: 1.5rem 0 2.5rem; }
        }
      `}</style>
    </section>
  );
}
