'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

function Counter({ target, active }: { target: number; active: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 2000;
    const step = (ts: number) => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - prog, 3);
      setVal(Math.floor(ease * target));
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
    { raw: t.stats.projects.value, label: t.stats.projects.label, num: 200, suffix: '+', prefix: '' },
    { raw: t.stats.years.value,    label: t.stats.years.label,    num: 10,  suffix: '+', prefix: '' },
    { raw: t.stats.availability.value, label: t.stats.availability.label, num: 24, suffix: 'H', prefix: '' },
    { raw: t.stats.clients.value,  label: t.stats.clients.label,  num: 150, suffix: '+', prefix: '' },
  ];

  return (
    <section ref={ref} style={{ position: 'relative', overflow: 'hidden', direction: isRTL ? 'rtl' : 'ltr' }}>
      {/* Background image with dark overlay */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=60)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(12,12,12,0.88)' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, padding: '5.5rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }} className="stats-grid">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              style={{
                textAlign: 'center', padding: '2rem 1rem',
                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              }}
              className="stat-item"
            >
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', lineHeight: 1, color: 'white', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--color-primary)' }}>{s.prefix}</span>
                <Counter target={s.num} active={inView} />
                <span style={{ color: 'var(--color-primary)' }}>{s.suffix}</span>
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html:`
        @media(max-width:768px){.stats-grid{grid-template-columns:repeat(2,1fr)!important;}.stat-item{border-right:none!important;border-bottom:1px solid rgba(255,255,255,0.08)!important;}}
      `}}/>
    </section>
  );
}
