'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

function useCounter(end: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, end, duration]);

  return count;
}

function StatCard({ value, label, suffix, index, active }: {
  value: string;
  label: string;
  suffix?: string;
  index: number;
  active: boolean;
}) {
  const numericValue = parseInt(value.replace(/\D/g, ''), 10);
  const count = useCounter(numericValue, 2, active);
  const prefix = value.match(/^[^0-9]+/)?.[0] || '';
  const displaySuffix = value.match(/[^0-9]+$/)?.[0] || (suffix || '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{
        textAlign: 'center',
        padding: '2.5rem 1.5rem',
        borderRight: index < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none',
      }}
      className="stat-card"
    >
      <div style={{
        fontFamily: 'var(--font-heading)',
        fontWeight: 900,
        fontSize: 'clamp(3rem, 5vw, 4.5rem)',
        color: 'white',
        lineHeight: 1,
        marginBottom: '0.5rem',
      }}>
        <span style={{ color: 'var(--color-primary)' }}>{prefix}</span>
        {count}
        <span style={{ color: 'var(--color-primary)' }}>{displaySuffix}</span>
      </div>
      <div style={{
        color: 'rgba(255,255,255,0.65)',
        fontSize: '0.9rem',
        fontWeight: 500,
        letterSpacing: '0.03em',
        textTransform: 'uppercase',
      }}>{label}</div>
    </motion.div>
  );
}

export default function StatsSection() {
  const { t, isRTL } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const stats = [
    t.stats.projects,
    t.stats.years,
    t.stats.availability,
    t.stats.clients,
  ];

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--color-secondary)',
        direction: isRTL ? 'rtl' : 'ltr',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=30)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.08,
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
        }}
        className="stats-grid"
        >
          {stats.map((stat, i) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              index={i}
              active={inView}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .stat-card {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.1) !important;
          }
        }
      `}</style>
    </section>
  );
}
