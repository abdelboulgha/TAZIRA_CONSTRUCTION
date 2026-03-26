'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import gsap from 'gsap';

export default function HeroSection() {
  const { t: _t, isRTL } = useLanguage();
  const t = _t as any;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-tag-line', { scaleX: 0, transformOrigin: isRTL ? 'right' : 'left', duration: 1.2, ease: 'power4.out', delay: 0.3 });
    }, sectionRef);
    return () => ctx.revert();
  }, [isRTL]);

  return (
    <section ref={sectionRef} style={{ position: 'relative', height: '100vh', minHeight: '700px', overflow: 'hidden', direction: isRTL ? 'rtl' : 'ltr' }}>
      {/* Parallax bg */}
      <motion.div style={{
        position: 'absolute', inset: '-60px', y: yBg,
        backgroundImage: 'url(https://images.unsplash.com/photo-1486325212027-8081e485255e?w=2000&q=85)',
        backgroundSize: 'cover', backgroundPosition: 'center',
      }} />

      {/* Overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.65) 55%, rgba(180,20,20,0.18) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(212,43,43,0.08) 0%, transparent 50%)', pointerEvents: 'none' }} />

      {/* Noise texture */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.025,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat', backgroundSize: '150px',
      }} />

      <motion.div style={{ position: 'relative', zIndex: 2, height: '100%', opacity }} className="container">
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 'var(--navbar-height)' }}>
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '2rem' }}
          >
            <div className="hero-tag-line" style={{ height: '1.5px', width: '48px', background: 'var(--color-primary)' }} />
            <span style={{ color: 'var(--color-primary)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
              {t.hero.badge}
            </span>
          </motion.div>

          {/* Headline */}
          <div style={{ overflow: 'hidden', marginBottom: '1rem' }}>
            <motion.h1
              initial={{ y: '100%' }} animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              style={{
                fontFamily: 'var(--font-heading)', fontWeight: 900,
                fontSize: 'clamp(3.2rem, 7.5vw, 6.5rem)',
                lineHeight: 1.0, letterSpacing: '-0.025em',
                color: 'white',
              }}
            >
              {t.hero.title}
            </motion.h1>
          </div>
          <div style={{ overflow: 'hidden', marginBottom: '2rem' }}>
            <motion.h1
              initial={{ y: '100%' }} animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
              style={{
                fontFamily: 'var(--font-heading)', fontWeight: 900,
                fontSize: 'clamp(3.2rem, 7.5vw, 6.5rem)',
                lineHeight: 1.0, letterSpacing: '-0.025em',
                color: 'var(--color-primary)',
              }}
            >
              {t.hero.titleHighlight}
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            style={{ color: 'rgba(255,255,255,0.62)', fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)', lineHeight: 1.75, maxWidth: '520px', marginBottom: '2.75rem' }}
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}
          >
            <Link href="/contact" className="btn btn-primary" style={{ padding: '1rem 2.25rem', fontSize: '0.9rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {t.hero.cta}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/services" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseOver={e => (e.currentTarget.style.color = 'white')}
              onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
            >
              {t.hero.ctaSecondary}
              <motion.svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <path d={isRTL ? 'M19 12H5M12 19l-7-7 7-7' : 'M5 12h14M12 5l7 7-7 7'}/>
              </motion.svg>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats bar — bottom right */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.3 }}
        style={{
          position: 'absolute', bottom: 0,
          right: isRTL ? 'auto' : 0, left: isRTL ? 0 : 'auto',
          zIndex: 3, display: 'flex',
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(12px)',
          borderTopLeftRadius: isRTL ? 0 : '24px',
          borderTopRightRadius: isRTL ? '24px' : 0,
        }}
      >
        {[
          { n: '200+', l: t.stats.projects.label },
          { n: '10+', l: t.stats.years.label },
          { n: '24/7', l: t.stats.availability.label },
        ].map((s, i) => (
          <div key={s.l} style={{
            padding: '1.5rem 2rem',
            borderRight: i < 2 ? '1px solid rgba(0,0,0,0.07)' : 'none',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem',
          }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.8rem', color: 'var(--color-primary)', lineHeight: 1 }}>{s.n}</span>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>{s.l}</span>
          </div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
        style={{ position: 'absolute', bottom: '2.5rem', left: isRTL ? 'auto' : '50%', right: isRTL ? '50%' : 'auto', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
      >
        <div style={{ width: '1px', height: '50px', background: 'rgba(255,255,255,0.2)', position: 'relative', overflow: 'hidden' }}>
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', width: '100%', height: '50%', background: 'var(--color-primary)' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
