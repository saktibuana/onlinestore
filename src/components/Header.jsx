import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import {
  Search,
  ShoppingCart,
  Bell,
  Mail,
  MapPin,
  ChevronDown,
  Smartphone,
  Check,
  Store,
  Globe,
  Settings,
  Clock,
  RefreshCw,
  Truck,
  CheckCircle2,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { cartService } from '../services/cartService';
import { userService } from '../services/userService';
import { addressService } from '../services/addressService';
import { analytics } from '../services/analytics';
import { gtm } from '../services/gtm';
import MegaMenuDropdown from './MegaMenuDropdown';

const TopBar = styled.div`
  background-color: #F0F3F7;
  padding: 6px 0;
  font-size: 12px;
  color: #6D7588;
  border-bottom: 1px solid #E5E7EB;
`;

const TopBarContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TopBarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  a {
    color: #6D7588;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 4px;
    &:hover {
      color: #03AC0E;
    }
  }
`;

const TopBarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  a {
    color: #6D7588;
    text-decoration: none;
    &:hover {
      color: #03AC0E;
    }
  }
`;

const MainHeaderWrapper = styled.header`
  background-color: #FFFFFF;
  border-bottom: 1px solid #E5E7EB;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
`;

const HeaderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 16px 6px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const LogoContainer = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  flex-shrink: 0;

  svg {
    width: 36px;
    height: 36px;
  }

  .brand-text {
    font-size: 24px;
    font-weight: 800;
    color: #03AC0E;
    letter-spacing: -0.5px;
    font-family: inherit;
  }
`;

const CategoryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: #212121;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #F0F3F7;
    color: #03AC0E;
  }
`;

const SearchForm = styled.form`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  background-color: #FFFFFF;
  padding: 2px 10px;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus-within {
    border-color: #03AC0E;
    box-shadow: 0 0 0 1px #03AC0E;
  }

  input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 14px;
    padding: 7px 8px;
    color: #212121;
    background: transparent;

    &::placeholder {
      color: #9FA6B0;
    }
  }

  button.search-submit-btn {
    background: none;
    border: none;
    color: #6D7588;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    &:hover {
      color: #03AC0E;
    }
  }
`;

const ScopeDropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background: #F0F3F7;
  border: none;
  border-radius: 6px;
  padding: 5px 9px;
  font-size: 12px;
  font-weight: 700;
  color: #212121;
  cursor: pointer;
  margin-right: 4px;
  flex-shrink: 0;
  white-space: nowrap;
  max-width: 180px;

  span.label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:hover {
    background: #E5E7EB;
  }
`;

const ScopeDropdownMenu = styled.div`
  position: absolute;
  top: 42px;
  left: 0;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  z-index: 1000;
  min-width: 220px;
  padding: 6px 0;

  .scope-option {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 9px 14px;
    background: none;
    border: none;
    text-align: left;
    font-size: 13px;
    color: #212121;
    cursor: pointer;

    &:hover {
      background-color: #F8F9FA;
      color: #03AC0E;
    }

    &.active {
      background-color: #EBF7ED;
      color: #03AC0E;
      font-weight: 700;
    }
  }
`;

const SuggestionPopover = styled.div`
  position: absolute;
  top: 42px;
  left: 0;
  right: 0;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  overflow: hidden;
  max-height: 400px;
  overflow-y: auto;

  .suggestion-section-title {
    padding: 8px 14px 4px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    color: #6D7588;
    background: #F8F9FA;
    letter-spacing: 0.5px;
  }

  .suggestion-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    cursor: pointer;
    border-bottom: 1px solid #F0F3F7;
    transition: background-color 0.15s;

    &:hover {
      background-color: #F8F9FA;
    }

    .item-left {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 13px;
      color: #212121;

      svg {
        color: #03AC0E;
        flex-shrink: 0;
      }

      strong {
        color: #03AC0E;
      }
    }

    .item-badge {
      font-size: 11px;
      font-weight: 600;
      color: #03AC0E;
      background: #EBF7ED;
      padding: 2px 6px;
      border-radius: 4px;
    }
  }

  .preview-product-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 14px;
    cursor: pointer;
    border-bottom: 1px solid #F0F3F7;
    &:hover {
      background-color: #F8F9FA;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 6px;
      object-fit: cover;
    }

    .preview-info {
      display: flex;
      flex-direction: column;
      overflow: hidden;

      .prod-name {
        font-size: 12px;
        color: #212121;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .prod-price {
        font-size: 11px;
        color: #FA591D;
        font-weight: 700;
      }
    }
  }
`;

const QuickKeywords = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 4px;
  font-size: 11px;
  color: #6D7588;

  a {
    color: #6D7588;
    text-decoration: none;
    &:hover {
      color: #03AC0E;
    }
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
  position: relative;
`;

const IconButton = styled.a`
  position: relative;
  color: #6D7588;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 8px;
  transition: color 0.2s, background-color 0.2s;
  cursor: pointer;

  &:hover {
    color: #03AC0E;
    background-color: #F0F3F7;
  }

  .badge {
    position: absolute;
    top: 0;
    right: 0;
    background-color: #FF5722;
    color: #FFFFFF;
    font-size: 10px;
    font-weight: 700;
    border-radius: 999px;
    padding: 1px 5px;
    min-width: 16px;
    text-align: center;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 24px;
  background-color: #E5E7EB;
`;

const SellerLink = styled.a`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: #212121;
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 6px;

  &:hover {
    color: #03AC0E;
    background-color: #F0F3F7;
  }
`;

const UserProfile = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #212121;
  text-decoration: none;
  padding: 4px 8px;
  border-radius: 6px;

  img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    object-fit: cover;
  }

  &:hover {
    color: #03AC0E;
  }
`;

const DeliveryBar = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px 8px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  a.loc-link {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: #6D7588;
    text-decoration: none;

    strong {
      color: #212121;
      font-weight: 700;
    }

    &:hover {
      color: #03AC0E;
      strong { color: #03AC0E; }
    }
  }
`;

const NotifBellWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

/* Authentic Notification Popover Drawer (Matching Screenshot media_1793693970696_126bf9de.png) */
const NotificationDrawer = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: -80px;
  width: 380px;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.16);
  z-index: 1000;
  overflow: hidden;
  animation: notifFadeIn 0.18s ease-out;

  @keyframes notifFadeIn {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .notif-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    border-bottom: 1px solid #E5E7EB;

    h3 {
      font-size: 16px;
      font-weight: 700;
      color: #212121;
      margin: 0;
    }

    a.settings-link {
      color: #6D7588;
      display: flex;
      align-items: center;
      transition: color 0.15s;
      &:hover { color: #03AC0E; }
    }
  }

  .notif-tabs {
    display: flex;
    border-bottom: 1px solid #E5E7EB;

    button.tab-btn {
      flex: 1;
      padding: 10px;
      font-size: 13px;
      font-weight: 600;
      background: none;
      border: none;
      color: #6D7588;
      cursor: pointer;
      position: relative;
      transition: all 0.15s;

      &:hover {
        color: #03AC0E;
      }

      &.active {
        color: #03AC0E;
        font-weight: 700;
        border-bottom: 2px solid #03AC0E;
      }

      .red-dot {
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #FF5722;
        margin-left: 4px;
        vertical-align: middle;
      }
    }
  }

  .notif-body {
    padding: 14px 16px;
    max-height: 420px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-thumb {
      background: #D1D5DB;
      border-radius: 4px;
    }

    .section-title-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 4px;

      span.sec-name {
        font-size: 13px;
        font-weight: 700;
        color: #212121;
      }

      a.see-all {
        font-size: 12px;
        font-weight: 600;
        color: #03AC0E;
        text-decoration: none;
        &:hover { text-decoration: underline; }
      }
    }

    .sub-status-label {
      font-size: 11px;
      color: #6D7588;
      margin-bottom: 12px;
    }

    .order-status-icons {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      text-align: center;
      margin-bottom: 18px;

      .icon-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        font-size: 11px;
        color: #6D7588;
        cursor: pointer;
        line-height: 1.25;

        .circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid #E5E7EB;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #03AC0E;
          background: #FFFFFF;
          transition: background-color 0.15s, border-color 0.15s;
        }

        &:hover .circle {
          background-color: #EBF7ED;
          border-color: #03AC0E;
        }
      }
    }

    .seller-box {
      border: 1px solid #E5E7EB;
      border-radius: 8px;
      padding: 12px 14px;
      margin-bottom: 16px;
      background: #FFFFFF;

      h4 {
        margin: 0 0 4px;
        font-size: 13px;
        font-weight: 700;
        color: #212121;
      }

      p {
        margin: 0 0 10px;
        font-size: 11px;
        color: #6D7588;
        line-height: 1.4;
      }

      button.seller-btn {
        width: 100%;
        background: #FFFFFF;
        border: 1px solid #03AC0E;
        color: #03AC0E;
        font-weight: 700;
        padding: 7px;
        border-radius: 6px;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.15s;

        &:hover {
          background-color: #03AC0E;
          color: #FFFFFF;
        }
      }
    }

    .untuk-kamu-section {
      margin-top: 10px;

      h4.sec-header {
        font-size: 13px;
        font-weight: 700;
        color: #212121;
        margin: 0 0 10px;
      }

      .promo-notif-item {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        padding: 8px 0;
        border-bottom: 1px solid #F0F3F7;
        cursor: pointer;

        &:hover .item-title {
          color: #03AC0E;
        }

        .promo-icon-badge {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background-color: #EBF7ED;
          color: #03AC0E;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .item-texts {
          display: flex;
          flex-direction: column;

          .item-title {
            font-size: 12px;
            font-weight: 600;
            color: #212121;
            line-height: 1.35;
          }

          .item-time {
            font-size: 10px;
            color: #9FA6B0;
            margin-top: 2px;
          }
        }
      }
    }

    /* Update Tab Items */
    .update-list {
      display: flex;
      flex-direction: column;

      .update-item {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 10px 0;
        border-bottom: 1px solid #F0F3F7;
        cursor: pointer;

        &:hover .update-title {
          color: #03AC0E;
        }

        .dot-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #03AC0E;
          margin-top: 5px;
          flex-shrink: 0;
        }

        .update-content {
          display: flex;
          flex-direction: column;

          .update-title {
            font-size: 12px;
            font-weight: 600;
            color: #212121;
            line-height: 1.4;
          }

          .update-time {
            font-size: 10px;
            color: #9FA6B0;
            margin-top: 3px;
          }
        }
      }
    }
  }

  .notif-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 16px;
    background: #F8F9FA;
    border-top: 1px solid #E5E7EB;
    font-size: 12px;

    button.read-all-btn {
      background: none;
      border: none;
      color: #03AC0E;
      font-weight: 600;
      cursor: pointer;
      padding: 0;
      &:hover { text-decoration: underline; }
    }

    a.full-link {
      color: #03AC0E;
      font-weight: 600;
      text-decoration: none;
      &:hover { text-decoration: underline; }
    }
  }
`;

export default function Header({ activeQuery = '', storeContext = null, onStoreSearch = null }) {
  const [cartCount, setCartCount] = useState(cartService.getCount());
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showNotifDrawer, setShowNotifDrawer] = useState(false);
  const [notifTab, setNotifTab] = useState('transaksi');
  const [searchQuery, setSearchQuery] = useState(activeQuery);
  const [userProfile, setUserProfile] = useState(userService.getProfile());
  const [activeAddress, setActiveAddress] = useState(addressService.getSelectedAddress());

  // Search scope: 'store' (prioritized when storeContext present) or 'global'
  const [searchScope, setSearchScope] = useState(storeContext ? 'store' : 'global');
  const [showScopeDropdown, setShowScopeDropdown] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const searchContainerRef = useRef(null);
  const notifContainerRef = useRef(null);
  const notifCloseTimeoutRef = useRef(null);

  const handleNotifMouseEnter = () => {
    if (notifCloseTimeoutRef.current) {
      clearTimeout(notifCloseTimeoutRef.current);
      notifCloseTimeoutRef.current = null;
    }
    setShowNotifDrawer(true);
  };

  const handleNotifMouseLeave = () => {
    notifCloseTimeoutRef.current = setTimeout(() => {
      setShowNotifDrawer(false);
    }, 280);
  };

  const handleNotifClick = (e) => {
    e.preventDefault();
    if (notifCloseTimeoutRef.current) {
      clearTimeout(notifCloseTimeoutRef.current);
      notifCloseTimeoutRef.current = null;
    }
    setShowNotifDrawer((prev) => !prev);
  };

  const [readAllSuccess, setReadAllSuccess] = useState(false);

  const handleMarkAllAsRead = (e) => {
    e.preventDefault();
    const updated = {
      ...userProfile,
      unreadNotifications: 0
    };
    userService.saveProfile(updated);
    setUserProfile(updated);
    setReadAllSuccess(true);
    setTimeout(() => setReadAllSuccess(false), 2500);
  };

  useEffect(() => {
    if (storeContext) {
      setSearchScope('store');
    }
  }, [storeContext]);

  useEffect(() => {
    const unsubCart = cartService.subscribe(({ count }) => setCartCount(count));
    const unsubUser = userService.subscribe((profile) => setUserProfile(profile));
    const unsubAddr = addressService.subscribe(({ selectedAddress }) => setActiveAddress(selectedAddress));

    function handleClickOutside(e) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsInputFocused(false);
        setShowScopeDropdown(false);
      }
      if (notifContainerRef.current && !notifContainerRef.current.contains(e.target)) {
        setShowNotifDrawer(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      unsubCart();
      unsubUser();
      unsubAddr();
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    const query = searchQuery.trim();
    setIsInputFocused(false);
    setShowScopeDropdown(false);

    if (storeContext && searchScope === 'store') {
      // Prioritized Search within store
      analytics.trackSearch(query || storeContext.name, storeContext.products?.length || 0);
      gtm.pushEvent('store_search', { store: storeContext.name, query });

      if (onStoreSearch) {
        onStoreSearch(query);
      } else {
        const url = `/store.html?shop=${encodeURIComponent(storeContext.slug)}&q=${encodeURIComponent(query)}`;
        window.location.href = url;
      }
    } else {
      // Search outside the store (All Tokopedia)
      if (!query) return;
      analytics.trackSearch(query, 18);
      gtm.pushEvent('search_submit', { search_term: query, scope: 'global' });
      const srpUrl = `/search.html?st=&q=${encodeURIComponent(query)}&srp_component_id=02.01.00.00&srp_page_id=&srp_page_title=&navsource=`;
      window.location.href = srpUrl;
    }
  };

  const handleSelectSuggestion = (scopeChoice) => {
    setSearchScope(scopeChoice);
    if (scopeChoice === 'store' && storeContext) {
      if (onStoreSearch) {
        onStoreSearch(searchQuery.trim());
      } else {
        window.location.href = `/store.html?shop=${encodeURIComponent(storeContext.slug)}&q=${encodeURIComponent(searchQuery.trim())}`;
      }
    } else {
      window.location.href = `/search.html?st=&q=${encodeURIComponent(searchQuery.trim())}&srp_component_id=02.01.00.00&srp_page_id=&srp_page_title=&navsource=`;
    }
    setIsInputFocused(false);
  };

  // Matching preview products inside store for autocomplete
  const storePreviewMatches = React.useMemo(() => {
    if (!storeContext || !storeContext.products || !searchQuery.trim()) return [];
    const qLower = searchQuery.toLowerCase().trim();
    return storeContext.products
      .filter((p) => p.title.toLowerCase().includes(qLower))
      .slice(0, 3);
  }, [storeContext, searchQuery]);

  return (
    <>
      <TopBar>
        <TopBarContainer>
          <TopBarLeft>
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Aplikasi Tokopedia PWA siap diinstall di perangkat Anda.'); }}>
              <Smartphone size={14} /> Download Tokopedia App
            </a>
          </TopBarLeft>
          <TopBarRight>
            <a href="#">Tentang Tokopedia</a>
            <a href="#">Pusat Edukasi Seller</a>
            <a href="#">Promo</a>
            <a href="#">Tokopedia Care</a>
          </TopBarRight>
        </TopBarContainer>
      </TopBar>

      <MainHeaderWrapper>
        <HeaderContainer>
          <LogoContainer href="/">
            <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="240" height="240" rx="48" fill="#03AC0E"/>
              <path d="M120 42C90 42 74 60 74 86V92H166V86C166 60 150 42 120 42Z" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" fill="none"/>
              <path d="M50 88H190L178 194C176 204 168 212 158 212H82C72 212 64 204 62 194L50 88Z" fill="#FFFFFF"/>
              <circle cx="95" cy="135" r="26" fill="#03AC0E"/>
              <circle cx="95" cy="135" r="16" fill="#FFFFFF"/>
              <circle cx="98" cy="132" r="9" fill="#212121"/>
              <circle cx="145" cy="135" r="26" fill="#03AC0E"/>
              <circle cx="145" cy="135" r="16" fill="#FFFFFF"/>
              <circle cx="148" cy="132" r="9" fill="#212121"/>
              <polygon points="120,148 112,160 128,160" fill="#FA591D"/>
            </svg>
            <span className="brand-text">tokopedia</span>
          </LogoContainer>

          <CategoryButton
            type="button"
            onClick={() => setShowMegaMenu(!showMegaMenu)}
            aria-expanded={showMegaMenu}
          >
            Kategori <ChevronDown size={16} />
          </CategoryButton>

          <div ref={searchContainerRef} style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <SearchForm onSubmit={handleSearchSubmit}>
              <SearchInputWrapper>
                {/* Store Scope Dropdown Button if in Store Context */}
                {storeContext && (
                  <ScopeDropdownButton
                    type="button"
                    onClick={() => setShowScopeDropdown(!showScopeDropdown)}
                    title="Ganti cakupan pencarian"
                  >
                    <span className="label">
                      {searchScope === 'store' ? `Di ${storeContext.name}` : 'Di Tokopedia'}
                    </span>
                    <ChevronDown size={14} />
                  </ScopeDropdownButton>
                )}

                <input
                  type="text"
                  placeholder={
                    storeContext && searchScope === 'store'
                      ? 'Cari barang di sini'
                      : 'Cari di Tokopedia'
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                />
                <button type="submit" className="search-submit-btn" aria-label="Cari">
                  <Search size={18} />
                </button>
              </SearchInputWrapper>

              {/* Scope Selection Dropdown Menu */}
              {showScopeDropdown && storeContext && (
                <ScopeDropdownMenu>
                  <button
                    type="button"
                    className={`scope-option ${searchScope === 'store' ? 'active' : ''}`}
                    onClick={() => {
                      setSearchScope('store');
                      setShowScopeDropdown(false);
                    }}
                  >
                    <span>Di {storeContext.name}</span>
                    {searchScope === 'store' && <Check size={16} />}
                  </button>
                  <button
                    type="button"
                    className={`scope-option ${searchScope === 'global' ? 'active' : ''}`}
                    onClick={() => {
                      setSearchScope('global');
                      setShowScopeDropdown(false);
                    }}
                  >
                    <span>Di Tokopedia</span>
                    {searchScope === 'global' && <Check size={16} />}
                  </button>
                </ScopeDropdownMenu>
              )}

              {/* Autocomplete / Prioritized Search Dropdown */}
              {isInputFocused && storeContext && searchQuery.trim() && (
                <SuggestionPopover>
                  {/* PRIORITY 1: Search within store */}
                  <div className="suggestion-section-title">Pencarian di Toko Ini</div>
                  <div
                    className="suggestion-item"
                    onClick={() => handleSelectSuggestion('store')}
                  >
                    <div className="item-left">
                      <Store size={16} />
                      <span>
                        Cari <strong>"{searchQuery}"</strong> di {storeContext.name}
                      </span>
                    </div>
                    <span className="item-badge">Prioritas Toko</span>
                  </div>

                  {/* Matching Products inside this store */}
                  {storePreviewMatches.map((p) => (
                    <div
                      key={p.id}
                      className="preview-product-item"
                      onClick={() => {
                        window.location.href = `/pdp.html?id=${p.id}&shop=${storeContext.slug}`;
                      }}
                    >
                      <img src={p.image} alt={p.title} />
                      <div className="preview-info">
                        <span className="prod-name">{p.title}</span>
                        <span className="prod-price">Rp {p.price.toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                  ))}

                  {/* PRIORITY 2: Search outside the store across all Tokopedia */}
                  <div className="suggestion-section-title">Pencarian di Seluruh Tokopedia</div>
                  <div
                    className="suggestion-item"
                    onClick={() => handleSelectSuggestion('global')}
                  >
                    <div className="item-left">
                      <Globe size={16} />
                      <span>
                        Cari <strong>"{searchQuery}"</strong> di seluruh Tokopedia
                      </span>
                    </div>
                    <ExternalLink size={14} color="#6D7588" />
                  </div>
                </SuggestionPopover>
              )}
            </SearchForm>

            <QuickKeywords>
              <a href="/search.html?st=&q=Meja%20Belajar&srp_component_id=02.01.00.00&srp_page_id=&srp_page_title=&navsource=">Meja Belajar</a>
              <a href="/search.html?st=&q=Walkie%20Talkie&srp_component_id=02.01.00.00&srp_page_id=&srp_page_title=&navsource=">Walkie Talkie</a>
              <a href="/search.html?st=&q=Meja%20Kerja&srp_component_id=02.01.00.00&srp_page_id=&srp_page_title=&navsource=">Meja Kerja</a>
              <a href="/search.html?st=&q=Headset%20Gaming&srp_component_id=02.01.00.00&srp_page_id=&srp_page_title=&navsource=">Headset Gaming</a>
              <a href="/search.html?st=&q=Smartwatch&srp_component_id=02.01.00.00&srp_page_id=&srp_page_title=&navsource=">Smartwatch</a>
            </QuickKeywords>
          </div>

          <ActionsContainer>
            <IconButton href="/cart.html" aria-label="Keranjang Belanja">
              <ShoppingCart size={22} />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </IconButton>

            {/* Notification Bell Button with Hover & Pressed Trigger */}
            <NotifBellWrapper
              ref={notifContainerRef}
              onMouseEnter={handleNotifMouseEnter}
              onMouseOver={handleNotifMouseEnter}
              onMouseLeave={handleNotifMouseLeave}
            >
              <IconButton
                href="#"
                onClick={handleNotifClick}
                onMouseEnter={handleNotifMouseEnter}
                aria-label="Notifikasi"
                style={showNotifDrawer ? { backgroundColor: '#F0F3F7', color: '#03AC0E' } : {}}
              >
                <Bell size={22} />
                {(userProfile.unreadNotifications || 0) > 0 && (
                  <span className="badge" style={{ backgroundColor: '#FF5722' }}>
                    {userProfile.unreadNotifications}
                  </span>
                )}
              </IconButton>

              {/* Authentic Notification Drawer Popover matching media_1793693970696_126bf9de.png */}
              {showNotifDrawer && (
                <NotificationDrawer
                  onMouseEnter={handleNotifMouseEnter}
                  onMouseLeave={handleNotifMouseLeave}
                >
                  <div className="notif-header">
                    <h3>Notifikasi</h3>
                    <a href="/notifications.html" className="settings-link" title="Pengaturan Notifikasi">
                      <Settings size={18} />
                    </a>
                  </div>

                  <div className="notif-tabs">
                    <button
                      type="button"
                      className={`tab-btn ${notifTab === 'transaksi' ? 'active' : ''}`}
                      onClick={() => setNotifTab('transaksi')}
                    >
                      Transaksi
                    </button>
                    <button
                      type="button"
                      className={`tab-btn ${notifTab === 'update' ? 'active' : ''}`}
                      onClick={() => setNotifTab('update')}
                    >
                      Update {userProfile.unreadNotifications > 0 ? `(${userProfile.unreadNotifications})` : ''}
                      {userProfile.unreadNotifications > 0 && <span className="red-dot"></span>}
                    </button>
                  </div>

                  <div className="notif-body">
                    {notifTab === 'transaksi' ? (
                      <>
                        <div className="section-title-row">
                          <span className="sec-name">Pembelian</span>
                          <a href="/cart.html" className="see-all">Lihat Semua</a>
                        </div>
                        <div className="sub-status-label">Menunggu Pembayaran</div>

                        <div className="order-status-icons">
                          <div className="icon-box" onClick={() => alert('Menampilkan pesanan: Menunggu Konfirmasi')}>
                            <div className="circle"><Clock size={16} /></div>
                            <span>Menunggu Konfirmasi</span>
                          </div>
                          <div className="icon-box" onClick={() => alert('Menampilkan pesanan: Pesanan Diproses')}>
                            <div className="circle"><RefreshCw size={16} /></div>
                            <span>Pesanan Diproses</span>
                          </div>
                          <div className="icon-box" onClick={() => alert('Menampilkan pesanan: Sedang Dikirim')}>
                            <div className="circle"><Truck size={16} /></div>
                            <span>Sedang Dikirim</span>
                          </div>
                          <div className="icon-box" onClick={() => alert('Menampilkan pesanan: Sampai Tujuan')}>
                            <div className="circle"><CheckCircle2 size={16} /></div>
                            <span>Sampai Tujuan</span>
                          </div>
                        </div>

                        <div className="seller-box">
                          <h4>Penjualan</h4>
                          <p>Cek pesanan yang masuk dan perkembangan tokomu secara rutin di satu tempat</p>
                          <button
                            type="button"
                            className="seller-btn"
                            onClick={() => alert(`Membuka Tokopedia Seller untuk toko: ${userProfile.storeName || "Buana's Inve..."}`)}
                          >
                            Masuk ke Tokopedia Seller
                          </button>
                        </div>

                        <div className="untuk-kamu-section">
                          <h4 className="sec-header">Untuk Kamu</h4>
                          <div
                            className="promo-notif-item"
                            onClick={() => { window.location.href = '/store.html?shop=pira-indonesia'; }}
                          >
                            <div className="promo-icon-badge">
                              <Sparkles size={16} />
                            </div>
                            <div className="item-texts">
                              <span className="item-title">
                                Spesial untuk kamu: Promo diskon s.d 70% di PIRA Indonesia
                              </span>
                              <span className="item-time">1 jam lalu</span>
                            </div>
                          </div>
                          <div
                            className="promo-notif-item"
                            onClick={() => { window.location.href = '/search.html?q=meja'; }}
                          >
                            <div className="promo-icon-badge">
                              <Truck size={16} />
                            </div>
                            <div className="item-texts">
                              <span className="item-title">
                                Bebas Ongkir s.d Rp 40.000 untuk pengiriman ke alamatmu
                              </span>
                              <span className="item-time">3 jam lalu</span>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="update-list">
                        {[
                          {
                            id: 'up-1',
                            title: 'PIRA Indonesia menambahkan produk HT & Meja Belajar baru ke etalase',
                            time: '1 jam lalu',
                            link: '/store.html?shop=pira-indonesia'
                          },
                          {
                            id: 'up-2',
                            title: 'Flash Sale Tokopedia! Diskon gadget & furniture hingga 90% hari ini',
                            time: '4 jam lalu',
                            link: '/search.html?q=meja'
                          },
                          {
                            id: 'up-3',
                            title: 'Kupon diskon Rp 50.000 sudah masuk ke kantong promomu',
                            time: '1 hari lalu',
                            link: '/notifications.html'
                          },
                          {
                            id: 'up-4',
                            title: 'Pesanan #TKP-88219 Anda telah selesai. Berikan ulasan untuk dapatkan koin!',
                            time: '2 hari lalu',
                            link: '/profile.html'
                          }
                        ].map((item, idx) => (
                          <div
                            key={item.id}
                            className="update-item"
                            onClick={() => { window.location.href = item.link; }}
                          >
                            {userProfile.unreadNotifications > idx && <span className="dot-indicator"></span>}
                            <div className="update-content">
                              <span className="update-title">{item.title}</span>
                              <span className="update-time">{item.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="notif-footer">
                    <button
                      type="button"
                      className="read-all-btn"
                      onClick={handleMarkAllAsRead}
                    >
                      {readAllSuccess ? 'Semua dibaca ✓' : 'Tandai semua dibaca'}
                    </button>
                    <a href="/notifications.html" className="full-link">
                      Lihat selengkapnya
                    </a>
                  </div>
                </NotificationDrawer>
              )}
            </NotifBellWrapper>

            <IconButton href="#" onClick={(e) => { e.preventDefault(); alert('Pesan Obrolan Tokopedia.'); }} aria-label="Pesan">
              <Mail size={22} />
              <span className="badge" style={{ backgroundColor: '#FF5722' }}>{userProfile.unreadMessages || 4}</span>
            </IconButton>

            <Divider />

            <SellerLink href="#" onClick={(e) => { e.preventDefault(); alert(`Buka Toko: ${userProfile.storeName}`); }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#03AC0E', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 700 }}>
                B
              </div>
              <span>{userProfile.storeName || "Buana's Inve..."}</span>
            </SellerLink>

            <UserProfile href="/profile.html">
              <img
                src={userProfile.avatar || "/images/profile-sakti.jpg"}
                alt={userProfile.name}
              />
              <span>{userProfile.displayName || "Sakti"}</span>
            </UserProfile>
          </ActionsContainer>
        </HeaderContainer>

        <DeliveryBar>
          <a href="/address.html" className="loc-link" title="Ganti Alamat Pengiriman">
            <MapPin size={13} color="#6D7588" />
            <span>Dikirim ke <strong>{activeAddress ? `${activeAddress.title} ${activeAddress.recipient}` : 'Gedung SD At Tibyan BQS Hikmatullah Sakti Buana'}</strong></span>
            <ChevronDown size={13} />
          </a>
        </DeliveryBar>

        {showMegaMenu && (
          <MegaMenuDropdown onClose={() => setShowMegaMenu(false)} />
        )}
      </MainHeaderWrapper>
    </>
  );
}
