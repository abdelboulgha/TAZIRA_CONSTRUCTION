'use client';

import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const SERVICES = [
  {
    num: '01',
    key: 'construction',
    title: 'Construction de bâtiments',
    desc: 'Conception et réalisation de bâtiments résidentiels, commerciaux et industriels selon les normes les plus strictes.',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=85',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    num: '02',
    key: 'electrical',
    title: 'Travaux électriques',
    desc: 'Installation, mise en conformité et maintenance de systèmes électriques pour tous types de bâtiments.',
    img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=900&q=85',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    num: '03',
    key: 'renovation',
    title: 'Rénovation & finition',
    desc: 'Rénovation complète et travaux de finition haut de gamme pour transformer et valoriser vos espaces.',
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=85',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  },
  {
    num: '04',
    key: 'maintenance',
    title: 'Maintenance & dépannage',
    desc: 'Service de maintenance préventive et corrective avec intervention rapide garantie sous 24 heures.',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=85',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41M19.07 19.07l-1.41-1.41M6.34 6.34L4.93 4.93M21 12h-2M5 12H3M12 19v2M12 3V1"/>
      </svg>
    ),
  },
];

export default function ServicesSection() {
  const { isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(headerRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: headerRef.current, start: 'top 82%', once: true } }
        );

        cardRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.fromTo(el,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, delay: i * 0.12, ease: 'power3.out',
              scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true } }
          );
        });
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ background: '#080808', padding: '9rem 0', direction: isRTL ? 'rtl' : 'ltr', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background dot grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      {/* Ambient red glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
        width: '70%', height: '50%', zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, rgba(212,43,43,0.07) 0%, transparent 70%)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div
          ref={headerRef}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '5.5rem', flexWrap: 'wrap', gap: '2rem' }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <div style={{ width: '32px', height: '1.5px', background: 'var(--color-primary)' }} />
              <span style={{ color: 'var(--color-primary)', fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.24em', textTransform: 'uppercase' }}>
                Nos Expertises
              </span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', lineHeight: 1.0, letterSpacing: '-0.035em', margin: 0, color: 'white' }}>
              Services{' '}
              <span style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>d'excellence</span>
            </h2>
          </div>
          <Link
            href="/services"
            style={{
              display: 'flex', alignItems: 'center', gap: '0.55rem',
              color: 'rgba(255,255,255,0.55)', fontSize: '0.7rem', fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none',
              borderBottom: '1px solid rgba(212,43,43,0.5)', paddingBottom: '3px',
              transition: 'color 0.2s',
            }}
          >
            Voir tous les services
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d={isRTL ? 'M19 12H5M12 19l-7-7 7-7' : 'M5 12h14M12 5l7 7-7 7'}/>
            </svg>
          </Link>
        </div>

        {/* Cards grid */}
        <div className="svc-grid">
          {SERVICES.map((svc, i) => {
            const isActive = hovered === svc.key;
            return (
              <div
                key={svc.key}
                ref={el => { cardRefs.current[i] = el; }}
                className="svc-card"
                onMouseEnter={() => setHovered(svc.key)}
                onMouseLeave={() => setHovered(null)}
                style={{ opacity: 0 }}
              >
                {/* Background image */}
                <div
                  className="svc-card-bg"
                  style={{ backgroundImage: `url(${svc.img})`, opacity: isActive ? 0.35 : 0.12 }}
                />
                {/* Dark overlay */}
                <div className="svc-card-overlay" style={{
                  background: isActive
                    ? 'linear-gradient(to top, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.7) 60%, rgba(5,5,5,0.2) 100%)'
                    : 'linear-gradient(to top, rgba(5,5,5,0.98) 0%, rgba(5,5,5,0.88) 100%)',
                }} />
                {/* Red accent top border */}
                <div className="svc-card-topline" style={{ width: isActive ? '100%' : '48px' }} />

                {/* Content */}
                <div className="svc-card-inner">
                  {/* Number */}
                  <div style={{
                    position: 'absolute', top: '1.75rem', right: isRTL ? 'auto' : '1.75rem', left: isRTL ? '1.75rem' : 'auto',
                    fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '3.5rem',
                    lineHeight: 1, color: isActive ? 'rgba(212,43,43,0.2)' : 'rgba(255,255,255,0.05)',
                    letterSpacing: '-0.05em', userSelect: 'none', transition: 'color 0.4s',
                  }}>
                    {svc.num}
                  </div>

                  {/* Icon */}
                  <div style={{
                    width: '58px', height: '58px', borderRadius: '10px',
                    background: isActive ? 'var(--color-primary)' : 'rgba(255,255,255,0.06)',
                    color: isActive ? 'white' : 'rgba(255,255,255,0.55)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1.75rem',
                    border: `1px solid ${isActive ? 'transparent' : 'rgba(255,255,255,0.08)'}`,
                    transition: 'all 0.35s',
                    boxShadow: isActive ? '0 8px 28px rgba(212,43,43,0.4)' : 'none',
                  }}>
                    {svc.icon}
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.15rem',
                    color: 'white', marginBottom: '0.85rem', lineHeight: 1.2,
                  }}>
                    {svc.title}
                  </h3>

                  <p style={{ fontSize: '0.86rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, margin: 0, maxWidth: '360px' }}>
                    {svc.desc}
                  </p>

                  {/* Arrow link */}
                  <div style={{
                    marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
                    opacity: isActive ? 1 : 0, transform: isActive ? 'translateY(0)' : 'translateY(6px)',
                    transition: 'all 0.35s',
                  }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-primary)' }}>
                      En savoir plus
                    </span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .svc-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5px;
        }
        .svc-card {
          position: relative; overflow: hidden;
          min-height: 400px; cursor: default;
          transition: transform 0.35s ease;
        }
        .svc-card:hover { transform: translateY(-4px); }
        .svc-card-bg {
          position: absolute; inset: 0;
          background-size: cover; background-position: center;
          transition: opacity 0.5s ease;
          z-index: 0;
        }
        .svc-card-overlay {
          position: absolute; inset: 0; z-index: 1;
          transition: background 0.4s ease;
        }
        .svc-card-topline {
          position: absolute; top: 0; left: 0; height: 2px;
          background: var(--color-primary); z-index: 3;
          transition: width 0.5s cubic-bezier(0.25,1,0.5,1);
        }
        .svc-card-inner {
          position: relative; z-index: 2;
          padding: 2.75rem 2.5rem 2.5rem;
        }
        @media (max-width: 768px) {
          .svc-grid { grid-template-columns: 1fr; }
          .svc-card { min-height: 320px; }
        }
      `}} />
    </section>
  );
}
