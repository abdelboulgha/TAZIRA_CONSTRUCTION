'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

function Counter({ target, active }: { target: number; active: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / 2000, 1);
      setVal(Math.floor((1 - Math.pow(1 - prog, 3)) * target));
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target]);
  return <>{val}</>;
}

export default function StatsSection() {
  const { t: _t, isRTL } = useLanguage();
  const t = _t as any;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const stats = [
    { label: t.stats.projects.label,     num: 200, suffix: '+' },
    { label: t.stats.years.label,        num: 10,  suffix: '+' },
    { label: t.stats.availability.label, num: 24,  suffix: 'H' },
    { label: t.stats.clients.label,      num: 150, suffix: '+' },
  ];

  return (
    <section ref={ref} style={{ background: '#f8f8f8', direction: isRTL ? 'rtl' : 'ltr' }}>
      <div className="container" style={{ padding: '5rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }} className="stats-grid">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              style={{
                textAlign: 'center', padding: '2.5rem 1rem',
                borderRight: i < 3 ? '1px solid var(--color-border)' : 'none',
                position: 'relative',
              }}
              className="stat-item"
            >
              {/* Red top accent line */}
              {i === 0 && (
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '32px', height: '3px', background: 'var(--color-primary)', borderRadius: '2px' }} />
              )}
              <div style={{
                fontFamily: 'var(--font-heading)', fontWeight: 900,
                fontSize: 'clamp(2.8rem, 5vw, 4.2rem)', lineHeight: 1,
                color: 'var(--color-secondary)', letterSpacing: '-0.025em',
                marginBottom: '0.5rem',
              }}>
                <Counter target={s.num} active={inView} />
                <span style={{ color: 'var(--color-primary)' }}>{s.suffix}</span>
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html:`
        @media(max-width:768px){
          .stats-grid{grid-template-columns:repeat(2,1fr)!important;}
          .stat-item{border-right:none!important;border-bottom:1px solid var(--color-border)!important;}
          .stat-item:nth-child(2n){border-right:none!important;}
          .stat-item:nth-child(odd){border-right:1px solid var(--color-border)!important;}
        }
      `}}/>
    </section>
  );
}
