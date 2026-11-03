import React, { useState, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import loadable from '../utils/loadable';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { stores } from '../data/stores';
import { searchProducts, searchStores } from '../utils/searchEngine';
import { analytics } from '../services/analytics';
import { gtm } from '../services/gtm';
import { criteo } from '../services/criteo';
import { openGraph } from '../services/opengraph';
import {
  Filter,
  Star,
  Truck,
  ShieldCheck,
  ShoppingBag,
  Store as StoreIcon,
  ChevronRight,
  ChevronLeft,
  Search as SearchIcon,
  CheckCircle2,
  Gem,
  Award
} from 'lucide-react';

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

      .badge-label {
        display: flex;
        align-items: center;
        gap: 4px;
      }
    }

    .store-search-box {
      display: flex;
      align-items: center;
      border: 1px solid #E5E7EB;
      border-radius: 8px;
      padding: 6px 10px;
      background: #FFFFFF;

      input {
        border: none;
        outline: none;
        font-size: 12px;
        color: #212121;
        width: 100%;
        margin-left: 6px;
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

const StoreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const StoreCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 185px;
  transition: border-color 0.15s, box-shadow 0.15s;

  &:hover {
    border-color: #03AC0E;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
  }

  .store-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;

    .store-left {
      display: flex;
      align-items: center;
      gap: 10px;
      overflow: hidden;

      .store-avatar {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        object-fit: cover;
        background-color: ${(props) => props.avatarBg || '#03AC0E'};
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .store-meta {
        display: flex;
        flex-direction: column;
        overflow: hidden;

        .store-name-row {
          display: flex;
          align-items: center;
          gap: 6px;

          h4 {
            font-size: 13px;
            font-weight: 700;
            color: #212121;
            margin: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .badge-pm-pro {
            background-color: #F3E8FF;
            color: #7E22CE;
            font-size: 9px;
            font-weight: 800;
            padding: 1px 4px;
            border-radius: 3px;
          }

          .badge-power {
            background-color: #EBF7ED;
            color: #03AC0E;
            font-size: 9px;
            font-weight: 800;
            padding: 1px 4px;
            border-radius: 3px;
          }

          .badge-official {
            background-color: #4F3582;
            color: #FFFFFF;
            font-size: 9px;
            font-weight: 800;
            padding: 1px 4px;
            border-radius: 3px;
          }
        }

        .store-location {
          font-size: 11px;
          color: #6D7588;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

    button.visit-btn {
      background: #FFFFFF;
      border: 1px solid #03AC0E;
      color: #03AC0E;
      font-size: 12px;
      font-weight: 700;
      padding: 5px 12px;
      border-radius: 6px;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s;

      &:hover {
        background-color: #03AC0E;
        color: #FFFFFF;
      }
    }
  }

  .store-products-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-top: 14px;

    .preview-box {
      display: flex;
      flex-direction: column;
      gap: 4px;
      cursor: pointer;

      img {
        width: 100%;
        height: 72px;
        object-fit: cover;
        border-radius: 6px;
        background-color: #F8F9FA;
        border: 1px solid #F0F3F7;
      }

      .price-tag {
        font-size: 11px;
        font-weight: 700;
        color: #212121;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .empty-shelf {
    background-color: #F8F9FA;
    border-radius: 6px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 14px;
    border: 1px dashed #E5E7EB;

    span {
      font-size: 11px;
      color: #9FA6B0;
    }
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
  const initialSt = urlParams.get('st') === 'shop' ? 'shop' : 'product';

  const [activeTab, setActiveTab] = useState(initialSt); // 'product' | 'shop'
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

  // Store tab filter & sorting states
  const [sortStoreBy, setSortStoreBy] = useState('relevant');
  const [filterStoreTypes, setFilterStoreTypes] = useState({
    'pm-pro': false,
    'power-shop': false,
    official: false
  });
  const [filterStoreLocation, setFilterStoreLocation] = useState({});
  const [storeNameQuery, setStoreNameQuery] = useState('');

  useEffect(() => {
    openGraph.updateMeta({
      title: searchQuery
        ? `Jual ${searchQuery} Terlengkap & Harga Terbaru | Tokopedia`
        : 'Cari Produk & Toko Pilihan | Tokopedia',
      description: `Beli aneka produk dan temukan toko ${searchQuery || 'terlengkap'} online dengan diskon, cashback, dan Bebas Ongkir di Tokopedia.`,
      image: '/icons/tokopedia-logo.svg',
      type: 'website'
    });

    if (searchQuery) {
      analytics.trackSearch(searchQuery, products.length);
    }
    criteo.trackViewList(products.map((p) => p.id), searchQuery);
    gtm.pushEvent('search_page_loaded', {
      query: searchQuery,
      tab: activeTab,
      srp_component_id: urlParams.get('srp_component_id') || '02.01.00.00'
    });
  }, [searchQuery, activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const newSt = tab === 'shop' ? 'shop' : 'product';
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('st', newSt);
    window.history.replaceState({}, '', newUrl.toString());
    setCurrentPage(1);
  };

  const handleApplyPrice = (e) => {
    e.preventDefault();
    setAppliedPrice({
      min: Number(priceMin) || 0,
      max: Number(priceMax) || Infinity
    });
    setCurrentPage(1);
  };

  const handleResetProductFilters = () => {
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

  const handleResetStoreFilters = () => {
    setFilterStoreTypes({ 'pm-pro': false, 'power-shop': false, official: false });
    setFilterStoreLocation({});
    setStoreNameQuery('');
    setSortStoreBy('relevant');
    setCurrentPage(1);
  };

  // 1. Perform accurate token-based search for PRODUCTS
  const filteredProducts = useMemo(() => {
    const combinedQuery = selectedSubcat ? `${searchQuery} ${selectedSubcat}`.trim() : searchQuery;

    let results = searchProducts(products, combinedQuery, {
      category: initialCategory,
      officialOnly: filterOfficialOnly,
      freeShippingOnly: filterFreeShipping,
      minRating: filterRating4Plus ? 4.8 : 0,
      minPrice: appliedPrice.min,
      maxPrice: appliedPrice.max,
      sortBy:
        sortBy === 'lowest'
          ? 'lowestPrice'
          : sortBy === 'highest'
          ? 'highestPrice'
          : sortBy === 'rating'
          ? 'highestRating'
          : 'relevant'
    });

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

  // 2. Perform lively search and sorting for STORES (Toko)
  const filteredStores = useMemo(() => {
    const activeTypes = Object.entries(filterStoreTypes).filter(([_, v]) => v).map(([k]) => k);
    const activeLocations = Object.entries(filterStoreLocation).filter(([_, v]) => v).map(([k]) => k);

    return searchStores(stores, searchQuery, {
      types: activeTypes,
      locations: activeLocations,
      storeNameQuery: storeNameQuery,
      sortBy: sortStoreBy
    });
  }, [searchQuery, filterStoreTypes, filterStoreLocation, storeNameQuery, sortStoreBy]);

  const hasActiveProductFilter = Boolean(
    selectedSubcat ||
      filterOfficialOnly ||
      filterPowerMerchant ||
      filterFreeShipping ||
      filterRating4Plus ||
      Object.values(filterLocation).some(Boolean) ||
      appliedPrice.min > 0 ||
      appliedPrice.max < Infinity
  );

  const hasActiveStoreFilter = Boolean(
    Object.values(filterStoreTypes).some(Boolean) ||
      Object.values(filterStoreLocation).some(Boolean) ||
      storeNameQuery.trim() !== ''
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
            onClick={() => handleTabChange('product')}
          >
            <ShoppingBag size={18} />
            <span>Produk</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'shop' ? 'active' : ''}`}
            onClick={() => handleTabChange('shop')}
          >
            <StoreIcon size={18} />
            <span>Toko</span>
          </button>
        </SearchTabsRow>

        {activeTab === 'product' ? (
          /* ======================================================== */
          /* PRODUK TAB VIEW                                          */
          /* ======================================================== */
          <>
            <HeaderSummary>
              <h1>
                Menampilkan 1 - {filteredProducts.length} barang dari total <strong>2.4jt+</strong> untuk{' '}
                <span className="keyword">"{searchQuery || 'produk'}"</span>
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
              {/* Product Filter Sidebar */}
              <FilterSidebar>
                <div className="sidebar-header">
                  <h3><Filter size={16} /> Filter</h3>
                  {hasActiveProductFilter && (
                    <button type="button" className="reset-btn" onClick={handleResetProductFilters}>
                      Reset
                    </button>
                  )}
                </div>

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
                {filteredProducts.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px 20px', background: '#F8F9FA', borderRadius: 12 }}>
                    <h3 style={{ fontSize: 18, color: '#212121', marginBottom: 8 }}>Barang tidak ditemukan</h3>
                    <p style={{ color: '#6D7588', margin: 0, fontSize: 14 }}>
                      Coba kata kunci lain atau ubah filter pencarian Anda.
                    </p>
                    <button
                      onClick={handleResetProductFilters}
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
                      {filteredProducts.map((prod, idx) => (
                        <ProductCard
                          key={prod.id}
                          product={prod}
                          isAd={idx === 0 || idx === 1}
                          onQuickView={(p) => setQuickViewProduct(p)}
                        />
                      ))}
                    </ProductGrid>

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
                      <span className="dots">...</span>
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
          /* ======================================================== */
          /* TOKO (STORE) TAB VIEW - MATCHING SCREENSHOT              */
          /* ======================================================== */
          <>
            <HeaderSummary>
              <h1>
                Menampilkan 1 - {filteredStores.length} toko dari total <strong>514</strong> untuk{' '}
                <span className="keyword">"{searchQuery || 'meja'}"</span>
              </h1>

              <div className="sort-select">
                <span>Urutkan:</span>
                <select value={sortStoreBy} onChange={(e) => setSortStoreBy(e.target.value)}>
                  <option value="relevant">Paling Sesuai</option>
                  <option value="mostProducts">Produk Terbanyak</option>
                  <option value="rating">Rating Tertinggi</option>
                  <option value="mostTransactions">Transaksi Terbanyak</option>
                  <option value="nameAsc">Nama Toko (A - Z)</option>
                  <option value="nameDesc">Nama Toko (Z - A)</option>
                </select>
              </div>
            </HeaderSummary>

            <ContentLayout>
              {/* Store Filter Sidebar */}
              <FilterSidebar>
                <div className="sidebar-header">
                  <h3><Filter size={16} /> Filter</h3>
                  {hasActiveStoreFilter && (
                    <button type="button" className="reset-btn" onClick={handleResetStoreFilters}>
                      Reset
                    </button>
                  )}
                </div>

                {/* Jenis Toko */}
                <div className="filter-group">
                  <h4>Jenis Toko</h4>
                  <label className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={filterStoreTypes['pm-pro']}
                      onChange={(e) =>
                        setFilterStoreTypes({ ...filterStoreTypes, 'pm-pro': e.target.checked })
                      }
                    />
                    <span className="badge-label">
                      <Gem size={13} color="#7E22CE" /> PM Pro
                    </span>
                  </label>

                  <label className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={filterStoreTypes['power-shop']}
                      onChange={(e) =>
                        setFilterStoreTypes({ ...filterStoreTypes, 'power-shop': e.target.checked })
                      }
                    />
                    <span className="badge-label">
                      <CheckCircle2 size={13} color="#03AC0E" /> Power Shop
                    </span>
                  </label>

                  <label className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={filterStoreTypes['official']}
                      onChange={(e) =>
                        setFilterStoreTypes({ ...filterStoreTypes, official: e.target.checked })
                      }
                    />
                    <span className="badge-label">
                      <Award size={13} color="#4F3582" /> Official Store
                    </span>
                  </label>
                </div>

                {/* Lokasi Toko */}
                <div className="filter-group">
                  <h4>Lokasi</h4>
                  <label className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={Boolean(filterStoreLocation['Jakarta'])}
                      onChange={(e) =>
                        setFilterStoreLocation({ ...filterStoreLocation, Jakarta: e.target.checked })
                      }
                    />
                    DKI Jakarta
                  </label>
                  <label className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={Boolean(filterStoreLocation['Jabodetabek'])}
                      onChange={(e) =>
                        setFilterStoreLocation({ ...filterStoreLocation, Jabodetabek: e.target.checked })
                      }
                    />
                    Jabodetabek
                  </label>
                  <label className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={Boolean(filterStoreLocation['Bandung'])}
                      onChange={(e) =>
                        setFilterStoreLocation({ ...filterStoreLocation, Bandung: e.target.checked })
                      }
                    />
                    Bandung
                  </label>
                  <label className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={Boolean(filterStoreLocation['Medan'])}
                      onChange={(e) =>
                        setFilterStoreLocation({ ...filterStoreLocation, Medan: e.target.checked })
                      }
                    />
                    Medan
                  </label>
                  <label className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={Boolean(filterStoreLocation['Surabaya'])}
                      onChange={(e) =>
                        setFilterStoreLocation({ ...filterStoreLocation, Surabaya: e.target.checked })
                      }
                    />
                    Surabaya
                  </label>
                </div>

                {/* Filter Cari Nama Toko */}
                <div className="filter-group">
                  <h4>Toko</h4>
                  <div className="store-search-box">
                    <SearchIcon size={14} color="#9FA6B0" />
                    <input
                      type="text"
                      placeholder="Nama Toko"
                      value={storeNameQuery}
                      onChange={(e) => setStoreNameQuery(e.target.value)}
                    />
                  </div>
                </div>
              </FilterSidebar>

              {/* Stores 3-Column Grid */}
              <div>
                {filteredStores.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px 20px', background: '#F8F9FA', borderRadius: 12 }}>
                    <h3 style={{ fontSize: 18, color: '#212121', marginBottom: 8 }}>Toko tidak ditemukan</h3>
                    <p style={{ color: '#6D7588', margin: 0, fontSize: 14 }}>
                      Coba kata kunci nama toko lain atau reset filter toko Anda.
                    </p>
                    <button
                      onClick={handleResetStoreFilters}
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
                      Reset Filter Toko
                    </button>
                  </div>
                ) : (
                  <>
                    <StoreGrid>
                      {filteredStores.map((st) => (
                        <StoreCard key={st.id} avatarBg={st.avatarBg}>
                          <div className="store-header">
                            <div className="store-left">
                              <div className="store-avatar">
                                {st.avatar ? (
                                  <img src={st.avatar} alt={st.name} loading="lazy" />
                                ) : (
                                  <StoreIcon size={20} />
                                )}
                              </div>
                              <div className="store-meta">
                                <div className="store-name-row">
                                  <h4 title={st.name}>{st.name}</h4>
                                  {st.type === 'pm-pro' && <span className="type-badge badge-pm-pro">PRO</span>}
                                  {st.type === 'power-shop' && <span className="type-badge badge-power">POWER</span>}
                                  {st.type === 'official' && <span className="type-badge badge-official">OFFICIAL</span>}
                                </div>
                                <span className="store-location">{st.location}</span>
                              </div>
                            </div>

                            <button
                              type="button"
                              className="visit-btn"
                              onClick={() => {
                                window.location.href = `/store.html?shop=${encodeURIComponent(st.slug || 'pira-indonesia')}`;
                              }}
                            >
                              Lihat Toko
                            </button>
                          </div>

                          {/* 3 Preview Products or Empty Shelf */}
                          {st.products && st.products.length > 0 ? (
                            <div className="store-products-row">
                              {st.products.map((p) => (
                                <div
                                  key={p.id}
                                  className="preview-box"
                                  onClick={() => alert(`Lihat produk ${p.title}`)}
                                  title={p.title}
                                >
                                  <img src={p.image} alt={p.title} loading="lazy" />
                                  <span className="price-tag">Rp {p.price.toLocaleString('id-ID')}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="empty-shelf">
                              <span>Tidak ada produk di toko ini</span>
                            </div>
                          )}
                        </StoreCard>
                      ))}
                    </StoreGrid>

                    {/* Store Pagination */}
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
                      <button
                        type="button"
                        className={`page-btn ${currentPage === 4 ? 'active' : ''}`}
                        onClick={() => setCurrentPage(4)}
                      >
                        4
                      </button>
                      <button
                        type="button"
                        className={`page-btn ${currentPage === 5 ? 'active' : ''}`}
                        onClick={() => setCurrentPage(5)}
                      >
                        5
                      </button>
                      <span className="dots">...</span>
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
