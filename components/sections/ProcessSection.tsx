'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const STEP_ICONS = [
  <svg key="s" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>,
  <svg key="p" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  <svg key="e" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="2 20 22 12 2 4 2 20"/><line x1="22" y1="12" x2="14" y2="12"/></svg>,
  <svg key="d" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
];

export default function ProcessSection() {
  const { t: _t, isRTL } = useLanguage();
  const t = _t as any;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const steps = Object.entries(t.process.steps as Record<string, { title: string; description: string }>).map(
    ([key, val], i) => ({ key, number: i + 1, icon: STEP_ICONS[i], ...val })
  );

  return (
    <section ref={ref} style={{ padding: '7rem 0', background: '#f8f8f8', direction: isRTL ? 'rtl' : 'ltr', overflow: 'hidden' }}>
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
            <div style={{ height: '1.5px', width: '40px', background: 'var(--color-primary)' }} />
            <span style={{ color: 'var(--color-primary)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{t.process.badge}</span>
            <div style={{ height: '1.5px', width: '40px', background: 'var(--color-primary)' }} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, color: 'var(--color-secondary)', letterSpacing: '-0.02em', margin: 0 }}>
            {t.process.title} <span style={{ color: 'var(--color-primary)' }}>{t.process.titleHighlight}</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0', position: 'relative' }} className="process-grid">
          {/* Connector */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute', top: '52px',
              left: '12.5%', right: '12.5%', height: '1px',
              background: 'var(--color-border)',
              transformOrigin: isRTL ? 'right' : 'left',
              zIndex: 0,
            }}
            className="process-connector"
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 + 0.3 }}
              style={{ textAlign: 'center', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}
            >
              {/* Circle */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                style={{
                  width: '104px', height: '104px', borderRadius: '50%',
                  background: i === 0 ? 'var(--color-primary)' : 'white',
                  border: i === 0 ? 'none' : '1.5px solid var(--color-border)',
                  color: i === 0 ? 'white' : 'var(--color-secondary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 2rem',
                  boxShadow: i === 0 ? '0 12px 40px rgba(212,43,43,0.3)' : '0 4px 20px rgba(0,0,0,0.06)',
                  cursor: 'default',
                  transition: 'all 0.3s',
                  position: 'relative',
                }}
              >
                {step.icon}
                {/* Step number badge */}
                <div style={{
                  position: 'absolute', top: '-6px', right: '-6px',
                  width: '26px', height: '26px', borderRadius: '50%',
                  background: i === 0 ? 'var(--color-secondary)' : 'var(--color-primary)',
                  color: 'white', fontSize: '0.7rem', fontWeight: 800,
                  fontFamily: 'var(--font-heading)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{step.number}</div>
              </motion.div>

              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-secondary)', marginBottom: '0.75rem' }}>
                {step.title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html:`
        @media(max-width:768px){
          .process-grid{grid-template-columns:repeat(2,1fr)!important;gap:2rem!important;}
          .process-connector{display:none!important;}
        }
        @media(max-width:480px){ .process-grid{grid-template-columns:1fr!important;} }
      `}}/>
    </section>
  );
}
