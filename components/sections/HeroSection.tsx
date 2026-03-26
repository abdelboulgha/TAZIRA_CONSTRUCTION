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
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);
  const scrollRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.fromTo(lineRef.current,    { scaleY: 0, transformOrigin: 'top center' }, { scaleY: 1, duration: 1.2 }, 0.2)
        .fromTo(badgeRef.current,   { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85 }, 0.6)
        .fromTo(titleRef.current,   { y: 65, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1 }, 0.85)
        .fromTo(subtitleRef.current,{ y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9  }, 1.25)
        .fromTo(ctaRef.current,     { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8  }, 1.55)
        .fromTo(scrollRef.current,  { opacity: 0 },        { opacity: 1, duration: 0.6         }, 2.0);
    });
  }, []);

  return (
    <section className="hero-root">

      {/* ── Background ──────────────────────────────── */}
      <div className="hero-bg">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=90"
          alt=""
          aria-hidden="true"
          className="hero-bg-img"
        />
        <div className="hero-overlay" />
        <div className="hero-red-line" />
      </div>

      {/* ── Spline 3D — right half ───────────────────── */}
      <div className="hero-spline" aria-hidden="true">
        <Spline scene="https://prod.spline.design/kZDDjO5HlviOnmd9/scene.splinecode" />
      </div>

      {/* ── Vertical accent bar ─────────────────────── */}
      <div ref={lineRef} className="hero-accent-bar" />

      {/* ── Text content ────────────────────────────── */}
      <div className="container hero-content">
        {/* Badge */}
        <div ref={badgeRef} className="hero-badge">
          <span className="hero-badge-dot" />
          Expert en Construction au Maroc
        </div>

        {/* Headline */}
        <h1 ref={titleRef} className="hero-title">
          Construire l&apos;avenir<br />
          avec <span className="hero-title-accent">précision</span><br />
          et excellence.
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
          <Link href="/services" className="hero-btn-ghost">
            Nos services
          </Link>
        </div>
      </div>

      {/* ── Stats bar ───────────────────────────────── */}
      <div className="hero-statsbar">
        <div className="container">
          <div className="hero-statsbar-grid">
            {[
              { num: '200+', label: 'Projets réalisés'      },
              { num: '10+',  label: "Années d'expérience"   },
              { num: '150+', label: 'Clients satisfaits'     },
              { num: '24h',  label: 'Disponibilité'          },
            ].map((s, i) => (
              <div key={i} className="hero-stat-item">
                <span className="hero-stat-num">{s.num}</span>
                <span className="hero-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ────────────────────────── */}
      <div ref={scrollRef} className={`hero-scroll${isRTL ? ' rtl' : ''}`} aria-hidden="true">
        <span className="hero-scroll-text">Défiler</span>
        <div className="hero-scroll-line" />
      </div>

      <style jsx>{`
        .hero-root {
          position: relative; height: 100vh; min-height: 720px;
          display: flex; align-items: center; overflow: hidden;
          direction: ${isRTL ? 'rtl' : 'ltr'};
        }

        /* Background */
        .hero-bg { position: absolute; inset: 0; z-index: 0; }
        .hero-bg-img { width: 100%; height: 100%; object-fit: cover; object-position: center 30%; }
        .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(100deg, rgba(6,6,6,0.95) 0%, rgba(6,6,6,0.83) 42%, rgba(6,6,6,0.28) 100%);
        }
        .hero-red-line {
          position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--color-primary) 0%, rgba(212,43,43,0.35) 55%, transparent 100%);
        }

        /* Spline */
        .hero-spline {
          position: absolute;
          ${isRTL ? 'left: 0;' : 'right: 0;'}
          top: 0; bottom: 0; width: 54%;
          z-index: 1; opacity: 0.5; pointer-events: none;
        }

        /* Vertical bar */
        .hero-accent-bar {
          position: absolute;
          ${isRTL ? 'right: 2.5rem;' : 'left: 2.5rem;'}
          top: 14%; bottom: 22%;
          width: 2px;
          background: linear-gradient(to bottom, transparent, var(--color-primary) 20%, var(--color-primary) 80%, transparent);
          z-index: 2;
        }

        /* Content */
        .hero-content { position: relative; z-index: 3; padding: 0 4rem; }

        /* Badge */
        .hero-badge {
          display: inline-flex; align-items: center; gap: 0.6rem;
          padding: 0.45rem 1.1rem;
          border: 1px solid rgba(212,43,43,0.42);
          border-radius: 100px;
          background: rgba(212,43,43,0.1);
          backdrop-filter: blur(8px);
          margin-bottom: 2rem;
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(255,255,255,0.85);
        }
        .hero-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--color-primary); flex-shrink: 0;
          box-shadow: 0 0 7px var(--color-primary);
          animation: pulse 2.2s ease-in-out infinite;
        }
        @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.4;} }

        /* Title */
        .hero-title {
          font-family: var(--font-heading); font-weight: 900;
          font-size: clamp(2.8rem, 5.5vw, 5rem);
          line-height: 1.04; letter-spacing: -0.03em;
          color: white; margin-bottom: 1.75rem;
        }
        .hero-title-accent { color: var(--color-primary); }

        /* Subtitle */
        .hero-subtitle {
          font-size: clamp(0.95rem, 1.4vw, 1.08rem);
          line-height: 1.8; color: rgba(255,255,255,0.58);
          margin-bottom: 2.75rem; max-width: 490px;
        }

        /* CTAs */
        .hero-ctas { display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; }
        .hero-btn-primary {
          display: inline-flex; align-items: center; gap: 0.6rem;
          padding: 0.95rem 2.1rem;
          background: var(--color-primary); color: white;
          border-radius: 4px; border: 2px solid var(--color-primary);
          font-family: var(--font-heading); font-size: 0.8rem;
          font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          text-decoration: none; transition: all 0.25s;
        }
        .hero-btn-primary:hover { background: var(--color-primary-dark); border-color: var(--color-primary-dark); transform: translateY(-2px); box-shadow: 0 14px 30px rgba(212,43,43,0.42); }
        .hero-btn-ghost {
          display: inline-flex; align-items: center; gap: 0.6rem;
          padding: 0.95rem 2.1rem;
          background: transparent; color: white;
          border-radius: 4px; border: 2px solid rgba(255,255,255,0.28);
          font-family: var(--font-heading); font-size: 0.8rem;
          font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
          text-decoration: none; transition: all 0.25s;
        }
        .hero-btn-ghost:hover { border-color: rgba(255,255,255,0.7); transform: translateY(-2px); }

        /* Stats bar */
        .hero-statsbar {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 3;
          background: rgba(0,0,0,0.52); backdrop-filter: blur(18px);
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .hero-statsbar-grid {
          display: grid; grid-template-columns: repeat(4,1fr);
          border-left: 1px solid rgba(255,255,255,0.06);
        }
        .hero-stat-item {
          padding: 1.1rem 1.5rem;
          border-right: 1px solid rgba(255,255,255,0.06);
          display: flex; align-items: center; gap: 0.85rem;
        }
        .hero-stat-num {
          font-family: var(--font-heading); font-weight: 900;
          font-size: 1.45rem; color: var(--color-primary); line-height: 1;
        }
        .hero-stat-label {
          font-size: 0.67rem; color: rgba(255,255,255,0.42);
          font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; line-height: 1.3;
        }

        /* Scroll indicator */
        .hero-scroll {
          position: absolute; bottom: 108px;
          right: 2.5rem;
          z-index: 3;
          display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
        }
        .hero-scroll.rtl { right: auto; left: 2.5rem; }
        .hero-scroll-text {
          font-size: 0.58rem; color: rgba(255,255,255,0.28);
          letter-spacing: 0.18em; text-transform: uppercase;
          writing-mode: vertical-rl;
        }
        .hero-scroll-line {
          width: 1px; height: 52px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.28), transparent);
          animation: scrollFade 2s ease-in-out infinite;
        }
        @keyframes scrollFade { 0%,100%{opacity:0.3;} 50%{opacity:0.9;} }

        /* Responsive */
        @media(max-width:768px){
          .hero-content{ padding: 0 1.5rem; }
          .hero-spline{ display: none; }
          .hero-accent-bar{ display: none; }
          .hero-statsbar-grid{ grid-template-columns: repeat(2,1fr); }
          .hero-stat-item:nth-child(3){ border-left: none; }
          .hero-scroll{ display: none; }
        }
        @media(max-width:480px){
          .hero-statsbar-grid{ grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </section>
  );
}
