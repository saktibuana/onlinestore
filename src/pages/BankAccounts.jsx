import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProfileSidebar from '../components/ProfileSidebar';
import loadable from '../utils/loadable';
import { User, Plus, X, Building2 } from 'lucide-react';
import { bankService } from '../services/bankService';
import { userService } from '../services/userService';
import { BankLogoBadge } from '../components/BankLogos';
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
  gap: 24px;
`;

const TopActionBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 680px) {
    flex-direction: column;
    align-items: flex-start;
  }

  .title-group {
    h2 {
      font-size: 20px;
      font-weight: 800;
      color: #212121;
      margin: 0 0 4px;
    }

    p {
      font-size: 13px;
      color: #6D7588;
      margin: 0;
    }
  }

  button.add-bank-btn {
    background-color: #03AC0E;
    color: #FFFFFF;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
    transition: background-color 0.15s;

    &:hover {
      background-color: #02980C;
    }
  }
`;

const BankCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const BankCard = styled.div`
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #FFFFFF;
  transition: border-color 0.15s, box-shadow 0.15s;

  &:hover {
    border-color: #B8BFC9;
  }

  .left-side {
    display: flex;
    align-items: center;
    gap: 24px;

    @media (max-width: 600px) {
      gap: 16px;
    }
  }

  .logo-box {
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .details {
    display: flex;
    flex-direction: column;
    gap: 2px;

    .bank-name {
      font-size: 11px;
      font-weight: 700;
      color: #6D7588;
      letter-spacing: 0.3px;
    }

    .account-num {
      font-size: 16px;
      font-weight: 800;
      color: #212121;
      letter-spacing: 0.5px;
    }

    .account-holder {
      font-size: 13px;
      color: #6D7588;
    }
  }

  button.delete-btn {
    background: #FFFFFF;
    border: 1px solid #D6D9E0;
    color: #212121;
    font-size: 13px;
    font-weight: 700;
    padding: 8px 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.15s;

    &:hover {
      border-color: #FF5722;
      color: #FF5722;
      background-color: #FFF5F2;
    }
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;

  .modal-box {
    background: #FFFFFF;
    border-radius: 12px;
    width: 100%;
    max-width: 480px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);

    .modal-header {
      padding: 18px 24px;
      border-bottom: 1px solid #E5E7EB;
      display: flex;
      align-items: center;
      justify-content: space-between;

      h3 {
        font-size: 16px;
        font-weight: 700;
        color: #212121;
        margin: 0;
      }

      button.close-btn {
        background: none;
        border: none;
        cursor: pointer;
        color: #9FA6B0;
        padding: 4px;
        &:hover { color: #212121; }
      }
    }

    .modal-body {
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;

      .form-group {
        display: flex;
        flex-direction: column;
        gap: 6px;

        label {
          font-size: 13px;
          font-weight: 700;
          color: #212121;
        }

        input, select {
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 13px;
          color: #212121;
          outline: none;
          background: #FFFFFF;
          &:focus { border-color: #03AC0E; }
        }
      }
    }

    .modal-footer {
      padding: 16px 24px;
      border-top: 1px solid #E5E7EB;
      display: flex;
      justify-content: flex-end;
      gap: 12px;

      button.btn-cancel {
        background: none;
        border: 1px solid #E5E7EB;
        border-radius: 8px;
        padding: 8px 16px;
        font-size: 13px;
        font-weight: 700;
        color: #6D7588;
        cursor: pointer;
        &:hover { background-color: #F8F9FA; }
      }

      button.btn-save {
        background: #03AC0E;
        border: none;
        border-radius: 8px;
        padding: 8px 20px;
        font-size: 13px;
        font-weight: 700;
        color: #FFFFFF;
        cursor: pointer;
        &:hover { background-color: #02980C; }
      }
    }
  }
`;

export default function BankAccounts() {
  const [profile] = useState(userService.getProfile());
  const [accounts, setAccounts] = useState(bankService.getAccounts());
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const [formData, setFormData] = useState({
    bankCode: 'BCA',
    accountNumber: '',
    accountHolder: 'Arti Hikmatullah Perbawana Sakti Buana'
  });

  useEffect(() => {
    openGraph.updateMeta({
      title: 'Daftar Rekening Bank | Tokopedia',
      description: 'Kelola rekening bank untuk penarikan saldo Tokopedia Anda.',
      type: 'website'
    });

    analytics.logEvent('bank_accounts_view');
    gtm.pushEvent('bank_accounts_view', { user_id: profile.phone });
    criteo.pushTag({ event: 'viewBankAccounts' });
    branchService.logEvent('BANK_ACCOUNTS_VIEW', { user_id: profile.phone });

    const unsub = bankService.subscribe((accs) => setAccounts(accs));
    return unsub;
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleSaveBank = (e) => {
    e.preventDefault();
    if (!formData.accountNumber.trim()) {
      showToast('Harap masukkan nomor rekening yang valid.');
      return;
    }

    bankService.addAccount(formData);
    showToast(`Rekening ${formData.bankCode} berhasil ditambahkan!`);
    setIsAddOpen(false);
    setFormData({
      bankCode: 'BCA',
      accountNumber: '',
      accountHolder: 'Arti Hikmatullah Perbawana Sakti Buana'
    });
  };

  const handleConfirmDelete = (id, bankName) => {
    bankService.deleteAccount(id);
    showToast(`Rekening ${bankName} berhasil dihapus.`);
    setDeleteCandidate(null);
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
              <a href="/bank-accounts.html" className="active">Rekening Bank</a>
              <a href="/notifications.html">Notifikasi</a>
              <a href="#" onClick={(e) => { e.preventDefault(); showToast('Mode Tampilan Standar'); }}>Mode Tampilan</a>
              <a href="#" onClick={(e) => { e.preventDefault(); showToast('Keamanan Akun Terproteksi'); }}>Keamanan</a>
            </TabNav>

            <BodyWrapper>
              {/* Top Action Bar */}
              <TopActionBar>
                <div className="title-group">
                  <h2>Simpan rekening untuk penarikan saldo</h2>
                  <p>Saldo Tokopedia kamu bisa ditarik ke rekening ini.</p>
                </div>

                <button
                  type="button"
                  className="add-bank-btn"
                  onClick={() => setIsAddOpen(true)}
                >
                  Tambah Rekening Lain
                </button>
              </TopActionBar>

              {/* Bank Cards List */}
              <BankCardsContainer>
                {accounts.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 20px', background: '#F8F9FA', borderRadius: 8 }}>
                    <p style={{ color: '#6D7588', margin: 0 }}>Belum ada rekening bank yang tersimpan.</p>
                  </div>
                ) : (
                  accounts.map((acc) => (
                    <BankCard key={acc.id}>
                      <div className="left-side">
                        <div className="logo-box">
                          <BankLogoBadge bankCode={acc.bankCode} width={76} height={26} />
                        </div>
                        <div className="details">
                          <span className="bank-name">{acc.bankName}</span>
                          <span className="account-num">{acc.accountNumber}</span>
                          <span className="account-holder">{acc.accountHolder}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() => setDeleteCandidate(acc)}
                      >
                        Hapus
                      </button>
                    </BankCard>
                  ))
                )}
              </BankCardsContainer>
            </BodyWrapper>
          </ContentCard>
        </MainContent>
      </Container>

      {/* Add Bank Modal */}
      {isAddOpen && (
        <ModalOverlay onClick={() => setIsAddOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Tambah Rekening Bank</h3>
              <button className="close-btn" onClick={() => setIsAddOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveBank}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Pilih Bank</label>
                  <select
                    value={formData.bankCode}
                    onChange={(e) => setFormData({ ...formData, bankCode: e.target.value })}
                  >
                    <option value="BCA">BCA - PT. BCA (Bank Central Asia) Tbk</option>
                    <option value="BNI">BNI - PT. Bank Negara Indonesia (Persero)</option>
                    <option value="MANDIRI">Mandiri - PT. Bank Mandiri</option>
                    <option value="BRI">BRI - PT. Bank Rakyat Indonesia Tbk</option>
                    <option value="BSI">BSI - PT. Bank Syariah Indonesia Tbk</option>
                    <option value="CIMB">CIMB Niaga - PT. Bank CIMB Niaga Tbk</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Nomor Rekening</label>
                  <input
                    type="text"
                    placeholder="Contoh: 0083292811"
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Nama Pemilik Rekening</label>
                  <input
                    type="text"
                    value={formData.accountHolder}
                    onChange={(e) => setFormData({ ...formData, accountHolder: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setIsAddOpen(false)}>
                  Batal
                </button>
                <button type="submit" className="btn-save">
                  Simpan Rekening
                </button>
              </div>
            </form>
          </div>
        </ModalOverlay>
      )}

      {/* Delete Confirmation Modal */}
      {deleteCandidate && (
        <ModalOverlay onClick={() => setDeleteCandidate(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Hapus Rekening Bank</h3>
              <button className="close-btn" onClick={() => setDeleteCandidate(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: 14, color: '#212121', margin: 0, lineHeight: 1.5 }}>
                Apakah Anda yakin ingin menghapus rekening <strong>{deleteCandidate.bankName}</strong> ({deleteCandidate.accountNumber})?
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-cancel" onClick={() => setDeleteCandidate(null)}>
                Batal
              </button>
              <button
                type="button"
                className="btn-save"
                style={{ backgroundColor: '#FF5722' }}
                onClick={() => handleConfirmDelete(deleteCandidate.id, deleteCandidate.bankCode)}
              >
                Hapus Rekening
              </button>
            </div>
          </div>
        </ModalOverlay>
      )}

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
