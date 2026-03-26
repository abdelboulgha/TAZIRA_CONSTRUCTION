'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const stepIcons = [
  <svg key="study" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>,
  <svg key="plan" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  <svg key="exec" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="2 20 22 12 2 4 2 20"/><line x1="22" y1="12" x2="14" y2="12"/></svg>,
  <svg key="deliver" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
];

export default function ProcessSection() {
  const { t, isRTL } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const steps = Object.entries(t.process.steps).map(([key, val], i) => ({
    key,
    number: i + 1,
    icon: stepIcons[i],
    ...val,
  }));

  return (
    <section className="section" ref={ref} style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span className="badge" style={{ marginBottom: '1rem' }}>{t.process.badge}</span>
          <h2 className="section-title">
            {t.process.title}{' '}
            <span className="highlight">{t.process.titleHighlight}</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
          position: 'relative',
        }}
        className="process-grid"
        >
          {/* Connector line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            style={{
              position: 'absolute',
              top: '44px',
              left: '15%',
              right: '15%',
              height: '2px',
              background: 'linear-gradient(90deg, var(--color-primary), rgba(212,43,43,0.2))',
              transformOrigin: isRTL ? 'right' : 'left',
              zIndex: 0,
            }}
            className="connector-line"
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 + 0.2 }}
              style={{
                textAlign: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {/* Step circle */}
              <div style={{
                width: '88px',
                height: '88px',
                borderRadius: '50%',
                background: i === 0 ? 'var(--color-primary)' : 'white',
                border: '2px solid',
                borderColor: i === 0 ? 'var(--color-primary)' : 'var(--color-border)',
                color: i === 0 ? 'white' : 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                boxShadow: i === 0 ? 'var(--shadow-red)' : 'var(--shadow-md)',
                transition: 'all 0.3s ease',
                flexDirection: 'column',
                gap: '2px',
              }}
              className="step-circle"
              >
                {step.icon}
              </div>

              {/* Step number */}
              <div style={{
                position: 'absolute',
                top: '-8px',
                right: isRTL ? 'auto' : 'calc(50% - 44px)',
                left: isRTL ? 'calc(50% - 44px)' : 'auto',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'var(--color-primary)',
                color: 'white',
                fontSize: '0.7rem',
                fontWeight: 800,
                fontFamily: 'var(--font-heading)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {step.number}
              </div>

              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '1.05rem',
                marginBottom: '0.5rem',
                color: 'var(--color-secondary)',
              }}>{step.title}</h3>

              <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'var(--color-text-muted)' }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .process-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .connector-line { display: none !important; }
        }
        @media (max-width: 480px) {
          .process-grid { grid-template-columns: 1fr !important; }
        }
        .step-circle:hover {
          background: var(--color-primary) !important;
          border-color: var(--color-primary) !important;
          color: white !important;
          box-shadow: var(--shadow-red) !important;
        }
      `}</style>
    </section>
  );
}
