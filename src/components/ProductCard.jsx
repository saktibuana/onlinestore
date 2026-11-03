import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Star, Truck, ShoppingBag, Eye, CheckCircle2 } from 'lucide-react';
import { akamai } from '../services/akamai';
import { analytics } from '../services/analytics';
import { gtm } from '../services/gtm';
import { cartService } from '../services/cartService';

const CardContainer = styled.div`
  background: #FFFFFF;
  border-radius: 9px;
  border: 1px solid #E5E7EB;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 18px rgba(141, 150, 170, 0.3);
    border-color: #03AC0E;

    .hover-actions {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%; /* 1:1 Aspect Ratio */
  background-color: #F8F9FA;
  overflow: hidden;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }

  ${CardContainer}:hover img {
    transform: scale(1.04);
  }
`;

const ContentWrapper = styled.div`
  padding: 10px 12px 14px;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`;

const Title = styled.h4`
  font-size: 13px;
  font-weight: 500;
  color: #212121;
  line-height: 1.4;
  margin: 0 0 6px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 36px;
`;

const PriceRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 6px;

  .price {
    font-size: 15px;
    font-weight: 700;
    color: #212121;
  }
`;

const DiscountRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;

  .badge-disc {
    background-color: #FFEBE8;
    color: #FF5722;
    font-weight: 700;
    padding: 1px 4px;
    border-radius: 4px;
  }

  .original-price {
    color: #9FA6B0;
    text-decoration: line-through;
  }
`;

const FreeShippingBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background-color: #E5F9F6;
  color: #008B7A;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  width: fit-content;
  margin-bottom: 6px;
`;

const ShopLocationRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: #6D7588;
  margin-bottom: 6px;

  .badge-icon {
    display: inline-flex;
    align-items: center;
  }

  .city {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: #6D7588;

  .star-icon {
    color: #FFC400;
    fill: #FFC400;
  }

  .rating-num {
    font-weight: 700;
    color: #212121;
  }

  .sold-num {
    color: #6D7588;
  }
`;

const HoverActions = styled.div`
  position: absolute;
  bottom: 12px;
  left: 12px;
  right: 12px;
  display: flex;
  gap: 6px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s, visibility 0.2s;
  z-index: 10;

  button {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    font-size: 11px;
    font-weight: 700;
    padding: 7px 6px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    transition: background-color 0.15s;
  }

  .add-cart-btn {
    background-color: #03AC0E;
    color: #FFFFFF;
    &:hover {
      background-color: #02980C;
    }
  }

  .quick-view-btn {
    background-color: #FFFFFF;
    color: #212121;
    border: 1px solid #E5E7EB;
    &:hover {
      border-color: #03AC0E;
      color: #03AC0E;
    }
  }
`;

const AdBadge = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: rgba(33, 33, 33, 0.65);
  color: #FFFFFF;
  font-size: 10px;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 4px;
  z-index: 2;
  letter-spacing: 0.5px;
`;

export default function ProductCard({ product, onQuickView, isAd = false }) {
  const [added, setAdded] = useState(false);

  // Akamai Image Manager URL transformation
  const optimizedImage = akamai.transformImageUrl(product.image, {
    width: 320,
    quality: 85,
    format: 'webp'
  });

  const handleCardClick = (e) => {
    // If clicked from hover buttons, don't trigger navigation
    if (e.target.closest('.hover-actions')) return;

    // Track in GA4, GTM, Akamai
    analytics.trackSelectItem(product);
    gtm.pushEvent('product_click', {
      product_id: product.id,
      title: product.title,
      price: product.price
    });
    akamai.recordEdgeRequest(`/products/${product.slug}`);

    // Multi-Page Application navigation to PDP
    window.location.href = `/pdp.html?id=${product.id}`;
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    cartService.addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleQuickViewClick = (e) => {
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  return (
    <CardContainer onClick={handleCardClick}>
      <ImageWrapper>
        {isAd && <AdBadge>Ad</AdBadge>}
        <img
          src={optimizedImage}
          alt={product.title}
          loading="lazy"
          onError={(e) => {
            // Fallback placeholder
            e.target.src = '/icons/tokopedia-logo.svg';
          }}
        />
      </ImageWrapper>

      <ContentWrapper>
        <div>
          <Title title={product.title}>{product.title}</Title>

          <PriceRow>
            <div className="price">Rp{product.price.toLocaleString('id-ID')}</div>
            {product.discountPercent > 0 && (
              <DiscountRow>
                <span className="badge-disc">{product.discountPercent}%</span>
                <span className="original-price">
                  Rp{product.originalPrice.toLocaleString('id-ID')}
                </span>
              </DiscountRow>
            )}
          </PriceRow>

          {product.hasFreeShipping && (
            <FreeShippingBadge>
              <Truck size={12} /> Bebas Ongkir
            </FreeShippingBadge>
          )}

          <ShopLocationRow>
            <span className="badge-icon">
              {product.shop?.isOfficial ? (
                <span style={{ color: '#4F3582', fontWeight: 800 }}>★</span>
              ) : (
                <CheckCircle2 size={12} color="#03AC0E" />
              )}
            </span>
            <span className="city">{product.shop?.location}</span>
          </ShopLocationRow>
        </div>

        <RatingRow>
          <Star size={12} className="star-icon" />
          <span className="rating-num">{product.rating}</span>
          <span>|</span>
          <span className="sold-num">Terjual {product.soldCount}</span>
        </RatingRow>
      </ContentWrapper>

      <HoverActions className="hover-actions">
        <button
          type="button"
          className="add-cart-btn"
          onClick={handleQuickAdd}
        >
          <ShoppingBag size={13} /> {added ? '✓ Ditambah' : '+ Keranjang'}
        </button>
        <button
          type="button"
          className="quick-view-btn"
          onClick={handleQuickViewClick}
        >
          <Eye size={13} /> Intip
        </button>
      </HoverActions>
    </CardContainer>
  );
}
