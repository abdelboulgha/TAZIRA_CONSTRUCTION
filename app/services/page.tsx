'use client';

import { useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import CtaSection from '@/components/sections/CtaSection';
import Link from 'next/link';

const SERVICE_IMAGES: Record<string, string> = {
  construction: '/assets/service_construction.png',
  renovation: '/assets/service_renovation.png',
  electrical: '/assets/service_electrical.png',
  publicWorks: '/assets/service_public_works.png',
  maintenance: '/assets/service_maintenance.png',
  design: '/assets/service_design.png',
};

const SERVICE_KEYS = ['construction', 'renovation', 'electrical', 'publicWorks', 'maintenance', 'design'];

export default function ServicesPage() {
  const { t, isRTL } = useLanguage();
  const d = t.servicesPage;
  
  const heroRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Animation
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
        tl.fromTo('.srv-hero-eyebrow', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.2)
          .fromTo('.srv-hero-title-line', { y: 100, skewY: 5 }, { y: 0, skewY: 0, duration: 1.2, stagger: 0.15 }, 0.3)
          .fromTo('.srv-hero-desc', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.8)
          .fromTo('.srv-spline-wrapper', { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out' }, 0.5);

        // Services Scroll Animations
        itemsRef.current.forEach((el, index) => {
          if (!el) return;
          const img = el.querySelector('.srv-item-img-inner');
          const content = el.querySelector('.srv-item-content');
          const num = el.querySelector('.srv-item-num');
          const features = el.querySelectorAll('.srv-item-feature');

          // Parallax image
          gsap.fromTo(img, 
            { yPercent: -15, scale: 1.1 },
            { yPercent: 15, scale: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } }
          );

          // Content reveal
          const contentTl = gsap.timeline({
            scrollTrigger: { trigger: el, start: 'top 75%', toggleActions: 'play none none reverse' }
          });

          contentTl
            .fromTo(num, { opacity: 0, x: isRTL ? 40 : -40 }, { opacity: 0.15, x: 0, duration: 0.8, ease: 'power3.out' }, 0)
            .fromTo(content, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.2)
            .fromTo(features, { opacity: 0, x: isRTL ? 20 : -20 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, 0.4);
        });
      });
    });
  }, [isRTL]);

  return (
    <div style={{ direction: isRTL ? 'rtl' : 'ltr', background: 'var(--color-bg)' }}>
      
      {/* ─── HERO ────────────────────────────────────────── */}
      <section ref={heroRef} className="srv-hero" style={{ paddingTop: 'calc(var(--navbar-height) + 4rem)', paddingBottom: '6rem', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <div className="srv-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            
            <div className="srv-hero-text">
              <div className="srv-hero-eyebrow" style={{ opacity: 0, display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                <div style={{ width: '40px', height: '1px', background: 'var(--color-primary)' }} />
                <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-primary)' }}>
                  {d.hero.badge}
                </span>
              </div>
              
              <h1 className="srv-hero-title" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--color-dark-text)', marginBottom: '1.5rem', overflow: 'hidden' }}>
                <div style={{ overflow: 'hidden' }}><div className="srv-hero-title-line" style={{ color: 'var(--color-secondary)' }}>{d.hero.title}</div></div>
                <div style={{ overflow: 'hidden' }}><div className="srv-hero-title-line" style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>{d.hero.titleHighlight}</div></div>
              </h1>
              
              <p className="srv-hero-desc" style={{ opacity: 0, fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--color-text-muted)', maxWidth: '480px' }}>
                {d.hero.subtitle}
              </p>
            </div>

            <div className="srv-hero-img-col srv-spline-wrapper" style={{ position: 'relative', height: '600px', borderRadius: 'var(--radius-xl)', overflow: 'hidden', background: '#090909' }}>
              <img src="/assets/service_construction.png" alt="TAZIRA Construction Services" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)', pointerEvents: 'none' }} />
            </div>

          </div>
        </div>
      </section>

      {/* ─── LIST ────────────────────────────────────────── */}
      <section className="srv-list" ref={triggerRef} style={{ padding: '6rem 0 10rem', backgroundColor: '#040404' }}>
        <div className="container">
          
          <div className="srv-items" style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
            {SERVICE_KEYS.map((key, i) => {
              const itemData = (d.items as any)[key] || { title: '', description: '', features: [] };
              const isEven = i % 2 === 0;
              
              return (
                <div 
                  key={key}
                  ref={(el) => { itemsRef.current[i] = el; }}
                  className={`srv-item ${isEven ? 'even' : 'odd'}`}
                  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}
                >
                  
                  {/* Image Side */}
                  <div className="srv-item-img-wrap" style={{ order: isRTL ? (isEven ? 2 : 1) : (isEven ? 1 : 2), overflow: 'hidden', borderRadius: '16px', aspectRatio: '4/4.5', position: 'relative' }}>
                    <img 
                      src={SERVICE_IMAGES[key]} 
                      alt={itemData.title} 
                      className="srv-item-img-inner"
                      style={{ width: '100%', height: '130%', objectFit: 'cover', position: 'absolute', top: '-15%', left: 0 }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }} />
                  </div>

                  {/* Content Side */}
                  <div className="srv-item-text" style={{ order: isRTL ? (isEven ? 1 : 2) : (isEven ? 2 : 1), position: 'relative' }}>
                    <div className="srv-item-num" style={{ position: 'absolute', top: '-2rem', [isRTL ? 'right' : 'left']: '-2rem', fontFamily: 'var(--font-heading)', fontSize: '10rem', fontWeight: 900, lineHeight: 0.8, color: 'var(--color-primary)', opacity: 0, zIndex: 0, pointerEvents: 'none', letterSpacing: '-0.05em' }}>
                      0{i + 1}
                    </div>
                    
                    <div className="srv-item-content" style={{ position: 'relative', zIndex: 1 }}>
                      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', fontWeight: 800, color: '#fff', marginBottom: '1.25rem', lineHeight: 1.1 }}>
                        {itemData.title}
                      </h2>
                      <p style={{ fontSize: '0.98rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.6)', marginBottom: '2.5rem' }}>
                        {itemData.description}
                      </p>
                      
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {itemData.features?.map((feat: string, j: number) => (
                          <li key={j} className="srv-item-feature" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.88rem', fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: '2px' }}>
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      <CtaSection />

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 1000px) {
          .srv-hero-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .srv-hero-img-col { height: 400px !important; }
          .srv-item { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .srv-item > div { order: unset !important; }
          .srv-item-img-wrap { aspect-ratio: 16/10 !important; }
          .srv-item-num { font-size: 6rem !important; top: -1rem !important; }
        }
      `}} />
    </div>
  );
}
