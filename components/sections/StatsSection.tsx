'use client';

import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

function useCounter(target: number, active: boolean, duration = 2.2) {
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
    <div className="stt-item">
      <div className="stt-num">
        {val}<span className="stt-suffix">{suffix}</span>
      </div>
      <div className="stt-bar" />
      <div className="stt-label">{label}</div>
      <div className="stt-sublabel">{sublabel}</div>
    </div>
  );
}

export default function StatsSection() {
  const { t, isRTL } = useLanguage();
  const d = t.stats;

  const STATS = [
    { num: 200, suffix: '+', label: d.projects.label,      sublabel: d.projects.value      },
    { num: 10,  suffix: '+', label: d.years.label,         sublabel: d.years.value         },
    { num: 150, suffix: '+', label: d.clients.label,       sublabel: d.clients.value       },
    { num: 24,  suffix: isRTL ? '/7' : 'H', label: d.availability.label, sublabel: d.availability.value },
  ];

  const ref       = useRef<HTMLElement>(null);
  const bgImgRef  = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);
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
            gsap.fromTo('.stt-headline',
              { y: 50, opacity: 0 },
              { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
            );
            gsap.fromTo('.stt-item',
              { y: 60, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.85, stagger: 0.14, ease: 'power3.out', delay: 0.3 }
            );
            gsap.fromTo('.stt-trust-bar',
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, delay: 0.9, ease: 'power3.out' }
            );
          },
        });

        if (bgImgRef.current) {
          gsap.to(bgImgRef.current, {
            yPercent: 18,
            ease: 'none',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          });
        }
      });
    });
  }, []);

  return (
    <section ref={ref} className="stt-section" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>

      {/* Parallax background */}
      <div ref={bgImgRef} className="stt-parallax">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=60"
          alt=""
          aria-hidden="true"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
        />
      </div>

      {/* Overlays */}
      <div className="stt-overlay-dark" />
      <div className="stt-overlay-glow" />
      <div className="stt-grid-lines" />

      <div className="container stt-content">

        {/* Headline */}
        <div className="stt-headline" style={{ opacity: 0 }}>
          <div className="stt-headline-eyebrow">
            <span>{d.eyebrow}</span>
          </div>
          <h2 className="stt-headline-title">
            {d.heading}{' '}
            <em className="stt-em">{d.headingHighlight}</em>{' '}
            {d.headingSuffix}
          </h2>
          <p className="stt-headline-sub">{d.subtitle}</p>
        </div>

        {/* Stats */}
        <div className="stt-grid">
          {STATS.map((s, i) => (
            <StatItem
              key={i}
              num={s.num}
              suffix={s.suffix}
              label={s.label}
              sublabel={s.sublabel}
              active={active}
              delay={i * 160}
            />
          ))}
        </div>

        {/* Trust bar */}
        <div className="stt-trust-bar" style={{ opacity: 0 }}>
          {d.trustItems.map((item, i) => (
            <div key={i} className="stt-trust-item">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {item}
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .stt-section {
          background: #060606;
          padding: 10rem 0;
          position: relative; overflow: hidden;
        }
        .stt-parallax {
          position: absolute; inset: -18%; z-index: 0;
        }
        .stt-overlay-dark {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(to bottom,
            rgba(6,6,6,0.97) 0%,
            rgba(6,6,6,0.88) 50%,
            rgba(6,6,6,0.97) 100%);
        }
        .stt-overlay-glow {
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background-image:
            radial-gradient(ellipse 65% 55% at 15% 50%, rgba(196,147,63,0.09) 0%, transparent 100%),
            radial-gradient(ellipse 65% 55% at 85% 50%, rgba(196,147,63,0.06) 0%, transparent 100%);
        }
        .stt-grid-lines {
          position: absolute; inset: 0; z-index: 1; opacity: 0.028; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px);
          background-size: 80px 80px;
        }
        .stt-content {
          position: relative; z-index: 2;
        }

        /* Headline */
        .stt-headline {
          text-align: center; margin-bottom: 6.5rem;
        }
        .stt-headline-eyebrow {
          display: flex; align-items: center; justify-content: center;
          gap: 1rem; margin-bottom: 1.75rem;
        }
.stt-headline-eyebrow span {
          color: var(--color-primary); font-size: 0.65rem;
          font-weight: 800; letter-spacing: 0.26em; text-transform: uppercase;
        }
        .stt-headline-title {
          font-family: var(--font-heading); font-weight: 900;
          font-size: clamp(2.6rem, 5.5vw, 4.4rem);
          color: white; line-height: 1.04; letter-spacing: -0.035em;
          margin: 0 auto 1.25rem; max-width: 680px;
        }
        .stt-em { color: var(--color-primary); font-style: italic; }
        .stt-headline-sub {
          font-size: 0.96rem; color: rgba(255,255,255,0.32);
          line-height: 1.8; max-width: 440px; margin: 0 auto;
        }

        /* Stats grid */
        .stt-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 16px; overflow: hidden;
          margin-bottom: 5rem;
          background: rgba(255,255,255,0.02);
        }
        .stt-item {
          padding: 3.25rem 2rem;
          text-align: center;
          position: relative; opacity: 0;
          border-right: 1px solid rgba(255,255,255,0.05);
          transition: background 0.35s;
        }
        .stt-item:last-child { border-right: none; }
        .stt-item::before {
          content: '';
          position: absolute; top: 0; left: 50%;
          transform: translateX(-50%);
          width: 0; height: 2px;
          background: var(--color-primary);
          transition: width 0.5s ease;
        }
        .stt-item:hover { background: rgba(255,255,255,0.028); }
        .stt-item:hover::before { width: 65%; }
        .stt-num {
          font-family: var(--font-heading); font-weight: 900;
          font-size: clamp(3.5rem, 5.5vw, 5.2rem);
          color: white; line-height: 1;
          letter-spacing: -0.045em; margin-bottom: 1rem;
        }
        .stt-suffix { color: var(--color-primary); }
        .stt-bar {
          width: 28px; height: 1.5px;
          background: rgba(196,147,63,0.45);
          margin: 0 auto 0.9rem;
        }
        .stt-label {
          font-family: var(--font-heading); font-weight: 900;
          font-size: 0.78rem; color: rgba(255,255,255,0.65);
          text-transform: uppercase; letter-spacing: 0.16em; margin-bottom: 0.4rem;
        }
        .stt-sublabel {
          font-size: 0.68rem; font-weight: 500;
          color: rgba(255,255,255,0.22); letter-spacing: 0.04em;
        }

        /* Trust bar */
        .stt-trust-bar {
          display: flex; align-items: center; justify-content: center;
          gap: 2.5rem; flex-wrap: wrap;
        }
        .stt-trust-item {
          display: flex; align-items: center; gap: 0.5rem;
          color: rgba(255,255,255,0.28); font-size: 0.72rem;
          font-weight: 600; letter-spacing: 0.06em;
        }

        @media (max-width: 900px) {
          .stt-grid { grid-template-columns: repeat(2, 1fr); border-radius: 12px; }
          .stt-item:nth-child(2) { border-right: none; }
          .stt-item:nth-child(3) {
            border-top: 1px solid rgba(255,255,255,0.05);
            border-right: 1px solid rgba(255,255,255,0.05);
          }
          .stt-item:nth-child(4) { border-top: 1px solid rgba(255,255,255,0.05); }
          .stt-section { padding: 6rem 0; }
        }
        @media (max-width: 480px) {
          .stt-item { padding: 2rem 1rem; }
        }
      `}} />
    </section>
  );
}
