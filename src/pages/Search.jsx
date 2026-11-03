import React, { useState, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import loadable from '@loadable/component';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { analytics } from '../services/analytics';
import { gtm } from '../services/gtm';
import { criteo } from '../services/criteo';
import { openGraph } from '../services/opengraph';
import { Filter, Star, Truck, ShieldCheck, Check } from 'lucide-react';

const ProductQuickViewModal = loadable(() => import('../components/ProductQuickViewModal'), {
  fallback: null
});

const AkamaiTelemetryDrawer = loadable(() => import('../components/AkamaiTelemetryDrawer'), {
  fallback: null
});

const BranchJourneyBanner = loadable(() => import('../components/BranchJourneyBanner'), {
  fallback: null
});

const Container = styled.div`
  max-width: 1200px;
  margin: 20px auto 48px;
  padding: 0 16px;
`;

const HeaderSummary = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: 18px;
    font-weight: 700;
    color: #212121;
    span { color: #03AC0E; }
  }

  .sort-select {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #6D7588;

    select {
      border: 1px solid #E5E7EB;
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 13px;
      color: #212121;
      outline: none;
    }
  }
`;

const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 24px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const FilterSidebar = styled.aside`
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 16px 18px;
  height: fit-content;

  h3 {
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .filter-group {
    border-bottom: 1px solid #F0F3F7;
    padding: 14px 0;

    &:last-child { border-bottom: none; }

    h4 {
      font-size: 13px;
      font-weight: 700;
      color: #212121;
      margin-bottom: 10px;
    }

    label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: #4A5568;
      cursor: pointer;
      margin-bottom: 8px;

      input[type="checkbox"] {
        accent-color: #03AC0E;
        width: 16px;
        height: 16px;
      }
    }
  }

  .price-inputs {
    display: flex;
    flex-direction: column;
    gap: 8px;

    input {
      border: 1px solid #E5E7EB;
      border-radius: 6px;
      padding: 6px 10px;
      font-size: 13px;
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default function Search() {
  const urlParams = new URLSearchParams(window.location.search);
  const initialQuery = urlParams.get('q') || '';
  const initialCat = urlParams.get('cat') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filterOfficialOnly, setFilterOfficialOnly] = useState(false);
  const [filterFreeShipping, setFilterFreeShipping] = useState(false);
  const [filterRating4Plus, setFilterRating4Plus] = useState(false);
  const [sortBy, setSortBy] = useState('relevant');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    openGraph.updateMeta({
      title: searchQuery ? `Cari "${searchQuery}" | Tokopedia` : 'Cari Produk Pilihan | Tokopedia',
      description: `Temukan penawaran terbaik untuk ${searchQuery || 'kebutuhan Anda'} dengan diskon kilat dan Bebas Ongkir di Tokopedia.`,
      image: '/icons/tokopedia-logo.svg',
      type: 'website'
    });

    if (searchQuery) {
      analytics.trackSearch(searchQuery, products.length);
    }
    criteo.trackViewList(products.map((p) => p.id), searchQuery);
    gtm.pushEvent('search_page_loaded', { query: searchQuery });
  }, [searchQuery]);

  const filteredItems = useMemo(() => {
    let result = [...products];

    // Search query filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.categoryName?.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (initialCat) {
      result = result.filter((p) => p.category === initialCat);
    }

    // Official store filter
    if (filterOfficialOnly) {
      result = result.filter((p) => p.shop?.isOfficial);
    }

    // Free shipping filter
    if (filterFreeShipping) {
      result = result.filter((p) => p.hasFreeShipping);
    }

    // Rating filter
    if (filterRating4Plus) {
      result = result.filter((p) => p.rating >= 4.8);
    }

    // Sorting
    if (sortBy === 'lowest') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'highest') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchQuery, initialCat, filterOfficialOnly, filterFreeShipping, filterRating4Plus, sortBy]);

  return (
    <div>
      <BranchJourneyBanner />
      <Header activeQuery={searchQuery} />

      <Container>
        <HeaderSummary>
          <h1>
            Menampilkan {filteredItems.length} barang {searchQuery ? <>untuk "<span>{searchQuery}</span>"</> : 'pilihan terbaik'}
          </h1>

          <div className="sort-select">
            <span>Urutkan:</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="relevant">Paling Sesuai</option>
              <option value="rating">Rating Tertinggi</option>
              <option value="lowest">Harga Terendah</option>
              <option value="highest">Harga Tertinggi</option>
            </select>
          </div>
        </HeaderSummary>

        <ContentLayout>
          {/* Filter Sidebar */}
          <FilterSidebar>
            <h3><Filter size={16} /> Filter</h3>

            <div className="filter-group">
              <h4>Jenis Toko</h4>
              <label>
                <input
                  type="checkbox"
                  checked={filterOfficialOnly}
                  onChange={(e) => setFilterOfficialOnly(e.target.checked)}
                />
                Official Store
              </label>
            </div>

            <div className="filter-group">
              <h4>Pengiriman</h4>
              <label>
                <input
                  type="checkbox"
                  checked={filterFreeShipping}
                  onChange={(e) => setFilterFreeShipping(e.target.checked)}
                />
                Bebas Ongkir
              </label>
            </div>

            <div className="filter-group">
              <h4>Rating</h4>
              <label>
                <input
                  type="checkbox"
                  checked={filterRating4Plus}
                  onChange={(e) => setFilterRating4Plus(e.target.checked)}
                />
                Bintang 4.8 ke atas
              </label>
            </div>
          </FilterSidebar>

          {/* Product Grid */}
          <div>
            {filteredItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', background: '#F8F9FA', borderRadius: 12 }}>
                <h3>Produk tidak ditemukan</h3>
                <p style={{ color: '#6D7588', marginTop: 8 }}>
                  Coba kata kunci pencarian yang lain atau reset filter toko.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setFilterOfficialOnly(false); setFilterFreeShipping(false); }}
                  style={{ marginTop: 16, background: '#03AC0E', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: 6, fontWeight: 700, cursor: 'pointer' }}
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <Grid>
                {filteredItems.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </Grid>
            )}
          </div>
        </ContentLayout>
      </Container>

      {quickViewProduct && (
        <ProductQuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}

      <AkamaiTelemetryDrawer />
      <Footer />
    </div>
  );
}
