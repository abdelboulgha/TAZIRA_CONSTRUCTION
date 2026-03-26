'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const ICONS: Record<string, JSX.Element> = {
  quality:    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  experience: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  team:       <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  deadline:   <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  support:    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82a19.79 19.79 0 01-3.07-8.64A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
  safety:     <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
};

export default function WhyUsSection() {
  const { t: _t, isRTL } = useLanguage();
  const t = _t as any;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const items = Object.entries(t.whyUs.items as Record<string, { title: string; description: string }>).map(
    ([key, val]) => ({ key, icon: ICONS[key], ...val })
  );

  return (
    <section ref={ref} style={{ direction: isRTL ? 'rtl' : 'ltr', background: 'var(--color-secondary)', overflow: 'hidden', position: 'relative' }}>
      {/* Subtle background texture */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(212,43,43,0.08) 0%, transparent 50%)', pointerEvents: 'none' }} />

      <div className="container" style={{ padding: '7rem 1.5rem', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '4.5rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
            <div style={{ height: '1.5px', width: '40px', background: 'var(--color-primary)' }} />
            <span style={{ color: 'var(--color-primary)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              {t.whyUs.badge}
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: '700px' }}>
            <span style={{ color: 'white' }}>{t.whyUs.title} </span>
            <span style={{ color: 'var(--color-primary)' }}>{t.whyUs.titleHighlight}</span>
          </h2>
        </motion.div>

        {/* 3×2 grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5px', background: 'rgba(255,255,255,0.06)' }} className="why-grid">
          {items.map((item, i) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              style={{
                padding: '2.5rem',
                background: 'rgba(255,255,255,0.03)',
                transition: 'background 0.3s',
                cursor: 'default',
              }}
              whileHover={{ background: 'rgba(255,255,255,0.07)' }}
            >
              {/* Icon */}
              <div style={{
                width: '54px', height: '54px', borderRadius: '12px',
                border: '1px solid rgba(212,43,43,0.35)',
                background: 'rgba(212,43,43,0.1)',
                color: 'var(--color-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1.5rem',
              }}>
                {item.icon}
              </div>

              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.05rem', color: 'white', marginBottom: '0.65rem' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65 }}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html:`
        @media(max-width:900px){.why-grid{grid-template-columns:repeat(2,1fr)!important;}}
        @media(max-width:540px){.why-grid{grid-template-columns:1fr!important;}}
      `}}/>
    </section>
  );
}
