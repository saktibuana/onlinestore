import React from 'react';
import styled from '@emotion/styled';
import { ShieldCheck, Lock, Headphones, RefreshCw } from 'lucide-react';

const FooterWrapper = styled.footer`
  background-color: #FFFFFF;
  border-top: 1px solid #E5E7EB;
  padding: 48px 0 24px;
  margin-top: 60px;
  color: #6D7588;
  font-size: 13px;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
`;

const HighlightsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  padding-bottom: 36px;
  border-bottom: 1px solid #E5E7EB;
  margin-bottom: 36px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const HighlightItem = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  .icon-box {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background-color: #EBF7ED;
    color: #03AC0E;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .text-box {
    h4 {
      font-size: 14px;
      font-weight: 700;
      color: #212121;
      margin: 0 0 2px;
    }
    p {
      font-size: 12px;
      margin: 0;
      color: #6D7588;
    }
  }
`;

const ColumnsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  margin-bottom: 36px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FooterColumn = styled.div`
  h4 {
    font-size: 14px;
    font-weight: 700;
    color: #212121;
    margin-bottom: 14px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 8px;

      a {
        color: #6D7588;
        text-decoration: none;
        transition: color 0.15s;

        &:hover {
          color: #03AC0E;
        }
      }
    }
  }
`;

const BottomBar = styled.div`
  border-top: 1px solid #E5E7EB;
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterContainer>
        <HighlightsRow>
          <HighlightItem>
            <div className="icon-box"><ShieldCheck size={24} /></div>
            <div className="text-box">
              <h4>Jaminan 100% Aman</h4>
              <p>Pembayaran diteruskan ke penjual setelah barang diterima.</p>
            </div>
          </HighlightItem>

          <HighlightItem>
            <div className="icon-box"><Lock size={24} /></div>
            <div className="text-box">
              <h4>Privasi Terjaga</h4>
              <p>Data pribadi dienkripsi dengan standar internasional.</p>
            </div>
          </HighlightItem>

          <HighlightItem>
            <div className="icon-box"><Headphones size={24} /></div>
            <div className="text-box">
              <h4>Layanan 24/7</h4>
              <p>Pusat bantuan responsif siap melayani setiap saat.</p>
            </div>
          </HighlightItem>

          <HighlightItem>
            <div className="icon-box"><RefreshCw size={24} /></div>
            <div className="text-box">
              <h4>Garansi Retur Cepat</h4>
              <p>Pengembalian barang mudah jika produk tidak sesuai.</p>
            </div>
          </HighlightItem>
        </HighlightsRow>

        <ColumnsGrid>
          <FooterColumn>
            <h4>Tokopedia</h4>
            <ul>
              <li><a href="#">Tentang Tokopedia</a></li>
              <li><a href="#">Hak Kekayaan Intelektual</a></li>
              <li><a href="#">Karir</a></li>
              <li><a href="#">Blog Tokopedia</a></li>
              <li><a href="#">Mitra Blog Tokopedia</a></li>
            </ul>
          </FooterColumn>

          <FooterColumn>
            <h4>Beli</h4>
            <ul>
              <li><a href="#">Tagihan & Top Up</a></li>
              <li><a href="#">Tokopedia COD</a></li>
              <li><a href="#">Bebas Ongkir</a></li>
              <li><a href="#">Promo Hari Ini</a></li>
              <li><a href="#">Kupon Tokopedia</a></li>
            </ul>
          </FooterColumn>

          <FooterColumn>
            <h4>Jual</h4>
            <ul>
              <li><a href="#">Pusat Edukasi Seller</a></li>
              <li><a href="#">Mitra Toppers</a></li>
              <li><a href="#">Daftar Official Store</a></li>
              <li><a href="#">Tokopedia Ads</a></li>
            </ul>
          </FooterColumn>

          <FooterColumn>
            <h4>Bantuan & Panduan</h4>
            <ul>
              <li><a href="#">Tokopedia Care</a></li>
              <li><a href="#">Syarat dan Ketentuan</a></li>
              <li><a href="#">Kebijakan Privasi</a></li>
              <li><a href="#">Mitra</a></li>
            </ul>
          </FooterColumn>
        </ColumnsGrid>

        <BottomBar>
          <div>
            © 2009 - 2026, PT Tokopedia. Dilindungi Hak Cipta. Multi-Page React Architecture.
          </div>
          <div>
            Akamai Edge CDN Enabled • PWA Ready • Branch Deep Linking
          </div>
        </BottomBar>
      </FooterContainer>
    </FooterWrapper>
  );
}
