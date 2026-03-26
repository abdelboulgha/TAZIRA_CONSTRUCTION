'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutPreview() {
  const { t, isRTL } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { value: '200+', label: t.aboutPreview.stats.projects },
    { value: '10+', label: t.aboutPreview.stats.years },
    { value: '150+', label: t.aboutPreview.stats.clients },
    { value: '50+', label: t.aboutPreview.stats.team },
  ];

  return (
    <section className="section" ref={ref} style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          alignItems: 'center',
        }}>
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ position: 'relative' }}
          >
            <div style={{
              position: 'relative',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              aspectRatio: '4/3',
              boxShadow: 'var(--shadow-xl)',
            }}>
              <img
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80"
                alt="TAZIRA Construction team"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            {/* Floating accent card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              style={{
                position: 'absolute',
                bottom: '-1.5rem',
                right: isRTL ? 'auto' : '-1.5rem',
                left: isRTL ? '-1.5rem' : 'auto',
                background: 'var(--color-primary)',
                color: 'white',
                padding: '1.25rem 1.75rem',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-red)',
                minWidth: '160px',
              }}
            >
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '2.5rem', lineHeight: 1 }}>10+</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.9, marginTop: '0.25rem' }}>{t.aboutPreview.stats.years}</div>
            </motion.div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="badge" style={{ marginBottom: '1.25rem' }}>{t.aboutPreview.badge}</span>

            <h2 className="section-title" style={{ marginBottom: '1.25rem' }}>
              {t.aboutPreview.title}{' '}
              <span className="highlight">{t.aboutPreview.titleHighlight}</span>
            </h2>

            <div className="divider" />

            <p style={{ marginTop: '1.25rem', marginBottom: '1rem', lineHeight: 1.8 }}>
              {t.aboutPreview.description}
            </p>
            <p style={{ marginBottom: '2rem', lineHeight: 1.8 }}>
              {t.aboutPreview.description2}
            </p>

            {/* Mini stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem',
              marginBottom: '2rem',
            }}>
              {stats.map((stat) => (
                <div key={stat.label} style={{
                  padding: '1.25rem',
                  background: 'var(--color-bg-light)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border-light)',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 900,
                    fontSize: '1.75rem',
                    color: 'var(--color-primary)',
                    lineHeight: 1,
                  }}>{stat.value}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn btn-primary">
              {t.aboutPreview.learnMore}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
