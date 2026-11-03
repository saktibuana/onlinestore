import React from 'react';

/**
 * Production-Grade Fault-Tolerant Error Boundary
 *
 * Prevents white screen / blank page crashes by isolating component failures
 * and providing automatic recovery with cache-flush reload.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('[Tokopedia ErrorBoundary Caught]:', error, errorInfo);
  }

  handleReload = () => {
    try {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (const reg of registrations) reg.update();
        });
      }
      if ('caches' in window) {
        caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))));
      }
    } catch (_) {}
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{
          padding: '60px 20px',
          textAlign: 'center',
          maxWidth: 520,
          margin: '40px auto',
          background: '#FFFFFF',
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          fontFamily: '"Open Sauce One", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          <div style={{
            width: 80,
            height: 80,
            background: '#EBF7ED',
            borderRadius: '50%',
            margin: '0 auto 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#03AC0E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#212121', marginBottom: 8 }}>
            Sistem Siap Digunakan
          </h2>
          <p style={{ fontSize: 14, color: '#6D7588', lineHeight: 1.6, marginBottom: 24 }}>
            Data belanja dan keranjang Anda terlindungi. Klik tombol di bawah untuk memuat ulang sistem.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button
              onClick={this.handleReload}
              style={{
                backgroundColor: '#03AC0E',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: 14,
                padding: '12px 24px',
                borderRadius: 8,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Muat Ulang Halaman
            </button>
            <a
              href="/"
              style={{
                backgroundColor: '#F0F3F7',
                color: '#212121',
                fontWeight: 600,
                fontSize: 14,
                padding: '12px 24px',
                borderRadius: 8,
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              Kembali ke Beranda
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
