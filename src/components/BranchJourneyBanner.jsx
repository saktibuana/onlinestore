import React, { useState } from 'react';
import styled from '@emotion/styled';
import { X, ExternalLink } from 'lucide-react';
import { branchService } from '../services/branch';
import { gtm } from '../services/gtm';

const BannerWrapper = styled.div`
  background: linear-gradient(90deg, #03AC0E 0%, #009624 100%);
  color: #FFFFFF;
  padding: 8px 16px;
  position: relative;
  z-index: 95;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  .mascot-badge {
    width: 32px;
    height: 32px;
    background: #FFFFFF;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    svg {
      width: 24px;
      height: 24px;
    }
  }

  .text-info {
    font-size: 13px;
    line-height: 1.3;

    strong {
      font-weight: 700;
      display: inline-block;
      margin-right: 6px;
    }
    span {
      opacity: 0.95;
    }
  }
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
`;

const OpenAppBtn = styled.button`
  background-color: #FFFFFF;
  color: #03AC0E;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.15s;

  &:hover {
    background-color: #F0F3F7;
    transform: translateY(-1px);
  }
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #FFFFFF;
  }
`;

export default function BranchJourneyBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const handleOpenApp = async () => {
    branchService.trackJourneyInteraction('CLICK_OPEN_APP', {
      source: 'web_smart_banner',
      url: window.location.href
    });

    gtm.pushEvent('branch_journey_click', {
      action: 'open_app_deep_link'
    });

    const deepLink = await branchService.createDeepLink({
      path: window.location.pathname + window.location.search,
      title: document.title,
      customData: {
        journey_id: 'tokopedia_top_journey',
        open_direct: true
      }
    });

    window.open(deepLink, '_blank');
  };

  const handleDismiss = () => {
    branchService.trackJourneyInteraction('DISMISS');
    setVisible(false);
  };

  return (
    <BannerWrapper>
      <Content>
        <LeftSide>
          <div className="mascot-badge">
            <svg viewBox="0 0 240 240" fill="none">
              <rect width="240" height="240" rx="48" fill="#03AC0E"/>
              <circle cx="95" cy="135" r="26" fill="#FFFFFF"/>
              <circle cx="98" cy="132" r="12" fill="#212121"/>
              <circle cx="145" cy="135" r="26" fill="#FFFFFF"/>
              <circle cx="148" cy="132" r="12" fill="#212121"/>
              <polygon points="120,148 112,160 128,160" fill="#FA591D"/>
            </svg>
          </div>
          <div className="text-info">
            <strong>Buka di Aplikasi Tokopedia!</strong>
            <span>Dapatkan kupon diskon s.d. 90% khusus pengguna baru aplikasi & Bebas Ongkir tanpa batas.</span>
          </div>
        </LeftSide>

        <RightSide>
          <OpenAppBtn onClick={handleOpenApp}>
            <ExternalLink size={13} /> Buka App
          </OpenAppBtn>
          <CloseBtn onClick={handleDismiss} aria-label="Tutup Banner">
            <X size={16} />
          </CloseBtn>
        </RightSide>
      </Content>
    </BannerWrapper>
  );
}
