import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProfileSidebar from '../components/ProfileSidebar';
import loadable from '../utils/loadable';
import { User, Lock, Fingerprint, Check, ShieldCheck, X } from 'lucide-react';
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

const CardBody = styled.div`
  padding: 24px;
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const PhotoColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  .photo-frame {
    width: 200px;
    height: 240px;
    border-radius: 8px;
    overflow: hidden;
    background: #F8F9FA;
    border: 1px solid #E5E7EB;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  button.choose-btn {
    width: 100%;
    background: #FFFFFF;
    border: 1px solid #D6D9E0;
    border-radius: 8px;
    padding: 10px;
    font-size: 13px;
    font-weight: 700;
    color: #212121;
    cursor: pointer;
    transition: background-color 0.15s, border-color 0.15s;

    &:hover {
      background-color: #F8F9FA;
      border-color: #03AC0E;
      color: #03AC0E;
    }
  }

  .file-hint {
    font-size: 11px;
    color: #6D7588;
    line-height: 1.5;
    text-align: left;
    width: 100%;
  }

  .security-btn-group {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 8px;

    button.sec-btn {
      width: 100%;
      background: #FFFFFF;
      border: 1px solid #E5E7EB;
      border-radius: 8px;
      padding: 10px 14px;
      font-size: 13px;
      font-weight: 700;
      color: #212121;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
      transition: background-color 0.15s, border-color 0.15s;

      &:hover {
        background-color: #F8F9FA;
        border-color: #03AC0E;
        color: #03AC0E;
      }
    }
  }
`;

const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;

  .section-block {
    display: flex;
    flex-direction: column;
    gap: 16px;

    h4 {
      font-size: 14px;
      font-weight: 700;
      color: #212121;
      margin: 0;
    }

    .info-row {
      display: grid;
      grid-template-columns: 140px 1fr auto;
      align-items: center;
      gap: 12px;
      font-size: 13px;

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
        gap: 6px;
      }

      .label {
        color: #6D7588;
      }

      .value-group {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #212121;
        font-weight: 600;

        .verified-badge {
          background: #EBF7ED;
          color: #03AC0E;
          font-size: 11px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 4px;
        }
      }

      button.edit-btn {
        background: none;
        border: none;
        color: #03AC0E;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
        padding: 4px 8px;
        border-radius: 4px;

        &:hover {
          background-color: #EBF7ED;
        }
      }
    }
  }

  .safe-mode-block {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-top: 16px;
    border-top: 1px solid #F0F3F7;

    h4 {
      font-size: 14px;
      font-weight: 700;
      color: #212121;
      margin: 0;
    }

    p.desc {
      font-size: 12px;
      color: #6D7588;
      line-height: 1.5;
      margin: 0;
    }

    .toggle-row {
      display: flex;
      align-items: center;
      gap: 24px;
      margin-top: 4px;

      span.toggle-label {
        font-size: 13px;
        color: #212121;
        font-weight: 600;
      }

      /* Custom iOS/Tokopedia Switch */
      .switch {
        position: relative;
        display: inline-block;
        width: 44px;
        height: 24px;

        input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: #D6D9E0;
          transition: 0.2s;
          border-radius: 24px;

          &:before {
            position: absolute;
            content: "";
            height: 18px;
            width: 18px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            transition: 0.2s;
            border-radius: 50%;
            box-shadow: 0 1px 3px rgba(0,0,0,0.2);
          }
        }

        input:checked + .slider {
          background-color: #03AC0E;
        }

        input:checked + .slider:before {
          transform: translateX(20px);
        }
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
    max-width: 440px;
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
      gap: 14px;

      label {
        font-size: 12px;
        font-weight: 600;
        color: #6D7588;
      }

      input, select {
        width: 100%;
        border: 1px solid #E5E7EB;
        border-radius: 8px;
        padding: 10px 12px;
        font-size: 14px;
        color: #212121;
        outline: none;

        &:focus {
          border-color: #03AC0E;
        }
      }
    }

    .modal-footer {
      padding: 12px 20px 16px;
      display: flex;
      justify-content: flex-end;
      gap: 10px;

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

export default function Profile() {
  const [profile, setProfile] = useState(userService.getProfile());
  const [editModal, setEditModal] = useState(null); // 'nama', 'birthDate', 'gender', 'email', 'phone', 'password', 'pin', 'instant'
  const [tempValue, setTempValue] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    openGraph.updateMeta({
      title: 'Biodata Diri | Tokopedia',
      description: 'Atur biodata akun Tokopedia Anda dengan mudah dan aman.',
      type: 'profile'
    });

    analytics.logEvent('profile_view', {
      user_id: profile.phone,
      user_name: profile.name
    });

    gtm.pushEvent('profile_biodata_view', {
      user_name: profile.name,
      verified_status: true
    });

    criteo.pushTag({ event: 'viewProfile' });
    branchService.logEvent('PROFILE_VIEW', { user_id: profile.phone });

    const unsub = userService.subscribe((p) => setProfile(p));
    return unsub;
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleOpenEdit = (field, currentVal) => {
    setEditModal(field);
    setTempValue(currentVal || '');
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editModal) return;

    if (editModal === 'nama') {
      userService.updateProfile({ name: tempValue, displayName: tempValue.split(' ')[0] });
      showToast('Nama berhasil diubah!');
    } else if (editModal === 'birthDate') {
      userService.updateProfile({ birthDate: tempValue });
      showToast('Tanggal lahir berhasil disimpan!');
    } else if (editModal === 'gender') {
      userService.updateProfile({ gender: tempValue });
      showToast('Jenis kelamin berhasil diperbarui!');
    } else if (editModal === 'email') {
      userService.updateProfile({ email: tempValue });
      showToast('Email kontak berhasil diperbarui!');
    } else if (editModal === 'phone') {
      userService.updateProfile({ phone: tempValue });
      showToast('Nomor HP berhasil diperbarui!');
    } else if (editModal === 'password') {
      showToast('Kata sandi berhasil diperbarui dengan aman!');
    } else if (editModal === 'pin') {
      showToast('PIN Tokopedia Anda aktif dan terlindungi!');
    } else if (editModal === 'instant') {
      showToast('Verifikasi Instan biometrik berhasil diverifikasi!');
    }

    gtm.pushEvent('profile_update', { field: editModal });
    setEditModal(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('Ukuran file melebihi 10 MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result;
        if (typeof dataUrl === 'string') {
          userService.updateAvatar(dataUrl);
          showToast('Foto profil berhasil diunggah!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSafeModeToggle = () => {
    const updated = userService.toggleSafeMode();
    showToast(updated.safeMode ? 'Safe Mode Aktif!' : 'Safe Mode Dinonaktifkan.');
    gtm.pushEvent('safe_mode_toggled', { safe_mode: updated.safeMode });
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
            {/* Top Navigation Tabs */}
            <TabNav>
              <a href="/profile.html" className="active">Biodata Diri</a>
              <a href="/address.html">Daftar Alamat</a>
              <a href="/payment-settings.html">Pembayaran</a>
              <a href="/bank-accounts.html">Rekening Bank</a>
              <a href="/notifications.html">Notifikasi</a>
              <a href="#" onClick={(e) => { e.preventDefault(); showToast('Mode Tampilan Standar'); }}>Mode Tampilan</a>
              <a href="#" onClick={(e) => { e.preventDefault(); showToast('Keamanan Akun Terproteksi'); }}>Keamanan</a>
            </TabNav>

            <CardBody>
              {/* Left Column: Avatar & Security Actions */}
              <PhotoColumn>
                <div className="photo-frame">
                  <img src={profile.avatar || "/images/profile-sakti.jpg"} alt={profile.name} />
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />
                <button
                  type="button"
                  className="choose-btn"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Pilih Foto
                </button>

                <div className="file-hint">
                  Besar file: maksimum 10.000.000 bytes (10 Megabytes). Ekstensi file yang diperbolehkan: .JPG .JPEG .PNG
                </div>

                <div className="security-btn-group">
                  <button
                    type="button"
                    className="sec-btn"
                    onClick={() => handleOpenEdit('password', '')}
                  >
                    Ubah Kata Sandi
                  </button>

                  <button
                    type="button"
                    className="sec-btn"
                    onClick={() => handleOpenEdit('pin', '')}
                  >
                    <Lock size={15} color="#6D7588" />
                    <span>PIN Tokopedia</span>
                  </button>

                  <button
                    type="button"
                    className="sec-btn"
                    onClick={() => handleOpenEdit('instant', '')}
                  >
                    <Fingerprint size={16} color="#6D7588" />
                    <span>Verifikasi Instan</span>
                  </button>
                </div>
              </PhotoColumn>

              {/* Right Column: Biodata Diri & Contact Details */}
              <FormColumn>
                {/* Ubah Biodata Diri */}
                <div className="section-block">
                  <h4>Ubah Biodata Diri</h4>

                  <div className="info-row">
                    <span className="label">Nama</span>
                    <div className="value-group">
                      <span>{profile.name}</span>
                    </div>
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() => handleOpenEdit('nama', profile.name)}
                    >
                      Ubah
                    </button>
                  </div>

                  <div className="info-row">
                    <span className="label">Tanggal Lahir</span>
                    <div className="value-group">
                      <span>{profile.birthDate}</span>
                    </div>
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() => handleOpenEdit('birthDate', profile.birthDate)}
                    >
                      Ubah Tanggal Lahir
                    </button>
                  </div>

                  <div className="info-row">
                    <span className="label">Jenis Kelamin</span>
                    <div className="value-group">
                      <span>{profile.gender}</span>
                    </div>
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() => handleOpenEdit('gender', profile.gender)}
                    >
                      Ubah
                    </button>
                  </div>
                </div>

                {/* Ubah Kontak */}
                <div className="section-block">
                  <h4>Ubah Kontak</h4>

                  <div className="info-row">
                    <span className="label">Email</span>
                    <div className="value-group">
                      <span>{profile.email}</span>
                      {profile.isEmailVerified && (
                        <span className="verified-badge">Terverifikasi</span>
                      )}
                    </div>
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() => handleOpenEdit('email', profile.email)}
                    >
                      Ubah
                    </button>
                  </div>

                  <div className="info-row">
                    <span className="label">Nomor HP</span>
                    <div className="value-group">
                      <span>{profile.phone}</span>
                      {profile.isPhoneVerified && (
                        <span className="verified-badge">Terverifikasi</span>
                      )}
                    </div>
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() => handleOpenEdit('phone', profile.phone)}
                    >
                      Ubah
                    </button>
                  </div>
                </div>

                {/* Safe Mode */}
                <div className="safe-mode-block">
                  <h4>Safe Mode</h4>
                  <p className="desc">
                    Fitur ini akan otomatis menyaring hasil pencarian sesuai kebijakan dan batasan usia pengguna
                  </p>

                  <div className="toggle-row">
                    <span className="toggle-label">Aktifkan</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={profile.safeMode}
                        onChange={handleSafeModeToggle}
                      />
                      <span className="slider" />
                    </label>
                  </div>
                </div>
              </FormColumn>
            </CardBody>
          </ContentCard>
        </MainContent>
      </Container>

      {/* Edit Modal */}
      {editModal && (
        <ModalOverlay onClick={() => setEditModal(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                {editModal === 'nama' && 'Ubah Nama'}
                {editModal === 'birthDate' && 'Ubah Tanggal Lahir'}
                {editModal === 'gender' && 'Ubah Jenis Kelamin'}
                {editModal === 'email' && 'Ubah Email Kontak'}
                {editModal === 'phone' && 'Ubah Nomor HP'}
                {editModal === 'password' && 'Ubah Kata Sandi'}
                {editModal === 'pin' && 'Atur PIN Tokopedia'}
                {editModal === 'instant' && 'Aktivasi Verifikasi Instan'}
              </h3>
              <button className="close-btn" onClick={() => setEditModal(null)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit}>
              <div className="modal-body">
                {editModal === 'gender' ? (
                  <>
                    <label>Pilih Jenis Kelamin</label>
                    <select value={tempValue} onChange={(e) => setTempValue(e.target.value)}>
                      <option value="Pria">Pria</option>
                      <option value="Wanita">Wanita</option>
                    </select>
                  </>
                ) : editModal === 'password' ? (
                  <>
                    <label>Masukkan Kata Sandi Baru</label>
                    <input
                      type="password"
                      placeholder="Minimal 8 karakter kombinasi huruf dan angka"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      required
                    />
                  </>
                ) : editModal === 'pin' ? (
                  <>
                    <label>Masukkan 6 Digit PIN Tokopedia</label>
                    <input
                      type="password"
                      maxLength={6}
                      placeholder="6 angka rahasia"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      required
                    />
                  </>
                ) : editModal === 'instant' ? (
                  <p style={{ fontSize: 13, color: '#6D7588', margin: 0 }}>
                    Gunakan biometrik perangkat (sidik jari / Face ID) untuk login dan verifikasi transaksi tanpa kata sandi.
                  </p>
                ) : (
                  <>
                    <label>Nilai Baru</label>
                    <input
                      type="text"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      required
                    />
                  </>
                )}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setEditModal(null)}>
                  Batal
                </button>
                <button type="submit" className="btn-save">
                  Simpan
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
