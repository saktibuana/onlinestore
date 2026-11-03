# Tokopedia Desktop Web Application

Panduan arsitektur, standar kode, dan petunjuk operasional untuk pengembang dan asisten AI Antigravity pada proyek klon Tokopedia Desktop.

---

## 1. Ikhtisar Proyek & Arsitektur

Proyek ini adalah implementasi *high-fidelity* desktop web Tokopedia berbasis **Multi-Page Application (MPA)** yang menggunakan React 19, Vite, dan Emotion Styled-Components dengan prinsip **KISS (Keep It Simple, Stupid)** dan standar *production-grade*.

* **Port Dev Server**: `http://localhost:3000` (`npm run dev`)
* **Build Command**: `cmd /c "npm run build"` (Windows) atau `npm run build`
* **Clean URL Middleware**: Mengubah URL bersih seperti `/search`, `/store`, `/cart` menjadi `/search.html`, `/store.html`, `/cart.html` secara otomatis via plugin Vite.

---

## 2. Kepatuhan 9 Stack Teknologi Wajib (MANDATORY)

Setiap halaman atau fitur baru yang ditambahkan **WAJIB** mempertahankan 9 stack teknologi berikut:

1. **Branch SDK**: Banner promosi aplikasi di bagian atas setiap halaman ([`src/components/BranchJourneyBanner.jsx`](file:///d:/Projects/tokopedia/src/components/BranchJourneyBanner.jsx)).
2. **Google Analytics 4 (GA4)**: Pelacakan Enhanced E-Commerce (`page_view`, `search`, `view_item_list`, `add_to_cart`, `purchase`) via [`src/services/analytics.js`](file:///d:/Projects/tokopedia/src/services/analytics.js) dengan Measurement ID `G-TKPD4892GA4`.
3. **Emotion Styled Components**: Styling konsisten menggunakan `@emotion/styled` dan `@emotion/react` dengan tema Tokopedia di [`src/theme/tokopediaTheme.js`](file:///d:/Projects/tokopedia/src/theme/tokopediaTheme.js).
4. **Akamai Edge CDN Simulation**:
   * Middleware di [`vite.config.js`](file:///d:/Projects/tokopedia/vite.config.js) yang menginjeksi header CDN (`Edge-Control`, `Akamai-Cache-Status`, `Akamai-Edge-Worker`, dll.).
   * Drawer telemetri real-time di pojok kanan bawah ([`src/components/AkamaiTelemetryDrawer.jsx`](file:///d:/Projects/tokopedia/src/components/AkamaiTelemetryDrawer.jsx)).
5. **Progressive Web App (PWA)**:
   * Web App Manifest di [`manifest.json`](file:///d:/Projects/tokopedia/manifest.json).
   * Service Worker di [`public/sw.js`](file:///d:/Projects/tokopedia/public/sw.js) yang mem-precache seluruh aset inti dan rute HTML dengan fallback [`offline.html`](file:///d:/Projects/tokopedia/offline.html).
6. **Loadable Components**: Lazy loading komponen berat via wrapper [`src/utils/loadable.jsx`](file:///d:/Projects/tokopedia/src/utils/loadable.jsx).
7. **Google Tag Manager (GTM)**: Event bus terpusat di [`src/services/gtm.js`](file:///d:/Projects/tokopedia/src/services/gtm.js) dengan container `GTM-TKPD988`.
8. **Criteo OneTag**: Pelacakan audiens e-commerce via [`src/services/criteo.js`](file:///d:/Projects/tokopedia/src/services/criteo.js) (`viewList`, `viewItem`, `viewBasket`, `trackTransaction`).
9. **OpenGraph & Twitter Cards Meta**: Manajemen meta tag dinamis dan kartu sosial media via [`src/services/opengraph.js`](file:///d:/Projects/tokopedia/src/services/opengraph.js).

---

## 3. Peta 11 Rute Multi-Page Application (MPA)

| Rute Bersih | File Entry HTML | Komponen Halaman | Deskripsi Fitur |
|---|---|---|---|
| `/` | `index.html` | [`src/pages/Home.jsx`](file:///d:/Projects/tokopedia/src/pages/Home.jsx) | Beranda Tokopedia: Hero carousel, kategori, produk rekomendasi, flash sale. |
| `/search` | `search.html` | [`src/pages/Search.jsx`](file:///d:/Projects/tokopedia/src/pages/Search.jsx) | Search Result Page (SRP): Tab **Produk** (grid 5-kolom) & **Toko** (grid 3-kolom), URL parameter otentik (`st=`, `srp_component_id=02.01.00.00`), dan lively sorting. |
| `/store` | `store.html` | [`src/pages/Store.jsx`](file:///d:/Projects/tokopedia/src/pages/Store.jsx) | Halaman Toko Individual (contoh: *PIRA Indonesia*): Profil official store, drawer notifikasi hover/click, prioritas pencarian dalam toko, dan showcase diskon. |
| `/pdp` | `pdp.html` | [`src/pages/PDP.jsx`](file:///d:/Projects/tokopedia/src/pages/PDP.jsx) | Product Detail Page: Galeri gambar, varian, ulasan pembeli, dan kalkulasi ongkir. |
| `/cart` | `cart.html` | [`src/pages/Cart.jsx`](file:///d:/Projects/tokopedia/src/pages/Cart.jsx) | Keranjang Belanja: Seleksi multi-toko, penyesuaian kuantitas, ringkasan belanja, dan modal checkout. |
| `/profile` | `profile.html` | [`src/pages/Profile.jsx`](file:///d:/Projects/tokopedia/src/pages/Profile.jsx) | Pengaturan Profil Pengguna: Biodata diri, sidebar profil, dan modal edit profil. |
| `/address` | `address.html` | [`src/pages/Address.jsx`](file:///d:/Projects/tokopedia/src/pages/Address.jsx) | Manajemen Alamat Pengiriman: Daftar alamat, pilih alamat utama, dan modal tambah alamat baru. |
| `/notifications` | `notifications.html` | [`src/pages/Notifications.jsx`](file:///d:/Projects/tokopedia/src/pages/Notifications.jsx) | Pengaturan Notifikasi: Notifikasi pembelian, penjualan, dan promo via email/push. |
| `/bank-accounts` | `bank-accounts.html` | [`src/pages/BankAccounts.jsx`](file:///d:/Projects/tokopedia/src/pages/BankAccounts.jsx) | Daftar Rekening Bank: Kartu rekening BCA, BNI, Mandiri dengan logo SVG vektor dan modal tambah/hapus. |
| `/payment-settings` | `payment-settings.html` | [`src/pages/PaymentSettings.jsx`](file:///d:/Projects/tokopedia/src/pages/PaymentSettings.jsx) | Instan Pembayaran: Kartu virtual GoPay (saldo `Rp51.061`) dan saklar koneksi DANA. |
| `/offline` | `offline.html` | Static HTML | Halaman fallback PWA saat jaringan terputus (offline). |

---

## 4. Mesin Pencarian Kata Kunci Akurat (Search Engine)

Algoritma pencarian berada di [`src/utils/searchEngine.js`](file:///d:/Projects/tokopedia/src/utils/searchEngine.js):
* **Word-Boundary Tokenizer (`matchWord`)**: Mencegah kesalahan pencarian leksikal bahasa Indonesia (misalnya mencari `"meja"` **tidak boleh** memunculkan `"kemeja"`).
* **Prioritas Toko (`searchStoreProducts`)**: Pada halaman toko, bilah pencarian mengutamakan pencarian di dalam toko terlebih dahulu sebelum menawarkan opsi pencarian di seluruh Tokopedia.

---

## 5. Layanan State Reaktif Singleton

Setiap layanan state disimpan sebagai singleton reaktif dengan pola subscriber (Observer) dan sinkronisasi ke `localStorage`:
* [`cartService.js`](file:///d:/Projects/tokopedia/src/services/cartService.js): State keranjang belanja & item count badge.
* [`userService.js`](file:///d:/Projects/tokopedia/src/services/userService.js): Profil pengguna (*Sakti Buana*), saldo GoPay, dan jumlah notifikasi belum dibaca.
* [`addressService.js`](file:///d:/Projects/tokopedia/src/services/addressService.js): Daftar alamat & alamat terpilih untuk pengiriman di header.
* [`bankService.js`](file:///d:/Projects/tokopedia/src/services/bankService.js): Manajemen rekening bank (BCA, BNI, Mandiri).
* [`paymentService.js`](file:///d:/Projects/tokopedia/src/services/paymentService.js): Manajemen integrasi GoPay dan DANA.
* [`notificationService.js`](file:///d:/Projects/tokopedia/src/services/notificationService.js): Preferensi notifikasi pengguna.

---

## 6. Standar Pengujian & Verifikasi Kualitas

1. **Zero Blank Page & Error Boundary**:
   * Setiap entry point HTML dibungkus oleh `<ErrorBoundary>` ([`src/components/ErrorBoundary.jsx`](file:///d:/Projects/tokopedia/src/components/ErrorBoundary.jsx)) sehingga kegagalan JavaScript tidak pernah menyebabkan layar putih kosong.
2. **Zero Console Errors**:
   * Setiap rute wajib bersih dari error console (`TypeError`, unhandled exceptions).
3. **Verifikasi Browser Otomatis (Headless Chromium CDP)**:
   * Pengujian interaksi real dapat dijalankan menggunakan skrip Node.js dengan port debugging `--remote-debugging-port=9222` pada Edge atau Chrome.

---

## 7. Catatan Khusus Lingkungan Windows PowerShell

* **Menjalankan Script npm**: Karena kebijakan eksekusi PowerShell di beberapa sistem memblokir `npm.ps1`, selalu gunakan:
  ```powershell
  cmd /c "npm run build"
  cmd /c "npm run dev"
  ```
* **Pemisah Perintah PowerShell**: Gunakan titik koma (`;`) bukan `&&`:
  ```powershell
  git add -A; git commit -m "feat: your commit message"
  ```
