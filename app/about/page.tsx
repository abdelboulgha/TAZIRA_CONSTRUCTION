'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import CtaSection from '@/components/sections/CtaSection';

/* ─── Data ───────────────────────────────────────────────────────────── */

const VALUES = [
  {
    key: 'quality',
    title: 'Qualité',
    desc: "Rigueur technique et finitions impeccables sur chaque chantier, sans exception.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
  },
  {
    key: 'safety',
    title: 'Sécurité',
    desc: "Priorité absolue sur chaque site : normes, équipements et protocoles rigoureux.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    key: 'reliability',
    title: 'Fiabilité',
    desc: "Respect total des délais et des engagements contractuels, projet après projet.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
  },
  {
    key: 'innovation',
    title: 'Innovation',
    desc: "Adoption de techniques modernes et de matériaux durables pour des ouvrages pérennes.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
  },
  {
    key: 'integrity',
    title: 'Intégrité',
    desc: "Transparence totale avec nos clients, de l'étude jusqu'à la livraison clés en main.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
  {
    key: 'sustainability',
    title: 'Durabilité',
    desc: "Engagement fort pour des pratiques responsables et des solutions respectueuses de l'environnement.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 22V12m0 0C12 7 7 4 2 6c5 0 8 3 10 6zm0 0c0-5 5-8 10-6-5 0-8 3-10 6z"/>
      </svg>
    ),
  },
];

const TIMELINE = [
  { year: '2013', title: 'Création', desc: "Fondation de TAZIRA CONSTRUCTION SARL à Marrakech, avec une équipe de 12 professionnels." },
  { year: '2016', title: 'Expansion', desc: "Ouverture de nouveaux marchés et premiers projets d'infrastructure publique au niveau régional." },
  { year: '2019', title: 'Certification', desc: "Obtention des certifications ISO et homologations marocaines pour travaux publics et bâtiment." },
  { year: '2022', title: 'Croissance', desc: "Plus de 150 projets livrés. Renforcement de l'équipe avec 60+ experts et techniciens certifiés." },
  { year: '2024', title: "Aujourd'hui", desc: "Acteur de référence au Maroc avec une capacité de livraison complète sur tout le territoire." },
];

const DOMAINS = [
  {
    title: 'Génie Civil',
    desc: "Conception et réalisation de structures complexes — immeubles, ouvrages d'art, infrastructures routières.",
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=85',
  },
  {
    title: 'Électricité',
    desc: "Installations électriques courant fort et faible pour le résidentiel, le tertiaire et l'industrie.",
    img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=85',
  },
  {
    title: 'Rénovation',
    desc: "Réhabilitation et modernisation de bâtiments avec finitions haut de gamme et respect du patrimoine.",
    img: 'https://images.unsplash.com/photo-1541888081198-b80c102a9eb7?w=800&q=85',
  },
  {
    title: 'Travaux Publics',
    desc: "Routes, VRD, réseaux d'assainissement et aménagements urbains conformes aux normes en vigueur.",
    img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=85',
  },
];

/* ─── Page component ─────────────────────────────────────────────────── */

export default function AboutPage() {
  const heroRef     = useRef<HTMLElement>(null);
  const storyRef    = useRef<HTMLElement>(null);
  const missionRef  = useRef<HTMLElement>(null);
  const valuesRef   = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLElement>(null);
  const domainsRef  = useRef<HTMLElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        /* Hero entrance */
        const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });
        heroTl
          .fromTo('.ab-hero-eyebrow', { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.8 }, 0.3)
          .fromTo('.ab-hero-line1',   { y: 120, skewY: 4 },   { y: 0, skewY: 0, duration: 1.2 }, 0.45)
          .fromTo('.ab-hero-line2',   { y: 120, skewY: 4 },   { y: 0, skewY: 0, duration: 1.2 }, 0.62)
          .fromTo('.ab-hero-sub',     { y: 30, opacity: 0 },  { y: 0, opacity: 1, duration: 0.9 }, 0.85)
          .fromTo('.ab-hero-scroll',  { y: 14, opacity: 0 },  { y: 0, opacity: 1, duration: 0.7 }, 1.1);

        /* Story section */
        gsap.fromTo('.ab-story-text',
          { x: -60, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: storyRef.current, start: 'top 75%', once: true } }
        );
        ['.ab-story-img1', '.ab-story-img2', '.ab-story-img3'].forEach((cls, i) => {
          gsap.fromTo(cls,
            { clipPath: 'inset(100% 0 0 0)' },
            { clipPath: 'inset(0% 0 0 0)', duration: 1.1, delay: i * 0.15, ease: 'power4.out',
              scrollTrigger: { trigger: storyRef.current, start: 'top 72%', once: true } }
          );
        });

        /* Mission + Vision cards */
        gsap.fromTo('.ab-mv-card',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.2, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: missionRef.current, start: 'top 78%', once: true } }
        );

        /* Values */
        gsap.fromTo('.ab-val-header',
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: valuesRef.current, start: 'top 80%', once: true } }
        );
        gsap.fromTo('.ab-val-card',
          { y: 48, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.75, ease: 'power3.out',
            scrollTrigger: { trigger: valuesRef.current, start: 'top 68%', once: true } }
        );

        /* Timeline */
        gsap.fromTo('.ab-tl-item',
          { x: -40, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.16, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: timelineRef.current, start: 'top 72%', once: true } }
        );
        gsap.fromTo('.ab-tl-line-fill',
          { scaleY: 0, transformOrigin: 'top center' },
          { scaleY: 1, duration: 2, ease: 'power2.inOut',
            scrollTrigger: { trigger: timelineRef.current, start: 'top 70%', once: true } }
        );

        /* Domains */
        gsap.fromTo('.ab-domain-card',
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.14, duration: 0.85, ease: 'power3.out',
            scrollTrigger: { trigger: domainsRef.current, start: 'top 72%', once: true } }
        );
      });
    });
  }, []);

  return (
    <div>

      {/* ════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="ab-hero">
        <div className="ab-hero-bg">
          <img
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=88"
            alt=""
            aria-hidden="true"
            className="ab-hero-bg-img"
          />
          <div className="ab-hero-overlay" />
          <div className="ab-hero-overlay-l" />
          <div className="ab-hero-vgrid" aria-hidden="true">
            {[...Array(10)].map((_, i) => <div key={i} className="ab-hero-vline" />)}
          </div>
        </div>

        <div className="ab-hero-content">
          <div className="ab-hero-eyebrow" style={{ opacity: 0 }}>
            <div className="ab-hero-eyebrow-line" />
            <span>TAZIRA CONSTRUCTION · MARRAKECH · MAROC</span>
            <div className="ab-hero-eyebrow-line" />
          </div>

          <div className="ab-hero-title-block">
            <h1 className="ab-hero-title">
              <span className="ab-hero-line-wrap">
                <span className="ab-hero-line1 ab-hero-solid">À PROPOS</span>
              </span>
              <span className="ab-hero-line-wrap">
                <span className="ab-hero-line2 ab-hero-ghost">DE NOUS.</span>
              </span>
            </h1>
          </div>

          <div className="ab-hero-bottom">
            <p className="ab-hero-sub" style={{ opacity: 0 }}>
              Depuis 2013, TAZIRA CONSTRUCTION SARL bâtit l&apos;excellence au cœur du Maroc.
              Découvrez notre histoire, nos valeurs et notre vision.
            </p>
            <div className="ab-hero-scroll" style={{ opacity: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12l7 7 7-7"/>
              </svg>
              <span>Défiler</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          STORY
      ════════════════════════════════════════════════════════ */}
      <section ref={storyRef} className="ab-story">
        <div className="ab-story-dots" />
        <div className="container ab-story-layout">

          {/* Text */}
          <div className="ab-story-text" style={{ opacity: 0 }}>
            <div className="ab-eyebrow">
              <div className="ab-eyebrow-line" />
              <span>Notre Histoire</span>
            </div>
            <h2 className="ab-heading">
              Une décennie de{' '}
              <em className="ab-em">bâtisseurs</em>
            </h2>
            <p className="ab-body">
              Fondée en 2013 à Marrakech, TAZIRA CONSTRUCTION SARL est née de la vision d&apos;entrepreneurs
              marocains déterminés à élever les standards de la construction dans leur pays.
              Dès ses débuts, l&apos;entreprise s&apos;est distinguée par une approche rigoureuse,
              centrée sur la qualité d&apos;exécution et la satisfaction client.
            </p>
            <p className="ab-body" style={{ marginTop: '1rem' }}>
              Au fil des années, notre équipe s&apos;est étoffée d&apos;ingénieurs, de techniciens
              et d&apos;ouvriers spécialisés, tous unis par la même passion du travail bien fait.
              Aujourd&apos;hui, TAZIRA intervient sur des projets d&apos;envergure dans tout le
              Royaume, couvrant le génie civil, l&apos;électricité, la rénovation et les travaux publics.
            </p>

            <div className="ab-story-pills">
              {[
                { icon: '📍', text: 'Basée à Marrakech' },
                { icon: '🏗️', text: 'Fondée en 2013' },
                { icon: '👷', text: '60+ experts' },
                { icon: '✅', text: 'ISO Certifiée' },
              ].map((p, i) => (
                <div key={i} className="ab-pill">
                  <span className="ab-pill-icon">{p.icon}</span>
                  <span className="ab-pill-text">{p.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="ab-story-imgs">
            <div className="ab-story-img ab-story-img1">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=88"
                alt="Chantier TAZIRA"
                className="ab-story-img-inner"
              />
              <div className="ab-story-img-shadow" />
            </div>
            <div className="ab-story-img ab-story-img2">
              <img
                src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=85"
                alt="Équipe TAZIRA"
                className="ab-story-img-inner"
              />
              <div className="ab-story-img-shadow" />
            </div>
            <div className="ab-story-img ab-story-img3">
              <img
                src="https://images.unsplash.com/photo-1541888081198-b80c102a9eb7?w=600&q=85"
                alt="Réalisation TAZIRA"
                className="ab-story-img-inner"
              />
              <div className="ab-story-img-shadow" />
              <div className="ab-story-img-label">
                <div className="ab-story-img-dot" />
                <span>MARRAKECH · MAROC</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          MISSION & VISION
      ════════════════════════════════════════════════════════ */}
      <section ref={missionRef} className="ab-mission">
        <div className="ab-mission-glow" />
        <div className="container">
          <div className="ab-mv-header">
            <div className="ab-eyebrow ab-eyebrow-light">
              <div className="ab-eyebrow-line-light" />
              <span>Mission & Vision</span>
              <div className="ab-eyebrow-line-light" />
            </div>
            <h2 className="ab-heading ab-heading-light">
              Ce qui nous{' '}
              <em className="ab-em">guide</em>
            </h2>
          </div>

          <div className="ab-mv-grid">
            <div className="ab-mv-card">
              <div className="ab-mv-card-top" />
              <div className="ab-mv-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="6"/>
                  <circle cx="12" cy="12" r="2"/>
                </svg>
              </div>
              <h3 className="ab-mv-title">Notre Mission</h3>
              <p className="ab-mv-body">
                Offrir à nos clients des solutions de construction complètes, fiables et durables,
                en respectant les délais, les budgets et les normes les plus exigeantes.
                Nous nous engageons à transformer chaque projet en une réalisation dont nous sommes
                fiers, ensemble.
              </p>
              <ul className="ab-mv-list">
                {["Qualité d'exécution sans compromis", "Respect des engagements", "Satisfaction client garantie"].map((item, i) => (
                  <li key={i} className="ab-mv-list-item">
                    <div className="ab-mv-check" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="ab-mv-card ab-mv-card-accent">
              <div className="ab-mv-card-top ab-mv-card-top-accent" />
              <div className="ab-mv-icon ab-mv-icon-accent">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <h3 className="ab-mv-title ab-mv-title-light">Notre Vision</h3>
              <p className="ab-mv-body ab-mv-body-light">
                Devenir le partenaire de référence de la construction au Maroc, reconnu pour
                son excellence technique, son éthique professionnelle et sa capacité à
                livrer des projets d&apos;envergure avec une précision remarquable.
              </p>
              <ul className="ab-mv-list ab-mv-list-light">
                {["Leadership national dans le BTP", "Innovation et développement durable", "Rayonnement à l'international"].map((item, i) => (
                  <li key={i} className="ab-mv-list-item ab-mv-list-item-light">
                    <div className="ab-mv-check ab-mv-check-light" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          VALUES
      ════════════════════════════════════════════════════════ */}
      <section ref={valuesRef} className="ab-values">
        <div className="ab-values-dots" />
        <div className="container">
          <div className="ab-val-header" style={{ opacity: 0 }}>
            <div className="ab-eyebrow">
              <div className="ab-eyebrow-line" />
              <span>Nos Valeurs</span>
              <div className="ab-eyebrow-line" />
            </div>
            <h2 className="ab-heading">
              Les principes qui{' '}
              <em className="ab-em">nous définissent</em>
            </h2>
            <p className="ab-subtext">
              Chaque décision, chaque projet, chaque geste quotidien reflète les valeurs
              fondamentales qui ont façonné notre entreprise depuis sa création.
            </p>
          </div>

          <div className="ab-val-grid">
            {VALUES.map((v, i) => (
              <div key={v.key} className="ab-val-card" style={{ opacity: 0 }}>
                <div className="ab-val-card-bar" />
                <div className="ab-val-icon">{v.icon}</div>
                <h3 className="ab-val-title">{v.title}</h3>
                <p className="ab-val-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          TIMELINE
      ════════════════════════════════════════════════════════ */}
      <section ref={timelineRef} className="ab-timeline">
        <div className="ab-timeline-bg">
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=60"
            alt=""
            aria-hidden="true"
            className="ab-timeline-bg-img"
          />
          <div className="ab-timeline-overlay" />
        </div>

        <div className="container ab-timeline-inner">
          <div className="ab-tl-header">
            <div className="ab-eyebrow ab-eyebrow-light">
              <div className="ab-eyebrow-line-light" />
              <span>Notre Parcours</span>
              <div className="ab-eyebrow-line-light" />
            </div>
            <h2 className="ab-heading ab-heading-light">
              Une croissance{' '}
              <em className="ab-em">continue</em>
            </h2>
          </div>

          <div className="ab-tl-track">
            <div className="ab-tl-line">
              <div className="ab-tl-line-fill" />
            </div>

            {TIMELINE.map((item, i) => (
              <div key={i} className="ab-tl-item" style={{ opacity: 0 }}>
                <div className="ab-tl-dot">
                  <div className="ab-tl-dot-inner" />
                </div>
                <div className="ab-tl-content">
                  <div className="ab-tl-year">{item.year}</div>
                  <h4 className="ab-tl-title">{item.title}</h4>
                  <p className="ab-tl-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          DOMAINS OF EXPERTISE
      ════════════════════════════════════════════════════════ */}
      <section ref={domainsRef} className="ab-domains">
        <div className="ab-domains-dots" />
        <div className="container">
          <div className="ab-dom-header">
            <div className="ab-eyebrow">
              <div className="ab-eyebrow-line" />
              <span>Nos Domaines</span>
              <div className="ab-eyebrow-line" />
            </div>
            <h2 className="ab-heading">
              Expertise{' '}
              <em className="ab-em">complète</em>
            </h2>
            <p className="ab-subtext">
              Quatre pôles d&apos;expertise complémentaires pour couvrir tous vos besoins
              en construction et travaux.
            </p>
          </div>

          <div className="ab-domain-grid">
            {DOMAINS.map((d, i) => (
              <div key={i} className="ab-domain-card" style={{ opacity: 0 }}>
                <div className="ab-domain-img-wrap">
                  <img src={d.img} alt={d.title} className="ab-domain-img" />
                  <div className="ab-domain-img-overlay" />
                </div>
                <div className="ab-domain-body">
                  <div className="ab-domain-num">0{i + 1}</div>
                  <h3 className="ab-domain-title">{d.title}</h3>
                  <p className="ab-domain-desc">{d.desc}</p>
                  <Link href="/services" className="ab-domain-link">
                    En savoir plus
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          CTA
      ════════════════════════════════════════════════════════ */}
      <CtaSection />

      {/* ═══════════════════════════ STYLES ══════════════════════════════ */}
      <style dangerouslySetInnerHTML={{ __html: `

        /* ── Shared helpers ─────────────────────────────────── */
        .ab-eyebrow {
          display: flex; align-items: center; gap: 0.85rem;
          margin-bottom: 1.6rem; justify-content: flex-start;
        }
        .ab-eyebrow-light { justify-content: center; }
        .ab-eyebrow-line {
          width: 36px; height: 1.5px;
          background: var(--color-primary); flex-shrink: 0;
        }
        .ab-eyebrow-line-light {
          width: 36px; height: 1.5px;
          background: rgba(212,43,43,0.6); flex-shrink: 0;
        }
        .ab-eyebrow span {
          font-size: 0.65rem; font-weight: 800;
          letter-spacing: 0.24em; text-transform: uppercase;
          color: var(--color-primary);
        }
        .ab-eyebrow-light span { color: rgba(212,43,43,0.85); }
        .ab-heading {
          font-family: var(--font-heading); font-weight: 900;
          font-size: clamp(2.4rem, 4.5vw, 3.8rem);
          line-height: 1.04; letter-spacing: -0.04em;
          color: var(--color-secondary); margin-bottom: 1.25rem;
        }
        .ab-heading-light { color: white; text-align: center; }
        .ab-em { color: var(--color-primary); font-style: italic; }
        .ab-body {
          font-size: 0.975rem; line-height: 1.9;
          color: var(--color-text-muted);
        }
        .ab-subtext {
          font-size: 0.96rem; line-height: 1.82;
          color: var(--color-text-muted);
          max-width: 480px; margin: 0 auto;
          text-align: center;
        }

        /* ── HERO ───────────────────────────────────────────── */
        .ab-hero {
          position: relative;
          width: 100%; height: 100vh; min-height: 680px;
          overflow: hidden;
          display: flex; flex-direction: column; justify-content: flex-end;
        }
        .ab-hero-bg { position: absolute; inset: 0; z-index: 0; }
        .ab-hero-bg-img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center 35%;
        }
        .ab-hero-overlay {
          position: absolute; inset: 0;
          background: rgba(4,4,4,0.7);
        }
        .ab-hero-overlay-l {
          position: absolute; inset: 0;
          background: linear-gradient(105deg,
            rgba(4,4,4,0.95) 0%,
            rgba(4,4,4,0.6) 55%,
            transparent 100%);
        }
        .ab-hero-vgrid {
          position: absolute; inset: 0;
          display: flex; justify-content: space-between;
          pointer-events: none;
        }
        .ab-hero-vline {
          width: 1px; height: 100%;
          background: rgba(255,255,255,0.04);
        }
        .ab-hero-content {
          position: relative; z-index: 2;
          display: flex; flex-direction: column;
          justify-content: space-between;
          height: 100%;
          padding: calc(var(--navbar-height) + 3.5rem) 0 0;
        }
        .ab-hero-eyebrow {
          display: flex; align-items: center; gap: 1rem;
          padding: 0 4rem;
        }
        .ab-hero-eyebrow-line {
          height: 1px; width: 36px;
          background: rgba(212,43,43,0.6); flex-shrink: 0;
        }
        .ab-hero-eyebrow span {
          font-size: 0.58rem; font-weight: 700;
          letter-spacing: 0.26em; text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          white-space: nowrap;
        }
        .ab-hero-title-block {
          padding: 0 4rem; flex: 1;
          display: flex; align-items: center;
        }
        .ab-hero-title {
          font-family: var(--font-heading); font-weight: 900;
          font-size: clamp(5rem, 12vw, 11rem);
          line-height: 0.88; letter-spacing: -0.04em;
          text-transform: uppercase; margin: 0;
        }
        .ab-hero-line-wrap {
          display: block; overflow: hidden; padding: 0.04em 0;
        }
        .ab-hero-solid { display: block; color: #ffffff; }
        .ab-hero-ghost {
          display: block; color: transparent;
          -webkit-text-stroke: 2px rgba(255,255,255,0.32);
        }
        .ab-hero-bottom {
          padding: 0 4rem 3.5rem;
          display: flex; align-items: flex-end;
          justify-content: space-between; gap: 2rem;
        }
        .ab-hero-sub {
          font-size: 0.92rem; line-height: 1.82;
          color: rgba(255,255,255,0.5);
          max-width: 400px;
        }
        .ab-hero-scroll {
          display: flex; align-items: center; gap: 0.55rem;
          color: rgba(255,255,255,0.28);
          font-size: 0.6rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          flex-shrink: 0;
        }

        /* ── STORY ──────────────────────────────────────────── */
        .ab-story {
          background: white;
          padding: 10rem 0;
          position: relative; overflow: hidden;
        }
        .ab-story-dots {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .ab-story-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 7rem; align-items: center;
          position: relative; z-index: 1;
        }
        .ab-story-imgs {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          grid-template-rows: 1.1fr 0.9fr;
          gap: 8px;
          height: 580px;
        }
        .ab-story-img {
          overflow: hidden; border-radius: 4px;
          position: relative;
        }
        .ab-story-img1 { grid-column: 1; grid-row: 1; }
        .ab-story-img2 { grid-column: 2; grid-row: 1 / span 2; }
        .ab-story-img3 { grid-column: 1; grid-row: 2; }
        .ab-story-img-inner {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 0.9s ease;
        }
        .ab-story-img:hover .ab-story-img-inner { transform: scale(1.05); }
        .ab-story-img-shadow {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 50%);
          pointer-events: none;
        }
        .ab-story-img-label {
          position: absolute; bottom: 1rem; left: 1rem;
          display: flex; align-items: center; gap: 0.45rem;
        }
        .ab-story-img-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--color-primary);
        }
        .ab-story-img-label span {
          font-size: 0.56rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,255,255,0.55);
        }
        .ab-story-pills {
          display: flex; flex-wrap: wrap; gap: 0.65rem;
          margin-top: 2.5rem;
        }
        .ab-pill {
          display: inline-flex; align-items: center; gap: 0.45rem;
          padding: 0.5rem 0.9rem;
          background: var(--color-bg-light);
          border: 1px solid var(--color-border-light);
          border-radius: 100px;
          font-size: 0.72rem; font-weight: 600;
          color: var(--color-text-muted);
          transition: border-color 0.25s, background 0.25s;
        }
        .ab-pill:hover {
          border-color: rgba(212,43,43,0.3);
          background: rgba(212,43,43,0.04);
        }
        .ab-pill-icon { font-size: 0.85rem; }
        .ab-pill-text {}

        /* ── MISSION / VISION ───────────────────────────────── */
        .ab-mission {
          background: #060606;
          padding: 10rem 0;
          position: relative; overflow: hidden;
        }
        .ab-mission-glow {
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212,43,43,0.07) 0%, transparent 70%);
        }
        .ab-mv-header {
          text-align: center; margin-bottom: 5rem;
          position: relative; z-index: 1;
        }
        .ab-mv-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 2rem;
          position: relative; z-index: 1;
        }
        .ab-mv-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; padding: 3rem;
          position: relative; overflow: hidden;
          transition: border-color 0.35s, background 0.35s;
        }
        .ab-mv-card:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.12);
        }
        .ab-mv-card-accent {
          background: rgba(212,43,43,0.06);
          border-color: rgba(212,43,43,0.18);
        }
        .ab-mv-card-accent:hover {
          background: rgba(212,43,43,0.09);
          border-color: rgba(212,43,43,0.3);
        }
        .ab-mv-card-top {
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background: rgba(255,255,255,0.06);
        }
        .ab-mv-card-top-accent {
          background: linear-gradient(90deg, var(--color-primary) 0%, rgba(212,43,43,0.3) 100%);
        }
        .ab-mv-icon {
          width: 60px; height: 60px; border-radius: 14px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.6);
          margin-bottom: 1.75rem;
        }
        .ab-mv-icon-accent {
          background: rgba(212,43,43,0.15);
          border-color: rgba(212,43,43,0.25);
          color: var(--color-primary);
        }
        .ab-mv-title {
          font-family: var(--font-heading); font-weight: 900;
          font-size: 1.4rem; color: rgba(255,255,255,0.65);
          margin-bottom: 1.1rem; letter-spacing: -0.02em;
        }
        .ab-mv-title-light { color: white; }
        .ab-mv-body {
          font-size: 0.92rem; line-height: 1.88;
          color: rgba(255,255,255,0.3);
          margin-bottom: 2rem;
        }
        .ab-mv-body-light { color: rgba(255,255,255,0.5); }
        .ab-mv-list { list-style: none; display: flex; flex-direction: column; gap: 0.7rem; }
        .ab-mv-list-light {}
        .ab-mv-list-item {
          display: flex; align-items: center; gap: 0.75rem;
          font-size: 0.82rem; color: rgba(255,255,255,0.28);
          font-weight: 500;
        }
        .ab-mv-list-item-light { color: rgba(255,255,255,0.55); }
        .ab-mv-check {
          width: 16px; height: 16px; border-radius: 50%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          flex-shrink: 0;
        }
        .ab-mv-check-light {
          background: rgba(212,43,43,0.2);
          border-color: rgba(212,43,43,0.35);
        }

        /* ── VALUES ─────────────────────────────────────────── */
        .ab-values {
          background: white;
          padding: 10rem 0;
          position: relative; overflow: hidden;
        }
        .ab-values-dots {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .ab-val-header {
          text-align: center; margin-bottom: 5.5rem;
          position: relative; z-index: 1;
        }
        .ab-val-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          position: relative; z-index: 1;
        }
        .ab-val-card {
          padding: 2.25rem;
          border: 1px solid var(--color-border-light);
          border-radius: 12px; background: white;
          position: relative; overflow: hidden;
          transition: box-shadow 0.35s, transform 0.35s, border-color 0.35s;
          cursor: default;
        }
        .ab-val-card:hover {
          box-shadow: 0 20px 56px rgba(0,0,0,0.08);
          transform: translateY(-6px);
          border-color: rgba(212,43,43,0.2);
        }
        .ab-val-card-bar {
          position: absolute; top: 0; left: 0;
          width: 40px; height: 3px;
          background: var(--color-primary);
          border-radius: 0 0 3px 0;
          transition: width 0.4s ease;
        }
        .ab-val-card:hover .ab-val-card-bar { width: 100%; }
        .ab-val-icon {
          width: 52px; height: 52px; border-radius: 12px;
          background: rgba(212,43,43,0.06);
          border: 1px solid rgba(212,43,43,0.12);
          display: flex; align-items: center; justify-content: center;
          color: var(--color-primary);
          margin-bottom: 1.5rem;
          transition: background 0.3s, transform 0.3s;
        }
        .ab-val-card:hover .ab-val-icon {
          background: rgba(212,43,43,0.1);
          transform: scale(1.08);
        }
        .ab-val-title {
          font-family: var(--font-heading); font-weight: 900;
          font-size: 1rem; color: var(--color-secondary);
          margin-bottom: 0.65rem;
        }
        .ab-val-desc {
          font-size: 0.845rem; color: var(--color-text-muted);
          line-height: 1.72;
        }

        /* ── TIMELINE ───────────────────────────────────────── */
        .ab-timeline {
          background: #080808;
          padding: 10rem 0;
          position: relative; overflow: hidden;
        }
        .ab-timeline-bg {
          position: absolute; inset: 0; z-index: 0;
        }
        .ab-timeline-bg-img {
          width: 100%; height: 100%; object-fit: cover; opacity: 0.08;
        }
        .ab-timeline-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom,
            rgba(8,8,8,0.98) 0%,
            rgba(8,8,8,0.88) 50%,
            rgba(8,8,8,0.98) 100%);
        }
        .ab-timeline-inner {
          position: relative; z-index: 2;
        }
        .ab-tl-header {
          text-align: center; margin-bottom: 6rem;
        }
        .ab-tl-track {
          position: relative;
          max-width: 760px; margin: 0 auto;
        }
        .ab-tl-line {
          position: absolute; left: 18px; top: 8px; bottom: 8px;
          width: 2px;
          background: rgba(255,255,255,0.06);
          overflow: hidden;
        }
        .ab-tl-line-fill {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, var(--color-primary) 0%, rgba(212,43,43,0.2) 100%);
        }
        .ab-tl-item {
          display: flex; gap: 3rem;
          padding: 0 0 3.5rem 0;
          position: relative;
        }
        .ab-tl-item:last-child { padding-bottom: 0; }
        .ab-tl-dot {
          width: 38px; height: 38px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: rgba(212,43,43,0.1);
          border: 1.5px solid rgba(212,43,43,0.3);
          border-radius: 50%;
        }
        .ab-tl-dot-inner {
          width: 10px; height: 10px; border-radius: 50%;
          background: var(--color-primary);
        }
        .ab-tl-content { flex: 1; padding-top: 6px; }
        .ab-tl-year {
          font-family: var(--font-heading); font-weight: 900;
          font-size: 0.65rem; color: var(--color-primary);
          letter-spacing: 0.2em; text-transform: uppercase;
          margin-bottom: 0.4rem;
        }
        .ab-tl-title {
          font-family: var(--font-heading); font-weight: 800;
          font-size: 1.15rem; color: white;
          margin-bottom: 0.55rem;
        }
        .ab-tl-desc {
          font-size: 0.875rem; line-height: 1.78;
          color: rgba(255,255,255,0.35);
        }

        /* ── DOMAINS ────────────────────────────────────────── */
        .ab-domains {
          background: white;
          padding: 10rem 0;
          position: relative; overflow: hidden;
        }
        .ab-domains-dots {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .ab-dom-header {
          text-align: center; margin-bottom: 5.5rem;
          position: relative; z-index: 1;
        }
        .ab-domain-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          position: relative; z-index: 1;
        }
        .ab-domain-card {
          border: 1px solid var(--color-border-light);
          border-radius: 12px; overflow: hidden;
          background: white;
          transition: box-shadow 0.35s, transform 0.35s, border-color 0.35s;
          cursor: default;
        }
        .ab-domain-card:hover {
          box-shadow: 0 24px 64px rgba(0,0,0,0.1);
          transform: translateY(-8px);
          border-color: rgba(212,43,43,0.2);
        }
        .ab-domain-img-wrap {
          height: 200px; overflow: hidden; position: relative;
        }
        .ab-domain-img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.8s ease;
        }
        .ab-domain-card:hover .ab-domain-img { transform: scale(1.08); }
        .ab-domain-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 55%);
        }
        .ab-domain-body { padding: 1.75rem; }
        .ab-domain-num {
          font-family: var(--font-heading); font-weight: 900;
          font-size: 0.6rem; color: var(--color-primary);
          letter-spacing: 0.16em; text-transform: uppercase;
          margin-bottom: 0.5rem;
        }
        .ab-domain-title {
          font-family: var(--font-heading); font-weight: 900;
          font-size: 1.05rem; color: var(--color-secondary);
          margin-bottom: 0.7rem; letter-spacing: -0.01em;
        }
        .ab-domain-desc {
          font-size: 0.82rem; line-height: 1.72;
          color: var(--color-text-muted);
          margin-bottom: 1.25rem;
        }
        .ab-domain-link {
          display: inline-flex; align-items: center; gap: 0.45rem;
          font-family: var(--font-heading); font-size: 0.62rem;
          font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--color-primary); text-decoration: none;
          transition: gap 0.25s;
        }
        .ab-domain-link:hover { gap: 0.7rem; }

        /* ── RESPONSIVE ─────────────────────────────────────── */
        @media (max-width: 1100px) {
          .ab-hero-title { font-size: clamp(4rem, 10vw, 8rem); }
          .ab-domain-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 960px) {
          .ab-story-layout { grid-template-columns: 1fr; gap: 4rem; }
          .ab-story-imgs { height: 400px; }
          .ab-mv-grid { grid-template-columns: 1fr; }
          .ab-val-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .ab-hero-title { font-size: clamp(3.5rem, 13vw, 6rem); }
          .ab-hero-eyebrow,
          .ab-hero-title-block,
          .ab-hero-bottom { padding-left: 2rem; padding-right: 2rem; }
          .ab-hero-bottom { flex-direction: column; align-items: flex-start; }
          .ab-story, .ab-mission, .ab-values, .ab-timeline, .ab-domains {
            padding: 6rem 0;
          }
        }
        @media (max-width: 600px) {
          .ab-hero-ghost { -webkit-text-stroke: 1.5px rgba(255,255,255,0.32); }
          .ab-val-grid { grid-template-columns: 1fr; }
          .ab-domain-grid { grid-template-columns: 1fr; }
          .ab-tl-item { gap: 1.5rem; }
          .ab-story-imgs {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr;
            height: 280px;
          }
          .ab-story-img3 { display: none; }
          .ab-story-img2 { grid-row: 1; }
        }
      `}} />
    </div>
  );
}
