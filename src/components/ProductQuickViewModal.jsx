import React, { useState } from 'react';
import styled from '@emotion/styled';
import { X, Star, Truck, Share2, Check } from 'lucide-react';
import { cartService } from '../services/cartService';
import { branchService } from '../services/branch';
import { gtm } from '../services/gtm';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const ModalCard = styled.div`
  background: #FFFFFF;
  border-radius: 16px;
  width: 100%;
  max-width: 760px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.2);
  display: grid;
  grid-template-columns: 340px 1fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  background: #F0F3F7;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #6D7588;
  z-index: 10;

  &:hover {
    background: #E5E7EB;
    color: #212121;
  }
`;

const ImageSide = styled.div`
  background-color: #F8F9FA;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    max-height: 300px;
    object-fit: contain;
    border-radius: 12px;
  }
`;

const DetailSide = styled.div`
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h3 {
    font-size: 18px;
    font-weight: 700;
    color: #212121;
    line-height: 1.35;
    margin: 0 0 8px;
    padding-right: 28px;
  }
`;

const PriceArea = styled.div`
  margin: 12px 0;

  .main-price {
    font-size: 24px;
    font-weight: 800;
    color: #212121;
  }

  .disc-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 4px;
    font-size: 12px;

    .percent {
      background-color: #FFEBE8;
      color: #FF5722;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
    }

    .strike {
      color: #9FA6B0;
      text-decoration: line-through;
    }
  }
`;

const VariantPicker = styled.div`
  margin-bottom: 16px;

  label {
    font-size: 12px;
    font-weight: 600;
    color: #6D7588;
    display: block;
    margin-bottom: 6px;
  }

  .options-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  button {
    background: ${(props) => (props.selected ? '#EBF7ED' : '#FFFFFF')};
    border: 1px solid ${(props) => (props.selected ? '#03AC0E' : '#E5E7EB')};
    color: ${(props) => (props.selected ? '#03AC0E' : '#212121')};
    font-weight: 600;
    font-size: 12px;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
      border-color: #03AC0E;
    }
  }
`;

const ModalActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;

  .primary-btn {
    background-color: #03AC0E;
    color: #FFFFFF;
    font-weight: 700;
    font-size: 14px;
    padding: 12px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    text-align: center;
    text-decoration: none;

    &:hover {
      background-color: #02980C;
    }
  }

  .secondary-btn {
    background-color: #FFFFFF;
    color: #03AC0E;
    border: 1px solid #03AC0E;
    font-weight: 700;
    font-size: 14px;
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;

    &:hover {
      background-color: #EBF7ED;
    }
  }

  .share-link {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-size: 12px;
    color: #6D7588;
    background: none;
    border: none;
    cursor: pointer;
    margin-top: 4px;

    &:hover {
      color: #03AC0E;
    }
  }
`;

export default function ProductQuickViewModal({ product, onClose }) {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0]?.options?.[0] || 'Default'
  );
  const [added, setAdded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    cartService.addItem(product, 1, selectedVariant);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleCopyBranchLink = async () => {
    const link = await branchService.createDeepLink({
      path: `/pdp.html?id=${product.id}`,
      title: product.title,
      description: `Beli ${product.title} harga Rp${product.price.toLocaleString('id-ID')} di Tokopedia!`,
      imageUrl: product.image,
      customData: {
        product_id: product.id,
        variant: selectedVariant
      }
    });

    navigator.clipboard?.writeText(link);
    gtm.pushEvent('branch_deep_link_shared', {
      product_id: product.id,
      deep_link: link
    });
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <Backdrop onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} aria-label="Tutup">
          <X size={18} />
        </CloseButton>

        <ImageSide>
          <img src={product.image} alt={product.title} />
        </ImageSide>

        <DetailSide>
          <div>
            <h3>{product.title}</h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#6D7588' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#FFC400', fontWeight: 700 }}>
                <Star size={14} fill="#FFC400" /> {product.rating}
              </span>
              <span>•</span>
              <span>Terjual {product.soldCount}</span>
              <span>•</span>
              <span style={{ color: '#03AC0E', fontWeight: 600 }}>{product.shop?.name}</span>
            </div>

            <PriceArea>
              <div className="main-price">Rp{product.price.toLocaleString('id-ID')}</div>
              {product.discountPercent > 0 && (
                <div className="disc-tag">
                  <span className="percent">{product.discountPercent}%</span>
                  <span className="strike">Rp{product.originalPrice.toLocaleString('id-ID')}</span>
                </div>
              )}
            </PriceArea>

            {product.variants?.length > 0 && (
              <VariantPicker>
                <label>Pilih {product.variants[0].name}:</label>
                <div className="options-row">
                  {product.variants[0].options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      style={{
                        borderColor: selectedVariant === opt ? '#03AC0E' : '#E5E7EB',
                        backgroundColor: selectedVariant === opt ? '#EBF7ED' : '#FFFFFF',
                        color: selectedVariant === opt ? '#03AC0E' : '#212121'
                      }}
                      onClick={() => setSelectedVariant(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </VariantPicker>
            )}

            <p style={{ fontSize: 13, color: '#6D7588', lineHeight: 1.5, margin: '8px 0 0' }}>
              {product.description.slice(0, 160)}...
            </p>
          </div>

          <ModalActions>
            <button
              type="button"
              className="primary-btn"
              onClick={handleAddToCart}
            >
              {added ? '✓ Berhasil Ditambahkan ke Keranjang' : '+ Keranjang'}
            </button>

            <a
              href={`/pdp.html?id=${product.id}`}
              className="secondary-btn"
            >
              Lihat Detail Lengkap (PDP)
            </a>

            <button
              type="button"
              className="share-link"
              onClick={handleCopyBranchLink}
            >
              {copiedLink ? <Check size={14} color="#03AC0E" /> : <Share2 size={14} />}
              {copiedLink ? 'Deep Link Branch Disalin ke Clipboard!' : 'Salin Branch.io App Deep Link'}
            </button>
          </ModalActions>
        </DetailSide>
      </ModalCard>
    </Backdrop>
  );
}
