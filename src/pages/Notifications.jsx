import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProfileSidebar from '../components/ProfileSidebar';
import loadable from '../utils/loadable';
import { User, Info, X, ShoppingCart, FileText, Check } from 'lucide-react';
import { notificationService } from '../services/notificationService';
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

const BodyWrapper = styled.div`
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SmsNoticeBanner = styled.div`
  background-color: #F0F3F7;
  border-radius: 8px;
  padding: 12px 16px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 13px;
  color: #6D7588;
  line-height: 1.5;

  .info-icon {
    color: #9FA6B0;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .text-content {
    flex: 1;

    a {
      color: #03AC0E;
      font-weight: 700;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  button.close-banner {
    background: none;
    border: none;
    cursor: pointer;
    color: #9FA6B0;
    padding: 0;

    &:hover {
      color: #212121;
    }
  }
`;

const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  h2 {
    font-size: 20px;
    font-weight: 800;
    color: #212121;
    margin: 0;
  }

  p {
    font-size: 13px;
    color: #6D7588;
    margin: 0;
  }
`;

const TableHeaderBar = styled.div`
  background-color: #E4E7EE;
  border-radius: 6px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;

  span.left-label {
    font-size: 14px;
    font-weight: 700;
    color: #212121;
  }

  span.right-label {
    font-size: 13px;
    font-weight: 600;
    color: #6D7588;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 700;
  color: #212121;
  margin-top: 16px;
  margin-bottom: 8px;

  svg {
    color: #6D7588;
  }
`;

const PreferenceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid #F0F3F7;
  font-size: 14px;
  color: #212121;
  transition: background-color 0.15s;

  &:hover {
    background-color: #F8F9FA;
  }

  &:last-of-type {
    border-bottom: none;
  }
`;

const CustomCheckbox = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1.5px solid ${(props) => (props.checked ? '#03AC0E' : '#B8BFC9')};
  background-color: ${(props) => (props.checked ? '#03AC0E' : '#FFFFFF')};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  transition: all 0.15s ease-in-out;

  &:hover {
    border-color: #03AC0E;
  }

  svg {
    stroke: #FFFFFF;
    stroke-width: 3px;
  }
`;

export default function Notifications() {
  const [profile] = useState(userService.getProfile());
  const [settings, setSettings] = useState(notificationService.getSettings());
  const [showNotice, setShowNotice] = useState(true);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    openGraph.updateMeta({
      title: 'Pengaturan Notifikasi | Tokopedia',
      description: 'Atur notifikasi transaksi dan promo yang ingin Anda terima melalui email.',
      type: 'website'
    });

    analytics.logEvent('notification_settings_view');
    gtm.pushEvent('notification_settings_view', { user_id: profile.phone });
    criteo.pushTag({ event: 'viewNotificationSettings' });
    branchService.logEvent('NOTIFICATION_SETTINGS_VIEW', { user_id: profile.phone });

    const unsub = notificationService.subscribe((s) => setSettings(s));
    return unsub;
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleToggle = (key, label) => {
    const updated = notificationService.toggle(key);
    const status = updated[key] ? 'diaktifkan' : 'dinonaktifkan';
    showToast(`Notifikasi "${label}" ${status}`);
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
              <a href="/payment-settings.html">Pembayaran</a>
              <a href="/bank-accounts.html">Rekening Bank</a>
              <a href="/notifications.html" className="active">Notifikasi</a>
              <a href="#" onClick={(e) => { e.preventDefault(); showToast('Mode Tampilan Standar'); }}>Mode Tampilan</a>
              <a href="#" onClick={(e) => { e.preventDefault(); showToast('Keamanan Akun Terproteksi'); }}>Keamanan</a>
            </TabNav>

            <BodyWrapper>
              {/* SMS Notice Banner */}
              {showNotice && (
                <SmsNoticeBanner>
                  <Info size={18} className="info-icon" />
                  <div className="text-content">
                    Notifikasi SMS sifatnya penting karena memberimu kabar soal keamanan akun dan status transaksi. Hati-hati saat terima SMS spam yang mengatasnamakan Tokopedia, ya. Jika kamu menerima SMS tersebut, <a href="#" onClick={(e) => { e.preventDefault(); showToast('Panduan Keamanan Tokopedia'); }}>pelajari selengkapnya disini.</a>
                  </div>
                  <button className="close-banner" onClick={() => setShowNotice(false)} aria-label="Tutup pemberitahuan">
                    <X size={16} />
                  </button>
                </SmsNoticeBanner>
              )}

              {/* Title Header */}
              <PageHeader>
                <h2>Notifikasi</h2>
                <p>Atur notifikasi yang ingin kamu terima disini</p>
              </PageHeader>

              {/* Table Header Bar */}
              <TableHeaderBar>
                <span className="left-label">Transaksi</span>
                <span className="right-label">E-mail</span>
              </TableHeaderBar>

              {/* Group 1: Transaksi Pembelian */}
              <div>
                <SectionHeader>
                  <ShoppingCart size={16} />
                  <span>Transaksi Pembelian</span>
                </SectionHeader>

                <PreferenceRow>
                  <span>Menunggu Pembayaran</span>
                  <CustomCheckbox
                    checked={settings.waitingPayment}
                    onClick={() => handleToggle('waitingPayment', 'Menunggu Pembayaran')}
                    aria-label="Menunggu Pembayaran"
                  >
                    {settings.waitingPayment && <Check size={14} />}
                  </CustomCheckbox>
                </PreferenceRow>

                <PreferenceRow>
                  <span>Menunggu Konfirmasi</span>
                  <CustomCheckbox
                    checked={settings.waitingConfirmation}
                    onClick={() => handleToggle('waitingConfirmation', 'Menunggu Konfirmasi')}
                    aria-label="Menunggu Konfirmasi"
                  >
                    {settings.waitingConfirmation && <Check size={14} />}
                  </CustomCheckbox>
                </PreferenceRow>

                <PreferenceRow>
                  <span>Pesanan Diproses</span>
                  <CustomCheckbox
                    checked={settings.orderProcessed}
                    onClick={() => handleToggle('orderProcessed', 'Pesanan Diproses')}
                    aria-label="Pesanan Diproses"
                  >
                    {settings.orderProcessed && <Check size={14} />}
                  </CustomCheckbox>
                </PreferenceRow>

                <PreferenceRow>
                  <span>Pesanan Dikirim</span>
                  <CustomCheckbox
                    checked={settings.orderShipped}
                    onClick={() => handleToggle('orderShipped', 'Pesanan Dikirim')}
                    aria-label="Pesanan Dikirim"
                  >
                    {settings.orderShipped && <Check size={14} />}
                  </CustomCheckbox>
                </PreferenceRow>

                <PreferenceRow>
                  <span>Pesanan Selesai</span>
                  <CustomCheckbox
                    checked={settings.orderDelivered}
                    onClick={() => handleToggle('orderDelivered', 'Pesanan Selesai')}
                    aria-label="Pesanan Selesai"
                  >
                    {settings.orderDelivered && <Check size={14} />}
                  </CustomCheckbox>
                </PreferenceRow>

                <PreferenceRow>
                  <span>Pengingat</span>
                  <CustomCheckbox
                    checked={settings.orderReminder}
                    onClick={() => handleToggle('orderReminder', 'Pengingat')}
                    aria-label="Pengingat"
                  >
                    {settings.orderReminder && <Check size={14} />}
                  </CustomCheckbox>
                </PreferenceRow>
              </div>

              {/* Group 2: Transaksi Penjualan */}
              <div>
                <SectionHeader>
                  <FileText size={16} />
                  <span>Transaksi Penjualan</span>
                </SectionHeader>

                <PreferenceRow>
                  <span>Pesanan Baru</span>
                  <CustomCheckbox
                    checked={settings.sellerNewOrder}
                    onClick={() => handleToggle('sellerNewOrder', 'Pesanan Baru')}
                    aria-label="Pesanan Baru"
                  >
                    {settings.sellerNewOrder && <Check size={14} />}
                  </CustomCheckbox>
                </PreferenceRow>

                <PreferenceRow>
                  <span>Pesanan Sudah Tiba</span>
                  <CustomCheckbox
                    checked={settings.sellerOrderArrived}
                    onClick={() => handleToggle('sellerOrderArrived', 'Pesanan Sudah Tiba')}
                    aria-label="Pesanan Sudah Tiba"
                  >
                    {settings.sellerOrderArrived && <Check size={14} />}
                  </CustomCheckbox>
                </PreferenceRow>

                <PreferenceRow>
                  <span>Transaksi Selesai</span>
                  <CustomCheckbox
                    checked={settings.sellerOrderComplete}
                    onClick={() => handleToggle('sellerOrderComplete', 'Transaksi Selesai')}
                    aria-label="Transaksi Selesai"
                  >
                    {settings.sellerOrderComplete && <Check size={14} />}
                  </CustomCheckbox>
                </PreferenceRow>
              </div>

              {/* Group 3: Promo */}
              <div>
                <SectionHeader>
                  <Info size={16} />
                  <span>Promo</span>
                </SectionHeader>

                <PreferenceRow>
                  <span>Newsletter Tokopedia</span>
                  <CustomCheckbox
                    checked={settings.promoNewsletter}
                    onClick={() => handleToggle('promoNewsletter', 'Newsletter Tokopedia')}
                    aria-label="Newsletter Tokopedia"
                  >
                    {settings.promoNewsletter && <Check size={14} />}
                  </CustomCheckbox>
                </PreferenceRow>
              </div>
            </BodyWrapper>
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
