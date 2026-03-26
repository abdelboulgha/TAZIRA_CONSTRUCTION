'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <div style={{ width: '100%', height: '100%' }} />,
});

export default function HeroSection() {
  const { isRTL } = useLanguage();
  const badgeRef    = useRef<HTMLDivElement>(null);
  const line1Ref    = useRef<HTMLSpanElement>(null);
  const line2Ref    = useRef<HTMLSpanElement>(null);
  const line3Ref    = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const accentBarRef = useRef<HTMLDivElement>(null);
  const scrollRef   = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const taglineRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl
        .fromTo(accentBarRef.current,
          { scaleY: 0, transformOrigin: 'top center' },
          { scaleY: 1, duration: 1.5 }, 0.1)
        .fromTo(taglineRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1 }, 0.4)
        .fromTo(badgeRef.current,
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 }, 0.5)
        .fromTo(line1Ref.current,
          { y: 110, opacity: 0, skewY: 4 },
          { y: 0, opacity: 1, skewY: 0, duration: 1.1 }, 0.65)
        .fromTo(line2Ref.current,
          { y: 110, opacity: 0, skewY: 4 },
          { y: 0, opacity: 1, skewY: 0, duration: 1.1 }, 0.78)
        .fromTo(line3Ref.current,
          { y: 110, opacity: 0, skewY: 4 },
          { y: 0, opacity: 1, skewY: 0, duration: 1.1 }, 0.91)
        .fromTo(subtitleRef.current,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 }, 1.35)
        .fromTo(ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 }, 1.62)
        .fromTo(statsRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7 }, 1.9)
        .fromTo(scrollRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 }, 2.15);
    });
  }, []);

  return (
    <section className="hero-root">

      {/* ── Background ─────────────────────────────── */}
      <div className="hero-bg">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=90"
          alt=""
          aria-hidden="true"
          className="hero-bg-img"
        />
        {/* Multi-layer gradient */}
        <div className="hero-gradient" />
        {/* Subtle grid texture */}
        <div className="hero-grid-tex" aria-hidden="true" />
        {/* Bottom red line */}
        <div className="hero-red-line" />
        {/* Warm ambient right */}
        <div className="hero-ambient" />
      </div>

      {/* ── Spline 3D ──────────────────────────────── */}
      <div className="hero-spline" aria-hidden="true">
        <Spline scene="https://prod.spline.design/kZDDjO5HlviOnmd9/scene.splinecode" />
      </div>

      {/* ── Vertical accent bar ────────────────────── */}
      <div ref={accentBarRef} className="hero-accent-bar" />

      {/* ── Side tagline (vertical text) ───────────── */}
      <div ref={taglineRef} className="hero-tagline" aria-hidden="true">
        <span>TAZIRA CONSTRUCTION SARL · MAROC · EST. 2010</span>
      </div>

      {/* ── Main content ───────────────────────────── */}
      <div className="container hero-content">

        {/* Badge */}
        <div ref={badgeRef} className="hero-badge">
          <span className="hero-badge-dot" />
          <span>Expert en Construction · Maroc</span>
          <div className="hero-badge-sep" />
          <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>Depuis 2010</span>
        </div>

        {/* Title — each line has overflow:hidden for clip-reveal */}
        <h1 className="hero-title">
          <span className="hero-line-wrap">
            <span ref={line1Ref} className="hero-line">CONSTRUIRE</span>
          </span>
          <span className="hero-line-wrap">
            <span ref={line2Ref} className="hero-line">L'AVENIR AVEC</span>
          </span>
          <span className="hero-line-wrap">
            <span ref={line3Ref} className="hero-line hero-line-accent">PRÉCISION.</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p ref={subtitleRef} className="hero-subtitle">
          TAZIRA CONSTRUCTION SARL est votre partenaire de confiance pour tous vos projets
          de construction, rénovation et travaux publics au Maroc.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="hero-ctas">
          <Link href="/contact" className="hero-btn-primary">
            Demander un devis
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
          <Link href="/contact" className="hero-btn-ghost">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82a19.79 19.79 0 01-3.07-8.64A2 2 0 012.18 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 8.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
            </svg>
            Nous contacter
          </Link>
        </div>
      </div>

      {/* ── Stats bar ──────────────────────────────── */}
      <div ref={statsRef} className="hero-statsbar">
        <div className="container">
          <div className="hero-statsbar-inner">
            {[
              { num: '200+', label: 'Projets réalisés',     icon: '🏗' },
              { num: '10+',  label: "Années d'expérience",  icon: '📅' },
              { num: '150+', label: 'Clients satisfaits',   icon: '✓'  },
              { num: '24h',  label: 'Disponibilité totale', icon: '⏱' },
            ].map((s, i) => (
              <div key={i} className="hero-stat">
                <div className="hero-stat-num">{s.num}</div>
                <div className="hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ───────────────────────── */}
      <div ref={scrollRef} className={`hero-scroll${isRTL ? ' rtl' : ''}`} aria-hidden="true">
        <span className="hero-scroll-text">Défiler</span>
        <div className="hero-scroll-line" />
      </div>

      <style jsx>{`
        /* ─── Root ─────────────────────────────────── */
        .hero-root {
          position: relative;
          height: 100vh; min-height: 740px;
          display: flex; align-items: center;
          overflow: hidden;
          direction: ${isRTL ? 'rtl' : 'ltr'};
        }

        /* ─── Background ───────────────────────────── */
        .hero-bg { position: absolute; inset: 0; z-index: 0; }

        .hero-bg-img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center 22%;
        }

        .hero-gradient {
          position: absolute; inset: 0;
          background:
            linear-gradient(108deg,
              rgba(5,5,5,0.97) 0%,
              rgba(5,5,5,0.90) 32%,
              rgba(5,5,5,0.50) 58%,
              rgba(5,5,5,0.08) 100%),
            linear-gradient(to bottom,
              rgba(0,0,0,0.18) 0%,
              transparent 30%,
              transparent 65%,
              rgba(0,0,0,0.42) 100%);
        }

        .hero-grid-tex {
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
          background-size: 72px 72px;
        }

        .hero-red-line {
          position: absolute; bottom: 0; left: 0; right: 0; height: 2px; z-index: 2;
          background: linear-gradient(90deg,
            var(--color-primary) 0%,
            rgba(212,43,43,0.35) 55%,
            transparent 100%);
        }

        .hero-ambient {
          position: absolute; z-index: 1;
          ${isRTL ? 'left: -10%;' : 'right: -10%;'}
          bottom: -20%; width: 55%; height: 65%;
          background: radial-gradient(ellipse at center,
            rgba(212,43,43,0.09) 0%,
            transparent 70%);
        }

        /* ─── Spline ───────────────────────────────── */
        .hero-spline {
          position: absolute;
          ${isRTL ? 'left: 0;' : 'right: 0;'}
          top: 0; bottom: 0; width: 52%;
          z-index: 2; opacity: 0.38; pointer-events: none;
        }

        /* ─── Accent bar ───────────────────────────── */
        .hero-accent-bar {
          position: absolute;
          ${isRTL ? 'right: 2.75rem;' : 'left: 2.75rem;'}
          top: 14%; bottom: 22%; width: 1.5px; z-index: 3;
          background: linear-gradient(to bottom,
            transparent,
            var(--color-primary) 18%,
            var(--color-primary) 82%,
            transparent);
        }

        /* ─── Vertical side tagline ────────────────── */
        .hero-tagline {
          position: absolute;
          ${isRTL ? 'left: 4.5rem;' : 'right: 4.5rem;'}
          top: 50%; transform: translateY(-50%);
          z-index: 3; opacity: 0; pointer-events: none;
        }
        .hero-tagline span {
          display: block;
          writing-mode: vertical-rl;
          font-size: 0.55rem; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(255,255,255,0.15);
        }

        /* ─── Content ──────────────────────────────── */
        .hero-content {
          position: relative; z-index: 4;
          padding-left: ${isRTL ? '2rem' : '5.5rem'};
          padding-right: ${isRTL ? '5.5rem' : '2rem'};
          margin-top: -2.5rem;
        }

        /* ─── Badge ────────────────────────────────── */
        .hero-badge {
          display: inline-flex; align-items: center; gap: 0.75rem;
          padding: 0.45rem 1.1rem;
          border: 1px solid rgba(212,43,43,0.38);
          border-radius: 2px;
          background: rgba(212,43,43,0.1);
          backdrop-filter: blur(10px);
          margin-bottom: 2.25rem;
          font-size: 0.65rem; font-weight: 800;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,255,255,0.78);
        }
        .hero-badge-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--color-primary); flex-shrink: 0;
          box-shadow: 0 0 8px var(--color-primary);
          animation: heroPulse 2.5s ease-in-out infinite;
        }
        @keyframes heroPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.8); }
        }
        .hero-badge-sep {
          width: 1px; height: 14px;
          background: rgba(255,255,255,0.18);
        }

        /* ─── Title ────────────────────────────────── */
        .hero-title {
          font-family: var(--font-heading); font-weight: 900;
          font-size: clamp(3.5rem, 7.5vw, 7rem);
          line-height: 0.92; letter-spacing: -0.04em;
          color: white; margin-bottom: 2.25rem;
          text-transform: uppercase;
        }
        /* Each line is a clip container */
        .hero-line-wrap {
          display: block; overflow: hidden;
          padding-bottom: 0.06em; /* prevent clipping descenders */
        }
        .hero-line {
          display: block;
          /* GSAP animates from y:110px to y:0 — clipped by parent overflow:hidden */
        }
        .hero-line-accent {
          color: var(--color-primary);
          font-style: italic;
        }

        /* ─── Subtitle ─────────────────────────────── */
        .hero-subtitle {
          font-size: clamp(0.88rem, 1.1vw, 1.02rem);
          line-height: 1.9; color: rgba(255,255,255,0.48);
          margin-bottom: 3rem; max-width: 450px;
          font-weight: 400; letter-spacing: 0.01em;
        }

        /* ─── CTAs ─────────────────────────────────── */
        .hero-ctas {
          display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;
        }

        .hero-btn-primary {
          display: inline-flex; align-items: center; gap: 0.65rem;
          padding: 1rem 2.3rem;
          background: var(--color-primary); color: white;
          border-radius: 2px; border: 1.5px solid var(--color-primary);
          font-family: var(--font-heading); font-size: 0.7rem;
          font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase;
          text-decoration: none; transition: all 0.3s;
        }
        .hero-btn-primary:hover {
          background: var(--color-primary-dark);
          border-color: var(--color-primary-dark);
          transform: translateY(-3px);
          box-shadow: 0 18px 48px rgba(212,43,43,0.48);
        }

        .hero-btn-ghost {
          display: inline-flex; align-items: center; gap: 0.65rem;
          padding: 1rem 2.1rem;
          background: transparent; color: rgba(255,255,255,0.8);
          border-radius: 2px; border: 1.5px solid rgba(255,255,255,0.18);
          font-family: var(--font-heading); font-size: 0.7rem;
          font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;
          text-decoration: none; transition: all 0.3s;
        }
        .hero-btn-ghost:hover {
          border-color: rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.06);
          transform: translateY(-3px);
        }

        /* ─── Stats bar ────────────────────────────── */
        .hero-statsbar {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 4;
          background: rgba(5,5,5,0.78);
          backdrop-filter: blur(24px) saturate(180%);
          border-top: 1px solid rgba(255,255,255,0.055);
        }
        .hero-statsbar-inner {
          display: grid; grid-template-columns: repeat(4,1fr);
        }
        .hero-stat {
          padding: 1.4rem 1.75rem;
          border-right: 1px solid rgba(255,255,255,0.05);
          display: flex; flex-direction: column; gap: 0.28rem;
          position: relative; overflow: hidden;
          transition: background 0.3s;
        }
        .hero-stat::before {
          content: '';
          position: absolute; top: 0; left: 0;
          width: 0; height: 2px;
          background: var(--color-primary);
          transition: width 0.45s ease;
        }
        .hero-stat:hover { background: rgba(212,43,43,0.06); }
        .hero-stat:hover::before { width: 100%; }
        .hero-stat-num {
          font-family: var(--font-heading); font-weight: 900;
          font-size: 1.65rem; color: white; line-height: 1;
          letter-spacing: -0.025em;
        }
        .hero-stat-label {
          font-size: 0.6rem; color: rgba(255,255,255,0.3);
          font-weight: 700; text-transform: uppercase; letter-spacing: 0.13em;
        }

        /* ─── Scroll indicator ─────────────────────── */
        .hero-scroll {
          position: absolute; bottom: 108px;
          right: 2.75rem; z-index: 4;
          display: flex; flex-direction: column; align-items: center; gap: 0.55rem;
        }
        .hero-scroll.rtl { right: auto; left: 2.75rem; }
        .hero-scroll-text {
          font-size: 0.54rem; color: rgba(255,255,255,0.2);
          letter-spacing: 0.22em; text-transform: uppercase;
          writing-mode: vertical-rl;
        }
        .hero-scroll-line {
          width: 1px; height: 48px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.22), transparent);
          animation: scrollDrop 2.4s ease-in-out infinite;
        }
        @keyframes scrollDrop {
          0%, 100% { opacity: 0.22; transform: scaleY(1); transform-origin: top; }
          50%       { opacity: 0.9;  transform: scaleY(1); }
        }

        /* ─── Responsive ───────────────────────────── */
        @media (max-width: 900px) {
          .hero-content {
            padding-left: 2rem;
            padding-right: 2rem;
          }
          .hero-spline { width: 50%; opacity: 0.25; }
          .hero-tagline { display: none; }
          .hero-title { font-size: clamp(3rem, 10vw, 4.5rem); }
        }
        @media (max-width: 768px) {
          .hero-spline { display: none; }
          .hero-accent-bar { display: none; }
          .hero-scroll { display: none; }
          .hero-statsbar-inner { grid-template-columns: repeat(2,1fr); }
          .hero-stat:nth-child(2) { border-right: none; }
          .hero-stat:nth-child(3) { border-right: 1px solid rgba(255,255,255,0.05); }
          .hero-stat:nth-child(4) { border-right: none; }
          .hero-stat { padding: 1rem 1.25rem; }
        }
        @media (max-width: 480px) {
          .hero-statsbar-inner { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </section>
  );
}
