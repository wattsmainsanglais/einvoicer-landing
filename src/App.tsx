import { useState } from 'react';

export default function App() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus('done');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.5rem',
    }}>
      <div style={{ maxWidth: '480px', width: '100%' }}>

        <p style={{ fontFamily: "'Audiowide', sans-serif", fontSize: '1.1rem', letterSpacing: '0.05em', color: '#7c69f5', marginBottom: '1.5rem' }}>
          EINVOICER
        </p>

        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '1.25rem' }}>
          French e-invoicing,<br />handled.
        </h1>

        <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#a1a1aa', marginBottom: '1rem' }}>
          From 1 September 2026, every registered business in France must be able to receive electronic invoices.
          EINVOICER registers you on the government-approved network so you're compliant from day one.
        </p>

        <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#71717a', marginBottom: '2rem' }}>
          English-language. No accountant required.{' '}
          <span style={{ color: '#7c69f5', fontWeight: 600 }}>Coming soon.</span>
        </p>

        <div style={{
          background: '#18181b',
          border: '1px solid #27272a',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '2.5rem',
        }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#7c69f5', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Get notified at launch
          </p>
          <p style={{ fontSize: '0.85rem', color: '#71717a', marginBottom: '1.25rem' }}>
            Leave your email and we'll let you know when EINVOICER is ready.
          </p>

          {status === 'done' ? (
            <p style={{ fontSize: '0.9rem', color: '#4ade80', fontWeight: 500 }}>
              You're on the list. We'll be in touch.
            </p>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap' }}>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  flex: '1 1 200px',
                  background: '#09090b',
                  border: '1px solid #3f3f46',
                  borderRadius: '8px',
                  padding: '0.625rem 0.875rem',
                  fontSize: '0.9rem',
                  color: '#fafafa',
                  outline: 'none',
                }}
                onFocus={e => (e.target.style.borderColor = '#7c69f5')}
                onBlur={e => (e.target.style.borderColor = '#3f3f46')}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  background: '#7c69f5',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.625rem 1.25rem',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  opacity: status === 'loading' ? 0.7 : 1,
                  whiteSpace: 'nowrap',
                }}
              >
                {status === 'loading' ? 'Sending…' : 'Notify me'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p style={{ fontSize: '0.8rem', color: '#f87171', marginTop: '0.625rem' }}>
              Something went wrong. Try again or email us directly.
            </p>
          )}
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', color: '#52525b', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
            Common questions
          </p>
          {[
            {
              q: 'What is all this about? Give me the short version.',
              a: 'France is digitising its invoicing system. From September 2026, every business with a SIREN must be registered on a government-certified platform to receive electronic invoices. SMEs and micro-enterprises must also start issuing through one from September 2027. This app registers your business and handles the compliance side automatically.',
            },
            {
              q: 'I currently email PDF invoices to my clients. Will I have to stop?',
              a: 'For B2B invoices (to other registered businesses), emailed PDFs won\'t be compliant from September 2027. This app replaces that workflow — you create the invoice here, it\'s routed compliantly, and you still get a PDF to send alongside it.',
            },
            {
              q: 'Does this affect me if I\'m franchise en base de TVA (TVA-exempt)?',
              a: 'Yes. The mandate applies to all businesses with a SIREN regardless of TVA status. You\'re still required to be registered on a certified platform to receive invoices from September 2026.',
            },
            {
              q: 'What happens if I don\'t register?',
              a: 'From September 2026, you won\'t be able to receive compliant e-invoices from other businesses. From September 2027, invoices you issue outside a certified platform will be non-compliant. Penalties are €15 per invoice, up to €15,000 per year.',
            },
            {
              q: 'What does this app actually do for me?',
              a: 'It connects your business to Super PDP — a government-certified invoicing platform. Create an invoice here, and the app formats it correctly (Factur-X), routes it through the Peppol network, and delivers it to your client\'s platform. You get a PDF copy, can email it to your client, and track the full payment history.',
            },
            {
              q: 'Do I need to set up an account with Super PDP myself?',
              a: 'No. The app handles the connection for you. You go through a short one-time identity verification (Datakeen — passport or ID required) and a couple of authorisation steps. That\'s it. You don\'t need a direct Super PDP account.',
            },
          ].map(({ q, a }) => (
            <details key={q} style={{ borderBottom: '1px solid #27272a', paddingBottom: '0' }}>
              <summary style={{
                padding: '0.875rem 0',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#e4e4e7',
                listStyle: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
              }}>
                {q}
                <span style={{ color: '#52525b', fontSize: '1.1rem', flexShrink: 0 }}>+</span>
              </summary>
              <p style={{ fontSize: '0.85rem', color: '#71717a', lineHeight: 1.7, padding: '0 0 1rem' }}>
                {a}
              </p>
            </details>
          ))}
        </div>

        <div style={{ borderTop: '1px solid #27272a', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <p style={{ fontSize: '0.75rem', color: '#52525b' }}>
              einvoicer.fr &mdash; Nouvelle-Aquitaine, France
            </p>
            <a href="mailto:awattsdev@gmail.com" style={{ fontSize: '0.75rem', color: '#52525b', textDecoration: 'none' }}>
              Contact
            </a>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="/legal/mentions-legales" style={{ fontSize: '0.75rem', color: '#52525b', textDecoration: 'none' }}>Mentions légales</a>
            <a href="/legal/politique-confidentialite" style={{ fontSize: '0.75rem', color: '#52525b', textDecoration: 'none' }}>Politique de confidentialité</a>
            <a href="/legal/cgu" style={{ fontSize: '0.75rem', color: '#52525b', textDecoration: 'none' }}>CGU</a>
          </div>
        </div>

      </div>
    </div>
  );
}
