'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

function ContactForm({ t }: { t: any }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('done'), 1800);
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: 'var(--radius-xl)',
      padding: '2.5rem',
      boxShadow: 'var(--shadow-xl)',
      border: '1px solid var(--color-border-light)',
    }}>
      <h2 style={{
        fontFamily: 'var(--font-heading)', fontWeight: 800,
        fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--color-secondary)',
      }}>
        {t.contact.form.title}
      </h2>

      {status === 'done' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            textAlign: 'center', padding: '3rem',
            background: '#f0fdf4', borderRadius: 'var(--radius-lg)',
            border: '1px solid #bbf7d0',
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#15803d', marginBottom: '0.5rem' }}>
            {t.contact.form.success}
          </h3>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}
          className="form-grid">
            <div>
              <label className="form-label">{t.contact.form.name}</label>
              <input className="form-input" type="text" name="name" placeholder={t.contact.form.namePlaceholder}
                value={form.name} onChange={handleChange} required />
            </div>
            <div>
              <label className="form-label">{t.contact.form.email}</label>
              <input className="form-input" type="email" name="email" placeholder={t.contact.form.emailPlaceholder}
                value={form.email} onChange={handleChange} required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}
          className="form-grid">
            <div>
              <label className="form-label">{t.contact.form.phone}</label>
              <input className="form-input" type="tel" name="phone" placeholder={t.contact.form.phonePlaceholder}
                value={form.phone} onChange={handleChange} />
            </div>
            <div>
              <label className="form-label">{t.contact.form.subject}</label>
              <input className="form-input" type="text" name="subject" placeholder={t.contact.form.subjectPlaceholder}
                value={form.subject} onChange={handleChange} />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">{t.contact.form.message}</label>
            <textarea
              className="form-input"
              name="message"
              placeholder={t.contact.form.messagePlaceholder}
              value={form.message}
              onChange={handleChange}
              rows={5}
              required
              style={{ resize: 'vertical', minHeight: '140px' }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '1rem' }}
            disabled={status === 'sending'}
          >
            {status === 'sending' ? (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  style={{ animation: 'spin 1s linear infinite' }}>
                  <circle cx="12" cy="12" r="10" strokeDasharray="31.42" strokeDashoffset="10" />
                </svg>
                {t.contact.form.sending}
              </>
            ) : (
              <>
                {t.contact.form.send}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </>
            )}
          </button>
        </form>
      )}
      <style jsx>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 600px) {
          .form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function ContactInfo({ t }: { t: any }) {
  const items = [
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
      label: t.contact.info.address.label,
      value: t.contact.info.address.value,
    },
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82a19.79 19.79 0 01-3.07-8.64A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
      label: t.contact.info.phone.label,
      value: t.contact.info.phone.value,
      href: 'tel:+212650596613',
    },
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
      label: t.contact.info.email.label,
      value: t.contact.info.email.value,
      href: 'mailto:contact@tazira-construction.ma',
    },
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
      label: t.contact.info.hours.label,
      value: t.contact.info.hours.value,
    },
  ];

  return (
    <div>
      <h2 style={{
        fontFamily: 'var(--font-heading)', fontWeight: 800,
        fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--color-secondary)',
      }}>
        {t.contact.info.title}
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
        {items.map((item) => (
          <div key={item.label} style={{
            display: 'flex', gap: '1rem', alignItems: 'flex-start',
            padding: '1.25rem',
            background: 'white',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-light)',
            boxShadow: 'var(--shadow-sm)',
          }}>
            <div style={{
              width: '46px', height: '46px', borderRadius: 'var(--radius-md)',
              background: 'var(--color-primary-light)', color: 'var(--color-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>{item.icon}</div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                {item.label}
              </div>
              {item.href ? (
                <a href={item.href} style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.95rem' }}>
                  {item.value}
                </a>
              ) : (
                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-secondary)' }}>
                  {item.value}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/212650596613"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-whatsapp"
        style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '1rem' }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        {t.contact.whatsapp}
      </a>
    </div>
  );
}

export default function ContactPage() {
  const { t, isRTL } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      {/* Hero */}
      <section style={{
        position: 'relative',
        paddingTop: 'calc(var(--navbar-height) + 5rem)',
        paddingBottom: '5rem',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?w=1920&q=80)`,
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(26,26,26,0.88) 0%, rgba(26,26,26,0.65) 100%)',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '720px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.4rem 1.1rem',
              background: 'rgba(212,43,43,0.15)', border: '1px solid rgba(212,43,43,0.4)',
              borderRadius: 'var(--radius-full)', color: '#ff9999',
              fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em',
              textTransform: 'uppercase' as const, marginBottom: '1.5rem',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-primary)', display: 'inline-block' }} />
              {t.contact.hero.badge}
            </span>
            <h1 style={{
              color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 900,
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '1rem',
            }}>
              {t.contact.hero.title}{' '}
              <span style={{ color: 'var(--color-primary)' }}>{t.contact.hero.titleHighlight}</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', lineHeight: 1.7 }}>
              {t.contact.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="section section-light" ref={ref}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '3rem',
            alignItems: 'start',
          }}
          className="contact-grid"
          >
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <ContactForm t={t} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <ContactInfo t={t} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <h3 style={{
            fontFamily: 'var(--font-heading)', fontWeight: 700,
            fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--color-secondary)',
          }}>
            {t.contact.map}
          </h3>
          <div style={{
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            height: '400px',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--color-border)',
          }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.8424143640534!2d-7.992047684800483!3d31.63470978132527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee9000bef9fd%3A0xc8ee5f05f7e9fab4!2sMarrakech%2C%20Morocco!5e0!3m2!1sen!2s!4v1680000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="TAZIRA CONSTRUCTION Location"
            />
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
