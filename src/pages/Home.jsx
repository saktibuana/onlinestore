import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import loadable from '@loadable/component';
import Header from '../components/Header';
import FeatureCardsSection from '../components/FeatureCardsSection';
import QuickCategoryBar from '../components/QuickCategoryBar';
import RecommendationTabs from '../components/RecommendationTabs';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import PwaInstallPrompt from '../components/PwaInstallPrompt';
import { products, categories } from '../data/products';
import { analytics } from '../services/analytics';
import { gtm } from '../services/gtm';
import { criteo } from '../services/criteo';
import { openGraph } from '../services/opengraph';

// Loadable Heavy Components
const HeroBannerCarousel = loadable(() => import('../components/HeroBannerCarousel'), {
  fallback: <div style={{ height: 280, background: '#E5E7EB', borderRadius: 16, margin: '16px auto', maxWidth: 1200 }} />
});

const BranchJourneyBanner = loadable(() => import('../components/BranchJourneyBanner'), {
  fallback: null
});

const ProductQuickViewModal = loadable(() => import('../components/ProductQuickViewModal'), {
  fallback: null
});

const AkamaiTelemetryDrawer = loadable(() => import('../components/AkamaiTelemetryDrawer'), {
  fallback: null
});

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #FFFFFF;
`;

const MainContent = styled.main`
  flex: 1;
`;

export default function Home() {
  const [activeTab, setActiveTab] = useState('all');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    // OpenGraph meta for Homepage
    openGraph.updateMeta({
      title: 'Situs Jual Beli Online Terlengkap, Mudah & Aman | Tokopedia',
      description: 'Nikmati belanja online hemat dan aman di Tokopedia. Temukan promo diskon hingga 90%, Bebas Ongkir se-Indonesia, dan jutaan produk pilihan.',
      image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600',
      type: 'website'
    });

    // Criteo OneTag: viewHome
    criteo.trackViewHome();

    // GA4: view_item_list
    analytics.trackViewItemList(products, 'Rekomendasi Untuk Anda');

    // GTM: page_view
    gtm.pushEvent('tokopedia_home_view', {
      total_products: products.length,
      active_tab: 'all'
    });
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    const categoryName = categories.find((c) => c.id === tabId)?.name || 'Untuk Anda';
    const filtered = tabId === 'all' ? products : products.filter((p) => p.category === tabId || tabId === 'special' || tabId === 'best-seller');

    analytics.trackViewItemList(filtered, categoryName);
    criteo.trackViewList(filtered.map((p) => p.id), categoryName);
  };

  const filteredProducts = activeTab === 'all'
    ? products
    : products.filter((p) => p.category === activeTab || activeTab === 'special' || activeTab === 'best-seller');

  return (
    <PageWrapper>
      {/* Branch.io Journeys Banner */}
      <BranchJourneyBanner />

      {/* Main Header */}
      <Header />

      <MainContent>
        {/* Hero Promo Banner Carousel */}
        <HeroBannerCarousel />

        {/* Popular Categories & Top Up / Tagihan Side-by-Side Cards */}
        <FeatureCardsSection />

        {/* Quick Category Icons Bar */}
        <QuickCategoryBar />

        {/* Category Tabs: "Untuk Anda", "Spesial Hari Ini", dll. */}
        <RecommendationTabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {/* Product Grid with Skeletons */}
        <ProductGrid
          items={filteredProducts}
          onQuickView={(prod) => setQuickViewProduct(prod)}
        />
      </MainContent>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductQuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}

      {/* PWA Install Banner */}
      <PwaInstallPrompt />

      {/* Akamai & Multi-Stack Live Inspector Drawer */}
      <AkamaiTelemetryDrawer />

      {/* Footer */}
      <Footer />
    </PageWrapper>
  );
}
