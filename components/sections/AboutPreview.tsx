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
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.0]);
  const imgY     = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);

  const stats = [
    { value: '200+', label: t.aboutPreview.stats.projects },
    { value: '10+',  label: t.aboutPreview.stats.years },
    { value: '150+', label: t.aboutPreview.stats.clients },
    { value: '50+',  label: t.aboutPreview.stats.team },
  ];

  return (
    <section
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: isRTL ? '45% 55%' : '55% 45%',
        minHeight: '600px',
        direction: isRTL ? 'rtl' : 'ltr',
        overflow: 'hidden',
      }}
      className="about-split"
    >
      {/* ═══ LEFT — Light panel, text content ═══ */}
      <div style={{
        background: '#f8f8f8',
        display: 'flex', alignItems: 'center',
        padding: '6rem max(2rem, calc((100vw - 1280px) / 2 + 1.5rem))',
        position: 'relative', overflow: 'hidden',
        order: isRTL ? 2 : 1,
      }}>
        {/* Subtle red dot accent */}
        <div style={{
          position: 'absolute', bottom: '10%',
          left: isRTL ? 'auto' : '-80px', right: isRTL ? '-80px' : 'auto',
          width: '200px', height: '200px', borderRadius: '50%',
          background: 'rgba(212,43,43,0.06)', pointerEvents: 'none',
        }} />

        {/* Vertical red accent */}
        <div style={{
          position: 'absolute', top: '15%', bottom: '15%',
          right: isRTL ? 'auto' : 0, left: isRTL ? 0 : 'auto',
          width: '3px',
          background: 'linear-gradient(to bottom, transparent, var(--color-primary) 30%, var(--color-primary) 70%, transparent)',
        }} />

        <motion.div
          initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', zIndex: 1, maxWidth: '520px' }}
        >
          {/* Label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '2rem' }}>
            <div style={{ height: '1.5px', width: '36px', background: 'var(--color-primary)' }} />
            <span style={{ color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
              {t.aboutPreview.badge}
            </span>
          </div>

          {/* Headline */}
          <h2 style={{
            fontFamily: 'var(--font-heading)', fontWeight: 900,
            fontSize: 'clamp(2.4rem, 3.5vw, 3.6rem)',
            lineHeight: 1.05, letterSpacing: '-0.025em',
            color: 'var(--color-secondary)', marginBottom: '1.75rem',
          }}>
            {t.aboutPreview.title}
            <br />
            <span style={{ color: 'var(--color-primary)' }}>{t.aboutPreview.titleHighlight}</span>
            <span style={{ color: 'var(--color-primary)' }}>.</span>
          </h2>

          <p style={{ fontSize: '0.97rem', lineHeight: 1.8, color: 'var(--color-text-muted)', marginBottom: '0.85rem' }}>
            {t.aboutPreview.description}
          </p>
          <p style={{ fontSize: '0.93rem', lineHeight: 1.75, color: 'var(--color-text-muted)', marginBottom: '3rem' }}>
            {t.aboutPreview.description2}
          </p>

          {/* Stats — inline row */}
          <div style={{ display: 'flex', gap: '0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', marginBottom: '2.75rem' }}>
            {stats.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.35 + i * 0.09 }}
                style={{ flex: 1, padding: '1.25rem 0.75rem', borderRight: i < stats.length - 1 ? '1px solid var(--color-border)' : 'none', textAlign: 'center' }}
              >
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(1.3rem, 2.5vw, 1.65rem)', color: i === 0 ? 'var(--color-primary)' : 'var(--color-secondary)', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.09em', marginTop: '0.4rem', lineHeight: 1.3 }}>{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <Link href="/about" className="btn btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {t.aboutPreview.learnMore}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d={isRTL ? 'M19 12H5M12 19l-7-7 7-7' : 'M5 12h14M12 5l7 7-7 7'}/></svg>
            </Link>
            <a href="https://wa.me/212650596613" target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#16a34a', fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none' }}
              onMouseOver={e => (e.currentTarget.style.opacity = '0.7')}
              onMouseOut={e => (e.currentTarget.style.opacity = '1')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
          </div>
        </motion.div>
      </div>

      {/* ═══ RIGHT — Full-bleed image ═══ */}
      <div style={{ position: 'relative', overflow: 'hidden', order: isRTL ? 1 : 2, minHeight: '500px' }}>
        <motion.div style={{ position: 'absolute', inset: '-8%', scale: imgScale, y: imgY }}>
          <img src="https://images.unsplash.com/photo-1541888081198-b80c102a9eb7?w=900&q=85" alt="TAZIRA Construction"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </motion.div>
        <div style={{ position: 'absolute', inset: 0, background: isRTL ? 'linear-gradient(to left, rgba(248,248,248,0.12) 0%, transparent 40%)' : 'linear-gradient(to right, rgba(248,248,248,0.12) 0%, transparent 40%)' }} />

        {/* Floating quality card */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.7 }}
          style={{ position: 'absolute', bottom: '2.5rem', left: isRTL ? 'auto' : '2rem', right: isRTL ? '2rem' : 'auto', background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(12px)', borderRadius: '16px', padding: '1.25rem 1.5rem', boxShadow: '0 16px 40px rgba(0,0,0,0.14)', display: 'flex', alignItems: 'center', gap: '1rem' }}
        >
          <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.3rem', color: 'var(--color-secondary)', lineHeight: 1 }}>100%</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginTop: '0.2rem' }}>Qualité garantie</div>
          </div>
        </motion.div>

        {/* Top chip */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          transition={{ delay: 1, type: 'spring', stiffness: 160 }}
          style={{ position: 'absolute', top: '2rem', right: isRTL ? 'auto' : '2rem', left: isRTL ? '2rem' : 'auto', background: 'var(--color-primary)', color: 'white', padding: '0.6rem 1.1rem', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 8px 24px rgba(212,43,43,0.35)' }}
        >
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1rem' }}>200+</span>
          <span style={{ fontSize: '0.68rem', fontWeight: 600, opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t.aboutPreview.stats.projects}</span>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{__html:`
        @media(max-width:900px){
          .about-split{grid-template-columns:1fr!important;}
          .about-split>*:first-child{order:2!important;padding:4rem 1.5rem!important;}
          .about-split>*:last-child{order:1!important;min-height:340px!important;}
        }
      `}}/>
    </section>
  );
}
