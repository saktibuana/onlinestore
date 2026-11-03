import React, { useState, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProfileSidebar from '../components/ProfileSidebar';
import loadable from '../utils/loadable';
import { User, Search, Plus, MapPin, Check, X, Trash2, Edit3, ShieldCheck } from 'lucide-react';
import { addressService } from '../services/addressService';
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

const AddressBody = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SearchAddBar = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;

  @media (max-width: 680px) {
    flex-direction: column;
  }

  .search-box {
    flex: 1;
    display: flex;
    align-items: center;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    padding: 8px 12px;
    background: #FFFFFF;
    transition: border-color 0.15s;

    &:focus-within {
      border-color: #03AC0E;
    }

    input {
      border: none;
      outline: none;
      width: 100%;
      margin-left: 8px;
      font-size: 13px;
      color: #212121;

      &::placeholder {
        color: #9FA6B0;
      }
    }
  }

  button.add-btn {
    background-color: #03AC0E;
    color: #FFFFFF;
    border: none;
    border-radius: 8px;
    padding: 10px 18px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
    transition: background-color 0.15s;

    &:hover {
      background-color: #02980C;
    }
  }
`;

const AddressCard = styled.div`
  border: 1px solid ${(props) => (props.selected ? '#03AC0E' : '#E5E7EB')};
  background-color: ${(props) => (props.selected ? '#F6FCF7' : '#FFFFFF')};
  border-radius: 10px;
  padding: 18px 20px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  position: relative;
  transition: border-color 0.15s, background-color 0.15s;

  .card-left {
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;

    .title-row {
      display: flex;
      align-items: center;
      gap: 8px;

      h4.addr-title {
        font-size: 14px;
        font-weight: 700;
        color: #212121;
        margin: 0;
      }

      span.primary-badge {
        background: #E5E7EB;
        color: #6D7588;
        font-size: 11px;
        font-weight: 700;
        padding: 2px 6px;
        border-radius: 4px;
      }
    }

    .recipient-name {
      font-size: 14px;
      font-weight: 700;
      color: #212121;
      margin-top: 2px;
    }

    .phone-text {
      font-size: 13px;
      color: #6D7588;
    }

    .full-address {
      font-size: 13px;
      color: #6D7588;
      line-height: 1.5;
      margin-top: 2px;
    }

    .pinpoint-row {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: #03AC0E;
      font-weight: 600;
      margin: 4px 0 8px;
    }

    .action-links {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-top: 4px;

      button.link-btn {
        background: none;
        border: none;
        color: #03AC0E;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
        padding: 0;

        &:hover {
          text-decoration: underline;
        }

        &.delete {
          color: #FF5722;
        }
      }
    }
  }

  .card-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-width: 100px;

    .check-icon {
      color: #03AC0E;
      width: 24px;
      height: 24px;
    }

    button.select-btn {
      background-color: #03AC0E;
      color: #FFFFFF;
      border: none;
      border-radius: 8px;
      padding: 8px 24px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      transition: background-color 0.15s;

      &:hover {
        background-color: #02980C;
      }
    }
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;

  .modal-box {
    background: #FFFFFF;
    border-radius: 12px;
    width: 100%;
    max-width: 500px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    overflow: hidden;

    .modal-header {
      padding: 16px 20px;
      border-bottom: 1px solid #E5E7EB;
      display: flex;
      align-items: center;
      justify-content: space-between;

      h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 700;
        color: #212121;
      }

      button.close-btn {
        background: none;
        border: none;
        cursor: pointer;
        color: #6D7588;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover { color: #212121; }
      }
    }

    .modal-body {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-height: 75vh;
      overflow-y: auto;

      .form-group {
        display: flex;
        flex-direction: column;
        gap: 6px;

        label {
          font-size: 12px;
          font-weight: 600;
          color: #6D7588;
        }

        input, textarea {
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          padding: 10px 12px;
          font-size: 13px;
          color: #212121;
          outline: none;

          &:focus {
            border-color: #03AC0E;
          }
        }

        textarea {
          resize: vertical;
          min-height: 70px;
        }
      }

      .checkbox-row {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 4px;

        input[type="checkbox"] {
          accent-color: #03AC0E;
          width: 16px;
          height: 16px;
        }

        label {
          font-size: 13px;
          font-weight: 600;
          color: #212121;
          cursor: pointer;
        }
      }
    }

    .modal-footer {
      padding: 14px 20px;
      border-top: 1px solid #F0F3F7;
      display: flex;
      justify-content: flex-end;
      gap: 10px;

      button.btn-cancel {
        background: none;
        border: 1px solid #E5E7EB;
        border-radius: 8px;
        padding: 8px 18px;
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
        padding: 8px 24px;
        font-size: 13px;
        font-weight: 700;
        color: #FFFFFF;
        cursor: pointer;
        &:hover { background-color: #02980C; }
      }
    }
  }
`;

export default function Address() {
  const [addresses, setAddresses] = useState(addressService.getAddresses());
  const [selectedAddress, setSelectedAddress] = useState(addressService.getSelectedAddress());
  const [searchQuery, setSearchQuery] = useState('');
  const [modalMode, setModalMode] = useState(null); // 'add' | 'edit'
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    recipient: '',
    phone: '',
    fullAddress: '',
    isPrimary: false
  });
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    openGraph.updateMeta({
      title: 'Daftar Alamat Pengiriman | Tokopedia',
      description: 'Kelola alamat pengiriman Tokopedia Anda untuk kemudahan belanja dan Bebas Ongkir.',
      type: 'website'
    });

    analytics.logEvent('address_management_view', {
      address_count: addresses.length
    });

    gtm.pushEvent('address_view', {
      total_addresses: addresses.length
    });

    criteo.pushTag({ event: 'viewAddressList' });
    branchService.logEvent('ADDRESS_VIEW', { count: addresses.length });

    const unsub = addressService.subscribe(({ addresses: newAddrs, selectedAddress: newSelected }) => {
      setAddresses(newAddrs);
      setSelectedAddress(newSelected);
    });
    return unsub;
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const filteredAddresses = useMemo(() => {
    if (!searchQuery.trim()) return addresses;
    const q = searchQuery.toLowerCase();
    return addresses.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.recipient.toLowerCase().includes(q) ||
        a.fullAddress.toLowerCase().includes(q)
    );
  }, [addresses, searchQuery]);

  const handleSelect = (id) => {
    addressService.selectAddress(id);
    const chosen = addresses.find((a) => a.id === id);
    showToast(`Alamat pengiriman diubah ke: ${chosen?.title || ''}`);
    gtm.pushEvent('address_selected', { address_id: id });
  };

  const handleSetPrimary = (id) => {
    addressService.setPrimaryAddress(id);
    showToast('Alamat utama berhasil diperbarui!');
    gtm.pushEvent('address_set_primary', { address_id: id });
  };

  const handleDelete = (id, title) => {
    if (confirm(`Yakin ingin menghapus alamat "${title}"?`)) {
      addressService.deleteAddress(id);
      showToast('Alamat berhasil dihapus.');
      gtm.pushEvent('address_deleted', { address_id: id });
    }
  };

  const handleOpenAdd = () => {
    setModalMode('add');
    setEditingId(null);
    setFormData({
      title: '',
      recipient: 'Hikmatullah Sakti Buana',
      phone: '6285720502217',
      fullAddress: '',
      isPrimary: false
    });
  };

  const handleOpenEdit = (addr) => {
    setModalMode('edit');
    setEditingId(addr.id);
    setFormData({
      title: addr.title,
      recipient: addr.recipient,
      phone: addr.phone,
      fullAddress: addr.fullAddress,
      isPrimary: addr.isPrimary
    });
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.recipient || !formData.phone || !formData.fullAddress) {
      showToast('Harap lengkapi semua kolom wajib.');
      return;
    }

    if (modalMode === 'add') {
      addressService.addAddress(formData);
      showToast('Alamat baru berhasil ditambahkan!');
      gtm.pushEvent('address_added', { title: formData.title });
    } else if (modalMode === 'edit' && editingId) {
      addressService.updateAddress(editingId, formData);
      showToast('Alamat berhasil diperbarui!');
      gtm.pushEvent('address_updated', { address_id: editingId });
    }

    setModalMode(null);
  };

  return (
    <div>
      <Header />

      <Container>
        {/* Left Profile Sidebar */}
        <ProfileSidebar activeNav="pengaturan" />

        {/* Main Address Management Content */}
        <MainContent>
          <ProfileTitle>
            <User size={20} color="#212121" />
            <span>Sakti</span>
          </ProfileTitle>

          <ContentCard>
            {/* Top Navigation Tabs */}
            <TabNav>
              <a href="/profile.html">Biodata Diri</a>
              <a href="/address.html" className="active">Daftar Alamat</a>
              <a href="/payment-settings.html">Pembayaran</a>
              <a href="/bank-accounts.html">Rekening Bank</a>
              <a href="/notifications.html">Notifikasi</a>
              <a href="#" onClick={(e) => { e.preventDefault(); showToast('Mode Tampilan Standar'); }}>Mode Tampilan</a>
              <a href="#" onClick={(e) => { e.preventDefault(); showToast('Keamanan Akun Terproteksi'); }}>Keamanan</a>
            </TabNav>

            <AddressBody>
              {/* Search & Add Address Bar */}
              <SearchAddBar>
                <div className="search-box">
                  <Search size={18} color="#9FA6B0" />
                  <input
                    type="text"
                    placeholder="Tulis Nama Alamat / Kota / Kecamatan tujuan pengiriman"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9FA6B0' }}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                <button type="button" className="add-btn" onClick={handleOpenAdd}>
                  <Plus size={16} />
                  <span>Tambah Alamat Baru</span>
                </button>
              </SearchAddBar>

              {/* Address Cards List */}
              {filteredAddresses.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', background: '#F8F9FA', borderRadius: 8 }}>
                  <p style={{ color: '#6D7588', margin: 0 }}>Tidak ada alamat yang cocok dengan pencarian "{searchQuery}"</p>
                </div>
              ) : (
                filteredAddresses.map((addr) => {
                  const isSelected = selectedAddress?.id === addr.id;
                  return (
                    <AddressCard key={addr.id} selected={isSelected}>
                      <div className="card-left">
                        <div className="title-row">
                          <h4 className="addr-title">{addr.title}</h4>
                          {addr.isPrimary && (
                            <span className="primary-badge">Utama</span>
                          )}
                        </div>

                        <div className="recipient-name">{addr.recipient}</div>
                        <div className="phone-text">{addr.phone}</div>
                        <div className="full-address">{addr.fullAddress}</div>

                        <div className="pinpoint-row">
                          <MapPin size={14} />
                          <span>Sudah Pinpoint</span>
                        </div>

                        <div className="action-links">
                          <button
                            type="button"
                            className="link-btn"
                            onClick={() => handleOpenEdit(addr)}
                          >
                            Ubah Alamat
                          </button>

                          {!addr.isPrimary && (
                            <button
                              type="button"
                              className="link-btn"
                              onClick={() => handleSetPrimary(addr.id)}
                            >
                              Jadikan Alamat Utama
                            </button>
                          )}

                          <button
                            type="button"
                            className="link-btn delete"
                            onClick={() => handleDelete(addr.id, addr.title)}
                          >
                            Hapus
                          </button>
                        </div>
                      </div>

                      <div className="card-right">
                        {isSelected ? (
                          <Check className="check-icon" strokeWidth={3} />
                        ) : (
                          <button
                            type="button"
                            className="select-btn"
                            onClick={() => handleSelect(addr.id)}
                          >
                            Pilih
                          </button>
                        )}
                      </div>
                    </AddressCard>
                  );
                })
              )}
            </AddressBody>
          </ContentCard>
        </MainContent>
      </Container>

      {/* Add / Edit Address Modal */}
      {modalMode && (
        <ModalOverlay onClick={() => setModalMode(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modalMode === 'add' ? 'Tambah Alamat Baru' : 'Ubah Alamat'}</h3>
              <button className="close-btn" onClick={() => setModalMode(null)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveModal}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Label Alamat (Contoh: Rumah, Kantor, Sekolah)</label>
                  <input
                    type="text"
                    placeholder="Contoh: Gedung SD At Tibyan BQS"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Nama Penerima</label>
                  <input
                    type="text"
                    value={formData.recipient}
                    onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Nomor HP Penerima</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Alamat Lengkap</label>
                  <textarea
                    placeholder="Nama Jalan, Nomor Bangunan, RT/RW, Kecamatan, Kota, Kode Pos"
                    value={formData.fullAddress}
                    onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
                    required
                  />
                </div>

                <div className="checkbox-row">
                  <input
                    type="checkbox"
                    id="isPrimaryCheck"
                    checked={formData.isPrimary}
                    onChange={(e) => setFormData({ ...formData, isPrimary: e.target.checked })}
                  />
                  <label htmlFor="isPrimaryCheck">Jadikan sebagai alamat utama</label>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setModalMode(null)}>
                  Batal
                </button>
                <button type="submit" className="btn-save">
                  Simpan Alamat
                </button>
              </div>
            </form>
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
