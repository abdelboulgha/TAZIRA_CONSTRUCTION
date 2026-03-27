'use client';

import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const STEP_KEYS = ['study', 'planning', 'execution', 'delivery'] as const;

export default function ProcessSection() {
  const { t, isRTL } = useLanguage();
  const d = t.process;
  const steps = STEP_KEYS.map((key, i) => ({
    num: `0${i + 1}`,
    title: (d.steps as any)[key].title,
    desc: (d.steps as any)[key].description,
  }));

  const sectionRef  = useRef<HTMLElement>(null);
  const activeRef   = useRef(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const scrolled = -top;
      const scrollable = height - window.innerHeight;
      if (scrolled < 0 || scrolled > scrollable) return;
      const progress = scrolled / scrollable;
      const step = Math.min(
        Math.floor(progress * STEP_KEYS.length),
        STEP_KEYS.length - 1,
      );
      if (step !== activeRef.current) {
        activeRef.current = step;
        setActive(step);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="proc-section" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <div className="proc-noise" />

      {/* Sticky wrapper — both columns stick inside the tall section */}
      <div className="proc-sticky">
        <div className="container proc-layout">

          {/* ── LEFT ── */}
          <div className="proc-left">
            <span className="proc-eyebrow">{d.eyebrow}</span>
            <h2 className="proc-heading">
              {d.heading}{' '}
              <em className="proc-em">{d.headingHighlight}</em>
              {d.headingSuffix}
            </h2>
            <p className="proc-subtext">{d.subtext}</p>

            {/* Dot indicators */}
            <div className="proc-dots">
              {steps.map((s, i) => (
                <div
                  key={s.num}
                  className={`proc-dot ${i === active ? 'proc-dot-active' : ''}`}
                />
              ))}
            </div>
          </div>

          {/* ── RIGHT: stacked steps ── */}
          <div className="proc-steps-wrap">
            {steps.map((step, i) => {
              const state =
                i === active ? 'active' :
                i < active  ? 'exit'   : 'enter';
              return (
                <div
                  key={step.num}
                  className={`proc-step proc-step--${state}`}
                >
                  <div className="proc-step-num">{step.num}</div>
                  <div className="proc-step-accent" />
                  <h3 className="proc-step-title">{step.title}</h3>
                  <p className="proc-step-desc">{step.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Section is tall — provides the scroll space */
        .proc-section {
          height: calc(${STEP_KEYS.length} * 100vh);
          background: var(--color-bg-light);
          position: relative;
        }
        .proc-noise {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        /* Sticky inner — sticks for the entire section scroll */
        .proc-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          z-index: 1;
          overflow: hidden;
        }

        /* Two columns */
        .proc-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8rem;
          align-items: center;
          width: 100%;
        }

        /* Left */
        .proc-left { display: flex; flex-direction: column; }
        .proc-eyebrow {
          font-size: 0.65rem; font-weight: 800;
          letter-spacing: 0.26em; text-transform: uppercase;
          color: var(--color-primary);
          margin-bottom: 1.75rem; display: block;
        }
        .proc-heading {
          font-family: var(--font-heading); font-weight: 900;
          font-size: clamp(2rem, 3vw, 3rem);
          line-height: 1.12; letter-spacing: -0.03em;
          color: var(--color-text); margin-bottom: 1.5rem;
        }
        .proc-em { color: var(--color-primary); font-style: italic; }
        .proc-subtext {
          font-size: 0.93rem; line-height: 1.82;
          color: var(--color-text-muted);
          max-width: 340px; margin-bottom: 3rem;
        }
        .proc-dots { display: flex; gap: 0.6rem; }
        .proc-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--color-border);
          transition: background 0.4s, transform 0.4s;
        }
        .proc-dot-active {
          background: var(--color-primary);
          transform: scale(1.5);
        }

        /* Steps container */
        .proc-steps-wrap {
          position: relative;
          height: 300px;
        }

        /* Base step */
        .proc-step {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          transition: opacity 0.55s cubic-bezier(0.25,0.46,0.45,0.94),
                      transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94);
          will-change: opacity, transform;
        }

        /* Entering — waiting below */
        .proc-step--enter {
          opacity: 0;
          transform: translateY(50px);
          pointer-events: none;
        }
        /* Active — fully visible */
        .proc-step--active {
          opacity: 1;
          transform: translateY(0);
        }
        /* Exiting — gone above */
        .proc-step--exit {
          opacity: 0;
          transform: translateY(-50px);
          pointer-events: none;
        }

        .proc-step-num {
          font-family: var(--font-heading); font-weight: 900;
          font-size: 5rem; line-height: 1;
          color: rgba(255,255,255,0.05);
          letter-spacing: -0.06em; margin-bottom: 1.25rem;
        }
        .proc-step-accent {
          width: 36px; height: 2px;
          background: var(--color-primary);
          margin-bottom: 1.25rem;
        }
        .proc-step-title {
          font-family: var(--font-heading); font-weight: 700;
          font-size: clamp(1.5rem, 2.5vw, 2rem);
          color: var(--color-text);
          line-height: 1.2; margin-bottom: 1rem;
        }
        .proc-step-desc {
          font-size: 0.95rem; line-height: 1.82;
          color: var(--color-text-muted); margin: 0;
          max-width: 400px;
        }

        /* Responsive — disable sticky, show all steps */
        @media (max-width: 900px) {
          .proc-section { height: auto; }
          .proc-sticky {
            position: static;
            height: auto;
            padding: 6rem 0;
          }
          .proc-layout { grid-template-columns: 1fr; gap: 3rem; }
          .proc-steps-wrap { position: static; height: auto; }
          .proc-step {
            position: static;
            opacity: 1 !important;
            transform: none !important;
            padding: 2rem 0;
            border-top: 1px solid var(--color-border);
          }
          .proc-step-num { font-size: 3rem; }
        }
      `}} />
    </section>
  );
}
