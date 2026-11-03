import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { ChevronDown, ChevronUp, CreditCard, Wallet, MessageSquare, ShoppingBag, User, CheckCircle2 } from 'lucide-react';
import { userService } from '../services/userService';

const SidebarContainer = styled.aside`
  width: 260px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-shrink: 0;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const ProfileCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;

  img {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid #E5E7EB;
  }

  .user-info {
    flex: 1;
    overflow: hidden;

    h3 {
      font-size: 15px;
      font-weight: 700;
      color: #212121;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    a {
      font-size: 12px;
      color: #6D7588;
      text-decoration: none;
      display: inline-block;
      margin-top: 2px;

      &:hover {
        color: #03AC0E;
      }
    }
  }
`;

const PlusCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 14px 16px;

  .plus-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: #EBF7ED;
    color: #03AC0E;
    font-size: 11px;
    font-weight: 800;
    padding: 2px 8px;
    border-radius: 4px;
    margin-bottom: 8px;
    letter-spacing: 0.5px;
  }

  h4 {
    font-size: 13px;
    font-weight: 700;
    color: #212121;
    margin: 0 0 4px;
  }

  p {
    font-size: 11px;
    color: #6D7588;
    line-height: 1.4;
    margin: 0;
  }
`;

const WalletsCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .wallet-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;

    .left-side {
      display: flex;
      align-items: center;
      gap: 10px;

      .icon-box {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #03AC0E;
      }

      .title {
        font-weight: 600;
        color: #212121;
      }
    }

    .right-side {
      text-align: right;

      .amount {
        font-weight: 700;
        color: #212121;
        font-size: 13px;
      }

      .sub-coins {
        font-size: 11px;
        color: #6D7588;
      }

      .action-link {
        color: #03AC0E;
        font-weight: 700;
        font-size: 12px;
        text-decoration: none;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .divider {
    height: 1px;
    background: #F0F3F7;
    margin: 2px 0;
  }
`;

const MenuCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  overflow: hidden;

  .menu-group {
    border-bottom: 1px solid #F0F3F7;

    &:last-child {
      border-bottom: none;
    }

    .group-header {
      padding: 14px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      font-size: 13px;
      font-weight: 700;
      color: #212121;
      user-select: none;

      &:hover {
        background-color: #F8F9FA;
      }
    }

    .group-items {
      display: flex;
      flex-direction: column;
      padding: 0 0 8px;

      a {
        padding: 8px 16px 8px 24px;
        font-size: 13px;
        color: #6D7588;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: color 0.15s, background-color 0.15s;

        &:hover {
          color: #03AC0E;
          background-color: #F8F9FA;
        }

        &.active {
          color: #03AC0E;
          font-weight: 700;
          background-color: #EBF7ED;
          border-right: 3px solid #03AC0E;
        }

        .badge-count {
          background-color: #FF5722;
          color: #FFFFFF;
          font-size: 10px;
          font-weight: 700;
          padding: 1px 6px;
          border-radius: 999px;
        }
      }
    }
  }
`;

export default function ProfileSidebar({ activeNav = 'pengaturan' }) {
  const [profile, setProfile] = useState(userService.getProfile());
  const [expanded, setExpanded] = useState({
    inbox: true,
    orders: true,
    profile: true
  });

  useEffect(() => {
    const unsub = userService.subscribe((p) => setProfile(p));
    return unsub;
  }, []);

  const toggleSection = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <SidebarContainer>
      {/* User Mini Card */}
      <ProfileCard>
        <img src={profile.avatar || "/images/profile-sakti.jpg"} alt={profile.name} />
        <div className="user-info">
          <h3>{profile.displayName || profile.name}</h3>
          <a href="/profile.html">Lihat Profil</a>
        </div>
      </ProfileCard>

      {/* PLUS Membership Info */}
      <PlusCard>
        <div className="plus-badge">
          <span>PLUS</span>
        </div>
        <h4>PLUS-mu lagi nonaktif</h4>
        <p>Lanjut langganan buat pakai keuntungannya</p>
      </PlusCard>

      {/* Wallets & Balances */}
      <WalletsCard>
        {/* GoPay */}
        <div className="wallet-row">
          <div className="left-side">
            <div className="icon-box" style={{ color: '#0081A0' }}>
              <Wallet size={18} />
            </div>
            <span className="title">GoPay</span>
          </div>
          <div className="right-side">
            <div className="amount">Rp{profile.gopayBalance.toLocaleString('id-ID')}</div>
            <div className="sub-coins">{profile.gopayCoins} Coins</div>
          </div>
        </div>

        <div className="divider" />

        {/* Tokopedia Card */}
        <div className="wallet-row">
          <div className="left-side">
            <div className="icon-box" style={{ color: '#2E7D32' }}>
              <CreditCard size={18} />
            </div>
            <span className="title">Tokopedia Card</span>
          </div>
          <div className="right-side">
            <a href="#" className="action-link" onClick={(e) => { e.preventDefault(); alert('Pendaftaran Tokopedia Card'); }}>
              Daftar
            </a>
          </div>
        </div>

        <div className="divider" />

        {/* Saldo */}
        <div className="wallet-row">
          <div className="left-side">
            <div className="icon-box" style={{ color: '#03AC0E' }}>
              <Wallet size={18} />
            </div>
            <span className="title">Saldo</span>
          </div>
          <div className="right-side">
            <div className="amount">Rp{profile.saldo.toLocaleString('id-ID')}</div>
          </div>
        </div>
      </WalletsCard>

      {/* Accordion Menu */}
      <MenuCard>
        {/* Kotak Masuk */}
        <div className="menu-group">
          <div className="group-header" onClick={() => toggleSection('inbox')}>
            <span>Kotak Masuk</span>
            {expanded.inbox ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          {expanded.inbox && (
            <div className="group-items">
              <a href="#" onClick={(e) => e.preventDefault()}>
                <span>Chat</span>
                <span className="badge-count">4</span>
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>Ulasan</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Pesan Bantuan</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Pesanan Dikomplain</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Update</a>
            </div>
          )}
        </div>

        {/* Pembelian */}
        <div className="menu-group">
          <div className="group-header" onClick={() => toggleSection('orders')}>
            <span>Pembelian</span>
            {expanded.orders ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          {expanded.orders && (
            <div className="group-items">
              <a href="#" onClick={(e) => e.preventDefault()}>Menunggu Pembayaran</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Daftar Transaksi</a>
            </div>
          )}
        </div>

        {/* Profil Saya */}
        <div className="menu-group">
          <div className="group-header" onClick={() => toggleSection('profile')}>
            <span>Profil Saya</span>
            {expanded.profile ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          {expanded.profile && (
            <div className="group-items">
              <a href="#" onClick={(e) => e.preventDefault()}>Wishlist</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Toko Favorit</a>
              <a
                href="/profile.html"
                className={activeNav === 'pengaturan' ? 'active' : ''}
              >
                Pengaturan
              </a>
            </div>
          )}
        </div>
      </MenuCard>
    </SidebarContainer>
  );
}
