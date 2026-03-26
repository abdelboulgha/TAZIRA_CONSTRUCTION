'use client';

import { useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import CtaSection from '@/components/sections/CtaSection';

const serviceImages: Record<string, string> = {
  construction: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
  renovation: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80',
  electrical: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  publicWorks: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&q=80',
  maintenance: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
  design: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
};

function ServiceIcon({ serviceKey }: { serviceKey: string }) {
  if (serviceKey === 'construction') return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  );
  if (serviceKey === 'renovation') return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
    </svg>
  );
  if (serviceKey === 'electrical') return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  );
  if (serviceKey === 'publicWorks') return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="3" width="15" height="13"/>
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
      <circle cx="5.5" cy="18.5" r="2.5"/>
      <circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  );
  if (serviceKey === 'maintenance') return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  );
}

function ServiceCard({ serviceKey, data, index, isRTL }: {
  serviceKey: string;
  data: { title: string; description: string; features: string[] };
  index: number;
  isRTL: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '3rem',
        alignItems: 'center',
        marginBottom: '5rem',
        opacity: 0,
        transform: 'translateY(40px)',
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
      }}
      className="service-detail-row"
    >
      <div style={{ order: isRTL ? (isEven ? 2 : 1) : (isEven ? 1 : 2) }} className="service-img-side">
        <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', aspectRatio: '4/3', boxShadow: 'var(--shadow-xl)' }}>
          <img
            src={serviceImages[serviceKey]}
            alt={data.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
            className="service-detail-img"
          />
        </div>
      </div>

      <div style={{ order: isRTL ? (isEven ? 1 : 2) : (isEven ? 2 : 1) }} className="service-content-side">
        <div style={{
          width: '56px', height: '56px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--color-primary-light)',
          color: 'var(--color-primary)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '1.25rem',
        }}>
          <ServiceIcon serviceKey={serviceKey} />
        </div>

        <h2 style={{
          fontFamily: 'var(--font-heading)', fontWeight: 800,
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          color: 'var(--color-secondary)', marginBottom: '1rem',
        }}>{data.title}</h2>

        <div className="divider" />

        <p style={{ marginTop: '1.25rem', marginBottom: '1.75rem', lineHeight: 1.8, color: 'var(--color-text-muted)' }}>
          {data.description}
        </p>

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {data.features.map((feature) => (
            <li key={feature} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{
                width: '20px', height: '20px', borderRadius: '50%',
                background: 'var(--color-primary-light)', color: 'var(--color-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const { t, isRTL } = useLanguage();
  const services = t.servicesPage.items;

  return (
    <div style={{ direction: isRTL ? 'rtl' : 'ltr', background: 'var(--color-bg)' }}>
      {/* Hero */}
      <section style={{
        paddingTop: 'calc(var(--navbar-height) + 5rem)',
        paddingBottom: '4rem',
        background: 'var(--color-bg)',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em',
            textTransform: 'uppercase' as const,
            color: 'var(--color-primary)', marginBottom: '1.5rem',
          }}>
            <span style={{ width: 24, height: 1.5, background: 'var(--color-primary)', display: 'inline-block' }} />
            {t.servicesPage.hero.badge}
          </div>
          <h1 style={{
            fontFamily: 'var(--font-heading)', fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15,
            color: 'var(--color-secondary)', marginBottom: '1.25rem',
          }}>
            {t.servicesPage.hero.title}{' '}
            <span style={{ color: 'var(--color-primary)' }}>{t.servicesPage.hero.titleHighlight}</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1rem', lineHeight: 1.75, maxWidth: '560px' }}>
            {t.servicesPage.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Services List */}
      <section style={{ padding: '5rem 0', background: 'var(--color-bg)' }}>
        <div className="container">
          {Object.entries(services).map(([key, data], i) => (
            <ServiceCard
              key={key}
              serviceKey={key}
              data={data as { title: string; description: string; features: string[] }}
              index={i}
              isRTL={isRTL}
            />
          ))}
        </div>
      </section>

      <CtaSection />

      <style jsx>{`
        @media (max-width: 768px) {
          .service-detail-row { grid-template-columns: 1fr !important; }
          .service-img-side, .service-content-side { order: unset !important; }
        }
        .service-detail-img:hover { transform: scale(1.04); }
      `}</style>
    </div>
  );
}
