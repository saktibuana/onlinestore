import React from 'react';
import styled from '@emotion/styled';

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
`;

const PromoGraphicTile = styled.div`
  background: linear-gradient(135deg, #03AC0E 0%, #00C853 100%);
  border-radius: 10px;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #FFFFFF;
  margin-bottom: 14px;
  cursor: pointer;
  transition: transform 0.15s;

  &:hover {
    transform: translateY(-2px);
  }

  .text-content {
    max-width: 65%;
    font-size: 13px;
    font-weight: 600;
    line-height: 1.4;
  }

  .mascot-mini {
    width: 64px;
    height: 52px;
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

const CategoryTile = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  text-decoration: none;
  padding: 8px 4px;
  border-radius: 8px;
  border: 1px solid #F0F3F7;
  transition: all 0.2s;

  &:hover {
    border-color: #03AC0E;
    box-shadow: 0 2px 8px rgba(3, 172, 14, 0.15);
    transform: translateY(-2px);
  }

  img {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 6px;
  }

  span {
    font-size: 12px;
    font-weight: 600;
    color: #212121;
    line-height: 1.2;
  }
`;

const popularList = [
  {
    title: 'Meja Lipat',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=100&h=100&fit=crop',
    link: '/search.html?q=Meja%20Lipat'
  },
  {
    title: 'Kaos Distro',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=100&h=100&fit=crop',
    link: '/search.html?q=Kaos%20Distro'
  },
  {
    title: 'Headset RGB',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
    link: '/search.html?q=Headset'
  },
  {
    title: 'Smart Watch',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
    link: '/search.html?q=Smart%20Watch'
  }
];

export default function PopularCategories() {
  return (
    <CardWrapper>
      <div>
        <CardHeader>
          <h3>Kategori Populer</h3>
        </CardHeader>

        <PromoGraphicTile onClick={() => window.location.href = '/search.html?promo=populer'}>
          <div className="text-content">
            Pilih kebutuhan harianmu dengan jaminan harga termurah & bebas ongkir!
          </div>
          <div className="mascot-mini">
            <svg viewBox="0 0 80 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="32" r="28" fill="#FFFFFF" fillOpacity="0.2"/>
              <ellipse cx="40" cy="38" rx="22" ry="20" fill="#FFFFFF"/>
              <circle cx="32" cy="34" r="7" fill="#03AC0E"/>
              <circle cx="33" cy="34" r="3" fill="#212121"/>
              <circle cx="48" cy="34" r="7" fill="#03AC0E"/>
              <circle cx="49" cy="34" r="3" fill="#212121"/>
              <polygon points="40,40 36,46 44,46" fill="#FA591D"/>
            </svg>
          </div>
        </PromoGraphicTile>
      </div>

      <CategoryGrid>
        {popularList.map((item, idx) => (
          <CategoryTile key={idx} href={item.link}>
            <img src={item.image} alt={item.title} loading="lazy" />
            <span>{item.title}</span>
          </CategoryTile>
        ))}
      </CategoryGrid>
    </CardWrapper>
  );
}
