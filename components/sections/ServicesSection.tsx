'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const SERVICE_DATA = [
  {
    key: 'construction',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  },
  {
    key: 'renovation',
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=700&q=80',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>,
  },
  {
    key: 'electrical',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  },
  {
    key: 'publicWorks',
    img: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=700&q=80',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  },
  {
    key: 'maintenance',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  },
  {
    key: 'design',
    img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=700&q=80',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  },
];

export default function ServicesSection() {
  const { t: _t, isRTL } = useLanguage();
  const t = _t as any;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section ref={ref} style={{ padding: '7rem 0', background: '#f8f8f8', direction: isRTL ? 'rtl' : 'ltr' }}>
      <div className="container">

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
              <div style={{ height: '1.5px', width: '40px', background: 'var(--color-primary)' }} />
              <span style={{ color: 'var(--color-primary)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{t.services.badge}</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, color: 'var(--color-secondary)', letterSpacing: '-0.02em' }}>
              {t.services.title} <span style={{ color: 'var(--color-primary)' }}>{t.services.titleHighlight}</span>
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.7, delay: 0.3 }}>
            <Link href="/services" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-secondary)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', borderBottom: '2px solid var(--color-primary)', paddingBottom: '3px', whiteSpace: 'nowrap' }}>
              {t.services.viewAll}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d={isRTL ? 'M19 12H5M12 19l-7-7 7-7' : 'M5 12h14M12 5l7 7-7 7'}/></svg>
            </Link>
          </motion.div>
        </div>

        {/* Services list — full-width rows */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {SERVICE_DATA.map((svc, i) => {
            const item = t.services.items[svc.key as keyof typeof t.services.items];
            const active = hovered === i;
            return (
              <motion.div
                key={svc.key}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: 'relative', overflow: 'hidden',
                  display: 'grid', gridTemplateColumns: '80px 1fr auto',
                  alignItems: 'center', gap: '2rem',
                  padding: '1.75rem 2rem',
                  background: active ? 'var(--color-secondary)' : 'white',
                  borderBottom: '1px solid var(--color-border-light)',
                  cursor: 'pointer',
                  transition: 'background 0.4s ease',
                  borderRadius: i === 0 ? '16px 16px 0 0' : i === SERVICE_DATA.length - 1 ? '0 0 16px 16px' : '0',
                }}
              >
                {/* Hover image */}
                <div style={{
                  position: 'absolute', inset: 0, overflow: 'hidden',
                  opacity: active ? 0.07 : 0, transition: 'opacity 0.4s ease', pointerEvents: 'none',
                }}>
                  <img src={svc.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                {/* Number */}
                <div style={{
                  fontFamily: 'var(--font-heading)', fontWeight: 900,
                  fontSize: '2.5rem', lineHeight: 1,
                  color: active ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.06)',
                  transition: 'color 0.4s', userSelect: 'none',
                  position: 'relative', zIndex: 1,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Text */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.4rem' }}>
                    <span style={{ color: active ? 'var(--color-primary)' : 'var(--color-primary)', transition: 'color 0.4s' }}>{svc.icon}</span>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.15rem', color: active ? 'white' : 'var(--color-secondary)', transition: 'color 0.4s', margin: 0 }}>
                      {item.title}
                    </h3>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: active ? 'rgba(255,255,255,0.55)' : 'var(--color-text-muted)', lineHeight: 1.5, transition: 'color 0.4s', margin: 0, maxWidth: '500px' }}>
                    {item.description}
                  </p>
                </div>

                {/* Arrow */}
                <motion.div
                  animate={{ x: active ? 0 : -6, opacity: active ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: '42px', height: '42px', borderRadius: '50%',
                    background: 'var(--color-primary)', color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, position: 'relative', zIndex: 1,
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d={isRTL ? 'M19 12H5M12 19l-7-7 7-7' : 'M5 12h14M12 5l7 7-7 7'}/>
                  </svg>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
