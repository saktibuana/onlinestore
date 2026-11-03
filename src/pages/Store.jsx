import React, { useState, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import {
  Star,
  Truck,
  CheckCircle2,
  Share2,
  MessageCircle,
  Plus,
  Check,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Search as SearchIcon,
  ShoppingBag,
  ExternalLink,
  Info
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BranchJourneyBanner from '../components/BranchJourneyBanner';
import AkamaiTelemetryDrawer from '../components/AkamaiTelemetryDrawer';
import { openGraph } from '../services/opengraph';
import { analytics } from '../services/analytics';
import { gtm } from '../services/gtm';
import { criteo } from '../services/criteo';
import { cartService } from '../services/cartService';
import { stores } from '../data/stores';
import { searchStoreProducts } from '../utils/searchEngine';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
`;

/* Store Header Matching Screenshot */
const StoreHeaderCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 20px 24px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }

  .left-profile {
    display: flex;
    align-items: center;
    gap: 16px;

    .store-avatar-box {
      width: 72px;
      height: 72px;
      border-radius: 12px;
      overflow: hidden;
      flex-shrink: 0;
      background: #E11D48;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .store-info {
      display: flex;
      flex-direction: column;

      .store-name-row {
        display: flex;
        align-items: center;
        gap: 8px;

        .official-badge-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #4F3582;
          color: #FFFFFF;
        }

        h1 {
          font-size: 20px;
          font-weight: 800;
          color: #212121;
          margin: 0;
        }
      }

      .store-location {
        font-size: 13px;
        color: #6D7588;
        margin-top: 4px;
      }

      .store-actions {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 12px;

        button.follow-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background-color: ${(props) => (props.isFollowing ? '#F0F3F7' : '#03AC0E')};
          color: ${(props) => (props.isFollowing ? '#212121' : '#FFFFFF')};
          border: none;
          padding: 7px 18px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: background-color 0.2s;

          &:hover {
            background-color: ${(props) => (props.isFollowing ? '#E5E7EB' : '#02980C')};
          }
        }

        button.chat-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #FFFFFF;
          border: 1px solid #03AC0E;
          color: #03AC0E;
          padding: 7px 16px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: background-color 0.2s;

          &:hover {
            background-color: #EBF7ED;
          }
        }

        button.icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 8px;
          border: 1px solid #E5E7EB;
          background: #FFFFFF;
          color: #6D7588;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;

          &:hover {
            border-color: #03AC0E;
            color: #03AC0E;
          }
        }
      }
    }
  }

  .right-stats {
    display: flex;
    align-items: center;
    gap: 24px;
    padding-left: 24px;
    border-left: 1px solid #F0F3F7;

    @media (max-width: 768px) {
      border-left: none;
      padding-left: 0;
      width: 100%;
      justify-content: space-between;
    }

    .stat-item {
      display: flex;
      flex-direction: column;

      .stat-val {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 16px;
        font-weight: 800;
        color: #212121;

        svg {
          color: #FFC400;
          fill: #FFC400;
        }
      }

      .stat-label {
        font-size: 12px;
        color: #6D7588;
        margin-top: 2px;
      }
    }
  }
`;

/* Store Tab Bar */
const StoreTabsBar = styled.div`
  display: flex;
  gap: 24px;
  border-bottom: 1px solid #E5E7EB;
  margin-bottom: 20px;

  button.tab-item {
    background: none;
    border: none;
    padding: 12px 6px;
    font-size: 15px;
    font-weight: 600;
    color: #6D7588;
    cursor: pointer;
    position: relative;
    transition: color 0.2s;

    &:hover {
      color: #03AC0E;
    }

    &.active {
      color: #03AC0E;
      font-weight: 800;

      &::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 3px;
        background-color: #03AC0E;
        border-radius: 3px 3px 0 0;
      }
    }
  }
`;

/* In-Store Search Feedback Banner */
const InStoreSearchBanner = styled.div`
  background: #EBF7ED;
  border: 1px solid #C4EDC8;
  border-radius: 8px;
  padding: 12px 18px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .banner-left {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    color: #212121;

    strong {
      color: #03AC0E;
    }
  }

  .banner-right {
    display: flex;
    align-items: center;
    gap: 12px;

    button.clear-btn {
      background: #FFFFFF;
      border: 1px solid #03AC0E;
      color: #03AC0E;
      border-radius: 6px;
      padding: 6px 14px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      &:hover {
        background-color: #03AC0E;
        color: #FFFFFF;
      }
    }

    button.global-btn {
      background: none;
      border: none;
      color: #03AC0E;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
      text-decoration: underline;
    }
  }
`;

/* Section Titles */
const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;

  h2 {
    font-size: 18px;
    font-weight: 800;
    color: #212121;
    margin: 0;
  }

  a.see-more {
    font-size: 13px;
    font-weight: 700;
    color: #03AC0E;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

/* 6-Column Product Grid */
const SixColumnGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
  margin-bottom: 28px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 520px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

/* Authentic Store Product Card */
const StoreProductCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 9px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 18px rgba(141, 150, 170, 0.25);
    border-color: #03AC0E;
  }

  .thumb-wrap {
    position: relative;
    width: 100%;
    padding-top: 100%;
    background-color: #F8F9FA;
    overflow: hidden;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
    }

    .discount-badge {
      position: absolute;
      top: 8px;
      left: 8px;
      background-color: #FA591D;
      color: #FFFFFF;
      font-size: 10px;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 4px;
      z-index: 2;
    }
  }

  &:hover .thumb-wrap img {
    transform: scale(1.05);
  }

  .content-wrap {
    padding: 10px;
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-between;

    h3.title {
      font-size: 12px;
      font-weight: 600;
      color: #212121;
      margin: 0 0 6px;
      line-height: 1.35;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      min-height: 32px;
    }

    .price-row {
      margin-bottom: 4px;

      .curr-price {
        font-size: 14px;
        font-weight: 800;
        color: #212121;
      }

      .slash-price {
        font-size: 10px;
        color: #9FA6B0;
        text-decoration: line-through;
        margin-left: 4px;
      }
    }

    .meta-badges {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 8px;

      .free-ongkir {
        display: flex;
        align-items: center;
        gap: 3px;
        color: #03AC0E;
        font-size: 10px;
        font-weight: 700;
      }

      .cashback-badge {
        background-color: #EBF7ED;
        color: #03AC0E;
        font-size: 9px;
        font-weight: 800;
        padding: 1px 4px;
        border-radius: 2px;
      }
    }

    .rating-row {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      color: #6D7588;
      margin-bottom: 10px;

      svg {
        color: #FFC400;
        fill: #FFC400;
      }

      .sold {
        color: #9FA6B0;
      }
    }

    button.add-cart-btn {
      width: 100%;
      background: #FFFFFF;
      border: 1px solid #03AC0E;
      color: #03AC0E;
      border-radius: 6px;
      padding: 6px 0;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      transition: background-color 0.15s, color 0.15s;

      &:hover {
        background-color: #03AC0E;
        color: #FFFFFF;
      }
    }
  }
`;

/* "Spesial Diskon" Green Showcase Box (Matching Screenshot) */
const SpecialDiscountShowcase = styled.div`
  background: linear-gradient(135deg, #03AC0E 0%, #008709 100%);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 30px;
  color: #FFFFFF;

  .showcase-header {
    margin-bottom: 16px;

    h3 {
      font-size: 20px;
      font-weight: 800;
      margin: 0;
      color: #FFFFFF;
    }

    p {
      margin: 4px 0 0;
      font-size: 13px;
      color: #EBF7ED;
    }
  }

  .showcase-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .showcase-card {
      background: #FFFFFF;
      border-radius: 8px;
      padding: 12px;
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      color: #212121;
      transition: transform 0.2s;

      &:hover {
        transform: translateY(-2px);
      }

      img {
        width: 70px;
        height: 70px;
        border-radius: 6px;
        object-fit: cover;
        flex-shrink: 0;
      }

      .card-info {
        display: flex;
        flex-direction: column;
        overflow: hidden;

        .card-title {
          font-size: 12px;
          font-weight: 700;
          color: #212121;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.3;
        }

        .card-price {
          font-size: 14px;
          font-weight: 800;
          color: #FA591D;
          margin-top: 4px;
        }

        .card-discount {
          font-size: 10px;
          color: #9FA6B0;
          text-decoration: line-through;
        }
      }
    }
  }
`;

/* In-Store Category Pills and Sort Row */
const FilterToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 12px;

  .category-chips {
    display: flex;
    align-items: center;
    gap: 8px;
    overflow-x: auto;
    padding-bottom: 4px;

    button.chip {
      background: #FFFFFF;
      border: 1px solid #E5E7EB;
      border-radius: 20px;
      padding: 6px 14px;
      font-size: 12px;
      font-weight: 600;
      color: #4A5568;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s;

      &:hover {
        border-color: #03AC0E;
        color: #03AC0E;
      }

      &.active {
        background-color: #EBF7ED;
        border-color: #03AC0E;
        color: #03AC0E;
        font-weight: 700;
      }
    }
  }

  .sort-box {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: #6D7588;

    select {
      border: 1px solid #E5E7EB;
      border-radius: 6px;
      padding: 6px 10px;
      font-size: 12px;
      font-weight: 600;
      color: #212121;
      background: #FFFFFF;
      outline: none;
      cursor: pointer;

      &:focus {
        border-color: #03AC0E;
      }
    }
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 30px 0 20px;

  button.page-btn {
    min-width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #E5E7EB;
    border-radius: 6px;
    background: #FFFFFF;
    color: #212121;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s;

    &:hover:not(:disabled) {
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
      color: #C5CAD0;
      cursor: not-allowed;
      border-color: #E5E7EB;
    }
  }
`;

const StoreAboutBox = styled.div`
  background: #F8F9FA;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  padding: 20px;
  margin-top: 40px;

  h3 {
    font-size: 15px;
    font-weight: 700;
    color: #212121;
    margin: 0 0 8px;
  }

  p {
    font-size: 13px;
    color: #6D7588;
    line-height: 1.6;
    margin: 0;
  }
`;

const ToastNotification = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: #212121;
  color: #FFFFFF;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 8px;
  animation: slideUp 0.25s ease-out;

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

export default function StorePage() {
  const [activeTab, setActiveTab] = useState('beranda');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevant');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFollowing, setIsFollowing] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Extract query parameters
  const urlParams = useMemo(() => new URLSearchParams(window.location.search), []);
  const shopSlug = urlParams.get('shop') || 'pira-indonesia';
  const initialQuery = urlParams.get('q') || '';
  const [storeSearchQuery, setStoreSearchQuery] = useState(initialQuery);

  // Find active store by slug (default to PIRA Indonesia)
  const currentStore = useMemo(() => {
    const found = stores.find(
      (s) => s.slug === shopSlug || s.slug === 'pira-indonesia' || s.id === 'store-32'
    );
    return found || stores[0];
  }, [shopSlug]);

  useEffect(() => {
    // Check follow state from localStorage
    const savedFollow = localStorage.getItem(`follow_${currentStore.slug}`);
    if (savedFollow === 'true') {
      setIsFollowing(true);
    }

    openGraph.updateMeta({
      title: `${currentStore.name} - Tokopedia Official Store`,
      description: currentStore.description || 'Beli aneka produk terlengkap di Tokopedia.',
      image: currentStore.avatar || '/icons/pira-logo.svg',
      type: 'profile'
    });

    analytics.trackPageView(`Store: ${currentStore.name}`);
    gtm.pushEvent('store_page_view', {
      store_name: currentStore.name,
      store_slug: currentStore.slug,
      store_type: currentStore.type
    });
    criteo.trackViewList(
      (currentStore.products || []).map((p) => p.id),
      currentStore.name
    );
  }, [currentStore]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleToggleFollow = () => {
    const nextState = !isFollowing;
    setIsFollowing(nextState);
    localStorage.setItem(`follow_${currentStore.slug}`, String(nextState));
    showToast(nextState ? `Berhasil mengikuti ${currentStore.name}` : `Berhenti mengikuti ${currentStore.name}`);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Tautan toko berhasil disalin ke clipboard!');
    } else {
      showToast('Tautan toko siap dibagikan.');
    }
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    cartService.addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      shop: {
        name: currentStore.name,
        location: currentStore.location,
        isOfficial: currentStore.type === 'official'
      }
    });
    showToast(`"${product.title.slice(0, 24)}..." berhasil ditambahkan ke Keranjang`);
  };

  // Perform in-store prioritized search & filtering
  const filteredProducts = useMemo(() => {
    return searchStoreProducts(currentStore.products || [], storeSearchQuery, {
      category: selectedCategory,
      sortBy: sortBy
    });
  }, [currentStore.products, storeSearchQuery, selectedCategory, sortBy]);

  // Special Discount Products (for green banner)
  const specialDiscountProducts = useMemo(() => {
    return (currentStore.products || [])
      .filter((p) => (p.discountPercent || 0) >= 45)
      .slice(0, 3);
  }, [currentStore.products]);

  // Featured highlight products ("Sesuai incaran kamu di toko ini")
  const highlightProducts = useMemo(() => {
    return (currentStore.products || []).slice(0, 6);
  }, [currentStore.products]);

  const handleStoreSearchFromHeader = (q) => {
    setStoreSearchQuery(q);
    const newUrl = new URL(window.location.href);
    if (q) newUrl.searchParams.set('q', q);
    else newUrl.searchParams.delete('q');
    window.history.replaceState({}, '', newUrl.toString());
  };

  const handleClearInStoreSearch = () => {
    setStoreSearchQuery('');
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete('q');
    window.history.replaceState({}, '', newUrl.toString());
  };

  const handleSearchGlobalFallback = () => {
    const srpUrl = `/search.html?st=&q=${encodeURIComponent(storeSearchQuery)}&srp_component_id=02.01.00.00&srp_page_id=&srp_page_title=&navsource=`;
    window.location.href = srpUrl;
  };

  return (
    <div>
      <BranchJourneyBanner />
      {/* Header with prioritized Store Context search */}
      <Header
        activeQuery={storeSearchQuery}
        storeContext={currentStore}
        onStoreSearch={handleStoreSearchFromHeader}
      />

      <Container>
        {/* Store Header Card */}
        <StoreHeaderCard isFollowing={isFollowing}>
          <div className="left-profile">
            <div className="store-avatar-box">
              <img
                src={currentStore.avatar || '/icons/pira-logo.svg'}
                alt={currentStore.name}
              />
            </div>
            <div className="store-info">
              <div className="store-name-row">
                <span className="official-badge-icon" title="Official Store">
                  <ShieldCheck size={13} />
                </span>
                <h1>{currentStore.name}</h1>
              </div>
              <div className="store-location">{currentStore.location}</div>
              <div className="store-actions">
                <button
                  type="button"
                  className="follow-btn"
                  onClick={handleToggleFollow}
                >
                  {isFollowing ? (
                    <>
                      <Check size={14} /> Mengikuti
                    </>
                  ) : (
                    <>
                      <Plus size={14} /> Follow
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="chat-btn"
                  onClick={() => alert(`Membuka percakapan dengan ${currentStore.name}`)}
                >
                  <MessageCircle size={14} /> Chat Penjual
                </button>
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => alert(`Informasi Toko: ${currentStore.name}\nBergabung sejak ${currentStore.joinedSince || '2018'}\n${currentStore.operatingHours || 'Buka Setiap Hari'}`)}
                  title="Informasi Toko"
                >
                  <Info size={16} />
                </button>
                <button
                  type="button"
                  className="icon-btn"
                  onClick={handleShare}
                  title="Bagikan Toko"
                >
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="right-stats">
            <div className="stat-item">
              <div className="stat-val">
                <Star size={16} />
                <span>{currentStore.rating || 4.9}</span>
              </div>
              <span className="stat-label">{currentStore.reviewsCount || '43.8rb ulasan'}</span>
            </div>
            <div className="stat-item">
              <div className="stat-val">{currentStore.orderSuccess || '99%'}</div>
              <span className="stat-label">Pesanan Terkirim</span>
            </div>
            <div className="stat-item">
              <div className="stat-val">Buka</div>
              <span className="stat-label">Setiap Hari</span>
            </div>
          </div>
        </StoreHeaderCard>

        {/* Store Tabs */}
        <StoreTabsBar>
          <button
            type="button"
            className={`tab-item ${activeTab === 'beranda' ? 'active' : ''}`}
            onClick={() => setActiveTab('beranda')}
          >
            Beranda
          </button>
          <button
            type="button"
            className={`tab-item ${activeTab === 'produk' ? 'active' : ''}`}
            onClick={() => setActiveTab('produk')}
          >
            Produk
          </button>
          <button
            type="button"
            className={`tab-item ${activeTab === 'ulasan' ? 'active' : ''}`}
            onClick={() => setActiveTab('ulasan')}
          >
            Ulasan
          </button>
        </StoreTabsBar>

        {/* If in-store search query active, show in-store feedback banner */}
        {storeSearchQuery && (
          <InStoreSearchBanner>
            <div className="banner-left">
              <SearchIcon size={18} color="#03AC0E" />
              <span>
                Menampilkan hasil pencarian untuk <strong>"{storeSearchQuery}"</strong> di{' '}
                {currentStore.name} ({filteredProducts.length} produk ditemukan)
              </span>
            </div>
            <div className="banner-right">
              <button
                type="button"
                className="clear-btn"
                onClick={handleClearInStoreSearch}
              >
                ✕ Reset Pencarian
              </button>
              <button
                type="button"
                className="global-btn"
                onClick={handleSearchGlobalFallback}
              >
                Cari di seluruh Tokopedia <ExternalLink size={12} />
              </button>
            </div>
          </InStoreSearchBanner>
        )}

        {/* ======================================================== */}
        {/* TAB 1: BERANDA                                          */}
        {/* ======================================================== */}
        {activeTab === 'beranda' && (
          <>
            {/* If NO search query: show highlight carousel and special discount box */}
            {!storeSearchQuery && (
              <>
                {/* 1. Sesuai Incaran Kamu di Toko Ini */}
                <SectionHeader>
                  <h2>Sesuai incaran kamu di toko ini</h2>
                  <a href="#semua-produk" className="see-more">Lihat Semua</a>
                </SectionHeader>
                <SixColumnGrid>
                  {highlightProducts.map((p) => (
                    <StoreProductCard
                      key={p.id}
                      onClick={() => {
                        window.location.href = `/pdp.html?id=${p.id}&shop=${currentStore.slug}`;
                      }}
                    >
                      <div className="thumb-wrap">
                        {p.discountPercent > 0 && (
                          <span className="discount-badge">-{p.discountPercent}%</span>
                        )}
                        <img src={p.image} alt={p.title} loading="lazy" />
                      </div>
                      <div className="content-wrap">
                        <h3 className="title">{p.title}</h3>
                        <div className="price-row">
                          <span className="curr-price">Rp {p.price.toLocaleString('id-ID')}</span>
                          {p.originalPrice > p.price && (
                            <span className="slash-price">
                              Rp {p.originalPrice.toLocaleString('id-ID')}
                            </span>
                          )}
                        </div>
                        <div className="meta-badges">
                          {p.hasFreeShipping && (
                            <span className="free-ongkir">
                              <Truck size={12} /> Bebas Ongkir
                            </span>
                          )}
                          {p.hasCashback && (
                            <span className="cashback-badge">Cashback</span>
                          )}
                        </div>
                        <div className="rating-row">
                          <Star size={12} />
                          <span>{p.rating || 4.9}</span>
                          <span className="sold">({p.soldCount || '1rb+'})</span>
                        </div>
                        <button
                          type="button"
                          className="add-cart-btn"
                          onClick={(e) => handleAddToCart(p, e)}
                        >
                          <Plus size={14} /> + Keranjang
                        </button>
                      </div>
                    </StoreProductCard>
                  ))}
                </SixColumnGrid>

                {/* 2. Spesial Diskon Green Box Showcase */}
                <SpecialDiscountShowcase>
                  <div className="showcase-header">
                    <h3>Spesial Diskon</h3>
                    <p>Penawaran terbaik dan diskon terbesar pilihan {currentStore.name}</p>
                  </div>
                  <div className="showcase-grid">
                    {specialDiscountProducts.map((sp) => (
                      <div
                        key={sp.id}
                        className="showcase-card"
                        onClick={() => {
                          window.location.href = `/pdp.html?id=${sp.id}&shop=${currentStore.slug}`;
                        }}
                      >
                        <img src={sp.image} alt={sp.title} />
                        <div className="card-info">
                          <span className="card-title">{sp.title}</span>
                          <span className="card-price">Rp {sp.price.toLocaleString('id-ID')}</span>
                          {sp.originalPrice > sp.price && (
                            <span className="card-discount">
                              Rp {sp.originalPrice.toLocaleString('id-ID')}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </SpecialDiscountShowcase>
              </>
            )}

            {/* 3. Semua Produk / Hasil Pencarian di Toko Ini */}
            <div id="semua-produk">
              <SectionHeader>
                <h2>
                  {storeSearchQuery
                    ? `Hasil Pencarian di ${currentStore.name}`
                    : 'Semua Produk'}
                </h2>
                <span style={{ fontSize: 13, color: '#6D7588' }}>
                  {filteredProducts.length} Produk
                </span>
              </SectionHeader>

              {/* In-Store Filter & Sort Toolbar */}
              <FilterToolbar>
                <div className="category-chips">
                  {[
                    { id: 'all', label: 'Semua' },
                    { id: 'elektronik', label: 'Walkie Talkie' },
                    { id: 'furniture', label: 'Meja & Furniture' },
                    { id: 'aksesoris', label: 'Aksesoris Radio' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      className={`chip ${selectedCategory === cat.id ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="sort-box">
                  <span>Urutkan:</span>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="relevant">Paling Sesuai</option>
                    <option value="priceAsc">Harga Terendah</option>
                    <option value="priceDesc">Harga Tertinggi</option>
                    <option value="rating">Rating Tertinggi</option>
                    <option value="discount">Diskon Terbesar</option>
                  </select>
                </div>
              </FilterToolbar>

              {/* Grid of Store Products */}
              {filteredProducts.length === 0 ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    background: '#F8F9FA',
                    borderRadius: 12,
                    margin: '20px 0'
                  }}
                >
                  <ShoppingBag size={48} color="#9FA6B0" style={{ marginBottom: 12 }} />
                  <h3 style={{ fontSize: 18, color: '#212121', marginBottom: 8 }}>
                    Produk tidak ditemukan di {currentStore.name}
                  </h3>
                  <p style={{ color: '#6D7588', margin: '0 0 16px', fontSize: 14 }}>
                    Coba kata kunci lain atau cari produk ini di seluruh toko Tokopedia.
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
                    <button
                      type="button"
                      onClick={handleClearInStoreSearch}
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid #03AC0E',
                        color: '#03AC0E',
                        padding: '10px 20px',
                        borderRadius: 8,
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Reset Pencarian Toko
                    </button>
                    <button
                      type="button"
                      onClick={handleSearchGlobalFallback}
                      style={{
                        background: '#03AC0E',
                        border: 'none',
                        color: '#FFFFFF',
                        padding: '10px 24px',
                        borderRadius: 8,
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Cari "{storeSearchQuery}" di Seluruh Tokopedia &gt;
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <SixColumnGrid>
                    {filteredProducts.map((p) => (
                      <StoreProductCard
                        key={p.id}
                        onClick={() => {
                          window.location.href = `/pdp.html?id=${p.id}&shop=${currentStore.slug}`;
                        }}
                      >
                        <div className="thumb-wrap">
                          {p.discountPercent > 0 && (
                            <span className="discount-badge">-{p.discountPercent}%</span>
                          )}
                          <img src={p.image} alt={p.title} loading="lazy" />
                        </div>
                        <div className="content-wrap">
                          <h3 className="title">{p.title}</h3>
                          <div className="price-row">
                            <span className="curr-price">Rp {p.price.toLocaleString('id-ID')}</span>
                            {p.originalPrice > p.price && (
                              <span className="slash-price">
                                Rp {p.originalPrice.toLocaleString('id-ID')}
                              </span>
                            )}
                          </div>
                          <div className="meta-badges">
                            {p.hasFreeShipping && (
                              <span className="free-ongkir">
                                <Truck size={12} /> Bebas Ongkir
                              </span>
                            )}
                            {p.hasCashback && (
                              <span className="cashback-badge">Cashback</span>
                            )}
                          </div>
                          <div className="rating-row">
                            <Star size={12} />
                            <span>{p.rating || 4.9}</span>
                            <span className="sold">({p.soldCount || '1rb+'})</span>
                          </div>
                          <button
                            type="button"
                            className="add-cart-btn"
                            onClick={(e) => handleAddToCart(p, e)}
                          >
                            <Plus size={14} /> + Keranjang
                          </button>
                        </div>
                      </StoreProductCard>
                    ))}
                  </SixColumnGrid>

                  <PaginationWrapper>
                    <button
                      type="button"
                      className="page-btn"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
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
                    <span style={{ color: '#9FA6B0' }}>...</span>
                    <button
                      type="button"
                      className="page-btn"
                      onClick={() => setCurrentPage(20)}
                    >
                      20
                    </button>
                    <button
                      type="button"
                      className="page-btn"
                      onClick={() => setCurrentPage((p) => p + 1)}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </PaginationWrapper>
                </>
              )}
            </div>
          </>
        )}

        {/* ======================================================== */}
        {/* TAB 2: PRODUK (Full Catalog)                             */}
        {/* ======================================================== */}
        {activeTab === 'produk' && (
          <div>
            <SectionHeader>
              <h2>Katalog Produk {currentStore.name}</h2>
              <span style={{ fontSize: 13, color: '#6D7588' }}>
                {filteredProducts.length} Produk Tersedia
              </span>
            </SectionHeader>

            <FilterToolbar>
              <div className="category-chips">
                {[
                  { id: 'all', label: 'Semua Produk' },
                  { id: 'elektronik', label: 'Walkie Talkie' },
                  { id: 'furniture', label: 'Meja Kerja & Belajar' },
                  { id: 'aksesoris', label: 'Aksesoris Radio' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`chip ${selectedCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              <div className="sort-box">
                <span>Urutkan:</span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="relevant">Paling Sesuai</option>
                  <option value="priceAsc">Harga Terendah</option>
                  <option value="priceDesc">Harga Tertinggi</option>
                  <option value="rating">Rating Tertinggi</option>
                </select>
              </div>
            </FilterToolbar>

            <SixColumnGrid>
              {filteredProducts.map((p) => (
                <StoreProductCard
                  key={p.id}
                  onClick={() => {
                    window.location.href = `/pdp.html?id=${p.id}&shop=${currentStore.slug}`;
                  }}
                >
                  <div className="thumb-wrap">
                    {p.discountPercent > 0 && (
                      <span className="discount-badge">-{p.discountPercent}%</span>
                    )}
                    <img src={p.image} alt={p.title} loading="lazy" />
                  </div>
                  <div className="content-wrap">
                    <h3 className="title">{p.title}</h3>
                    <div className="price-row">
                      <span className="curr-price">Rp {p.price.toLocaleString('id-ID')}</span>
                      {p.originalPrice > p.price && (
                        <span className="slash-price">
                          Rp {p.originalPrice.toLocaleString('id-ID')}
                        </span>
                      )}
                    </div>
                    <div className="meta-badges">
                      {p.hasFreeShipping && (
                        <span className="free-ongkir">
                          <Truck size={12} /> Bebas Ongkir
                        </span>
                      )}
                    </div>
                    <div className="rating-row">
                      <Star size={12} />
                      <span>{p.rating || 4.9}</span>
                      <span className="sold">({p.soldCount || '1rb+'})</span>
                    </div>
                    <button
                      type="button"
                      className="add-cart-btn"
                      onClick={(e) => handleAddToCart(p, e)}
                    >
                      <Plus size={14} /> + Keranjang
                    </button>
                  </div>
                </StoreProductCard>
              ))}
            </SixColumnGrid>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: ULASAN                                            */}
        {/* ======================================================== */}
        {activeTab === 'ulasan' && (
          <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 12, padding: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 16px', color: '#212121' }}>
              Ulasan Pembeli ({currentStore.reviewsCount || '43.8rb'})
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid #E5E7EB' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 44, fontWeight: 900, color: '#212121', lineHeight: 1 }}>
                  {currentStore.rating || 4.9}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', color: '#FFC400', margin: '6px 0 2px' }}>
                  <Star size={16} fill="#FFC400" />
                  <Star size={16} fill="#FFC400" />
                  <Star size={16} fill="#FFC400" />
                  <Star size={16} fill="#FFC400" />
                  <Star size={16} fill="#FFC400" />
                </div>
                <span style={{ fontSize: 12, color: '#6D7588' }}>Kepuasan 99%</span>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 13, color: '#6D7588', lineHeight: 1.6 }}>
                  Rata-rata pembeli merasa sangat puas dengan kualitas produk, kecepatan pengiriman,
                  dan respon penjual yang ramah dan profesional di official store ini.
                </p>
              </div>
            </div>

            {/* Sample Verified Reviews */}
            {[
              {
                name: 'Rudi Hermawan',
                product: 'HT Walkie Talkie T88 Zello system intercom 4G Global',
                rating: 5,
                comment: 'Sinyalnya jernih sekali walau jarak jauh antar kota via 4G. Sangat membantu koordinasi tim lapangan di proyek!',
                time: '2 hari lalu'
              },
              {
                name: 'Anisa Maharani',
                product: 'PIRA - Kozu Meja Kerja Meja Belajar Minimalis 120cm Modern',
                rating: 5,
                comment: 'Mejanya kokoh banget, kayunya halus dan perakitannya gampang dipahami. Pengiriman cepat dan aman sampai rumah.',
                time: '1 minggu lalu'
              },
              {
                name: 'Budi Santoso',
                product: 'HT GP450 Walkie Talkie High Power Long Range Waterproof',
                rating: 5,
                comment: 'Baterai awet berhari-hari, fisik tahan banting dan anti cipratan air. Penjual responsif sekali.',
                time: '2 minggu lalu'
              }
            ].map((rev, idx) => (
              <div key={idx} style={{ padding: '14px 0', borderBottom: idx < 2 ? '1px solid #F0F3F7' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: 13, color: '#212121' }}>{rev.name}</span>
                  <span style={{ fontSize: 11, color: '#9FA6B0' }}>• {rev.time}</span>
                </div>
                <div style={{ display: 'flex', color: '#FFC400', marginBottom: 6 }}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={12} fill="#FFC400" />
                  ))}
                </div>
                <p style={{ margin: '0 0 6px', fontSize: 13, color: '#212121', lineHeight: 1.5 }}>
                  {rev.comment}
                </p>
                <span style={{ fontSize: 11, color: '#6D7588', background: '#F8F9FA', padding: '3px 8px', borderRadius: 4 }}>
                  Barang: {rev.product}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Store About Footer Box */}
        <StoreAboutBox>
          <h3>Beli Aneka Produk Online Terlengkap &amp; Berkualitas di {currentStore.name}</h3>
          <p>
            Belanja online di {currentStore.name} semakin mudah, aman, dan nyaman di Tokopedia. Temukan
            produk impian berkualitas terbaik mulai dari alat komunikasi radio HT berdaya jangkau luas,
            hingga pilihan perabot rumah minimalis modern dengan jaminan garansi resmi, promo diskon
            eksklusif, serta fasilitas Bebas Ongkir ke seluruh pelosok Indonesia.
          </p>
        </StoreAboutBox>
      </Container>

      {toastMessage && (
        <ToastNotification>
          <CheckCircle2 size={18} color="#03AC0E" />
          <span>{toastMessage}</span>
        </ToastNotification>
      )}

      <AkamaiTelemetryDrawer />
      <Footer />
    </div>
  );
}
