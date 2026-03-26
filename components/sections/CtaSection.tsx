'use client';

import Link from 'next/link';
import { useRef, useEffect } from 'react';

export default function CtaSection() {
  const ref     = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo(cardRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true } }
        );
      });
    });
  }, []);

  return (
    <section ref={ref} className="cta-section">
      {/* Background */}
      <div className="cta-bg">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=60"
          alt=""
          aria-hidden="true"
          className="cta-bg-img"
        />
        <div className="cta-overlay" />
      </div>

      <div className="container cta-inner">
        <div ref={cardRef} className="cta-card" style={{ opacity: 0 }}>

          {/* Left content */}
          <div className="cta-left">
            <div className="cta-label">Contactez-nous</div>
            <h2 className="cta-heading">
              Démarrez votre projet<br />
              avec <span>TAZIRA CONSTRUCTION</span>
            </h2>
            <p className="cta-desc">
              Consultation gratuite et devis personnalisé sous 24h.
              Notre équipe d'experts vous accompagne de la conception à la livraison.
            </p>
            <div className="cta-trust">
              {['Devis gratuit', 'Réponse 24h', 'Experts certifiés', 'Garantie travaux'].map((item) => (
                <div key={item} className="cta-trust-item">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right actions */}
          <div className="cta-right">
            <Link href="/contact" className="cta-btn-primary">
              Demander un devis gratuit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <a
              href="https://wa.me/212650596613"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn-wa"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
            <div className="cta-phone">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82a19.79 19.79 0 01-3.07-8.64A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              <a href="tel:+212650596613">+212 650 596 613</a>
            </div>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .cta-section {
          position: relative; overflow: hidden;
          padding: 7rem 0;
        }
        .cta-bg { position: absolute; inset: 0; z-index: 0; }
        .cta-bg-img { width: 100%; height: 100%; object-fit: cover; opacity: 0.08; }
        .cta-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, #060606 0%, #0e0e0e 100%);
        }
        .cta-inner { position: relative; z-index: 2; }

        .cta-card {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 4rem;
          align-items: center;
          padding: 3.5rem 4rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: var(--radius-xl);
          border-left: 3px solid var(--color-primary);
        }

        .cta-label {
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--color-primary);
          margin-bottom: 1.25rem;
        }
        .cta-label::before {
          content: ''; display: block;
          width: 24px; height: 1.5px;
          background: var(--color-primary);
        }

        .cta-heading {
          font-family: var(--font-heading); font-weight: 800;
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          color: var(--color-secondary);
          line-height: 1.2; margin-bottom: 1rem;
        }
        .cta-heading span { color: var(--color-primary); }

        .cta-desc {
          font-size: 0.95rem; line-height: 1.75;
          color: rgba(255,255,255,0.45);
          max-width: 480px; margin-bottom: 2rem;
        }

        .cta-trust {
          display: flex; flex-wrap: wrap; gap: 1rem 2rem;
        }
        .cta-trust-item {
          display: flex; align-items: center; gap: 0.45rem;
          font-size: 0.8rem; font-weight: 600;
          color: rgba(255,255,255,0.4);
        }
        .cta-trust-item svg { color: var(--color-primary); flex-shrink: 0; }

        .cta-right {
          display: flex; flex-direction: column;
          align-items: stretch; gap: 0.85rem;
          min-width: 220px;
        }

        .cta-btn-primary {
          display: flex; align-items: center; justify-content: center; gap: 0.6rem;
          padding: 1rem 2rem;
          background: var(--color-primary); color: white;
          border-radius: var(--radius-md);
          font-family: var(--font-heading); font-size: 0.82rem;
          font-weight: 700; letter-spacing: 0.04em;
          text-decoration: none; transition: all 0.25s;
          white-space: nowrap;
        }
        .cta-btn-primary:hover {
          background: var(--color-primary-dark);
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(196,147,63,0.4);
        }

        .cta-btn-wa {
          display: flex; align-items: center; justify-content: center; gap: 0.6rem;
          padding: 1rem 2rem;
          background: transparent; color: #25d366;
          border: 1.5px solid rgba(37,211,102,0.35);
          border-radius: var(--radius-md);
          font-family: var(--font-heading); font-size: 0.82rem;
          font-weight: 700; letter-spacing: 0.04em;
          text-decoration: none; transition: all 0.25s;
          white-space: nowrap;
        }
        .cta-btn-wa:hover {
          background: #25d366; color: white;
          border-color: #25d366;
          transform: translateY(-2px);
        }

        .cta-phone {
          display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          color: rgba(255,255,255,0.3); font-size: 0.82rem;
          padding-top: 0.25rem;
        }
        .cta-phone a {
          color: rgba(255,255,255,0.5);
          text-decoration: none; font-weight: 600;
          transition: color 0.2s;
        }
        .cta-phone a:hover { color: var(--color-secondary); }

        @media (max-width: 900px) {
          .cta-card {
            grid-template-columns: 1fr;
            padding: 2.5rem 2rem;
            gap: 2.5rem;
          }
          .cta-right { min-width: unset; }
        }
        @media (max-width: 600px) {
          .cta-section { padding: 4rem 0; }
          .cta-card { border-left-width: 2px; }
        }
      `}} />
    </section>
  );
}
