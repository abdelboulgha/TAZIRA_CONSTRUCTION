'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutPreview() {
  const { t: _t, isRTL } = useLanguage();
  const t = _t as any;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const img2Y = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);

  const stats = [
    { value: '200+', label: t.aboutPreview.stats.projects },
    { value: '10+', label: t.aboutPreview.stats.years },
    { value: '150+', label: t.aboutPreview.stats.clients },
    { value: '50+', label: t.aboutPreview.stats.team },
  ];

  return (
    <section ref={ref} style={{ padding: '7rem 0', background: 'white', overflow: 'hidden', direction: isRTL ? 'rtl' : 'ltr' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }} className="about-grid">

          {/* === Images === */}
          <div style={{ position: 'relative', minHeight: '580px' }}>
            {/* Main image */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute', top: 0, left: 0,
                width: '75%', aspectRatio: '3/4',
                borderRadius: '20px', overflow: 'hidden',
                boxShadow: '0 30px 80px rgba(0,0,0,0.15)',
                y: imgY,
              }}
            >
              <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=700&q=85" alt="TAZIRA project"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>

            {/* Accent image */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute', bottom: '0%',
                right: isRTL ? 'auto' : 0, left: isRTL ? 0 : 'auto',
                width: '52%', aspectRatio: '1',
                borderRadius: '16px', overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
                border: '6px solid white',
                y: img2Y,
              }}
            >
              <img src="https://images.unsplash.com/photo-1541888081198-b80c102a9eb7?w=500&q=85" alt="Construction site"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>

            {/* Experience badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 150 }}
              style={{
                position: 'absolute', top: '38%',
                right: isRTL ? 'auto' : '-10px', left: isRTL ? '-10px' : 'auto',
                background: 'var(--color-primary)',
                color: 'white', padding: '1.25rem 1.5rem',
                borderRadius: '16px',
                boxShadow: '0 12px 40px rgba(212,43,43,0.35)',
                textAlign: 'center', zIndex: 3,
              }}
            >
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '2.2rem', lineHeight: 1 }}>10+</div>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.3rem' }}>
                {t.aboutPreview.stats.years}
              </div>
            </motion.div>
          </div>

          {/* === Text === */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.5rem' }}>
              <div style={{ height: '1.5px', width: '40px', background: 'var(--color-primary)' }} />
              <span style={{ color: 'var(--color-primary)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                {t.aboutPreview.badge}
              </span>
            </div>

            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', lineHeight: 1.1, color: 'var(--color-secondary)', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
              {t.aboutPreview.title}{' '}
              <span style={{ color: 'var(--color-primary)' }}>{t.aboutPreview.titleHighlight}</span>
            </h2>

            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
              {t.aboutPreview.description}
            </p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, color: 'var(--color-text-muted)', marginBottom: '2.5rem' }}>
              {t.aboutPreview.description2}
            </p>

            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0', borderTop: '1px solid var(--color-border)', marginBottom: '2.5rem' }}>
              {stats.map((s, i) => (
                <div key={s.label} style={{
                  padding: '1.5rem 0', paddingRight: i % 2 === 0 ? '1.5rem' : 0,
                  borderBottom: i < 2 ? '1px solid var(--color-border)' : 'none',
                  borderRight: i % 2 === 0 ? '1px solid var(--color-border)' : 'none',
                  paddingLeft: i % 2 === 1 ? '1.5rem' : 0,
                }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '2rem', color: 'var(--color-secondary)', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '0.35rem' }}>{s.label}</div>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '0.88rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {t.aboutPreview.learnMore}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d={isRTL ? 'M19 12H5M12 19l-7-7 7-7' : 'M5 12h14M12 5l7 7-7 7'}/></svg>
            </Link>
          </motion.div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html:`
        @media(max-width:900px){.about-grid{grid-template-columns:1fr!important;gap:3rem!important;}}
      `}}/>
    </section>
  );
}
