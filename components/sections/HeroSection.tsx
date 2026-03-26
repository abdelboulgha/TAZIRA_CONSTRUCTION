'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { gsap } from 'gsap';

export default function HeroSection() {
  const { t, isRTL } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current) return;
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: 'power2.out' }
    );
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.18, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  };

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        direction: isRTL ? 'rtl' : 'ltr',
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="hero-overlay"
        style={{ position: 'absolute', inset: 0 }}
      />

      {/* Animated geometric accent */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        style={{
          position: 'absolute',
          bottom: '10%',
          right: isRTL ? 'auto' : '5%',
          left: isRTL ? '5%' : 'auto',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          border: '2px solid rgba(212,43,43,0.6)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.08, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.7 }}
        style={{
          position: 'absolute',
          bottom: '15%',
          right: isRTL ? 'auto' : '8%',
          left: isRTL ? '8%' : 'auto',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          border: '2px solid white',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          paddingTop: 'calc(var(--navbar-height) + 4rem)',
          paddingBottom: '6rem',
          maxWidth: '750px',
        }}
      >
        {/* Badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{ marginBottom: '1.5rem' }}
        >
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1.1rem',
            background: 'rgba(212,43,43,0.15)',
            border: '1px solid rgba(212,43,43,0.4)',
            borderRadius: 'var(--radius-full)',
            color: '#ff9999',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            backdropFilter: 'blur(8px)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-primary)', display: 'inline-block' }} />
            {t.hero.badge}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            color: 'white',
            fontFamily: 'var(--font-heading)',
            fontWeight: 900,
            fontSize: 'clamp(2.8rem, 6vw, 5rem)',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em',
          }}
        >
          {t.hero.title}{' '}
          <span style={{ color: 'var(--color-primary)', display: 'inline-block' }}>
            {t.hero.titleHighlight}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            lineHeight: 1.8,
            marginBottom: '2.5rem',
            maxWidth: '580px',
          }}
        >
          {t.hero.subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}
        >
          <Link href="/contact" className="btn btn-primary" style={{ fontSize: '1rem', padding: '1rem 2.25rem' }}>
            {t.hero.cta}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link href="/services" className="btn btn-outline-white" style={{ fontSize: '1rem', padding: '1rem 2.25rem' }}>
            {t.hero.ctaSecondary}
          </Link>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            display: 'flex',
            gap: '2rem',
            marginTop: '4rem',
            flexWrap: 'wrap',
          }}
        >
          {[
            { value: '200+', label: t.stats.projects.label },
            { value: '10+', label: t.stats.years.label },
            { value: '150+', label: t.stats.clients.label },
          ].map((stat) => (
            <div key={stat.label} style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{
                color: 'white',
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: '2rem',
                lineHeight: 1,
              }}>{stat.value}</span>
              <span style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: '0.8rem',
                marginTop: '0.25rem',
                fontWeight: 500,
              }}>{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'rgba(255,255,255,0.5)',
          fontSize: '0.75rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          zIndex: 2,
        }}
      >
        <span>{t.hero.scrollDown}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
