# Tokopedia Multi-Page Application (MPA)

A modern, high-performance remake of the **Tokopedia Desktop Web Application** based on the real Tokopedia architecture and desktop interface.

---

## 🚀 Tech Stack Matrix

| Technology | Implementation & Purpose |
| :--- | :--- |
| **Multi-Page Application (MPA)** | 5 distinct HTML entries (`index.html`, `pdp.html`, `search.html`, `cart.html`, `offline.html`) with independent routing and bundles. |
| **Branch (Branch.io)** | `branch-sdk` integration for deep linking, Branch Journeys smart banners, deferred routing, and event attribution (`VIEW_ITEM`, `ADD_TO_CART`, `PURCHASE`). |
| **Google Analytics (GA4)** | Enhanced E-Commerce measurement (`view_item_list`, `select_item`, `view_item`, `add_to_cart`, `view_cart`, `purchase`, `search`). |
| **Emotion** | `@emotion/react` & `@emotion/styled` CSS-in-JS architecture following Tokopedia's Unify/Nest Design Tokens. |
| **Akamai** | Edge CDN headers simulation (`Edge-Control`, `Akamai-Cache-Status`, `Akamai-Edge-Worker`), Akamai Image Manager URL optimizer (`transformImageUrl`), and Akamai mPulse RUM telemetry. |
| **PWA (Progressive Web App)** | `manifest.json` with shortcuts, `sw.js` Service Worker with Stale-While-Revalidate & Cache-First caching, offline fallback (`offline.html`), and install prompt. |
| **Loadable Components** | `@loadable/component` dynamic code splitting for mega menus, modals, hero banners, widgets, and custom skeleton loaders. |
| **Google Tag Manager (GTM)** | Container `GTM-TKPD988`, real-time `dataLayer.push` dispatcher, and custom trigger listeners. |
| **Criteo (Criteo OneTag)** | Criteo retargeting tag integration (`setAccount: 104829`, `viewHome`, `viewList`, `viewItem`, `viewBasket`, `trackTransaction`). |
| **OpenGraph & Twitter Cards** | Comprehensive OpenGraph meta (`og:title`, `og:description`, `og:image`, `og:type`, `og:price:amount`) with live social card preview simulator. |

---

## 📁 Multi-Page Application Routes

1. **Homepage (`/` -> `index.html`)**
   - Header with Tokopedia logo, Search with suggestions, Category Mega Menu (`@loadable/component`).
   - Hero Promo Carousel ("Mau transaksi lebih hemat? Cek promo asyik Tokopedia!" + Toped Mascot).
   - "Kategori Populer" and interactive "Top Up & Tagihan" widgets (Pulsa, Paket Data, Listrik PLN, Roaming).
   - Quick category pills bar.
   - Sticky recommendation tabs ("Untuk Anda", "Spesial Hari Ini", "Paling Laris", etc.).
   - Product Grid with interactive cards, quick add to cart, and Tokopedia skeleton cards.
   - Branch Journeys Smart Banner ("Buka di App Tokopedia").

2. **Product Detail Page (PDP) (`/pdp.html?id=prod-...`)**
   - Multi-angle Image Gallery with Akamai Image Manager dynamic optimization.
   - Price, discount badge, stock availability, and rating overview.
   - Variant picker (Color, Size) & Quantity adjuster.
   - Shop profile card (Official Store badge, location, chat seller).
   - Dynamic OpenGraph tags (`product:price:amount`, `product:price:currency`).
   - Loadable Product Reviews & Discussion tabs.
   - One-click Branch.io Deep Link generator with clipboard copy.

3. **Search & Discovery Page (`/search.html?q=...`)**
   - Filter sidebar (Official Store, Bebas Ongkir, Bintang 4+, Rentang Harga).
   - Sort dropdown (Paling Sesuai, Rating Tertinggi, Harga Terendah, Harga Tertinggi).
   - GA4 & Criteo `viewList` and `search` events.

4. **Shopping Cart & Checkout (`/cart.html`)**
   - Items grouped by merchant with "Select All" and per-item checkboxes.
   - Promo coupon code applicator (e.g. `HEMAT90` gives Rp25.000 discount).
   - Bebas Ongkir badge calculation.
   - Checkout modal triggering GA4 `purchase`, Criteo `trackTransaction`, and Branch `PURCHASE`.

5. **PWA Offline Fallback (`/offline.html`)**
   - Clean offline screen with Tokopedia disconnected mascot and retry button.

---

## 🛠️ Stack Inspector & Live Telemetry Console

A floating **"⚡ Stack Inspector"** button is embedded in the bottom-right of every page. When opened, it reveals a real-time developer drawer with live streams for:
- 🌐 **Akamai CDN**: Edge node status (HIT), EdgeWorker version, response headers, and Akamai mPulse Core Web Vitals (TTFB, LCP, CLS, FID).
- 🏷️ **Google Tag Manager**: Live `dataLayer` event queue.
- 📊 **Google Analytics 4**: Enhanced e-commerce payload stream.
- 🎯 **Criteo OneTag**: Real-time retargeting tag events queue.
- 🌿 **Branch.io**: Generated deep links, journeys interactions, attribution logs.
- 🖼️ **OpenGraph**: WhatsApp, Twitter/X, and Facebook rich card preview generator.

---

## 💻 Running the Project

### Development Server:
```bash
npm run dev
```
Runs Vite dev server with Akamai Edge simulation middleware on `http://localhost:3000/`.

### Production Build:
```bash
npm run build
```

### Production Edge Server:
```bash
npm run serve
```
Runs the Node HTTP server with Akamai Edge CDN headers on `http://localhost:3000/`.
