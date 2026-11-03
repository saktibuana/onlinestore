import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import loadable from '@loadable/component';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { products } from '../data/products';
import { cartService } from '../services/cartService';
import { analytics } from '../services/analytics';
import { gtm } from '../services/gtm';
import { criteo } from '../services/criteo';
import { branchService } from '../services/branch';
import { openGraph } from '../services/opengraph';
import { akamai } from '../services/akamai';
import { Star, Truck, ShieldCheck, Heart, Share2, Plus, Minus, MessageSquare, Check } from 'lucide-react';

const ProductReviewsTab = loadable(() => import('../components/ProductReviewsTab'), {
  fallback: <div style={{ padding: 20 }}>Memuat ulasan produk...</div>
});

const AkamaiTelemetryDrawer = loadable(() => import('../components/AkamaiTelemetryDrawer'), {
  fallback: null
});

const BranchJourneyBanner = loadable(() => import('../components/BranchJourneyBanner'), {
  fallback: null
});

const Container = styled.div`
  max-width: 1200px;
  margin: 16px auto 48px;
  padding: 0 16px;
`;

const Breadcrumb = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #6D7588;
  margin-bottom: 20px;

  a {
    color: #03AC0E;
    &:hover { text-decoration: underline; }
  }
`;

const PDPGrid = styled.div`
  display: grid;
  grid-template-columns: 380px 1fr 300px;
  gap: 32px;
  align-items: flex-start;

  @media (max-width: 1024px) {
    grid-template-columns: 340px 1fr;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const GalleryColumn = styled.div`
  position: sticky;
  top: 90px;

  .main-image-box {
    width: 100%;
    padding-top: 100%;
    position: relative;
    border-radius: 12px;
    border: 1px solid #E5E7EB;
    overflow: hidden;
    margin-bottom: 12px;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .thumbnails-row {
    display: flex;
    gap: 8px;

    button {
      width: 64px;
      height: 64px;
      border-radius: 8px;
      border: 2px solid transparent;
      padding: 0;
      overflow: hidden;
      cursor: pointer;
      background: none;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      &.active {
        border-color: #03AC0E;
      }
    }
  }
`;

const DetailsColumn = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 20px;
    font-weight: 700;
    color: #212121;
    line-height: 1.4;
    margin-bottom: 10px;
  }

  .stats-row {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 13px;
    color: #6D7588;
    margin-bottom: 16px;

    .star {
      color: #FFC400;
      fill: #FFC400;
    }
    .bold {
      font-weight: 700;
      color: #212121;
    }
  }

  .price-box {
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid #E5E7EB;

    .price {
      font-size: 28px;
      font-weight: 800;
      color: #212121;
    }

    .discount {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 4px;
      font-size: 13px;

      .badge {
        background: #FFEBE8;
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
  }
`;

const VariantSection = styled.div`
  margin-bottom: 20px;

  h4 {
    font-size: 14px;
    font-weight: 700;
    color: #212121;
    margin-bottom: 8px;
  }

  .options {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    button {
      padding: 8px 14px;
      border-radius: 8px;
      border: 1px solid #E5E7EB;
      background: #FFFFFF;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;

      &.selected {
        border-color: #03AC0E;
        color: #03AC0E;
        background: #EBF7ED;
      }
    }
  }
`;

const ShopCard = styled.div`
  background: #F8F9FA;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;

  .shop-info {
    display: flex;
    align-items: center;
    gap: 12px;

    .avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #03AC0E;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
    }

    h4 {
      font-size: 14px;
      font-weight: 700;
      color: #212121;
      margin: 0;
    }

    p {
      font-size: 12px;
      color: #6D7588;
      margin: 2px 0 0;
    }
  }

  .chat-btn {
    border: 1px solid #03AC0E;
    color: #03AC0E;
    background: #FFFFFF;
    font-size: 12px;
    font-weight: 700;
    padding: 6px 14px;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;

    &:hover {
      background: #EBF7ED;
    }
  }
`;

const StickyPurchaseCard = styled.div`
  position: sticky;
  top: 90px;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 20px;
  background: #FFFFFF;
  box-shadow: 0 4px 16px rgba(141, 150, 170, 0.15);

  h3 {
    font-size: 16px;
    font-weight: 700;
    color: #212121;
    margin-bottom: 16px;
  }

  .qty-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;

    .counter {
      display: flex;
      align-items: center;
      border: 1px solid #E5E7EB;
      border-radius: 8px;

      button {
        width: 32px;
        height: 32px;
        background: none;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #03AC0E;
        &:disabled { color: #9FA6B0; cursor: not-allowed; }
      }

      span {
        width: 36px;
        text-align: center;
        font-weight: 700;
        font-size: 14px;
      }
    }
  }

  .subtotal-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-top: 12px;
    border-top: 1px solid #F0F3F7;

    .sub-label { font-size: 13px; color: #6D7588; }
    .sub-val { font-size: 18px; font-weight: 800; color: #212121; }
  }

  .btn-cart {
    width: 100%;
    background-color: #03AC0E;
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 700;
    padding: 12px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    margin-bottom: 8px;
    transition: background 0.15s;

    &:hover { background-color: #02980C; }
  }

  .btn-buy {
    width: 100%;
    background-color: #FFFFFF;
    color: #03AC0E;
    font-size: 14px;
    font-weight: 700;
    padding: 11px;
    border-radius: 8px;
    border: 1px solid #03AC0E;
    cursor: pointer;
    margin-bottom: 14px;

    &:hover { background-color: #EBF7ED; }
  }

  .branch-share {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    background: none;
    border: none;
    color: #6D7588;
    font-size: 12px;
    cursor: pointer;
    &:hover { color: #03AC0E; }
  }
`;

export default function PDP() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id') || 'prod-001';

  const product = products.find((p) => p.id === productId) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0]?.options?.[0] || 'Default'
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    // OpenGraph dynamic setup for PDP
    openGraph.updateMeta({
      title: `${product.title} - Tokopedia`,
      description: `Beli ${product.title} harga Rp${product.price.toLocaleString('id-ID')} dengan cicilan 0% dan Bebas Ongkir hanya di Tokopedia!`,
      image: product.image,
      type: 'product',
      price: product.price
    });

    // Criteo OneTag: viewItem
    criteo.trackViewItem(product.id, product.price);

    // GA4: view_item
    analytics.trackViewItem(product);

    // Branch: logEvent VIEW_ITEM
    branchService.logEvent('VIEW_ITEM', {
      product_id: product.id,
      title: product.title,
      price: product.price
    });

    // GTM: pdp_view
    gtm.pushEvent('pdp_view', {
      product_id: product.id,
      title: product.title,
      price: product.price,
      brand: product.brand,
      category: product.category
    });

    akamai.recordEdgeRequest(`/products/${product.slug}`);
  }, [product]);

  const imagesList = product.images || [product.image];

  const handleAddToCart = () => {
    cartService.addItem(product, quantity, selectedVariant);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    cartService.addItem(product, quantity, selectedVariant);
    window.location.href = '/cart.html';
  };

  const handleShareBranchLink = async () => {
    const link = await branchService.createDeepLink({
      path: `/pdp.html?id=${product.id}`,
      title: product.title,
      description: `Promo Tokopedia: ${product.title}`,
      imageUrl: product.image,
      customData: {
        product_id: product.id,
        variant: selectedVariant
      }
    });

    navigator.clipboard?.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div>
      <BranchJourneyBanner />
      <Header />

      <Container>
        <Breadcrumb>
          <a href="/">Beranda</a>
          <span>&gt;</span>
          <a href={`/search.html?cat=${product.category}`}>{product.categoryName || 'Kategori'}</a>
          <span>&gt;</span>
          <span>{product.title}</span>
        </Breadcrumb>

        <PDPGrid>
          {/* Gallery Column */}
          <GalleryColumn>
            <div className="main-image-box">
              <img
                src={akamai.transformImageUrl(imagesList[activeImageIndex], { width: 500 })}
                alt={product.title}
              />
            </div>
            <div className="thumbnails-row">
              {imagesList.map((img, idx) => (
                <button
                  key={idx}
                  className={activeImageIndex === idx ? 'active' : ''}
                  onClick={() => setActiveImageIndex(idx)}
                >
                  <img src={img} alt={`Thumb ${idx}`} />
                </button>
              ))}
            </div>
          </GalleryColumn>

          {/* Details Column */}
          <DetailsColumn>
            <h1>{product.title}</h1>

            <div className="stats-row">
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Star size={14} className="star" />
                <span className="bold">{product.rating}</span>
              </span>
              <span>•</span>
              <span>Terjual <span className="bold">{product.soldCount}</span></span>
              <span>•</span>
              <span>{product.reviewsCount || 1420} Ulasan</span>
            </div>

            <div className="price-box">
              <div className="price">Rp{product.price.toLocaleString('id-ID')}</div>
              {product.discountPercent > 0 && (
                <div className="discount">
                  <span className="badge">{product.discountPercent}%</span>
                  <span className="strike">Rp{product.originalPrice.toLocaleString('id-ID')}</span>
                </div>
              )}
            </div>

            {product.variants?.map((v) => (
              <VariantSection key={v.id}>
                <h4>Pilih {v.name}:</h4>
                <div className="options">
                  {v.options.map((opt) => (
                    <button
                      key={opt}
                      className={selectedVariant === opt ? 'selected' : ''}
                      onClick={() => setSelectedVariant(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </VariantSection>
            ))}

            <ShopCard>
              <div className="shop-info">
                <div className="avatar">
                  {product.shop?.name?.slice(0, 1) || 'T'}
                </div>
                <div>
                  <h4>{product.shop?.name}</h4>
                  <p>{product.shop?.badge} • {product.shop?.location}</p>
                </div>
              </div>
              <button className="chat-btn" onClick={() => alert('Fitur chat seller Tokopedia dibuka')}>
                <MessageSquare size={14} /> Chat
              </button>
            </ShopCard>

            <div style={{ marginTop: 12 }}>
              <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>Deskripsi Produk</h4>
              <p style={{ fontSize: 14, color: '#4A5568', lineHeight: 1.6 }}>{product.description}</p>
            </div>

            {product.specs?.length > 0 && (
              <div style={{ marginTop: 20 }}>
                <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>Spesifikasi Produk</h4>
                <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
                  <tbody>
                    {product.specs.map((sp, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #F0F3F7' }}>
                        <td style={{ padding: '8px 0', color: '#6D7588', width: '35%' }}>{sp.label}</td>
                        <td style={{ padding: '8px 0', fontWeight: 600, color: '#212121' }}>{sp.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Loadable Reviews Tab */}
            <ProductReviewsTab product={product} />
          </DetailsColumn>

          {/* Sticky Purchase Column */}
          <StickyPurchaseCard>
            <h3>Atur Jumlah & Catatan</h3>

            <div className="qty-row">
              <span style={{ fontSize: 13, color: '#6D7588' }}>Jumlah:</span>
              <div className="counter">
                <button
                  type="button"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  <Minus size={14} />
                </button>
                <span>{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <div style={{ fontSize: 12, color: '#03AC0E', fontWeight: 600, marginBottom: 16 }}>
              ✓ Sisa stok: {product.stock || 240} buah
            </div>

            <div className="subtotal-row">
              <span className="sub-label">Subtotal</span>
              <span className="sub-val">
                Rp{(product.price * quantity).toLocaleString('id-ID')}
              </span>
            </div>

            <button type="button" className="btn-cart" onClick={handleAddToCart}>
              {added ? '✓ Berhasil Ditambahkan' : '+ Keranjang'}
            </button>

            <button type="button" className="btn-buy" onClick={handleBuyNow}>
              Beli Langsung
            </button>

            <button type="button" className="branch-share" onClick={handleShareBranchLink}>
              {copiedLink ? <Check size={14} color="#03AC0E" /> : <Share2 size={14} />}
              {copiedLink ? 'Deep Link Branch Disalin!' : 'Bagikan Branch.io Deep Link'}
            </button>
          </StickyPurchaseCard>
        </PDPGrid>
      </Container>

      <AkamaiTelemetryDrawer />
      <Footer />
    </div>
  );
}
