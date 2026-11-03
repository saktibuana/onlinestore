import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProfileSidebar from '../components/ProfileSidebar';
import loadable from '../utils/loadable';
import { User, Wallet, Info, Plus } from 'lucide-react';
import { paymentService } from '../services/paymentService';
import { userService } from '../services/userService';
import { analytics } from '../services/analytics';
import { gtm } from '../services/gtm';
import { criteo } from '../services/criteo';
import { branchService } from '../services/branch';
import { openGraph } from '../services/opengraph';

const AkamaiTelemetryDrawer = loadable(() => import('../components/AkamaiTelemetryDrawer'), {
  fallback: null
});

const Container = styled.div`
  max-width: 1200px;
  margin: 20px auto 60px;
  padding: 0 16px;
  display: flex;
  gap: 24px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ProfileTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 700;
  color: #212121;
`;

const ContentCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  overflow: hidden;
  padding-bottom: 32px;
`;

const TabNav = styled.div`
  display: flex;
  border-bottom: 1px solid #E5E7EB;
  overflow-x: auto;

  a {
    padding: 14px 20px;
    font-size: 14px;
    font-weight: 600;
    color: #6D7588;
    text-decoration: none;
    white-space: nowrap;
    border-bottom: 2px solid transparent;
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

const BodyLayout = styled.div`
  padding: 32px 28px;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 40px;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const LeftIntroColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;

  .greeting-block {
    p.hello {
      font-size: 14px;
      color: #212121;
      margin: 0;
      line-height: 1.4;
    }

    h2 {
      font-size: 18px;
      font-weight: 800;
      color: #212121;
      margin: 4px 0 10px;
    }

    p.desc {
      font-size: 13px;
      color: #6D7588;
      line-height: 1.5;
      margin: 0;
    }
  }

  .method-list {
    display: flex;
    flex-direction: column;
    gap: 12px;

    button.method-tab {
      background: none;
      border: none;
      text-align: left;
      font-size: 15px;
      font-weight: 600;
      color: #212121;
      cursor: pointer;
      padding: 6px 0;
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
`;

const RightDetailCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 24px;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  h3.method-title {
    font-size: 16px;
    font-weight: 700;
    color: #212121;
    margin: 0;
  }

  .virtual-card {
    border-radius: 14px;
    padding: 20px;
    color: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 170px;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);

    &.gopay-theme {
      background: linear-gradient(135deg, #00AED6 0%, #0093B7 50%, #007799 100%);
    }

    &.dana-theme {
      background: linear-gradient(135deg, #118EEA 0%, #0D74C2 100%);
    }

    .card-top {
      display: flex;
      align-items: center;
      gap: 6px;

      .plus-pill {
        display: inline-flex;
        align-items: center;
        gap: 3px;
        background: rgba(255, 255, 255, 0.25);
        color: #FFFFFF;
        font-size: 11px;
        font-weight: 800;
        padding: 2px 8px;
        border-radius: 4px;
        letter-spacing: 0.5px;
      }
    }

    .card-bottom {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .masked-num {
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 2px;
      }

      .card-saldo {
        font-size: 13px;
        opacity: 0.95;
      }
    }
  }

  .connected-account-section {
    display: flex;
    flex-direction: column;
    gap: 12px;

    h4 {
      font-size: 14px;
      font-weight: 700;
      color: #212121;
      margin: 0;
    }

    .user-row {
      display: flex;
      align-items: center;
      gap: 12px;

      img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        object-fit: cover;
        border: 1px solid #E5E7EB;
      }

      .user-details {
        display: flex;
        flex-direction: column;

        span.email {
          font-size: 13px;
          font-weight: 700;
          color: #212121;
        }

        span.time {
          font-size: 11px;
          color: #6D7588;
        }
      }
    }
  }

  .info-notice {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: #6D7588;
    line-height: 1.4;

    svg {
      flex-shrink: 0;
      color: #9FA6B0;
    }
  }

  button.action-btn {
    width: 100%;
    background: #FFFFFF;
    border: 1px solid #D6D9E0;
    color: #212121;
    font-size: 13px;
    font-weight: 700;
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.15s;

    &:hover {
      border-color: #FF5722;
      color: #FF5722;
      background-color: #FFF5F2;
    }

    &.primary {
      background-color: #03AC0E;
      color: #FFFFFF;
      border-color: #03AC0E;

      &:hover {
        background-color: #02980C;
        color: #FFFFFF;
      }
    }
  }
`;

export default function PaymentSettings() {
  const [profile] = useState(userService.getProfile());
  const [payment, setPayment] = useState(paymentService.getSettings());
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    openGraph.updateMeta({
      title: 'Pengaturan Pembayaran | Tokopedia',
      description: 'Atur akun pembayaran GoPay dan dompet digital Anda di Tokopedia.',
      type: 'website'
    });

    analytics.logEvent('payment_settings_view');
    gtm.pushEvent('payment_settings_view', { user_id: profile.phone });
    criteo.pushTag({ event: 'viewPaymentSettings' });
    branchService.logEvent('PAYMENT_SETTINGS_VIEW', { user_id: profile.phone });

    const unsub = paymentService.subscribe((p) => setPayment(p));
    return unsub;
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleSelectMethod = (m) => {
    paymentService.setActiveMethod(m);
  };

  const handleDisconnectGopay = () => {
    if (confirm('Yakin ingin memutuskan sambungan GoPay dari akun Tokopedia Anda?')) {
      paymentService.disconnectGopay();
      showToast('Sambungan GoPay berhasil dihapus.');
    }
  };

  const handleConnectGopay = () => {
    paymentService.reconnectGopay();
    showToast('GoPay berhasil disambungkan kembali!');
  };

  const handleToggleDana = () => {
    const res = paymentService.toggleDana();
    if (res.dana.isConnected) {
      showToast('DANA berhasil disambungkan ke akun Tokopedia!');
    } else {
      showToast('Sambungan DANA berhasil dihapus.');
    }
  };

  return (
    <div>
      <Header />

      <Container>
        {/* Left Profile Sidebar */}
        <ProfileSidebar activeNav="pengaturan" />

        {/* Main Content Area */}
        <MainContent>
          <ProfileTitle>
            <User size={20} color="#212121" />
            <span>{profile.displayName || profile.name}</span>
          </ProfileTitle>

          <ContentCard>
            {/* Navigation Tabs */}
            <TabNav>
              <a href="/profile.html">Biodata Diri</a>
              <a href="/address.html">Daftar Alamat</a>
              <a href="/payment-settings.html" className="active">Pembayaran</a>
              <a href="/bank-accounts.html">Rekening Bank</a>
              <a href="/notifications.html">Notifikasi</a>
              <a href="#" onClick={(e) => { e.preventDefault(); showToast('Mode Tampilan Standar'); }}>Mode Tampilan</a>
              <a href="#" onClick={(e) => { e.preventDefault(); showToast('Keamanan Akun Terproteksi'); }}>Keamanan</a>
            </TabNav>

            <BodyLayout>
              {/* Left Intro Column */}
              <LeftIntroColumn>
                <div className="greeting-block">
                  <p className="hello">
                    Hai {profile.displayName || profile.name},<br />
                    selamat datang di halaman
                  </p>
                  <h2>Pengaturan Pembayaran</h2>
                  <p className="desc">
                    Atur pembayaran Anda untuk meningkatkan keamanan dan kemudahan berbelanja Anda di Tokopedia.
                  </p>
                </div>

                <div className="method-list">
                  <button
                    type="button"
                    className={`method-tab ${payment.activeMethod === 'gopay' ? 'active' : ''}`}
                    onClick={() => handleSelectMethod('gopay')}
                  >
                    GoPay
                  </button>
                  <button
                    type="button"
                    className={`method-tab ${payment.activeMethod === 'dana' ? 'active' : ''}`}
                    onClick={() => handleSelectMethod('dana')}
                  >
                    DANA
                  </button>
                </div>
              </LeftIntroColumn>

              {/* Right Detail Card: GoPay or DANA */}
              {payment.activeMethod === 'gopay' ? (
                <RightDetailCard>
                  <h3 className="method-title">GoPay</h3>

                  {payment.gopay.isConnected ? (
                    <>
                      <div className="virtual-card gopay-theme">
                        <div className="card-top">
                          <Wallet size={16} />
                          <span className="plus-pill">+ PLUS</span>
                        </div>
                        <div className="card-bottom">
                          <span className="masked-num">{payment.gopay.maskedPhone}</span>
                          <span className="card-saldo">Saldo: Rp{payment.gopay.balance.toLocaleString('id-ID')}</span>
                        </div>
                      </div>

                      <div className="connected-account-section">
                        <h4>Akun Tokopedia yang terhubung</h4>
                        <div className="user-row">
                          <img src={profile.avatar || "/images/profile-sakti.jpg"} alt={profile.name} />
                          <div className="user-details">
                            <span className="email">{payment.gopay.email}</span>
                            <span className="time">Terhubung sejak {payment.gopay.connectedSince}</span>
                          </div>
                        </div>
                      </div>

                      <div className="info-notice">
                        <Info size={16} />
                        <span>Kamu hanya bisa menyambungkan 1 nomor GoPay ke Tokopedia.</span>
                      </div>

                      <button
                        type="button"
                        className="action-btn"
                        onClick={handleDisconnectGopay}
                      >
                        Hapus
                      </button>
                    </>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '24px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
                      <p style={{ color: '#6D7588', fontSize: 13, margin: 0 }}>
                        Akun GoPay saat ini belum terhubung ke akun Tokopedia Anda.
                      </p>
                      <button
                        type="button"
                        className="action-btn primary"
                        onClick={handleConnectGopay}
                      >
                        Sambungkan GoPay
                      </button>
                    </div>
                  )}
                </RightDetailCard>
              ) : (
                <RightDetailCard>
                  <h3 className="method-title">DANA</h3>

                  {payment.dana.isConnected ? (
                    <>
                      <div className="virtual-card dana-theme">
                        <div className="card-top">
                          <span className="plus-pill" style={{ letterSpacing: 1 }}>DANA</span>
                        </div>
                        <div className="card-bottom">
                          <span className="masked-num">{payment.dana.maskedPhone}</span>
                          <span className="card-saldo">Saldo: Rp{payment.dana.balance.toLocaleString('id-ID')}</span>
                        </div>
                      </div>

                      <div className="connected-account-section">
                        <h4>Akun Tokopedia yang terhubung</h4>
                        <div className="user-row">
                          <img src={profile.avatar || "/images/profile-sakti.jpg"} alt={profile.name} />
                          <div className="user-details">
                            <span className="email">{payment.dana.email}</span>
                            <span className="time">Terhubung sejak {payment.dana.connectedSince}</span>
                          </div>
                        </div>
                      </div>

                      <div className="info-notice">
                        <Info size={16} />
                        <span>DANA dapat digunakan untuk checkout transaksi di Tokopedia.</span>
                      </div>

                      <button
                        type="button"
                        className="action-btn"
                        onClick={handleToggleDana}
                      >
                        Hapus Sambungan DANA
                      </button>
                    </>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '24px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
                      <p style={{ color: '#6D7588', fontSize: 13, margin: 0 }}>
                        Sambungkan dompet digital DANA untuk kemudahan checkout otomatis.
                      </p>
                      <button
                        type="button"
                        className="action-btn primary"
                        onClick={handleToggleDana}
                      >
                        Sambungkan DANA
                      </button>
                    </div>
                  )}
                </RightDetailCard>
              )}
            </BodyLayout>
          </ContentCard>
        </MainContent>
      </Container>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#212121',
          color: '#FFFFFF',
          padding: '12px 24px',
          borderRadius: 8,
          fontSize: 14,
          fontWeight: 600,
          zIndex: 2000,
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
        }}>
          {toastMessage}
        </div>
      )}

      <AkamaiTelemetryDrawer />
      <Footer />
    </div>
  );
}
