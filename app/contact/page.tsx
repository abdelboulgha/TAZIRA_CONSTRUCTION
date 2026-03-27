'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

/* ─── Form ───────────────────────────────────────────────────── */
function ContactForm({ t }: { t: any }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('done'), 1800);
  };

  if (status === 'done') {
    return (
      <div className="cf-success">
        <div className="cf-success-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h3 className="cf-success-title">Message envoyé !</h3>
        <p className="cf-success-sub">Nous vous répondrons dans les 24 heures.</p>
        <style jsx>{`
          .cf-success { padding: 3rem 2rem; text-align: center; display: flex; flex-direction: column; align-items: center; }
          .cf-success-icon { width: 64px; height: 64px; border-radius: 50%; background: rgba(196,147,63,0.1); border: 1.5px solid rgba(196,147,63,0.3); display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem; }
          .cf-success-title { font-family: var(--font-heading); font-weight: 700; font-size: 1.25rem; color: var(--color-text); margin-bottom: 0.5rem; }
          .cf-success-sub { font-size: 0.88rem; color: var(--color-text-muted); }
        `}</style>
      </div>
    );
  }

  return (
    <form className="cf-form" onSubmit={handleSubmit} noValidate>
      <div className="cf-field">
        <label className="cf-label">Nom complet *</label>
        <input className="cf-input" type="text" name="name"
          placeholder="Votre nom complet"
          value={form.name} onChange={handleChange} required />
      </div>
      <div className="cf-field">
        <label className="cf-label">Adresse e-mail *</label>
        <input className="cf-input" type="email" name="email"
          placeholder="votre@email.com"
          value={form.email} onChange={handleChange} required />
      </div>
      <div className="cf-field">
        <label className="cf-label">Téléphone</label>
        <input className="cf-input" type="tel" name="phone"
          placeholder="+213 6XX XXX XXX"
          value={form.phone} onChange={handleChange} />
      </div>
      <div className="cf-field">
        <label className="cf-label">Service concerné</label>
        <select className="cf-input cf-select" name="service"
          value={form.service} onChange={handleChange}>
          <option value="">Sélectionner un service</option>
          <option>Construction de bâtiment</option>
          <option>Travaux électriques</option>
          <option>Rénovation & finition</option>
          <option>Maintenance & dépannage</option>
          <option>Travaux publics</option>
          <option>Demande de devis</option>
          <option>Autre</option>
        </select>
      </div>
      <div className="cf-field">
        <label className="cf-label">Message *</label>
        <textarea className="cf-input" name="message"
          placeholder="Décrivez votre projet ou votre demande..."
          value={form.message} onChange={handleChange}
          rows={5} required />
      </div>
      <button type="submit" className="cf-btn" disabled={status === 'sending'}>
        {status === 'sending' ? (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              style={{ animation: 'cf-spin 1s linear infinite' }}>
              <circle cx="12" cy="12" r="10" strokeDasharray="31.42" strokeDashoffset="10"/>
            </svg>
            Envoi en cours...
          </>
        ) : (
          <>
            Envoyer le message
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </>
        )}
      </button>

      <style jsx>{`
        .cf-form { display: flex; flex-direction: column; gap: 1.25rem; }
        .cf-field { display: flex; flex-direction: column; gap: 0.5rem; }
        .cf-label {
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--color-text-muted);
        }
        .cf-input {
          width: 100%; padding: 0.9rem 1.1rem;
          background: var(--color-bg-gray);
          border: 1.5px solid var(--color-border);
          border-radius: 10px;
          font-family: var(--font-body); font-size: 0.93rem;
          color: var(--color-text); outline: none;
          transition: border-color 0.25s, box-shadow 0.25s;
          resize: vertical; -webkit-appearance: none; appearance: none;
        }
        .cf-input::placeholder { color: var(--color-text-light); }
        .cf-input:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(196,147,63,0.1);
        }
        .cf-select { cursor: pointer; }
        .cf-btn {
          display: flex; align-items: center; justify-content: center; gap: 0.6rem;
          padding: 1rem 2rem; margin-top: 0.5rem;
          background: var(--color-primary); color: white;
          border: none; border-radius: 10px; cursor: pointer;
          font-family: var(--font-heading); font-size: 0.82rem;
          font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
          transition: background 0.3s, box-shadow 0.3s;
          width: 100%;
        }
        .cf-btn:hover:not(:disabled) {
          background: var(--color-primary-dark);
          box-shadow: 0 8px 28px rgba(196,147,63,0.35);
        }
        .cf-btn:disabled { opacity: 0.65; cursor: not-allowed; }
        @keyframes cf-spin { to { transform: rotate(360deg); } }
      `}</style>
    </form>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function ContactPage() {
  const { t, isRTL } = useLanguage();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        const sections = pageRef.current?.querySelectorAll('.gs-fade');
        sections?.forEach(el => {
          gsap.fromTo(el,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 82%', once: true } }
          );
        });
      });
    });
  }, []);

  return (
    <div ref={pageRef} style={{ direction: isRTL ? 'rtl' : 'ltr', background: 'var(--color-bg)' }}>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="cp-hero">
        <div className="cp-hero-noise" />
        <div className="container cp-hero-inner">
          <p className="cp-hero-eyebrow">Contact</p>
          <h1 className="cp-hero-title">Parlons de votre <span>projet</span></h1>
          <p className="cp-hero-sub">
            Notre équipe est disponible pour répondre à toutes vos questions
            et vous accompagner de la conception à la réalisation.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS RAPIDES
      ══════════════════════════════════════ */}
      <section className="cp-stats gs-fade">
        <div className="container cp-stats-grid">
          {[
            { value: '24h', label: 'Délai de réponse garanti' },
            { value: '100%', label: 'Devis gratuit & sans engagement' },
            { value: '200+', label: 'Projets réalisés en Algérie' },
          ].map(s => (
            <div key={s.value} className="cp-stat">
              <div className="cp-stat-value">{s.value}</div>
              <div className="cp-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          MÉTHODES DE CONTACT
      ══════════════════════════════════════ */}
      <section className="cp-methods gs-fade">
        <div className="container">
          <div className="cp-methods-grid">

            <a href="tel:+213650596613" className="cp-method">
              <div className="cp-method-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82a19.79 19.79 0 01-3.07-8.64A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </div>
              <div className="cp-method-label">Téléphone</div>
              <div className="cp-method-value">+213 650 596 613</div>
              <div className="cp-method-sub">Lun – Sam · 8h – 18h</div>
            </a>

            <a href="mailto:contact@tazira-construction.dz" className="cp-method">
              <div className="cp-method-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div className="cp-method-label">E-mail</div>
              <div className="cp-method-value">contact@tazira-construction.dz</div>
              <div className="cp-method-sub">Réponse sous 24h garantie</div>
            </a>

            <a href="https://wa.me/213650596613" target="_blank" rel="noopener noreferrer" className="cp-method cp-method-wa">
              <div className="cp-method-icon cp-method-icon-wa">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div className="cp-method-label">WhatsApp</div>
              <div className="cp-method-value">+213 650 596 613</div>
              <div className="cp-method-sub">Réponse instantanée</div>
            </a>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PROCESSUS
      ══════════════════════════════════════ */}
      <section className="cp-process gs-fade">
        <div className="container">
          <h2 className="cp-process-title">Comment ça fonctionne ?</h2>
          <div className="cp-process-steps">
            {[
              { n: '01', title: 'Contactez-nous', desc: 'Par téléphone, e-mail ou via le formulaire ci-dessous. Nous accusons réception immédiatement.' },
              { n: '02', title: 'Devis gratuit', desc: 'Nous analysons votre projet et vous envoyons une proposition détaillée et chiffrée sous 24h.' },
              { n: '03', title: 'On réalise', desc: "Après accord, nos équipes se mobilisent et votre projet prend vie dans les délais convenus." },
            ].map((s, i) => (
              <div key={s.n} className="cp-process-step">
                {i < 2 && <div className="cp-process-connector" />}
                <div className="cp-process-num">{s.n}</div>
                <h3 className="cp-process-step-title">{s.title}</h3>
                <p className="cp-process-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FORMULAIRE
      ══════════════════════════════════════ */}
      <section className="cp-form-section gs-fade">
        <div className="container cp-form-wrap">
          <div className="cp-form-left">
            <span className="cp-form-eyebrow">Formulaire de contact</span>
            <h2 className="cp-form-heading">
              Envoyez-nous<br />un message
            </h2>
            <p className="cp-form-sub">
              Décrivez votre projet et nous vous recontactons rapidement
              avec une proposition adaptée à vos besoins.
            </p>
            <div className="cp-form-assurance">
              {['Réponse sous 24h', 'Devis gratuit', 'Sans engagement'].map(a => (
                <div key={a} className="cp-assurance-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {a}
                </div>
              ))}
            </div>
          </div>

          <div className="cp-form-right">
            <ContactForm t={t} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MAP
      ══════════════════════════════════════ */}
      <section className="cp-map-section gs-fade">
        <div className="container">
          <div className="cp-map-wrap">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.8424143640534!2d-7.992047684800483!3d31.63470978132527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee9000bef9fd%3A0xc8ee5f05f7e9fab4!2sMarrakech%2C%20Morocco!5e0!3m2!1sen!2s!4v1680000000000!5m2!1sen!2s"
              width="100%" height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="TAZIRA CONSTRUCTION Location"
            />
          </div>
        </div>
      </section>

      <style jsx>{`
        /* ── Hero ── */
        .cp-hero {
          position: relative;
          padding-top: calc(var(--navbar-height) + 6rem);
          padding-bottom: 6rem;
          background: var(--color-bg-dark);
          overflow: hidden;
          border-bottom: 1px solid var(--color-border);
        }
        .cp-hero-noise {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .cp-hero-inner { position: relative; z-index: 1; max-width: 640px; }
        .cp-hero-eyebrow {
          display: inline-block;
          font-size: 0.7rem; font-weight: 800; letter-spacing: 0.28em;
          text-transform: uppercase; color: var(--color-primary);
          margin-bottom: 1.5rem;
        }
        .cp-hero-title {
          font-family: var(--font-heading); font-weight: 900;
          font-size: clamp(3rem, 6vw, 5rem);
          color: white; line-height: 1.06;
          letter-spacing: -0.03em; margin-bottom: 1.25rem;
        }
        .cp-hero-title span { color: var(--color-primary); }
        .cp-hero-sub {
          font-size: 1rem; line-height: 1.8;
          color: rgba(255,255,255,0.45); max-width: 480px;
        }

        /* ── Stats ── */
        .cp-stats {
          background: var(--color-bg-light);
          border-bottom: 1px solid var(--color-border);
        }
        .cp-stats-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
        }
        .cp-stat {
          padding: 2.5rem 2rem;
          border-right: 1px solid var(--color-border);
          text-align: center;
        }
        .cp-stat:last-child { border-right: none; }
        .cp-stat-value {
          font-family: var(--font-heading); font-weight: 900;
          font-size: 2.8rem; color: var(--color-primary);
          line-height: 1; letter-spacing: -0.04em;
          margin-bottom: 0.5rem;
        }
        .cp-stat-label {
          font-size: 0.82rem; color: var(--color-text-muted);
          font-weight: 500; line-height: 1.4;
        }

        /* ── Methods ── */
        .cp-methods { padding: 5rem 0; background: var(--color-bg); }
        .cp-methods-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;
        }
        .cp-method {
          display: flex; flex-direction: column;
          padding: 2.5rem 2rem;
          background: var(--color-bg-light);
          border: 1px solid var(--color-border);
          border-radius: 14px; text-decoration: none;
          transition: border-color 0.25s, transform 0.25s;
        }
        .cp-method:hover {
          border-color: rgba(196,147,63,0.35);
          transform: translateY(-4px);
        }
        .cp-method-icon {
          width: 52px; height: 52px; border-radius: 12px;
          background: var(--color-bg-gray);
          color: var(--color-primary);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.5rem;
        }
        .cp-method-icon-wa { background: rgba(37,211,102,0.1); color: #25d366; }
        .cp-method-wa:hover { border-color: rgba(37,211,102,0.35); }
        .cp-method-label {
          font-size: 0.68rem; font-weight: 800; letter-spacing: 0.16em;
          text-transform: uppercase; color: var(--color-text-muted);
          margin-bottom: 0.5rem;
        }
        .cp-method-value {
          font-family: var(--font-heading); font-weight: 700;
          font-size: 1rem; color: var(--color-text);
          margin-bottom: 0.4rem; line-height: 1.3;
        }
        .cp-method-sub { font-size: 0.78rem; color: var(--color-text-light); }

        /* ── Process ── */
        .cp-process {
          padding: 6rem 0;
          background: var(--color-bg-light);
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
        }
        .cp-process-title {
          font-family: var(--font-heading); font-weight: 800;
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          color: var(--color-text); margin-bottom: 4rem;
          text-align: center;
        }
        .cp-process-steps {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 3rem; position: relative;
        }
        .cp-process-step { position: relative; }
        .cp-process-connector {
          position: absolute; top: 24px;
          left: calc(100% + 1rem); right: calc(-100% - 1rem);
          height: 1px; background: var(--color-border);
          z-index: 0;
        }
        .cp-process-num {
          width: 48px; height: 48px; border-radius: 12px;
          background: var(--color-bg-gray);
          border: 1px solid var(--color-border);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-heading); font-weight: 900;
          font-size: 0.85rem; color: var(--color-primary);
          letter-spacing: 0.05em; margin-bottom: 1.5rem;
          position: relative; z-index: 1;
        }
        .cp-process-step-title {
          font-family: var(--font-heading); font-weight: 700;
          font-size: 1.1rem; color: var(--color-text);
          margin-bottom: 0.75rem;
        }
        .cp-process-step-desc {
          font-size: 0.88rem; line-height: 1.75;
          color: var(--color-text-muted);
        }

        /* ── Form section ── */
        .cp-form-section { padding: 7rem 0; background: var(--color-bg); }
        .cp-form-wrap {
          display: grid; grid-template-columns: 1fr 1.5fr;
          gap: 7rem; align-items: start;
        }
        .cp-form-eyebrow {
          display: block; font-size: 0.65rem; font-weight: 800;
          letter-spacing: 0.26em; text-transform: uppercase;
          color: var(--color-primary); margin-bottom: 1.5rem;
        }
        .cp-form-heading {
          font-family: var(--font-heading); font-weight: 900;
          font-size: clamp(2rem, 3.5vw, 3rem);
          color: var(--color-text); line-height: 1.1;
          letter-spacing: -0.03em; margin-bottom: 1.25rem;
        }
        .cp-form-sub {
          font-size: 0.92rem; line-height: 1.8;
          color: var(--color-text-muted); margin-bottom: 2.5rem;
        }
        .cp-form-assurance { display: flex; flex-direction: column; gap: 0.7rem; }
        .cp-assurance-item {
          display: flex; align-items: center; gap: 0.6rem;
          font-size: 0.84rem; font-weight: 600;
          color: var(--color-text-muted);
        }

        /* ── Map ── */
        .cp-map-section { padding-bottom: 7rem; background: var(--color-bg); }
        .cp-map-wrap {
          height: 420px; border-radius: 16px; overflow: hidden;
          border: 1px solid var(--color-border);
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .cp-stats-grid { grid-template-columns: 1fr; }
          .cp-stat { border-right: none; border-bottom: 1px solid var(--color-border); }
          .cp-stat:last-child { border-bottom: none; }
          .cp-methods-grid { grid-template-columns: 1fr; }
          .cp-process-steps { grid-template-columns: 1fr; gap: 2rem; }
          .cp-process-connector { display: none; }
          .cp-form-wrap { grid-template-columns: 1fr; gap: 4rem; }
        }
        @media (max-width: 600px) {
          .cp-hero { padding-top: calc(var(--navbar-height) + 4rem); padding-bottom: 4rem; }
          .cp-methods { padding: 4rem 0; }
          .cp-form-section { padding: 5rem 0; }
        }
      `}</style>
    </div>
  );
}
