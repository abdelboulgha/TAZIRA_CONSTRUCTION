'use client';

import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const SERVICES = [
  {
    num: '01',
    key: 'construction',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
  },
  {
    num: '02',
    key: 'electrical',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80',
  },
  {
    num: '03',
    key: 'renovation',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
  },
  {
    num: '04',
    key: 'maintenance',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41M19.07 19.07l-1.41-1.41M6.34 6.34L4.93 4.93M21 12h-2M5 12H3M12 19v2M12 3V1"/>
      </svg>
    ),
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  },
];

export default function ServicesSection() {
  const { t: _t, isRTL } = useLanguage();
  const t = _t as any;
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const gsapRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!inView) return;
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        gsapRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.fromTo(el,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.75, delay: i * 0.12, ease: 'power3.out' }
          );
        });
      });
    });
  }, [inView]);

  return (
    <section ref={ref} style={{ background: '#f7f7f7', padding: '8rem 0', direction: isRTL ? 'rtl' : 'ltr' }}>
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.1rem' }}>
              <div style={{ height: '2px', width: '40px', background: 'var(--color-primary)' }} />
              <span style={{ color: 'var(--color-primary)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                {t.services.badge}
              </span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', lineHeight: 1.08, letterSpacing: '-0.025em', margin: 0 }}>
              <span style={{ color: 'var(--color-secondary)' }}>{t.services.title} </span>
              <span style={{ color: 'var(--color-primary)' }}>{t.services.titleHighlight}</span>
            </h2>
          </div>
          <Link href="/services" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-secondary)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', borderBottom: '2px solid var(--color-primary)', paddingBottom: '3px', whiteSpace: 'nowrap', transition: 'opacity 0.2s' }}>
            {t.services.viewAll}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d={isRTL ? 'M19 12H5M12 19l-7-7 7-7' : 'M5 12h14M12 5l7 7-7 7'}/>
            </svg>
          </Link>
        </motion.div>

        {/* Cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1.5rem' }} className="services-grid">
          {SERVICES.map((svc, i) => {
            const item = t.services.items[svc.key as keyof typeof t.services.items];
            return (
              <div
                key={svc.key}
                ref={el => { gsapRefs.current[i] = el; }}
                style={{ opacity: 0 }}
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'relative', overflow: 'hidden',
                    borderRadius: '16px',
                    background: 'white',
                    border: '1px solid var(--color-border-light)',
                    padding: '2.75rem',
                    cursor: 'default',
                    height: '100%',
                    boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
                    transition: 'box-shadow 0.3s',
                  }}
                  className="svc-card"
                >
                  {/* Background image (faint on hover) */}
                  <div className="svc-img-bg" style={{ backgroundImage: `url(${svc.img})` }} />

                  {/* Number */}
                  <div style={{
                    position: 'absolute', top: '2rem',
                    right: isRTL ? 'auto' : '2rem',
                    left: isRTL ? '2rem' : 'auto',
                    fontFamily: 'var(--font-heading)', fontWeight: 900,
                    fontSize: '4rem', lineHeight: 1,
                    color: 'rgba(0,0,0,0.04)',
                    letterSpacing: '-0.04em',
                    userSelect: 'none',
                  }}>
                    {svc.num}
                  </div>

                  {/* Icon */}
                  <div style={{
                    width: '60px', height: '60px', borderRadius: '14px',
                    background: 'var(--color-primary-light)',
                    color: 'var(--color-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1.75rem',
                    border: '1px solid rgba(212,43,43,0.12)',
                    transition: 'all 0.3s',
                  }} className="svc-icon">
                    {svc.icon}
                  </div>

                  {/* Content */}
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.18rem', color: 'var(--color-secondary)', marginBottom: '0.85rem', lineHeight: 1.25 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0, maxWidth: '380px' }}>
                    {item.description}
                  </p>

                  {/* Bottom red accent */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: isRTL ? 'auto' : 0, right: isRTL ? 0 : 'auto',
                    width: '0', height: '3px',
                    background: 'var(--color-primary)',
                    borderRadius: '0 2px 2px 0',
                    transition: 'width 0.4s ease',
                  }} className="svc-bottom-line" />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .svc-img-bg {
          position: absolute; inset: 0;
          background-size: cover; background-position: center;
          opacity: 0; transition: opacity 0.5s;
          z-index: 0;
        }
        .svc-img-bg::after {
          content:''; position:absolute; inset:0;
          background: rgba(255,255,255,0.94);
        }
        .svc-card:hover .svc-img-bg { opacity: 1; }
        .svc-card:hover .svc-icon {
          background: var(--color-primary) !important;
          color: white !important;
          border-color: var(--color-primary) !important;
        }
        .svc-card:hover { box-shadow: 0 20px 60px rgba(0,0,0,0.09) !important; }
        .svc-card:hover .svc-bottom-line { width: 60px !important; }
        .svc-card > * { position: relative; z-index: 1; }
        .svc-card .svc-img-bg { z-index: 0; }
        @media(max-width:768px){ .services-grid{ grid-template-columns:1fr !important; } }
      `}} />
    </section>
  );
}
