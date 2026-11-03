import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Download, X } from 'lucide-react';
import { gtm } from '../services/gtm';

const BannerPill = styled.div`
  position: fixed;
  bottom: 24px;
  left: 24px;
  z-index: 120;
  background: #FFFFFF;
  border: 1px solid #03AC0E;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(3, 172, 14, 0.2);
  padding: 12px 18px;
  display: flex;
  align-items: center;
  gap: 16px;
  max-width: 440px;
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @media (max-width: 640px) {
    left: 16px;
    right: 16px;
    max-width: none;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  strong {
    font-size: 13px;
    color: #212121;
  }

  span {
    font-size: 11px;
    color: #6D7588;
  }
`;

const InstallBtn = styled.button`
  background-color: #03AC0E;
  color: #FFFFFF;
  border: none;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    background-color: #02980C;
  }
`;

const DismissBtn = styled.button`
  background: none;
  border: none;
  color: #9FA6B0;
  cursor: pointer;
  padding: 4px;

  &:hover {
    color: #212121;
  }
`;

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      gtm.pushEvent('pwa_install_prompt_outcome', { outcome: choiceResult.outcome });
      setDeferredPrompt(null);
    } else {
      alert('PWA siap dipasang! Jika browser mendukung, gunakan menu browser -> "Install Tokopedia".');
    }
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <BannerPill>
      <div style={{ width: 32, height: 32, flexShrink: 0 }}>
        <svg viewBox="0 0 240 240" fill="none">
          <rect width="240" height="240" rx="48" fill="#03AC0E"/>
          <circle cx="95" cy="135" r="26" fill="#FFFFFF"/>
          <circle cx="98" cy="132" r="12" fill="#212121"/>
          <circle cx="145" cy="135" r="26" fill="#FFFFFF"/>
          <circle cx="148" cy="132" r="12" fill="#212121"/>
          <polygon points="120,148 112,160 128,160" fill="#FA591D"/>
        </svg>
      </div>

      <Content>
        <strong>Install Web App Tokopedia</strong>
        <span>Akses belanja instan & hemat kuota langsung dari desktop/HP Anda.</span>
      </Content>

      <InstallBtn onClick={handleInstall}>
        <Download size={13} /> Pasang
      </InstallBtn>

      <DismissBtn onClick={() => setDismissed(true)} aria-label="Tutup">
        <X size={16} />
      </DismissBtn>
    </BannerPill>
  );
}
