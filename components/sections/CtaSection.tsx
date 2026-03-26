'use client';

import Link from 'next/link';
import { useRef, useEffect } from 'react';

export default function CtaSection() {
  const ref      = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const lineRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(lineRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 2, ease: 'power2.inOut',
            scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true } }
        );
        gsap.fromTo(innerRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
            scrollTrigger: { trigger: ref.current, start: 'top 76%', once: true } }
        );
      });
    });
  }, []);

  return (
    <section ref={ref} className="cta-section">

      {/* Background image */}
      <div className="cta-bg">
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=60"
          alt=""
          aria-hidden="true"
          className="cta-bg-img"
        />
        <div className="cta-overlay" />
        <div className="cta-overlay-glow" />
        <div className="cta-vgrid" aria-hidden="true">
          {[...Array(8)].map((_, i) => <div key={i} className="cta-vline" />)}
        </div>
      </div>

      {/* Top animated red line */}
      <div className="cta-topline">
        <div ref={lineRef} className="cta-topline-fill" />
      </div>

      <div ref={innerRef} className="container cta-inner" style={{ opacity: 0 }}>

        {/* Eyebrow */}
        <div className="cta-eyebrow">
          <div className="cta-eyebrow-line" />
          <span>Passez à l&apos;action</span>
          <div className="cta-eyebrow-line" />
        </div>

        {/* Title */}
        <h2 className="cta-title">
          <span className="cta-title-solid">PRÊT À</span>
          <br />
          <span className="cta-title-ghost">CONCRÉTISER</span>
          <br />
          <span className="cta-title-solid">VOTRE PROJET?</span>
        </h2>

        {/* Subtitle */}
        <p className="cta-subtitle">
          Contactez-nous dès aujourd&apos;hui pour une consultation gratuite et un devis personnalisé.
          Notre équipe vous répond sous 24 heures.
        </p>

        {/* CTAs */}
        <div className="cta-buttons">
          <Link href="/contact" className="cta-btn-primary">
            Demander un devis gratuit
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>

          <a
            href="https://wa.me/212650596613"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn-whatsapp"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        </div>

        {/* Trust bullets */}
        <div className="cta-trust">
          {[
            'Devis gratuit & sans engagement',
            'Réponse sous 24h garantie',
            'Équipe d\'experts certifiés',
            'Garantie travaux complète',
          ].map((item, i) => (
            <div key={i} className="cta-trust-item">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {item}
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .cta-section {
          background: #060606;
          padding: 10rem 0;
          position: relative; overflow: hidden;
        }
        .cta-bg { position: absolute; inset: 0; z-index: 0; }
        .cta-bg-img { width: 100%; height: 100%; object-fit: cover; opacity: 0.12; }
        .cta-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(5,5,5,0.97) 0%, rgba(5,5,5,0.88) 55%, rgba(5,5,5,0.96) 100%);
        }
        .cta-overlay-glow {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,43,43,0.1) 0%, transparent 70%);
        }
        .cta-vgrid {
          position: absolute; inset: 0;
          display: flex; justify-content: space-between; pointer-events: none;
        }
        .cta-vline { width: 1px; height: 100%; background: rgba(255,255,255,0.03); }

        /* Top line */
        .cta-topline {
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px; z-index: 2; background: rgba(255,255,255,0.04);
        }
        .cta-topline-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--color-primary) 0%, rgba(212,43,43,0.3) 70%, transparent 100%);
        }

        /* Inner */
        .cta-inner {
          position: relative; z-index: 2; text-align: center;
        }

        /* Eyebrow */
        .cta-eyebrow {
          display: flex; align-items: center; justify-content: center;
          gap: 1rem; margin-bottom: 2.5rem;
        }
        .cta-eyebrow-line { height: 1px; width: 52px; background: rgba(212,43,43,0.5); }
        .cta-eyebrow span {
          color: var(--color-primary); font-size: 0.65rem; font-weight: 800;
          letter-spacing: 0.28em; text-transform: uppercase;
        }

        /* Title */
        .cta-title {
          font-family: var(--font-heading); font-weight: 900;
          font-size: clamp(3.2rem, 8vw, 8rem);
          line-height: 0.9; letter-spacing: -0.04em;
          text-transform: uppercase;
          margin: 0 auto 2.5rem;
        }
        .cta-title-solid { color: white; display: block; }
        .cta-title-ghost {
          color: transparent;
          -webkit-text-stroke: 2px rgba(255,255,255,0.22);
          display: block;
        }

        /* Subtitle */
        .cta-subtitle {
          font-size: clamp(0.95rem, 1.2vw, 1.05rem);
          line-height: 1.82; color: rgba(255,255,255,0.38);
          margin: 0 auto 3.5rem; max-width: 480px;
        }

        /* Buttons */
        .cta-buttons {
          display: flex; gap: 1rem; justify-content: center;
          flex-wrap: wrap; margin-bottom: 3.5rem;
        }
        .cta-btn-primary {
          display: inline-flex; align-items: center; gap: 0.65rem;
          padding: 1.1rem 2.6rem;
          background: var(--color-primary); color: white;
          border-radius: 2px; border: 1.5px solid var(--color-primary);
          font-family: var(--font-heading); font-size: 0.7rem;
          font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase;
          text-decoration: none; transition: all 0.3s;
          box-shadow: 0 8px 32px rgba(212,43,43,0.35);
        }
        .cta-btn-primary:hover {
          background: var(--color-primary-dark);
          border-color: var(--color-primary-dark);
          transform: translateY(-3px);
          box-shadow: 0 20px 52px rgba(212,43,43,0.52);
        }
        .cta-btn-whatsapp {
          display: inline-flex; align-items: center; gap: 0.65rem;
          padding: 1.1rem 2.4rem;
          background: #25d366; color: white;
          border-radius: 2px; border: 1.5px solid #25d366;
          font-family: var(--font-heading); font-size: 0.7rem;
          font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase;
          text-decoration: none; transition: all 0.3s;
        }
        .cta-btn-whatsapp:hover {
          background: #1ebe5d; border-color: #1ebe5d;
          transform: translateY(-3px);
          box-shadow: 0 14px 40px rgba(37,211,102,0.48);
        }

        /* Trust */
        .cta-trust {
          display: flex; align-items: center; justify-content: center;
          gap: 2.25rem; flex-wrap: wrap;
        }
        .cta-trust-item {
          display: flex; align-items: center; gap: 0.5rem;
          color: rgba(255,255,255,0.28); font-size: 0.72rem;
          font-weight: 600; letter-spacing: 0.04em;
        }

        @media (max-width: 768px) {
          .cta-section { padding: 6rem 0; }
          .cta-title { font-size: clamp(2.8rem, 12vw, 5rem); }
          .cta-title-ghost { -webkit-text-stroke: 1.5px rgba(255,255,255,0.22); }
        }
      `}} />
    </section>
  );
}
