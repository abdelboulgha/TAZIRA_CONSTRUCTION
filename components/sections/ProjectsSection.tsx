'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const projects = [
  {
    key: 'villa',
    src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
    span: 'col-span-1',
    large: false,
  },
  {
    key: 'building',
    src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80',
    large: true,
  },
  {
    key: 'renovation',
    src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80',
    large: false,
  },
  {
    key: 'public',
    src: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&q=80',
    large: false,
  },
  {
    key: 'industrial',
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    large: false,
  },
  {
    key: 'luxury',
    src: 'https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?w=900&q=80',
    large: true,
  },
];

export default function ProjectsSection() {
  const { t, isRTL } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="section section-gray" ref={ref} style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <span className="badge" style={{ marginBottom: '1rem' }}>{t.projects.badge}</span>
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>
            {t.projects.title}{' '}
            <span className="highlight">{t.projects.titleHighlight}</span>
          </h2>
          <p style={{ maxWidth: '500px', margin: '0 auto' }}>{t.projects.subtitle}</p>
        </motion.div>

        {/* Masonry-style Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(2, 260px)',
          gap: '1rem',
        }}
        className="projects-grid"
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.key}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                cursor: 'pointer',
                gridColumn: project.large ? 'span 2' : 'span 1',
              }}
              onMouseEnter={() => setHovered(project.key)}
              onMouseLeave={() => setHovered(null)}
            >
              <motion.img
                src={project.src}
                alt={t.projects.items[project.key as keyof typeof t.projects.items]}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
                animate={{
                  scale: hovered === project.key ? 1.06 : 1,
                }}
                transition={{ duration: 0.5 }}
              />
              {/* Label overlay */}
              <motion.div
                animate={{
                  opacity: hovered === project.key ? 1 : 0,
                  y: hovered === project.key ? 0 : 10,
                }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.5rem',
                  background: 'linear-gradient(to top, rgba(26,26,26,0.85), transparent)',
                  color: 'white',
                }}
              >
                <p style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: '1rem',
                }}>
                  {t.projects.items[project.key as keyof typeof t.projects.items]}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          style={{ textAlign: 'center', marginTop: '2.5rem' }}
        >
          <Link href="/services" className="btn btn-secondary">
            {t.projects.viewAll}
          </Link>
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: auto !important;
          }
        }
        @media (max-width: 480px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
