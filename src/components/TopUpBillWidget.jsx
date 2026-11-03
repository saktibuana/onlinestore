import React, { useState } from 'react';
import styled from '@emotion/styled';
import { quickBillOptions, nominalList } from '../data/products';
import { analytics } from '../services/analytics';
import { gtm } from '../services/gtm';
import { criteo } from '../services/criteo';
import { branchService } from '../services/branch';

const CardWrapper = styled.div`
  background: #FFFFFF;
  border-radius: 12px;
  border: 1px solid #E5E7EB;
  padding: 16px 20px;
  box-shadow: 0 1px 4px rgba(141, 150, 170, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;

  h3 {
    font-size: 16px;
    font-weight: 700;
    color: #212121;
    margin: 0;
  }

  a {
    font-size: 13px;
    font-weight: 600;
    color: #03AC0E;
    text-decoration: none;
    &:hover {
      color: #02980C;
    }
  }
`;

const TabsRow = styled.div`
  display: flex;
  border-bottom: 1px solid #E5E7EB;
  margin-bottom: 16px;
  gap: 16px;
`;

const TabButton = styled.button`
  background: none;
  border: none;
  padding: 8px 0;
  font-size: 14px;
  font-weight: ${(props) => (props.active ? '700' : '500')};
  color: ${(props) => (props.active ? '#03AC0E' : '#6D7588')};
  border-bottom: 2px solid ${(props) => (props.active ? '#03AC0E' : 'transparent')};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #03AC0E;
  }
`;

const FormContainer = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 12px;
  align-items: flex-end;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  label {
    font-size: 12px;
    font-weight: 600;
    color: #6D7588;
  }

  input, select {
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 14px;
    color: #212121;
    outline: none;
    background: #FFFFFF;
    transition: border-color 0.2s;

    &:focus {
      border-color: #03AC0E;
    }
  }
`;

const BuyButton = styled.button`
  background-color: ${(props) => (props.disabled ? '#E5E7EB' : '#03AC0E')};
  color: ${(props) => (props.disabled ? '#9FA6B0' : '#FFFFFF')};
  font-size: 14px;
  font-weight: 700;
  padding: 9px 24px;
  border-radius: 8px;
  border: none;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #02980C;
  }
`;

const SuccessAlert = styled.div`
  margin-top: 12px;
  background-color: #EBF7ED;
  border: 1px solid #03AC0E;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 12px;
  color: #03AC0E;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default function TopUpBillWidget() {
  const [activeTab, setActiveTab] = useState('pulsa');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedNominal, setSelectedNominal] = useState('50000');
  const [successMessage, setSuccessMessage] = useState('');

  const handleBuy = (e) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 9) {
      alert('Silakan masukkan nomor telepon yang valid (minimal 10 digit).');
      return;
    }

    const nominalObj = nominalList.find((n) => n.value === selectedNominal) || nominalList[2];
    const transactionId = 'TOPUP-' + Math.floor(100000 + Math.random() * 900000);

    // Track in GA4, GTM, Criteo, Branch
    analytics.trackPurchase({
      transactionId,
      items: [{
        id: `bill-${activeTab}-${selectedNominal}`,
        title: `${activeTab.toUpperCase()} ${nominalObj.label} (${phoneNumber})`,
        price: nominalObj.price,
        quantity: 1
      }],
      value: nominalObj.price
    });

    gtm.pushEvent('topup_bill_submit', {
      type: activeTab,
      phone: phoneNumber.substring(0, 4) + '****' + phoneNumber.slice(-3),
      nominal: nominalObj.label,
      price: nominalObj.price,
      transaction_id: transactionId
    });

    criteo.trackTransaction(transactionId, [{
      id: `topup-${activeTab}`,
      price: nominalObj.price,
      quantity: 1
    }]);

    branchService.logEvent('PURCHASE', {
      transaction_id: transactionId,
      revenue: nominalObj.price,
      currency: 'IDR'
    });

    setSuccessMessage(`Berhasil! Pesanan ${activeTab.toUpperCase()} ${nominalObj.label} sedang diproses.`);
    setTimeout(() => setSuccessMessage(''), 6000);
  };

  return (
    <CardWrapper>
      <div>
        <CardHeader>
          <h3>Top Up & Tagihan</h3>
          <a href="/search.html?section=digital">Lihat Semua</a>
        </CardHeader>

        <TabsRow>
          {quickBillOptions.map((opt) => (
            <TabButton
              key={opt.id}
              active={activeTab === opt.id}
              onClick={() => setActiveTab(opt.id)}
              type="button"
            >
              {opt.label}
            </TabButton>
          ))}
        </TabsRow>

        <FormContainer onSubmit={handleBuy}>
          <FormGroup>
            <label>Nomor Telepon</label>
            <input
              type="tel"
              placeholder="08123456789"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))}
              maxLength={14}
            />
          </FormGroup>

          <FormGroup>
            <label>Nominal</label>
            <select
              value={selectedNominal}
              onChange={(e) => setSelectedNominal(e.target.value)}
            >
              {nominalList.map((nom) => (
                <option key={nom.value} value={nom.value}>
                  {nom.label} - Rp{nom.price.toLocaleString('id-ID')}
                </option>
              ))}
            </select>
          </FormGroup>

          <BuyButton
            type="submit"
            disabled={!phoneNumber || phoneNumber.length < 9}
          >
            Beli
          </BuyButton>
        </FormContainer>
      </div>

      {successMessage && (
        <SuccessAlert>
          <span>{successMessage}</span>
          <button
            onClick={() => setSuccessMessage('')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#03AC0E' }}
          >
            ✕
          </button>
        </SuccessAlert>
      )}
    </CardWrapper>
  );
}
