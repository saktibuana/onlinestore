import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import loadable from '@loadable/component';
import { Search, ShoppingCart, Bell, Mail, ChevronDown, Smartphone, Store, ShieldCheck } from 'lucide-react';
import { cartService } from '../services/cartService';
import { analytics } from '../services/analytics';
import { gtm } from '../services/gtm';

// Loadable Mega Menu Dropdown
const MegaMenuDropdown = loadable(() => import('./MegaMenuDropdown'), {
  fallback: <div style={{ padding: 16, background: '#fff' }}>Memuat kategori...</div>
});

const TopBar = styled.div`
  background-color: #F8F9FA;
  border-bottom: 1px solid #E5E7EB;
  font-size: 12px;
  color: #6D7588;
  padding: 6px 0;
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
  gap: 20px;

  a {
    color: #6D7588;
    text-decoration: none;
    &:hover {
      color: #03AC0E;
    }
  }
`;

const MainHeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #FFFFFF;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
`;

const HeaderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
`;

const LogoContainer = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  cursor: pointer;
  flex-shrink: 0;

  img, svg {
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
  padding: 2px 12px;
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
    padding: 8px 6px;
    color: #212121;
    background: transparent;

    &::placeholder {
      color: #9FA6B0;
    }
  }

  button {
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

export default function Header({ activeQuery = '' }) {
  const [cartCount, setCartCount] = useState(cartService.getCount());
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState(activeQuery);

  useEffect(() => {
    const unsub = cartService.subscribe(({ count }) => {
      setCartCount(count);
    });
    return unsub;
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    analytics.trackSearch(searchQuery, 18);
    gtm.pushEvent('search_submit', { search_term: searchQuery });

    // Navigate to Search MPA page
    window.location.href = `/search.html?q=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <>
      <TopBar>
        <TopBarContainer>
          <TopBarLeft>
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Aplikasi Tokopedia PWA siap diinstall di perangkat Anda.'); }}>
              <Smartphone size={14} /> Download Tokopedia App
            </a>
            <a href="#">Mitra Tokopedia</a>
            <a href="#">Mulai Berjualan</a>
            <a href="#">Promo</a>
            <a href="#">Tokopedia Care</a>
          </TopBarLeft>
          <TopBarRight>
            <a href="#">Tentang Tokopedia</a>
            <a href="#">Hak Kekayaan Intelektual</a>
            <a href="#">Karir</a>
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

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <SearchForm onSubmit={handleSearchSubmit}>
              <SearchInputWrapper>
                <input
                  type="text"
                  placeholder="Cari di Tokopedia"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" aria-label="Cari">
                  <Search size={18} />
                </button>
              </SearchInputWrapper>
            </SearchForm>
            <QuickKeywords>
              <a href="/search.html?q=Meja%20Belajar">Meja Belajar</a>
              <a href="/search.html?q=Kaos%20Distro">Kaos Distro</a>
              <a href="/search.html?q=Headset%20Gaming">Headset Gaming</a>
              <a href="/search.html?q=Smartwatch">Smartwatch</a>
              <a href="/search.html?q=Kursi%20Ergonomis">Kursi Ergonomis</a>
            </QuickKeywords>
          </div>

          <ActionsContainer>
            <IconButton href="/cart.html" aria-label="Keranjang Belanja">
              <ShoppingCart size={22} />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </IconButton>

            <IconButton href="#" onClick={(e) => { e.preventDefault(); alert('Tidak ada notifikasi baru.'); }} aria-label="Notifikasi">
              <Bell size={22} />
            </IconButton>

            <IconButton href="#" onClick={(e) => { e.preventDefault(); alert('Pesan obrolan Tokopedia siap.'); }} aria-label="Pesan">
              <Mail size={22} />
            </IconButton>

            <Divider />

            <SellerLink href="#" onClick={(e) => { e.preventDefault(); alert('Buka Toko Gratis di Tokopedia.'); }}>
              <Store size={18} color="#03AC0E" /> Toko
            </SellerLink>

            <UserProfile href="#" onClick={(e) => { e.preventDefault(); alert('Profil Pengguna Tokopedia terverifikasi.'); }}>
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop"
                alt="Pengguna"
              />
              <span>At-Tibyan</span>
            </UserProfile>
          </ActionsContainer>
        </HeaderContainer>

        {showMegaMenu && (
          <MegaMenuDropdown onClose={() => setShowMegaMenu(false)} />
        )}
      </MainHeaderWrapper>
    </>
  );
}
