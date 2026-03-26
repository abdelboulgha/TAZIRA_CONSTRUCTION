'use client';

import { useRef, useState, useEffect } from 'react';

const FEATURES = [
  {
    num: '01',
    title: 'Qualité Garantie',
    desc: 'Chaque projet est réalisé selon les normes les plus strictes avec des matériaux sélectionnés pour leur durabilité et performance à long terme.',
    img: '/assets/image1.png',
  },
  {
    num: '02',
    title: 'Respect des Délais',
    desc: 'Une planification rigoureuse et un suivi en temps réel de chaque chantier nous permettent de toujours livrer votre projet dans les temps.',
    img: '/assets/image2.png',
  },
  {
    num: '03',
    title: 'Expertise Technique',
    desc: "Bénéficiez de plus de 10 ans d'expérience cumulée par nos ingénieurs et techniciens dans les domaines les plus pointus de la construction.",
    img: '/assets/image3.png',
  },
  {
    num: '04',
    title: 'Accompagnement 360°',
    desc: "De la conception préliminaire à la livraison finale, nous vous accompagnons à chaque étape et garantissons un suivi de qualité après remise des clés.",
    img: '/assets/image4.png',
  }
];

export default function WhyUsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const listRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        // Title animation
        gsap.fromTo(titleRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
          }
        );

        // Image Wrapper Animation
        gsap.fromTo(imgRef.current,
          { scale: 0.95, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true }
          }
        );

        // List items animation
        listRefs.current.forEach((el, i) => {
          gsap.fromTo(el,
            { x: 30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, delay: i * 0.12, ease: 'power3.out',
              scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', once: true }
            }
          );
        });
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="why-interactive-section">
      <div className="container">
        
        {/* Header */}
        <div ref={titleRef} className="why-header" style={{ opacity: 0 }}>
          <div className="why-eyebrow">
            
            POURQUOI CHOISIR TAZIRA CONSTRUCTION
          </div>
          <h2 className="why-heading">
            L&apos;excellence au <span>cœur</span> de chaque projet
          </h2>
        </div>

        {/* Content Layout */}
        <div className="why-layout">
          
          {/* Left: Interactive Image Reveal */}
          <div ref={imgRef} className="why-images-wrapper" style={{ opacity: 0 }}>
            <div className="why-images-inner">
              {FEATURES.map((feat, i) => (
                <div 
                  key={feat.num}
                  className={`why-img-slide ${activeIndex === i ? 'active' : ''}`}
                >
                  <img src={feat.img} alt={feat.title} />
                  <div className="why-img-overlay"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: List of Features */}
          <div className="why-list-wrapper">
            {FEATURES.map((feat, i) => (
              <div 
                key={feat.num}
                ref={el => { listRefs.current[i] = el; }}
                className={`why-list-item ${activeIndex === i ? 'active' : ''}`}
                onMouseEnter={() => setActiveIndex(i)}
                style={{ opacity: 0 }}
              >
                <div className="why-item-num">{feat.num}</div>
                <div className="why-item-content">
                  <h3 className="why-item-title">
                    {feat.title}
                    <svg className="why-item-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </h3>
                  <div className="why-item-desc-wrapper">
                    <p className="why-item-desc">{feat.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .why-interactive-section {
          padding: 8rem 0;
          background-color: var(--color-bg);
          overflow: hidden;
        }

        .why-header {
          margin-bottom: 5rem;
        }

        .why-eyebrow {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--color-primary);
          margin-bottom: 1.5rem;
          text-transform: uppercase;
        }

        .why-line { display: none; }

        .why-heading {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: clamp(2.5rem, 4vw, 4rem);
          line-height: 1.1;
          color: var(--color-secondary);
          max-width: 800px;
        }

        .why-heading span {
          color: var(--color-primary);
          font-style: italic;
        }

        .why-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }

        /* Images */
        .why-images-wrapper {
          position: relative;
          aspect-ratio: 4/5;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0,0,0,0.15);
        }

        .why-images-inner {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .why-img-slide {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.8s ease, visibility 0.8s ease, transform 1.5s ease;
          transform: scale(1.08);
        }

        .why-img-slide.active {
          opacity: 1;
          visibility: visible;
          transform: scale(1);
          z-index: 2;
        }

        .why-img-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .why-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 40%);
        }

        .why-img-badge {
          position: absolute;
          bottom: 2rem;
          left: 2rem;
          background: rgba(20,20,20,0.88);
          backdrop-filter: blur(10px);
          padding: 1rem 1.5rem;
          border-radius: 12px;
          z-index: 10;
          border-left: 4px solid var(--color-primary);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          transition: transform 0.3s ease;
        }

        .why-img-badge:hover {
          transform: translateY(-5px);
        }

        .badge-val {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--color-secondary);
          line-height: 1;
          margin-bottom: 0.25rem;
        }

        .badge-lbl {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* List Items */
        .why-list-wrapper {
          display: flex;
          flex-direction: column;
        }

        .why-list-item {
          display: flex;
          gap: 2.5rem;
          padding: 2.5rem 0;
          border-bottom: 1px solid rgba(0,0,0,0.08);
          cursor: pointer;
          transition: all 0.4s ease;
          position: relative;
        }

        .why-list-item:first-child {
          padding-top: 0;
        }

        .why-list-item::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 0%;
          height: 2px;
          background-color: var(--color-primary);
          transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .why-list-item.active::after {
          width: 100%;
        }

        .why-item-num {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 800;
          color: rgba(0,0,0,0.15);
          transition: color 0.4s ease;
          margin-top: 0.2rem;
        }

        .why-list-item.active .why-item-num {
          color: var(--color-primary);
        }

        .why-item-content {
          flex: 1;
        }

        .why-item-title {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-secondary);
          margin-bottom: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: color 0.4s ease, transform 0.4s ease;
        }

        .why-item-arrow {
          opacity: 0;
          color: var(--color-primary);
          transform: translateX(-10px);
          transition: all 0.4s ease;
        }

        .why-list-item.active .why-item-title {
          transform: translateX(10px);
        }

        .why-list-item.active .why-item-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        .why-item-desc-wrapper {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.4s ease;
        }

        .why-list-item.active .why-item-desc-wrapper {
          grid-template-rows: 1fr;
        }

        .why-item-desc {
          overflow: hidden;
          font-size: 1.05rem;
          line-height: 1.7;
          color: var(--color-text-muted);
          margin-top: 0;
          padding-top: 0;
          opacity: 0;
          transition: opacity 0.4s ease, padding-top 0.4s ease;
        }

        .why-list-item.active .why-item-desc {
          opacity: 1;
          padding-top: 1rem;
        }

        @media (max-width: 1024px) {
          .why-layout {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
          
          .why-images-wrapper {
            aspect-ratio: 16/9;
            order: -1;
          }

          .why-list-item {
            gap: 1.5rem;
          }
        }
        
        @media (max-width: 768px) {
          .why-interactive-section {
            padding: 5rem 0;
          }
          
          .why-header {
            margin-bottom: 3rem;
          }

          .why-images-wrapper {
            aspect-ratio: 4/3;
          }

          .why-list-item {
            padding: 1.5rem 0;
            gap: 1.25rem;
          }
          
          .why-item-title {
            font-size: 1.25rem;
          }
          
          .why-item-desc {
            font-size: 0.95rem;
          }
        }
      `}} />
    </section>
  );
}
