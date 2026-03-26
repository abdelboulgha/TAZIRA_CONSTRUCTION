'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import CtaSection from '@/components/sections/CtaSection';

function PageHero({ badge, title, highlight, subtitle }: {
  badge: string; title: string; highlight: string; subtitle: string;
}) {
  return (
    <section style={{
      position: 'relative',
      paddingTop: 'calc(var(--navbar-height) + 5rem)',
      paddingBottom: '5rem',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920&q=80)`,
        backgroundSize: 'cover', backgroundPosition: 'center',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(26,26,26,0.88) 0%, rgba(26,26,26,0.6) 100%)',
      }} />
      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '720px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.4rem 1.1rem',
            background: 'rgba(212,43,43,0.15)',
            border: '1px solid rgba(212,43,43,0.4)',
            borderRadius: 'var(--radius-full)',
            color: '#ff9999', fontSize: '0.8rem', fontWeight: 600,
            letterSpacing: '0.08em', textTransform: 'uppercase' as const,
            marginBottom: '1.5rem',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-primary)', display: 'inline-block' }} />
            {badge}
          </span>
          <h1 style={{
            color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 900,
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '1rem',
          }}>
            {title} <span style={{ color: 'var(--color-primary)' }}>{highlight}</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', lineHeight: 1.7 }}>
            {subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function StorySection({ t }: { t: any }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section className="section" ref={ref}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
            <span className="badge" style={{ marginBottom: '1.25rem' }}>{t.about.story.badge}</span>
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>
              {t.about.story.title} <span className="highlight">{t.about.story.titleHighlight}</span>
            </h2>
            <div className="divider" />
            <p style={{ marginTop: '1.25rem', marginBottom: '1rem' }}>{t.about.story.p1}</p>
            <p style={{ marginBottom: '1rem' }}>{t.about.story.p2}</p>
            <p>{t.about.story.p3}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', aspectRatio: '3/4' }}>
                <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80" alt="Construction" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', aspectRatio: '3/2' }}>
                  <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" alt="Team" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', flex: 1 }}>
                  <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80" alt="Project" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MissionVision({ t }: { t: any }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section className="section section-light" ref={ref}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="badge">{t.about.mission.badge}</span>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {[
            { ...t.about.mission.mission, icon: '🎯', color: 'var(--color-primary)' },
            { ...t.about.mission.vision, icon: '🔭', color: '#2563eb' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              style={{
                padding: '2.5rem',
                borderRadius: 'var(--radius-xl)',
                background: 'white',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--color-border-light)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
                background: item.color,
              }} />
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{item.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--color-secondary)' }}>
                {item.title}
              </h3>
              <p style={{ lineHeight: 1.8 }}>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ValuesSection({ t }: { t: any }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const valEmojis: Record<string, string> = {
    quality: '⭐', safety: '🛡️', reliability: '🤝', innovation: '💡', integrity: '✨', sustainability: '🌱',
  };

  return (
    <section className="section" ref={ref}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="badge" style={{ marginBottom: '1rem' }}>{t.about.values.badge}</span>
          <h2 className="section-title">
            {t.about.values.title} <span className="highlight">{t.about.values.titleHighlight}</span>
          </h2>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {Object.entries(t.about.values.items).map(([key, val]: [string, any], i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border-light)',
                background: 'white',
                textAlign: 'center',
                transition: 'all 0.3s ease',
              }}
              whileHover={{ y: -6, boxShadow: 'var(--shadow-lg)', borderColor: 'rgba(212,43,43,0.2)' }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{valEmojis[key]}</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem', marginBottom: '0.75rem', color: 'var(--color-secondary)' }}>
                {val.title}
              </h3>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.65 }}>{val.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  const { t, isRTL } = useLanguage();

  return (
    <div style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <PageHero
        badge={t.about.hero.badge}
        title={t.about.hero.title}
        highlight={t.about.hero.titleHighlight}
        subtitle={t.about.hero.subtitle}
      />
      <StorySection t={t} />
      <MissionVision t={t} />
      <ValuesSection t={t} />
      <CtaSection />
    </div>
  );
}
