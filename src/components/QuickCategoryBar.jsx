import React from 'react';
import styled from '@emotion/styled';
import { Grid, Zap, Gift, Tv, Shield, CreditCard, Compass, Layers } from 'lucide-react';
import { gtm } from '../services/gtm';

const BarWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto 24px;
  padding: 0 16px;
`;

const QuickRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #E5E7EB;
    border-radius: 4px;
  }
`;

const QuickPill = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid #E5E7EB;
  background-color: #FFFFFF;
  color: #212121;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.2s;

  &:hover {
    border-color: #03AC0E;
    color: #03AC0E;
    box-shadow: 0 2px 8px rgba(3, 172, 14, 0.12);
    transform: translateY(-1px);
  }

  svg {
    color: #03AC0E;
  }
`;

const pills = [
  { label: 'Kategori', icon: <Grid size={16} />, link: '/search.html' },
  { label: 'Top-Up & Tagihan', icon: <Zap size={16} />, link: '/?section=topup' },
  { label: 'Traktir & Tagihan', icon: <Gift size={16} />, link: '/search.html?promo=traktir' },
  { label: 'Elektronik', icon: <Tv size={16} />, link: '/search.html?q=Elektronik' },
  { label: 'Keuangan & Asuransi', icon: <Shield size={16} />, link: '/search.html?section=finance' },
  { label: 'Paylater & Cicilan', icon: <CreditCard size={16} />, link: '/search.html?section=paylater' },
  { label: 'Travel & Entertainment', icon: <Compass size={16} />, link: '/search.html?section=travel' },
  { label: 'Semua Promo', icon: <Layers size={16} />, link: '/search.html?promo=all' }
];

export default function QuickCategoryBar() {
  const handleClick = (pill) => {
    gtm.pushEvent('quick_pill_click', { pill_name: pill.label });
  };

  return (
    <BarWrapper>
      <QuickRow>
        {pills.map((pill, idx) => (
          <QuickPill
            key={idx}
            href={pill.link}
            onClick={() => handleClick(pill)}
          >
            {pill.icon}
            <span>{pill.label}</span>
          </QuickPill>
        ))}
      </QuickRow>
    </BarWrapper>
  );
}
