'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const PROJECTS = [
  { key: 'building',    src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=85', col: 2, row: 2 },
  { key: 'villa',       src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=85', col: 1, row: 1 },
  { key: 'renovation',  src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=85',   col: 1, row: 1 },
  { key: 'industrial',  src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=85', col: 2, row: 1 },
  { key: 'luxury',      src: 'https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?w=600&q=85', col: 1, row: 1 },
];

export default function ProjectsSection() {
  const { t: _t, isRTL } = useLanguage();
  const t = _t as any;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section ref={ref} style={{ padding: '7rem 0', background: 'white', direction: isRTL ? 'rtl' : 'ltr' }}>
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1.5rem' }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
              <div style={{ height: '1.5px', width: '40px', background: 'var(--color-primary)' }} />
              <span style={{ color: 'var(--color-primary)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{t.projects.badge}</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, color: 'var(--color-secondary)', letterSpacing: '-0.02em', margin: 0 }}>
              {t.projects.title} <span style={{ color: 'var(--color-primary)' }}>{t.projects.titleHighlight}</span>
            </h2>
          </div>
          <Link href="/services" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-secondary)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', borderBottom: '2px solid var(--color-primary)', paddingBottom: '3px', whiteSpace: 'nowrap' }}>
            {t.projects.viewAll}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d={isRTL ? 'M19 12H5M12 19l-7-7 7-7' : 'M5 12h14M12 5l7 7-7 7'}/></svg>
          </Link>
        </motion.div>

        {/* Bento grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 260px)', gap: '12px' }} className="projects-grid">
          {PROJECTS.map((p, i) => {
            const label = t.projects.items[p.key as keyof typeof t.projects.items];
            const isActive = hovered === p.key;
            return (
              <motion.div
                key={p.key}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                onMouseEnter={() => setHovered(p.key)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: 'relative', borderRadius: '14px', overflow: 'hidden', cursor: 'pointer',
                  gridColumn: `span ${p.col}`, gridRow: `span ${p.row}`,
                }}
              >
                <motion.img src={p.src} alt={label}
                  animate={{ scale: isActive ? 1.06 : 1 }} transition={{ duration: 0.55 }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)' }} />
                <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', right: '1.25rem' }}>
                  <motion.div animate={{ y: isActive ? 0 : 4 }} transition={{ duration: 0.3 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem', color: 'white' }}>{label}</span>
                      <motion.div animate={{ scale: isActive ? 1 : 0.7, opacity: isActive ? 1 : 0 }}
                        style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html:`
        @media(max-width:768px){
          .projects-grid{grid-template-columns:1fr 1fr!important;grid-template-rows:auto!important;}
          .projects-grid>*{grid-column:span 1!important;grid-row:span 1!important;height:180px;}
        }
        @media(max-width:480px){ .projects-grid{grid-template-columns:1fr!important;} }
      `}}/>
    </section>
  );
}
