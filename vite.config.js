import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Akamai Edge Simulation Middleware Plugin
function akamaiEdgeSimulatorPlugin() {
  return {
    name: 'akamai-edge-simulator',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Simulate Akamai Edge CDN headers on all responses
        res.setHeader('Edge-Control', 'cache-maxage=86400, stale-while-revalidate=604800');
        res.setHeader('Akamai-Cache-Status', 'HIT (CGK-Edge-Node-01)');
        res.setHeader('Akamai-Edge-Worker', 'v2.4.1-tokopedia-edge');
        res.setHeader('X-Akamai-Pragma', 'akamai-x-cache-on, akamai-x-cache-remote-on, akamai-x-check-cacheable, akamai-x-get-cache-key');
        res.setHeader('X-Akamai-Edge-Server', 'akamai-cgk-id.edgekey.net');
        res.setHeader('X-Edge-Origin', 'tokopedia-origin-jakarta');
        res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800');
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
    dedupe: ['react', 'react-dom']
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
        offline: resolve(import.meta.dirname, 'offline.html')
      }
    }
  },
  server: {
    port: 3000,
    open: false,
    watch: {
      ignored: ['**/dist/**', '**/*corrupted*/**', '**/trash*/**']
    }
  }
});
