import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Akamai Edge Simulation Middleware Plugin
function akamaiEdgeSimulatorPlugin() {
  return {
    name: 'akamai-edge-simulator',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Do not intercept WebSockets, HMR, or Vite internal modules
        if (
          req.headers.upgrade === 'websocket' ||
          req.url.startsWith('/@') ||
          req.url.startsWith('/node_modules/') ||
          req.url.includes('?v=') ||
          req.url.includes('?token=')
        ) {
          return next();
        }

        // Clean URL rewriting for MPA routes (e.g. /search?q=meja -> /search.html?q=meja)
        if (req.url === '/search' || req.url.startsWith('/search?')) {
          req.url = req.url.replace('/search', '/search.html');
        } else if (req.url === '/cart' || req.url.startsWith('/cart?')) {
          req.url = req.url.replace('/cart', '/cart.html');
        } else if (req.url === '/pdp' || req.url.startsWith('/pdp?')) {
          req.url = req.url.replace('/pdp', '/pdp.html');
        } else if (req.url === '/profile' || req.url.startsWith('/profile?')) {
          req.url = req.url.replace('/profile', '/profile.html');
        } else if (req.url === '/address' || req.url.startsWith('/address?')) {
          req.url = req.url.replace('/address', '/address.html');
        } else if (req.url === '/store' || req.url.startsWith('/store?') || req.url.startsWith('/store/')) {
          req.url = req.url.replace('/store', '/store.html');
        }

        // Simulate Akamai Edge CDN headers on page/asset responses
        res.setHeader('Edge-Control', 'cache-maxage=86400, stale-while-revalidate=604800');
        res.setHeader('Akamai-Cache-Status', 'HIT (CGK-Edge-Node-01)');
        res.setHeader('Akamai-Edge-Worker', 'v2.4.1-tokopedia-edge');
        res.setHeader('X-Akamai-Pragma', 'akamai-x-cache-on, akamai-x-cache-remote-on, akamai-x-check-cacheable, akamai-x-get-cache-key');
        res.setHeader('X-Akamai-Edge-Server', 'akamai-cgk-id.edgekey.net');
        res.setHeader('X-Edge-Origin', 'tokopedia-origin-jakarta');
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        next();
      });
    }
  };
}

export default defineConfig({
  resolve: {
    alias: {
      '@loadable/component': resolve(import.meta.dirname, 'src/utils/loadable.jsx')
    },
    dedupe: [
      'react',
      'react-dom',
      'react-dom/client',
      '@emotion/react',
      '@emotion/styled',
      'branch-sdk',
      'lucide-react'
    ]
  },
  optimizeDeps: {
    entries: [
      'index.html',
      'pdp.html',
      'search.html',
      'cart.html',
      'profile.html',
      'address.html',
      'notifications.html',
      'bank-accounts.html',
      'payment-settings.html',
      'store.html',
      'offline.html',
      'src/**/*.{js,jsx}'
    ],
    include: [
      'react',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      'react-dom',
      'react-dom/client',
      '@emotion/react',
      '@emotion/react/jsx-runtime',
      '@emotion/react/jsx-dev-runtime',
      '@emotion/styled',
      '@emotion/styled/base',
      '@emotion/css',
      '@emotion/cache',
      '@emotion/serialize',
      '@emotion/utils',
      '@emotion/is-prop-valid',
      'branch-sdk',
      'lucide-react'
    ]
  },
  server: {
    port: 3000,
    open: false,
    strictPort: true,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0'
    },
    watch: {
      ignored: ['**/dist/**', '**/*corrupted*/**', '**/trash*/**']
    }
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin']
      }
    }),
    akamaiEdgeSimulatorPlugin()
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        pdp: resolve(import.meta.dirname, 'pdp.html'),
        search: resolve(import.meta.dirname, 'search.html'),
        cart: resolve(import.meta.dirname, 'cart.html'),
        profile: resolve(import.meta.dirname, 'profile.html'),
        address: resolve(import.meta.dirname, 'address.html'),
        notifications: resolve(import.meta.dirname, 'notifications.html'),
        bankAccounts: resolve(import.meta.dirname, 'bank-accounts.html'),
        paymentSettings: resolve(import.meta.dirname, 'payment-settings.html'),
        store: resolve(import.meta.dirname, 'store.html'),
        offline: resolve(import.meta.dirname, 'offline.html')
      }
    }
  }
});
