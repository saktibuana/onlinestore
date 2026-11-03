import React, { useState, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import loadable from '../utils/loadable';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { searchProducts } from '../utils/searchEngine';
import { analytics } from '../services/analytics';
import { gtm } from '../services/gtm';
import { criteo } from '../services/criteo';
import { openGraph } from '../services/opengraph';
import { Filter, Star, Truck, ShieldCheck, ShoppingBag, Store, ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react';

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
  max-width: 1240px;
  margin: 16px auto 60px;
  padding: 0 16px;
`;

const SearchTabsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
  border-bottom: 1px solid #E5E7EB;
  margin-bottom: 16px;

  button.tab-btn {
    background: none;
    border: none;
    padding: 12px 4px;
    font-size: 15px;
    font-weight: 600;
    color: #6D7588;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 3px solid transparent;
    transition: color 0.15s, border-color 0.15s;

    &:hover {
      color: #03AC0E;
    }

    &.active {
      color: #03AC0E;
      font-weight: 700;
      border-bottom-color: #03AC0E;
    }
  }
`;

const HeaderSummary = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;

  h1 {
    font-size: 15px;
    font-weight: 400;
    color: #6D7588;
    margin: 0;

    strong {
      color: #212121;
      font-weight: 700;
    }

    span.keyword {
      color: #212121;
      font-weight: 700;
    }
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
      padding: 7px 14px;
      font-size: 13px;
      font-weight: 600;
      color: #212121;
      outline: none;
      background: #FFFFFF;
      cursor: pointer;

      &:focus {
        border-color: #03AC0E;
      }
    }
  }
`;

const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const FilterSidebar = styled.aside`
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 16px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 12px;
    border-bottom: 1px solid #F0F3F7;

    h3 {
      font-size: 16px;
      font-weight: 800;
      color: #212121;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    button.reset-btn {
      background: none;
      border: none;
      color: #03AC0E;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      padding: 0;
      &:hover { text-decoration: underline; }
    }
  }

  .filter-group {
    border-bottom: 1px solid #F0F3F7;
    padding-bottom: 14px;

    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    h4 {
      font-size: 13px;
      font-weight: 700;
      color: #212121;
      margin: 0 0 10px;
    }

    .subcategory-list {
      display: flex;
      flex-direction: column;
      gap: 6px;

      button.subcat-btn {
        background: none;
        border: none;
        text-align: left;
        font-size: 13px;
        color: #4A5568;
        cursor: pointer;
        padding: 3px 0;
        transition: color 0.15s;

        &:hover {
          color: #03AC0E;
        }

        &.active {
          color: #03AC0E;
          font-weight: 700;
        }
      }
    }

    label.filter-checkbox {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: #212121;
      cursor: pointer;
      margin-bottom: 8px;

      input[type="checkbox"] {
        accent-color: #03AC0E;
        width: 16px;
        height: 16px;
        cursor: pointer;
      }
    }

    .price-range-inputs {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 6px;

      .input-wrapper {
        display: flex;
        align-items: center;
        border: 1px solid #E5E7EB;
        border-radius: 8px;
        padding: 6px 10px;
        background: #FFFFFF;

        span.prefix {
          font-size: 12px;
          color: #9FA6B0;
          font-weight: 600;
          margin-right: 6px;
        }

        input {
          border: none;
          outline: none;
          font-size: 12px;
          color: #212121;
          width: 100%;
        }
      }

      button.apply-price-btn {
        background: #03AC0E;
        color: #FFFFFF;
        border: none;
        border-radius: 6px;
        padding: 6px 12px;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
        margin-top: 2px;
        &:hover { background-color: #02980C; }
      }
    }
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 960px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const PaginationWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  button.page-btn {
    min-width: 36px;
    height: 36px;
    padding: 0 10px;
    border-radius: 8px;
    border: 1px solid #E5E7EB;
    background: #FFFFFF;
    color: #212121;
    font-size: 13px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.15s;

    &:hover {
      border-color: #03AC0E;
      color: #03AC0E;
    }

    &.active {
      background-color: #03AC0E;
      border-color: #03AC0E;
      color: #FFFFFF;
      font-weight: 700;
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      border-color: #E5E7EB;
      color: #9FA6B0;
    }
  }

  span.dots {
    color: #9FA6B0;
    padding: 0 4px;
    font-weight: 700;
  }
`;

export default function Search() {
  const urlParams = new URLSearchParams(window.location.search);
  const initialQuery = urlParams.get('q') || '';
  const initialCategory = urlParams.get('cat') || '';

  const [activeTab, setActiveTab] = useState('product'); // 'product' | 'shop'
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedSubcat, setSelectedSubcat] = useState('');
  const [filterOfficialOnly, setFilterOfficialOnly] = useState(urlParams.get('fshop') === '1');
  const [filterPowerMerchant, setFilterPowerMerchant] = useState(false);
  const [filterFreeShipping, setFilterFreeShipping] = useState(false);
  const [filterRating4Plus, setFilterRating4Plus] = useState(false);
  const [filterLocation, setFilterLocation] = useState({});
  const [priceMin, setPriceMin] = useState(urlParams.get('pmin') || '');
  const [priceMax, setPriceMax] = useState(urlParams.get('pmax') || '');
  const [appliedPrice, setAppliedPrice] = useState({ min: 0, max: Infinity });
  const [sortBy, setSortBy] = useState('relevant');
  const [currentPage, setCurrentPage] = useState(1);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    openGraph.updateMeta({
      title: searchQuery ? `Jual ${searchQuery} Terlengkap & Harga Terbaru | Tokopedia` : 'Cari Produk Pilihan | Tokopedia',
      description: `Beli aneka produk ${searchQuery || 'terlengkap'} online dengan diskon, cashback, dan Bebas Ongkir di Tokopedia.`,
      image: '/icons/tokopedia-logo.svg',
      type: 'website'
    });

    if (searchQuery) {
      analytics.trackSearch(searchQuery, products.length);
    }
    criteo.trackViewList(products.map((p) => p.id), searchQuery);
    gtm.pushEvent('search_page_loaded', {
      query: searchQuery,
      srp_component_id: urlParams.get('srp_component_id') || '02.01.00.00'
    });
  }, [searchQuery]);

  const handleApplyPrice = (e) => {
    e.preventDefault();
    setAppliedPrice({
      min: Number(priceMin) || 0,
      max: Number(priceMax) || Infinity
    });
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSelectedSubcat('');
    setFilterOfficialOnly(false);
    setFilterPowerMerchant(false);
    setFilterFreeShipping(false);
    setFilterRating4Plus(false);
    setFilterLocation({});
    setPriceMin('');
    setPriceMax('');
    setAppliedPrice({ min: 0, max: Infinity });
    setCurrentPage(1);
  };

  // Perform accurate token-based search with filters
  const filteredItems = useMemo(() => {
    // Combine search query with subcategory if selected
    const combinedQuery = selectedSubcat ? `${searchQuery} ${selectedSubcat}`.trim() : searchQuery;

    let results = searchProducts(products, combinedQuery, {
      category: initialCategory,
      officialOnly: filterOfficialOnly,
      freeShippingOnly: filterFreeShipping,
      minRating: filterRating4Plus ? 4.8 : 0,
      minPrice: appliedPrice.min,
      maxPrice: appliedPrice.max,
      sortBy: sortBy === 'lowest' ? 'lowestPrice' : sortBy === 'highest' ? 'highestPrice' : sortBy === 'rating' ? 'highestRating' : 'relevant'
    });

    // Location filter
    const activeLocations = Object.entries(filterLocation).filter(([_, v]) => v).map(([k]) => k);
    if (activeLocations.length > 0) {
      results = results.filter((p) =>
        activeLocations.some((loc) => p.shop?.location?.toLowerCase().includes(loc.toLowerCase()))
      );
    }

    return results;
  }, [
    searchQuery,
    selectedSubcat,
    initialCategory,
    filterOfficialOnly,
    filterPowerMerchant,
    filterFreeShipping,
    filterRating4Plus,
    filterLocation,
    appliedPrice,
    sortBy
  ]);

  const hasActiveFilter = Boolean(
    selectedSubcat ||
    filterOfficialOnly ||
    filterPowerMerchant ||
    filterFreeShipping ||
    filterRating4Plus ||
    Object.values(filterLocation).some(Boolean) ||
    appliedPrice.min > 0 ||
    appliedPrice.max < Infinity
  );

  return (
    <div>
      <BranchJourneyBanner />
      <Header activeQuery={searchQuery} />

      <Container>
        {/* Top Product / Shop Tabs */}
        <SearchTabsRow>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'product' ? 'active' : ''}`}
            onClick={() => setActiveTab('product')}
          >
            <ShoppingBag size={18} />
            <span>Produk</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'shop' ? 'active' : ''}`}
            onClick={() => setActiveTab('shop')}
          >
            <Store size={18} />
            <span>Toko</span>
          </button>
        </SearchTabsRow>

        {activeTab === 'product' ? (
          <>
            {/* Summary Line & Sort Dropdown */}
            <HeaderSummary>
              <h1>
                Menampilkan 1 - {filteredItems.length} barang dari total <strong>2.4jt+</strong> untuk <span className="keyword">"{searchQuery || 'produk'}"</span>
              </h1>

              <div className="sort-select">
                <span>Urutkan:</span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="relevant">Paling Sesuai</option>
                  <option value="rating">Ulasan</option>
                  <option value="latest">Terbaru</option>
                  <option value="lowest">Harga Terendah</option>
                  <option value="highest">Harga Tertinggi</option>
                </select>
              </div>
            </HeaderSummary>

            <ContentLayout>
              {/* Left Tokopedia Filter Sidebar */}
              <FilterSidebar>
                <div className="sidebar-header">
                  <h3><Filter size={16} /> Filter</h3>
                  {hasActiveFilter && (
                    <button type="button" className="reset-btn" onClick={handleResetFilters}>
                      Reset
                    </button>
                  )}
                </div>

                {/* Subkategori Meja */}
                <div className="filter-group">
                  <h4>Kategori</h4>
                  <div className="subcategory-list">
                    <button
                      type="button"
                      className={`subcat-btn ${selectedSubcat === '' ? 'active' : ''}`}
                      onClick={() => setSelectedSubcat('')}
                    >
                      Semua Kategori
                    </button>
                    <button
                      type="button"
                      className={`subcat-btn ${selectedSubcat === 'kerja' ? 'active' : ''}`}
                      onClick={() => setSelectedSubcat('kerja')}
                    >
                      Meja Kerja
                    </button>
                    <button
                      type="button"
                      className={`subcat-btn ${selectedSubcat === 'belajar' ? 'active' : ''}`}
                      onClick={() => setSelectedSubcat('belajar')}
                    >
                      Meja Belajar
                    </button>
                    <button
                      type="button"
                      className={`subcat-btn ${selectedSubcat === 'lipat' ? 'active' : ''}`}
                      onClick={() => setSelectedSubcat('lipat')}
                    >
                      Meja Lipat
                    </button>
                    <button
                      type="button"
                      className={`subcat-btn ${selectedSubcat === 'makan' ? 'active' : ''}`}
                      onClick={() => setSelectedSubcat('makan')}
                    >
                      Meja Makan
                    </button>
                    <button
                      type="button"
                      className={`subcat-btn ${selectedSubcat === 'rias' ? 'active' : ''}`}
                      onClick={() => setSelectedSubcat('rias')}
                    >
                      Meja Rias
                    </button>
                    <button
                      type="button"
                      className={`subcat-btn ${selectedSubcat === 'tamu' ? 'active' : ''}`}
                      onClick={() => setSelectedSubcat('tamu')}
                    >
                      Meja Tamu / Kopi
                    </button>
                  </div>
                </div>

                {/* Lokasi */}
                <div className="filter-group">
                  <h4>Lokasi</h4>
                  <label className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={Boolean(filterLocation['Jakarta'])}
                      onChange={(e) => setFilterLocation({ ...filterLocation, Jakarta: e.target.checked })}
                    />
                    DKI Jakarta
                  </label>
                  <label className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={Boolean(filterLocation['Bandung'])}
                      onChange={(e) => setFilterLocation({ ...filterLocation, Bandung: e.target.checked })}
                    />
                    Kota Bandung
                  </label>
                  <label className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={Boolean(filterLocation['Surabaya'])}
                      onChange={(e) => setFilterLocation({ ...filterLocation, Surabaya: e.target.checked })}
                    />
                    Kota Surabaya
                  </label>
                  <label className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={Boolean(filterLocation['Tangerang'])}
                      onChange={(e) => setFilterLocation({ ...filterLocation, Tangerang: e.target.checked })}
                    />
                    Kota Tangerang
                  </label>
                </div>

                {/* Pengiriman */}
                <div className="filter-group">
                  <h4>Pengiriman</h4>
                  <label className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={filterFreeShipping}
                      onChange={(e) => setFilterFreeShipping(e.target.checked)}
                    />
                    Bebas Ongkir
                  </label>
                </div>

                {/* Jenis Toko */}
                <div className="filter-group">
                  <h4>Jenis Toko</h4>
                  <label className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={filterOfficialOnly}
                      onChange={(e) => setFilterOfficialOnly(e.target.checked)}
                    />
                    Official Store
                  </label>
                  <label className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={filterPowerMerchant}
                      onChange={(e) => setFilterPowerMerchant(e.target.checked)}
                    />
                    Power Merchant PRO
                  </label>
                </div>

                {/* Harga */}
                <div className="filter-group">
                  <h4>Harga</h4>
                  <form onSubmit={handleApplyPrice} className="price-range-inputs">
                    <div className="input-wrapper">
                      <span className="prefix">Rp</span>
                      <input
                        type="number"
                        placeholder="Harga Minimum"
                        value={priceMin}
                        onChange={(e) => setPriceMin(e.target.value)}
                      />
                    </div>
                    <div className="input-wrapper">
                      <span className="prefix">Rp</span>
                      <input
                        type="number"
                        placeholder="Harga Maksimum"
                        value={priceMax}
                        onChange={(e) => setPriceMax(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="apply-price-btn">
                      Terapkan
                    </button>
                  </form>
                </div>

                {/* Rating */}
                <div className="filter-group">
                  <h4>Rating</h4>
                  <label className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={filterRating4Plus}
                      onChange={(e) => setFilterRating4Plus(e.target.checked)}
                    />
                    ★ 4.8 ke atas
                  </label>
                </div>
              </FilterSidebar>

              {/* Product Grid Area */}
              <div>
                {filteredItems.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px 20px', background: '#F8F9FA', borderRadius: 12 }}>
                    <h3 style={{ fontSize: 18, color: '#212121', marginBottom: 8 }}>Barang tidak ditemukan</h3>
                    <p style={{ color: '#6D7588', margin: 0, fontSize: 14 }}>
                      Coba kata kunci lain atau ubah filter pencarian Anda.
                    </p>
                    <button
                      onClick={handleResetFilters}
                      style={{
                        marginTop: 18,
                        background: '#03AC0E',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '10px 24px',
                        borderRadius: 8,
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Reset Filter
                    </button>
                  </div>
                ) : (
                  <>
                    <ProductGrid>
                      {filteredItems.map((prod, idx) => (
                        <ProductCard
                          key={prod.id}
                          product={prod}
                          isAd={idx === 0 || idx === 1}
                          onQuickView={(p) => setQuickViewProduct(p)}
                        />
                      ))}
                    </ProductGrid>

                    {/* Pagination */}
                    <PaginationWrapper>
                      <button
                        type="button"
                        className="page-btn"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        aria-label="Halaman sebelumnya"
                      >
                        <ChevronLeft size={16} />
                      </button>

                      <button
                        type="button"
                        className={`page-btn ${currentPage === 1 ? 'active' : ''}`}
                        onClick={() => setCurrentPage(1)}
                      >
                        1
                      </button>

                      <button
                        type="button"
                        className={`page-btn ${currentPage === 2 ? 'active' : ''}`}
                        onClick={() => setCurrentPage(2)}
                      >
                        2
                      </button>

                      <button
                        type="button"
                        className={`page-btn ${currentPage === 3 ? 'active' : ''}`}
                        onClick={() => setCurrentPage(3)}
                      >
                        3
                      </button>

                      <span className="dots">...</span>

                      <button
                        type="button"
                        className="page-btn"
                        onClick={() => setCurrentPage(100)}
                      >
                        100
                      </button>

                      <button
                        type="button"
                        className="page-btn"
                        onClick={() => setCurrentPage((p) => p + 1)}
                        aria-label="Halaman berikutnya"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </PaginationWrapper>
                  </>
                )}
              </div>
            </ContentLayout>
          </>
        ) : (
          /* Toko Tab View */
          <div style={{ padding: '32px 0' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#212121', marginBottom: 16 }}>
              Toko Pilihan untuk "{searchQuery || 'meja'}"
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {[
                { name: 'Informa Official Store', city: 'Kota Tangerang Selatan', rating: '4.9', products: '420 Produk' },
                { name: 'Pira Home Living', city: 'Kota Surabaya', rating: '4.9', products: '280 Produk' },
                { name: 'Dekoruma Official Store', city: 'Kota Jakarta Barat', rating: '4.9', products: '650 Produk' },
                { name: 'Jepara Furniture Official', city: 'Kab. Jepara', rating: '5.0', products: '190 Produk' },
                { name: 'Fantech Living Official', city: 'Kota Jakarta Utara', rating: '4.9', products: '150 Produk' }
              ].map((shop, i) => (
                <div key={i} style={{ border: '1px solid #E5E7EB', borderRadius: 10, padding: 18, background: '#FFF' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#EBF7ED', color: '#03AC0E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                      <Store size={22} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#212121' }}>{shop.name}</h4>
                      <p style={{ margin: '2px 0 0', fontSize: 12, color: '#6D7588' }}>{shop.city} • ★ {shop.rating}</p>
                    </div>
                  </div>
                  <button
                    style={{ marginTop: 14, width: '100%', background: '#03AC0E', color: '#FFF', border: 'none', padding: '8px', borderRadius: 6, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}
                    onClick={() => alert(`Kunjungi ${shop.name}`)}
                  >
                    Kunjungi Toko
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
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
