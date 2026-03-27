'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import CtaSection from '@/components/sections/CtaSection';

/* ─── Data ───────────────────────────────────────────────────────────── */

const VALUES = [
  {
    key: 'quality',
    title: 'Qualité',
    desc: "Rigueur technique et finitions impeccables sur chaque chantier, sans exception ni compromis.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
  },
  {
    key: 'safety',
    title: 'Sécurité',
    desc: "Priorité absolue sur chaque site : normes strictes, équipements homologués et protocoles rigoureux.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    key: 'reliability',
    title: 'Fiabilité',
    desc: "Respect total des délais et des engagements contractuels, projet après projet, sans défaillance.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
  },
  {
    key: 'innovation',
    title: 'Innovation',
    desc: "Adoption de techniques modernes et de matériaux durables pour des ouvrages pérennes et performants.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
  },
  {
    key: 'integrity',
    title: 'Intégrité',
    desc: "Transparence totale avec nos clients, de l'étude préliminaire jusqu'à la livraison clés en main.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
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
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 22V12m0 0C12 7 7 4 2 6c5 0 8 3 10 6zm0 0c0-5 5-8 10-6-5 0-8 3-10 6z"/>
      </svg>
    ),
  },
];

const TIMELINE = [
  { year: '2013', title: 'Création', desc: "Fondation de TAZIRA CONSTRUCTION SARL à Marrakech avec une équipe fondatrice de 12 professionnels passionnés." },
  { year: '2016', title: 'Expansion', desc: "Ouverture de nouveaux marchés et premiers projets d'infrastructure publique au niveau régional." },
  { year: '2019', title: 'Certification', desc: "Obtention des certifications ISO et homologations marocaines pour travaux publics et bâtiment." },
  { year: '2022', title: 'Croissance', desc: "Plus de 150 projets livrés. Renforcement de l'équipe avec 60+ experts et techniciens certifiés." },
  { year: '2024', title: "Aujourd'hui", desc: "Acteur de référence au Maroc avec une capacité de livraison complète sur tout le territoire national." },
];

const DOMAINS = [
  {
    title: 'Génie Civil',
    desc: "Conception et réalisation de structures complexes : immeubles, ouvrages d'art, infrastructures routières.",
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=88',
  },
  {
    title: 'Électricité',
    desc: "Installations électriques courant fort et faible pour le résidentiel, le tertiaire et l'industrie.",
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=85',
  },
  {
    title: 'Rénovation',
    desc: "Réhabilitation et modernisation de bâtiments avec finitions haut de gamme et respect du patrimoine.",
    img: '/assets/service_renovation.png',
  },
  {
    title: 'Travaux Publics',
    desc: "Routes, VRD, réseaux d'assainissement et aménagements urbains conformes aux normes en vigueur.",
    img: '/assets/service_public_works.png',
  },
];

const PILLS = [
  {
    text: 'Basée à Marrakech',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
  {
    text: 'Fondée en 2013',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    text: '60+ experts',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
  {
    text: 'ISO Certifiée',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
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

        /* Story */
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

        /* Mission + Vision */
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

      {/* ════ HERO ════════════════════════════════════════════ */}
      <section ref={heroRef} className="ab-hero">
        <div className="ab-hero-bg">
          <img
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=88"
            alt="" aria-hidden="true"
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
            <div className="ab-hero-eline" />
            <span>TAZIRA CONSTRUCTION · MARRAKECH · MAROC</span>
            <div className="ab-hero-eline" />
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

      {/* ════ STORY ════════════════════════════════════════════ */}
      <section ref={storyRef} className="ab-story">
        <div className="ab-story-grid" aria-hidden="true" />
        <div className="container ab-story-layout">

          <div className="ab-story-text" style={{ opacity: 0 }}>
            <div className="ab-eyebrow">
              
              <span>Notre Histoire</span>
            </div>
            <h2 className="ab-heading">
              Une décennie de{' '}
              <em className="ab-em">bâtisseurs</em>
            </h2>
            <p className="ab-body">
              Fondée en 2013 à Marrakech, TAZIRA CONSTRUCTION SARL est née de la vision
              d&apos;entrepreneurs marocains déterminés à élever les standards de la construction
              dans leur pays. Dès ses débuts, l&apos;entreprise s&apos;est distinguée par une
              approche rigoureuse, centrée sur la qualité d&apos;exécution et la satisfaction client.
            </p>
            <p className="ab-body ab-body-mt">
              Au fil des années, notre équipe s&apos;est étoffée d&apos;ingénieurs, de techniciens
              et d&apos;ouvriers spécialisés, tous unis par la même passion du travail bien fait.
              Aujourd&apos;hui, TAZIRA intervient sur des projets d&apos;envergure dans tout le
              Royaume, couvrant le génie civil, l&apos;électricité, la rénovation et les travaux publics.
            </p>
            <div className="ab-pills">
              {PILLS.map((p, i) => (
                <div key={i} className="ab-pill">
                  <span className="ab-pill-icon">{p.icon}</span>
                  <span>{p.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ab-story-imgs">
            <div className="ab-story-img ab-story-img1">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=88"
                alt="Chantier TAZIRA"
                className="ab-img-inner"
              />
              <div className="ab-img-shadow" />
            </div>
            <div className="ab-story-img ab-story-img2">
              <img
                src="/assets/image2.png"
                alt="Equipe TAZIRA"
                className="ab-img-inner"
              />
              <div className="ab-img-shadow" />
            </div>
            <div className="ab-story-img ab-story-img3">
              <img
                src="/assets/image3.png"
                alt="Realisation TAZIRA"
                className="ab-img-inner"
              />
              <div className="ab-img-shadow" />
              <div className="ab-img-label">
                <div className="ab-img-dot" />
                <span>MARRAKECH · MAROC</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ MISSION & VISION ════════════════════════════════ */}
      <section ref={missionRef} className="ab-mission">
        <div className="container">

          <div className="ab-mv-header">
            <div className="ab-eyebrow ab-eyebrow-center">
              
              <span className="ab-eyebrow-span-r">Mission &amp; Vision</span>
              
            </div>
            <h2 className="ab-heading ab-heading-white ab-heading-center">
              Notre raison d&apos;être
            </h2>
          </div>

          <div className="ab-mv-grid">
            {/* Mission */}
            <div className="ab-mv-card">
              <div className="ab-mv-num">01</div>
              <h3 className="ab-mv-title">Notre Mission</h3>
              <p className="ab-mv-body">
                Offrir à nos clients des solutions de construction complètes, fiables et durables,
                en respectant les délais, les budgets et les normes les plus exigeantes.
                Transformer chaque projet en une réalisation dont nous sommes fiers, ensemble.
              </p>
              <ul className="ab-mv-list">
                {["Qualité d'exécution sans compromis", "Respect des engagements", "Satisfaction client garantie"].map((item, i) => (
                  <li key={i} className="ab-mv-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Divider */}
            <div className="ab-mv-divider" />

            {/* Vision */}
            <div className="ab-mv-card">
              <div className="ab-mv-num">02</div>
              <h3 className="ab-mv-title">Notre Vision</h3>
              <p className="ab-mv-body">
                Devenir le partenaire de référence de la construction au Maroc, reconnu pour
                son excellence technique, son éthique professionnelle et sa capacité à livrer
                des projets d&apos;envergure avec une précision remarquable.
              </p>
              <ul className="ab-mv-list">
                {["Leadership national dans le BTP", "Innovation et développement durable", "Rayonnement à l'international"].map((item, i) => (
                  <li key={i} className="ab-mv-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* ════ VALUES ══════════════════════════════════════════ */}
      <section ref={valuesRef} className="ab-values">
        <div className="ab-values-grid-bg" aria-hidden="true" />
        <div className="container">
          <div className="ab-val-header">
            <div className="ab-eyebrow ab-eyebrow-center">
              
              <span>Nos Valeurs</span>
              
            </div>
            <h2 className="ab-heading ab-heading-center">
              Les principes qui{' '}
              <em className="ab-em">nous définissent</em>
            </h2>
            <p className="ab-subtext">
              Chaque décision, chaque projet, chaque geste quotidien reflète les valeurs
              fondamentales qui ont façonné notre entreprise depuis sa création.
            </p>
          </div>

          <div className="ab-val-grid">
            {VALUES.map((v) => (
              <div key={v.key} className="ab-val-card">
                <div className="ab-val-bar" />
                <div className="ab-val-icon">{v.icon}</div>
                <h3 className="ab-val-title">{v.title}</h3>
                <p className="ab-val-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ TIMELINE ════════════════════════════════════════ */}
      <section ref={timelineRef} className="ab-timeline">
        <div className="ab-tl-bg">
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=60"
            alt="" aria-hidden="true"
            className="ab-tl-bg-img"
          />
          <div className="ab-tl-overlay" />
        </div>
        <div className="container ab-tl-inner">
          <div className="ab-tl-header">
            <div className="ab-eyebrow ab-eyebrow-center">
              
              <span className="ab-eyebrow-span-r">Notre Parcours</span>
              
            </div>
            <h2 className="ab-heading ab-heading-white ab-heading-center">
              Une croissance <em className="ab-em">continue</em>
            </h2>
          </div>

          <div className="ab-tl-track">
            <div className="ab-tl-line">
              <div className="ab-tl-line-fill" />
            </div>
            {TIMELINE.map((item, i) => (
              <div key={i} className="ab-tl-item">
                <div className="ab-tl-dot">
                  <div className="ab-tl-dot-core" />
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

      {/* ════ DOMAINS ═════════════════════════════════════════ */}
      <section ref={domainsRef} className="ab-domains">
        <div className="ab-domains-grid-bg" aria-hidden="true" />
        <div className="container">
          <div className="ab-dom-header">
            <div className="ab-eyebrow ab-eyebrow-center">
              
              <span>Nos Domaines</span>
              
            </div>
            <h2 className="ab-heading ab-heading-center">
              Expertise <em className="ab-em">complète</em>
            </h2>
            <p className="ab-subtext">
              Quatre pôles d&apos;expertise complémentaires pour couvrir tous vos besoins
              en construction et travaux.
            </p>
          </div>

          <div className="ab-domain-grid">
            {DOMAINS.map((d, i) => (
              <div key={i} className="ab-domain-card">
                <div className="ab-domain-img-wrap">
                  <img src={d.img} alt={d.title} className="ab-domain-img" />
                  <div className="ab-domain-img-overlay" />
                  <div className="ab-domain-num-overlay">0{i + 1}</div>
                </div>
                <div className="ab-domain-body">
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

      <CtaSection />

      {/* ════ STYLES ══════════════════════════════════════════ */}
      <style dangerouslySetInnerHTML={{ __html: `

        /* ── Shared ─────────────────────────────────────────── */
        .ab-eyebrow {
          display: flex; align-items: center; gap: 0.85rem;
          margin-bottom: 1.6rem;
        }
        .ab-eyebrow-center { justify-content: center; }
        .ab-eline { display: none; }
        .ab-eline-r { display: none; }
        .ab-eyebrow span {
          font-size: 0.65rem; font-weight: 800;
          letter-spacing: 0.24em; text-transform: uppercase;
          color: var(--color-primary);
        }
        .ab-eyebrow-span-r { color: rgba(196,147,63,0.8) !important; }
        .ab-heading {
          font-family: var(--font-heading); font-weight: 900;
          font-size: clamp(2.4rem, 4.5vw, 3.8rem);
          line-height: 1.04; letter-spacing: -0.04em;
          color: var(--color-secondary);
          margin-bottom: 1.25rem;
        }
        .ab-heading-white { color: white; }
        .ab-heading-center { text-align: center; }
        .ab-em { color: var(--color-primary); font-style: italic; }
        .ab-body {
          font-size: 0.975rem; line-height: 1.9;
          color: var(--color-text-muted);
        }
        .ab-body-mt { margin-top: 1rem; }
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
          position: absolute; inset: 0; background: rgba(4,4,4,0.72);
        }
        .ab-hero-overlay-l {
          position: absolute; inset: 0;
          background: linear-gradient(105deg,
            rgba(4,4,4,0.95) 0%, rgba(4,4,4,0.6) 55%, transparent 100%);
        }
        .ab-hero-vgrid {
          position: absolute; inset: 0;
          display: flex; justify-content: space-between; pointer-events: none;
        }
        .ab-hero-vline { width: 1px; height: 100%; background: rgba(255,255,255,0.04); }
        .ab-hero-content {
          position: relative; z-index: 2;
          display: flex; flex-direction: column;
          justify-content: space-between;
          height: 100%;
          padding: calc(var(--navbar-height) + 3.5rem) 0 0;
        }
        .ab-hero-eyebrow {
          display: flex; align-items: center; gap: 1rem; padding: 0 4rem;
        }
        .ab-hero-eline {
          height: 1px; width: 36px;
          background: rgba(196,147,63,0.6); flex-shrink: 0;
        }
        .ab-hero-eyebrow span {
          font-size: 0.58rem; font-weight: 700;
          letter-spacing: 0.26em; text-transform: uppercase;
          color: rgba(255,255,255,0.3); white-space: nowrap;
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
        .ab-hero-line-wrap { display: block; overflow: hidden; padding: 0.04em 0; }
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
          color: rgba(255,255,255,0.48); max-width: 400px;
        }
        .ab-hero-scroll {
          display: flex; align-items: center; gap: 0.55rem;
          color: rgba(255,255,255,0.25);
          font-size: 0.6rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase; flex-shrink: 0;
        }

        /* ── STORY ──────────────────────────────────────────── */
        .ab-story {
          background: var(--color-bg);
          padding: 10rem 0;
          position: relative; overflow: hidden;
        }
        .ab-story-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 80px 80px;
        }
        .ab-story-layout {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 7rem; align-items: center;
          position: relative; z-index: 1;
        }
        .ab-story-imgs {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          grid-template-rows: 1.1fr 0.9fr;
          gap: 8px; height: 580px;
        }
        .ab-story-img {
          overflow: hidden; border-radius: 4px; position: relative;
        }
        .ab-story-img1 { grid-column: 1; grid-row: 1; }
        .ab-story-img2 { grid-column: 2; grid-row: 1 / span 2; }
        .ab-story-img3 { grid-column: 1; grid-row: 2; }
        .ab-img-inner {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 0.9s ease;
        }
        .ab-story-img:hover .ab-img-inner { transform: scale(1.05); }
        .ab-img-shadow {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 55%);
          pointer-events: none;
        }
        .ab-img-label {
          position: absolute; bottom: 1rem; left: 1rem;
          display: flex; align-items: center; gap: 0.45rem;
        }
        .ab-img-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--color-primary);
        }
        .ab-img-label span {
          font-size: 0.56rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,255,255,0.5);
        }
        .ab-pills {
          display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 2.5rem;
        }
        .ab-pill {
          display: inline-flex; align-items: center; gap: 0.45rem;
          padding: 0.5rem 0.9rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 100px;
          font-size: 0.72rem; font-weight: 600;
          color: var(--color-text-muted);
          transition: border-color 0.25s, background 0.25s, color 0.25s;
        }
        .ab-pill:hover {
          border-color: rgba(196,147,63,0.35);
          background: rgba(196,147,63,0.06);
          color: rgba(255,255,255,0.7);
        }
        .ab-pill-icon { color: var(--color-primary); flex-shrink: 0; }

        /* ── MISSION / VISION ───────────────────────────────── */
        .ab-mission {
          background: #060606;
          padding: 8rem 0;
        }
        .ab-mv-header {
          text-align: center; margin-bottom: 5rem;
        }
        .ab-mv-grid {
          display: grid;
          grid-template-columns: 1fr 1px 1fr;
          gap: 0 4rem;
          align-items: start;
        }
        .ab-mv-divider {
          background: rgba(255,255,255,0.08);
          align-self: stretch;
        }
        .ab-mv-card {
          padding: 0.5rem 0;
        }
        .ab-mv-num {
          font-family: var(--font-heading); font-weight: 900;
          font-size: 3rem; color: rgba(196,147,63,0.15);
          line-height: 1; margin-bottom: 1rem;
          letter-spacing: -0.05em;
        }
        .ab-mv-title {
          font-family: var(--font-heading); font-weight: 700;
          font-size: 1.25rem; color: var(--color-secondary);
          margin-bottom: 1rem;
        }
        .ab-mv-body {
          font-size: 0.9rem; line-height: 1.85;
          color: rgba(255,255,255,0.45);
          margin-bottom: 1.75rem;
        }
        .ab-mv-list { list-style: none; display: flex; flex-direction: column; gap: 0.65rem; }
        .ab-mv-item {
          display: flex; align-items: center; gap: 0.65rem;
          font-size: 0.85rem; color: rgba(255,255,255,0.55); font-weight: 500;
        }

        /* ── VALUES ─────────────────────────────────────────── */
        .ab-values {
          background: var(--color-bg);
          padding: 10rem 0;
          position: relative; overflow: hidden;
        }
        .ab-values-grid-bg {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 80px 80px;
        }
        .ab-val-header {
          text-align: center; margin-bottom: 5.5rem; position: relative; z-index: 1;
        }
        .ab-val-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem; position: relative; z-index: 1;
        }
        .ab-val-card {
          padding: 2.25rem;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          background: rgba(255,255,255,0.03);
          position: relative; overflow: hidden;
          transition: box-shadow 0.35s, transform 0.35s, border-color 0.35s, background 0.35s;
          cursor: default;
        }
        .ab-val-card:hover {
          background: rgba(255,255,255,0.05);
          transform: translateY(-6px);
          border-color: rgba(196,147,63,0.25);
          box-shadow: 0 20px 56px rgba(0,0,0,0.5);
        }
        .ab-val-bar {
          position: absolute; top: 0; left: 0;
          width: 40px; height: 3px;
          background: var(--color-primary);
          border-radius: 0 0 3px 0;
          transition: width 0.4s ease;
        }
        .ab-val-card:hover .ab-val-bar { width: 100%; }
        .ab-val-icon {
          width: 52px; height: 52px; border-radius: 12px;
          background: rgba(196,147,63,0.1);
          border: 1px solid rgba(196,147,63,0.2);
          display: flex; align-items: center; justify-content: center;
          color: var(--color-primary); margin-bottom: 1.5rem;
          transition: background 0.3s, transform 0.3s;
        }
        .ab-val-card:hover .ab-val-icon { background: rgba(196,147,63,0.16); transform: scale(1.08); }
        .ab-val-title {
          font-family: var(--font-heading); font-weight: 900;
          font-size: 1rem; color: var(--color-secondary);
          margin-bottom: 0.65rem;
        }
        .ab-val-desc { font-size: 0.845rem; color: var(--color-text-muted); line-height: 1.72; }

        /* ── TIMELINE ───────────────────────────────────────── */
        .ab-timeline {
          background: #080808;
          padding: 10rem 0;
          position: relative; overflow: hidden;
        }
        .ab-tl-bg { position: absolute; inset: 0; z-index: 0; }
        .ab-tl-bg-img { width: 100%; height: 100%; object-fit: cover; opacity: 0.07; }
        .ab-tl-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(8,8,8,0.98) 0%, rgba(8,8,8,0.85) 50%, rgba(8,8,8,0.98) 100%);
        }
        .ab-tl-inner { position: relative; z-index: 2; }
        .ab-tl-header { text-align: center; margin-bottom: 6rem; }
        .ab-tl-track { position: relative; max-width: 760px; margin: 0 auto; }
        .ab-tl-line {
          position: absolute; left: 18px; top: 8px; bottom: 8px;
          width: 2px; background: rgba(255,255,255,0.06); overflow: hidden;
        }
        .ab-tl-line-fill {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, var(--color-primary) 0%, rgba(196,147,63,0.15) 100%);
        }
        .ab-tl-item {
          display: flex; gap: 3rem; padding: 0 0 3.5rem 0; position: relative;
        }
        .ab-tl-item:last-child { padding-bottom: 0; }
        .ab-tl-dot {
          width: 38px; height: 38px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: rgba(196,147,63,0.1);
          border: 1.5px solid rgba(196,147,63,0.3);
          border-radius: 50%;
        }
        .ab-tl-dot-core { width: 10px; height: 10px; border-radius: 50%; background: var(--color-primary); }
        .ab-tl-content { flex: 1; padding-top: 6px; }
        .ab-tl-year {
          font-family: var(--font-heading); font-weight: 900;
          font-size: 0.65rem; color: var(--color-primary);
          letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 0.4rem;
        }
        .ab-tl-title {
          font-family: var(--font-heading); font-weight: 800;
          font-size: 1.15rem; color: white; margin-bottom: 0.55rem;
        }
        .ab-tl-desc { font-size: 0.875rem; line-height: 1.78; color: rgba(255,255,255,0.32); }

        /* ── DOMAINS ────────────────────────────────────────── */
        .ab-domains {
          background: var(--color-bg);
          padding: 10rem 0;
          position: relative; overflow: hidden;
        }
        .ab-domains-grid-bg {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 80px 80px;
        }
        .ab-dom-header { text-align: center; margin-bottom: 5.5rem; position: relative; z-index: 1; }
        .ab-domain-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem; position: relative; z-index: 1;
        }
        .ab-domain-card {
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; overflow: hidden;
          background: rgba(255,255,255,0.03);
          transition: box-shadow 0.35s, transform 0.35s, border-color 0.35s;
          cursor: default;
        }
        .ab-domain-card:hover {
          box-shadow: 0 24px 64px rgba(0,0,0,0.5);
          transform: translateY(-8px);
          border-color: rgba(196,147,63,0.25);
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
          background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%);
        }
        .ab-domain-num-overlay {
          position: absolute; bottom: 1rem; right: 1rem;
          font-family: var(--font-heading); font-weight: 900;
          font-size: 2.4rem; line-height: 1; letter-spacing: -0.05em;
          color: rgba(255,255,255,0.12);
        }
        .ab-domain-body { padding: 1.75rem; }
        .ab-domain-title {
          font-family: var(--font-heading); font-weight: 900;
          font-size: 1.05rem; color: var(--color-secondary);
          margin-bottom: 0.7rem; letter-spacing: -0.01em;
        }
        .ab-domain-desc { font-size: 0.82rem; line-height: 1.72; color: var(--color-text-muted); margin-bottom: 1.25rem; }
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
          .ab-story-imgs { height: 420px; }
          .ab-mv-grid { grid-template-columns: 1fr; }
          .ab-val-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .ab-hero-eyebrow,
          .ab-hero-title-block,
          .ab-hero-bottom { padding-left: 2rem; padding-right: 2rem; }
          .ab-hero-bottom { flex-direction: column; align-items: flex-start; }
          .ab-story, .ab-mission, .ab-values, .ab-timeline, .ab-domains { padding: 6rem 0; }
        }
        @media (max-width: 600px) {
          .ab-hero-title { font-size: clamp(3.5rem, 13vw, 6rem); }
          .ab-hero-ghost { -webkit-text-stroke: 1.5px rgba(255,255,255,0.32); }
          .ab-val-grid { grid-template-columns: 1fr; }
          .ab-domain-grid { grid-template-columns: 1fr; }
          .ab-tl-item { gap: 1.5rem; }
          .ab-story-imgs {
            grid-template-columns: 1fr 1fr; grid-template-rows: 1fr; height: 280px;
          }
          .ab-story-img3 { display: none; }
          .ab-story-img2 { grid-row: 1; }
        }
      `}} />
    </div>
  );
}
