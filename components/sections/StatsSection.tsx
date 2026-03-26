'use client';

import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

function useGsapCounter(target: number, active: boolean, duration = 2.2) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - prog, 3);
      setVal(Math.round(eased * target));
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return val;
}

function StatCounter({ num, suffix, label, active, delay }: { num: number; suffix: string; label: string; active: boolean; delay: number }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [active, delay]);
  const val = useGsapCounter(num, show);

  return (
    <div className="stat-block">
      <div className="stat-num">
        {val}<span className="stat-suffix">{suffix}</span>
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

const STATS = [
  { num: 200, suffix: '+', label: 'Projets réalisés'       },
  { num: 10,  suffix: '+', label: "Années d'expérience"    },
  { num: 150, suffix: '+', label: 'Clients satisfaits'      },
  { num: 24,  suffix: 'H', label: 'Disponibilité totale'   },
];

export default function StatsSection() {
  const { isRTL } = useLanguage();
  const ref    = useRef<HTMLElement>(null);
  const active = useRef(false);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        ScrollTrigger.create({
          trigger: ref.current,
          start: 'top 75%',
          once: true,
          onEnter: () => {
            if (active.current) return;
            active.current = true;
            setTriggered(true);

            // Animate text elements
            gsap.fromTo('.stats-headline',
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
            );
            gsap.fromTo('.stat-block',
              { y: 50, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.75, stagger: 0.14, ease: 'power3.out', delay: 0.3 }
            );
          },
        });
      });
    });
  }, []);

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--color-secondary)',
        padding: '8rem 0',
        direction: isRTL ? 'rtl' : 'ltr',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background texture */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(212,43,43,0.07) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(212,43,43,0.05) 0%, transparent 50%)',
      }} />
      {/* Grid lines */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, opacity: 0.04,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Headline */}
        <div className="stats-headline" style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.85rem', marginBottom: '1.1rem' }}>
            <div style={{ height: '1px', width: '40px', background: 'rgba(212,43,43,0.6)' }} />
            <span style={{ color: 'var(--color-primary)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
              Nos chiffres clés
            </span>
            <div style={{ height: '1px', width: '40px', background: 'rgba(212,43,43,0.6)' }} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'white', lineHeight: 1.1, letterSpacing: '-0.025em', margin: 0 }}>
            Des résultats qui parlent{' '}
            <span style={{ color: 'var(--color-primary)' }}>d&apos;eux-mêmes</span>
          </h2>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderLeft: '1px solid rgba(255,255,255,0.07)' }} className="stats-row">
          {STATS.map((s, i) => (
            <StatCounter key={i} num={s.num} suffix={s.suffix} label={s.label} active={triggered} delay={i * 140} />
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .stat-block {
          padding: 2.5rem 2rem;
          border-right: 1px solid rgba(255,255,255,0.07);
          text-align: center;
          opacity: 0;
        }
        .stat-num {
          font-family: var(--font-heading);
          font-weight: 900;
          font-size: clamp(3rem, 5vw, 4.5rem);
          color: white;
          line-height: 1;
          letter-spacing: -0.03em;
          margin-bottom: 0.6rem;
        }
        .stat-suffix { color: var(--color-primary); }
        .stat-label {
          font-size: 0.75rem; font-weight: 700;
          color: rgba(255,255,255,0.38);
          text-transform: uppercase; letter-spacing: 0.14em;
          line-height: 1.4;
        }
        @media(max-width:768px){
          .stats-row { grid-template-columns: repeat(2,1fr) !important; border-left: none !important; }
          .stat-block { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.07) !important; }
          .stat-block:nth-child(odd) { border-right: 1px solid rgba(255,255,255,0.07) !important; }
        }
        @media(max-width:480px){
          .stats-row{ grid-template-columns: 1fr 1fr !important; }
        }
      `}} />
    </section>
  );
}
