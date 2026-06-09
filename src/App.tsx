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

        <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', color: '#7c69f5', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
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
