'use client';

import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

/* ── Animated counter hook ─────────────────────────────────── */
function useCounter(target: number, active: boolean, duration = 2.4) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const prog  = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - prog, 3);
      setVal(Math.round(eased * target));
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return val;
}

function StatItem({
  num, suffix, label, sublabel, active, delay,
}: {
  num: number; suffix: string; label: string; sublabel: string;
  active: boolean; delay: number;
}) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [active, delay]);
  const val = useCounter(num, show);

  return (
    <div className="stat-item">
      <div className="stat-num">
        {val}<span className="stat-suffix">{suffix}</span>
      </div>
      <div className="stat-divider" />
      <div className="stat-label">{label}</div>
      <div className="stat-sublabel">{sublabel}</div>
    </div>
  );
}

const STATS = [
  { num: 200, suffix: '+', label: 'Projets',     sublabel: 'Réalisés avec succès'   },
  { num: 10,  suffix: '+', label: 'Années',      sublabel: 'D\'expérience terrain'  },
  { num: 150, suffix: '+', label: 'Clients',     sublabel: 'Pleinement satisfaits'  },
  { num: 24,  suffix: 'H', label: 'Disponible',  sublabel: 'Service & assistance'   },
];

export default function StatsSection() {
  const { isRTL } = useLanguage();
  const ref       = useRef<HTMLElement>(null);
  const triggered = useRef(false);
  const bgImgRef  = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        ScrollTrigger.create({
          trigger: ref.current,
          start: 'top 72%',
          once: true,
          onEnter: () => {
            if (triggered.current) return;
            triggered.current = true;
            setActive(true);

            gsap.fromTo('.stats-headline',
              { y: 45, opacity: 0 },
              { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
            );
            gsap.fromTo('.stat-item',
              { y: 55, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, stagger: 0.13, ease: 'power3.out', delay: 0.25 }
            );
          },
        });

        /* Subtle parallax on background image */
        if (bgImgRef.current) {
          gsap.to(bgImgRef.current, {
            yPercent: 15,
            ease: 'none',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }
      });
    });
  }, []);

  return (
    <section
      ref={ref}
      style={{
        background: '#080808',
        padding: '9rem 0',
        direction: isRTL ? 'rtl' : 'ltr',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background construction image with parallax */}
      <div ref={bgImgRef} style={{ position: 'absolute', inset: '-15%', zIndex: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=60"
          alt=""
          aria-hidden="true"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
        />
      </div>

      {/* Dark overlay layers */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(8,8,8,0.97) 0%, rgba(8,8,8,0.88) 50%, rgba(8,8,8,0.97) 100%)',
      }} />

      {/* Red radial glows */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(ellipse 60% 50% at 15% 50%, rgba(212,43,43,0.08) 0%, transparent 100%), radial-gradient(ellipse 60% 50% at 85% 50%, rgba(212,43,43,0.06) 0%, transparent 100%)',
      }} />

      {/* Subtle grid lines */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.03, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        {/* Headline */}
        <div className="stats-headline" style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ height: '1px', width: '48px', background: 'rgba(212,43,43,0.5)' }} />
            <span style={{ color: 'var(--color-primary)', fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.26em', textTransform: 'uppercase' }}>
              Chiffres clés
            </span>
            <div style={{ height: '1px', width: '48px', background: 'rgba(212,43,43,0.5)' }} />
          </div>
          <h2 style={{
            fontFamily: 'var(--font-heading)', fontWeight: 900,
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            color: 'white', lineHeight: 1.04, letterSpacing: '-0.03em', margin: 0,
          }}>
            Des résultats qui{' '}
            <span style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>parlent</span>{' '}
            d&apos;eux-mêmes
          </h2>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          {STATS.map((s, i) => (
            <StatItem
              key={i}
              num={s.num}
              suffix={s.suffix}
              label={s.label}
              sublabel={s.sublabel}
              active={active}
              delay={i * 150}
            />
          ))}
        </div>

        {/* Bottom trust bar */}
        <div style={{ marginTop: '6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap' }}>
          {[
            'Entreprise certifiée',
            'Normes internationales',
            'Équipe d\'experts',
            'Garantie travaux',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.06em' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {item}
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          position: relative;
        }
        .stats-grid::before {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          left: 25%; right: 0;
          border-left: 1px solid rgba(255,255,255,0.05);
        }
        .stat-item {
          padding: 2.75rem 2rem;
          text-align: center;
          position: relative;
          opacity: 0;
          border-right: 1px solid rgba(255,255,255,0.05);
          transition: background 0.35s;
        }
        .stat-item:last-child { border-right: none; }
        .stat-item::before {
          content: '';
          position: absolute; top: 0; left: 50%; transform: translateX(-50%);
          width: 0; height: 2px; background: var(--color-primary);
          transition: width 0.5s ease;
        }
        .stat-item:hover { background: rgba(255,255,255,0.02); }
        .stat-item:hover::before { width: 60%; }
        .stat-num {
          font-family: var(--font-heading); font-weight: 900;
          font-size: clamp(3.2rem, 5.5vw, 5rem);
          color: white; line-height: 1;
          letter-spacing: -0.04em; margin-bottom: 0.85rem;
        }
        .stat-suffix { color: var(--color-primary); }
        .stat-divider {
          width: 28px; height: 1.5px;
          background: rgba(212,43,43,0.4);
          margin: 0 auto 0.85rem;
        }
        .stat-label {
          font-family: var(--font-heading); font-weight: 900;
          font-size: 0.82rem; color: rgba(255,255,255,0.7);
          text-transform: uppercase; letter-spacing: 0.15em;
          margin-bottom: 0.35rem;
        }
        .stat-sublabel {
          font-size: 0.7rem; font-weight: 500;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.04em;
        }
        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .stat-item:nth-child(2) { border-right: none; }
          .stat-item:nth-child(3) { border-top: 1px solid rgba(255,255,255,0.05); border-right: 1px solid rgba(255,255,255,0.05); }
          .stat-item:nth-child(4) { border-top: 1px solid rgba(255,255,255,0.05); }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr 1fr; }
          .stat-item { padding: 2rem 1rem; }
        }
      `}} />
    </section>
  );
}
