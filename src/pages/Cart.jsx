import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import loadable from '@loadable/component';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { cartService } from '../services/cartService';
import { analytics } from '../services/analytics';
import { gtm } from '../services/gtm';
import { criteo } from '../services/criteo';
import { branchService } from '../services/branch';
import { openGraph } from '../services/opengraph';
import { Trash2, Plus, Minus, Tag, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

const AkamaiTelemetryDrawer = loadable(() => import('../components/AkamaiTelemetryDrawer'), {
  fallback: null
});

const Container = styled.div`
  max-width: 1200px;
  margin: 24px auto 60px;
  padding: 0 16px;
`;

const CartLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 28px;
  align-items: flex-start;

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`;

const CartItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SelectAllBar = styled.div`
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  padding: 12px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  label {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;

    input[type="checkbox"] {
      accent-color: #03AC0E;
      width: 18px;
      height: 18px;
    }
  }

  .delete-selected {
    color: #FF5722;
    background: none;
    border: none;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
  }
`;

const ShopCartSection = styled.div`
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 16px 20px;

  .shop-header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 700;
    color: #212121;
    padding-bottom: 12px;
    border-bottom: 1px solid #F0F3F7;
    margin-bottom: 16px;

    .badge {
      background: #EFE7FA;
      color: #4F3582;
      font-size: 11px;
      padding: 2px 6px;
      border-radius: 4px;
    }
  }
`;

const CartItemRow = styled.div`
  display: flex;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #F0F3F7;

  &:last-child { border-bottom: none; }

  img {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    object-fit: cover;
    border: 1px solid #E5E7EB;
  }

  .item-meta {
    flex: 1;

    h4 {
      font-size: 14px;
      font-weight: 600;
      color: #212121;
      margin: 0 0 4px;
    }

    .variant-label {
      font-size: 12px;
      color: #6D7588;
      margin-bottom: 8px;
    }

    .price {
      font-size: 15px;
      font-weight: 700;
      color: #212121;
    }
  }

  .item-actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;

    button.delete-btn {
      background: none;
      border: none;
      color: #9FA6B0;
      cursor: pointer;
      &:hover { color: #FF5722; }
    }

    .counter {
      display: flex;
      align-items: center;
      border: 1px solid #E5E7EB;
      border-radius: 6px;

      button {
        width: 28px;
        height: 28px;
        background: none;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #03AC0E;
      }

      span {
        width: 32px;
        text-align: center;
        font-size: 13px;
        font-weight: 700;
      }
    }
  }
`;

const SummaryCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 20px;
  position: sticky;
  top: 90px;
  box-shadow: 0 2px 10px rgba(141, 150, 170, 0.12);

  h3 {
    font-size: 16px;
    font-weight: 700;
    color: #212121;
    margin-bottom: 16px;
  }

  .coupon-box {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;

    input {
      flex: 1;
      border: 1px solid #E5E7EB;
      border-radius: 6px;
      padding: 8px 10px;
      font-size: 13px;
      text-transform: uppercase;
    }

    button {
      background: #EBF7ED;
      color: #03AC0E;
      border: 1px solid #03AC0E;
      font-weight: 700;
      font-size: 13px;
      padding: 8px 14px;
      border-radius: 6px;
      cursor: pointer;

      &:hover {
        background: #03AC0E;
        color: #FFFFFF;
      }
    }
  }

  .summary-line {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: #6D7588;
    margin-bottom: 10px;

    &.total {
      font-size: 16px;
      font-weight: 800;
      color: #212121;
      padding-top: 12px;
      border-top: 1px solid #E5E7EB;
      margin-top: 14px;
    }

    &.discount {
      color: #03AC0E;
      font-weight: 600;
    }
  }

  .checkout-btn {
    width: 100%;
    background-color: #03AC0E;
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 700;
    padding: 13px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    margin-top: 16px;
    transition: background 0.15s;

    &:hover { background-color: #02980C; }
    &:disabled { background-color: #E5E7EB; color: #9FA6B0; cursor: not-allowed; }
  }
`;

const SuccessModal = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;

  .card {
    background: #FFFFFF;
    border-radius: 16px;
    padding: 32px 28px;
    text-align: center;
    max-width: 460px;
    width: 100%;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

    h2 {
      font-size: 20px;
      font-weight: 700;
      color: #212121;
      margin: 16px 0 8px;
    }

    p {
      font-size: 14px;
      color: #6D7588;
      line-height: 1.5;
      margin-bottom: 24px;
    }

    button {
      background: #03AC0E;
      color: #FFFFFF;
      font-weight: 700;
      font-size: 14px;
      padding: 12px 32px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      &:hover { background: #02980C; }
    }
  }
`;

export default function Cart() {
  const [items, setItems] = useState(cartService.getItems());
  const [selectedIds, setSelectedIds] = useState(new Set(items.map((it) => it.id + it.selectedVariant)));
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponSuccess, setCouponSuccess] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(null);

  useEffect(() => {
    openGraph.updateMeta({
      title: 'Keranjang Belanja | Tokopedia',
      description: 'Lihat daftar belanjaanmu, gunakan kupon promo hemat, dan bayar aman di Tokopedia.',
      type: 'website'
    });

    analytics.trackViewCart(items, cartService.getSubtotal());
    criteo.trackViewBasket(items);
    gtm.pushEvent('view_cart', { cart_count: items.length });

    const unsub = cartService.subscribe(({ items: newItems }) => {
      setItems(newItems);
    });
    return unsub;
  }, []);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedIds(new Set(items.map((it) => it.id + it.selectedVariant)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleToggleItem = (key) => {
    const next = new Set(selectedIds);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setSelectedIds(next);
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'HEMAT90' || couponCode.toUpperCase() === 'TOKOPEDIA') {
      setDiscountAmount(25000);
      setCouponSuccess('Kupon HEMAT90 Berhasil Digunakan! Hemat Rp25.000');
      gtm.pushEvent('coupon_applied', { coupon_code: couponCode, discount: 25000 });
    } else {
      alert('Kupon tidak valid. Coba gunakan kupon promo "HEMAT90".');
    }
  };

  const selectedItems = items.filter((it) => selectedIds.has(it.id + it.selectedVariant));
  const subtotal = selectedItems.reduce((acc, it) => acc + it.price * it.quantity, 0);
  const totalPayment = Math.max(0, subtotal - discountAmount);

  const handleCheckout = () => {
    if (selectedItems.length === 0) return;

    const transactionId = 'TKPD-ORD-' + Math.floor(10000000 + Math.random() * 90000000);

    // Track in GA4, Criteo, Branch, GTM
    analytics.trackPurchase({
      transactionId,
      items: selectedItems,
      value: totalPayment,
      promo: discountAmount
    });

    criteo.trackTransaction(transactionId, selectedItems);

    branchService.logEvent('PURCHASE', {
      transaction_id: transactionId,
      revenue: totalPayment,
      currency: 'IDR',
      coupon: discountAmount > 0 ? 'HEMAT90' : undefined
    });

    gtm.pushEvent('purchase_success', {
      transaction_id: transactionId,
      total_payment: totalPayment,
      items_count: selectedItems.length
    });

    setOrderSuccess({
      transactionId,
      total: totalPayment
    });

    // Remove bought items
    selectedItems.forEach((it) => cartService.removeItem(it.id, it.selectedVariant));
  };

  return (
    <div>
      <Header />

      <Container>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Keranjang Belanja</h1>

        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#F8F9FA', borderRadius: 12 }}>
            <h3>Wah, keranjang belanjamu kosong</h3>
            <p style={{ color: '#6D7588', marginTop: 8 }}>
              Yuk, cari produk favoritmu dan manfaatkan promo asyik Tokopedia!
            </p>
            <a
              href="/"
              style={{ display: 'inline-block', marginTop: 16, background: '#03AC0E', color: '#fff', padding: '10px 28px', borderRadius: 8, fontWeight: 700 }}
            >
              Mulai Belanja Sekarang
            </a>
          </div>
        ) : (
          <CartLayout>
            <CartItemsList>
              <SelectAllBar>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedIds.size === items.length && items.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                  Pilih Semua ({items.length} Barang)
                </label>

                {selectedIds.size > 0 && (
                  <button
                    className="delete-selected"
                    onClick={() => {
                      if (confirm('Hapus semua barang yang dipilih?')) {
                        selectedItems.forEach((it) => cartService.removeItem(it.id, it.selectedVariant));
                      }
                    }}
                  >
                    Hapus
                  </button>
                )}
              </SelectAllBar>

              <ShopCartSection>
                <div className="shop-header">
                  <span className="badge">Official Store</span>
                  <span>Tokopedia Partner Merchant</span>
                </div>

                {items.map((it) => {
                  const key = it.id + it.selectedVariant;
                  return (
                    <CartItemRow key={key}>
                      <input
                        type="checkbox"
                        checked={selectedIds.has(key)}
                        onChange={() => handleToggleItem(key)}
                        style={{ accentColor: '#03AC0E', width: 18, height: 18, marginTop: 4 }}
                      />
                      <img src={it.image} alt={it.title} />

                      <div className="item-meta">
                        <h4>{it.title}</h4>
                        {it.selectedVariant && (
                          <div className="variant-label">Varian: {it.selectedVariant}</div>
                        )}
                        <div className="price">Rp{it.price.toLocaleString('id-ID')}</div>
                      </div>

                      <div className="item-actions">
                        <button
                          className="delete-btn"
                          aria-label="Hapus barang"
                          onClick={() => cartService.removeItem(it.id, it.selectedVariant)}
                        >
                          <Trash2 size={16} />
                        </button>

                        <div className="counter">
                          <button
                            type="button"
                            onClick={() => cartService.updateQuantity(it.id, it.selectedVariant, it.quantity - 1)}
                          >
                            <Minus size={13} />
                          </button>
                          <span>{it.quantity}</span>
                          <button
                            type="button"
                            onClick={() => cartService.updateQuantity(it.id, it.selectedVariant, it.quantity + 1)}
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>
                    </CartItemRow>
                  );
                })}
              </ShopCartSection>
            </CartItemsList>

            {/* Order Summary */}
            <SummaryCard>
              <h3>Ringkasan Belanja</h3>

              <form onSubmit={handleApplyCoupon} className="coupon-box">
                <input
                  type="text"
                  placeholder="Kupon Promo: HEMAT90"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button type="submit">Gunakan</button>
              </form>

              {couponSuccess && (
                <div style={{ fontSize: 12, color: '#03AC0E', fontWeight: 600, marginBottom: 12 }}>
                  ✓ {couponSuccess}
                </div>
              )}

              <div className="summary-line">
                <span>Total Harga ({selectedItems.length} barang)</span>
                <span>Rp{subtotal.toLocaleString('id-ID')}</span>
              </div>

              {discountAmount > 0 && (
                <div className="summary-line discount">
                  <span>Diskon Kupon Promo</span>
                  <span>-Rp{discountAmount.toLocaleString('id-ID')}</span>
                </div>
              )}

              <div className="summary-line">
                <span>Biaya Pengiriman</span>
                <span style={{ color: '#008B7A', fontWeight: 700 }}>Rp0 (Bebas Ongkir)</span>
              </div>

              <div className="summary-line total">
                <span>Total Tagihan</span>
                <span style={{ color: '#03AC0E' }}>Rp{totalPayment.toLocaleString('id-ID')}</span>
              </div>

              <button
                type="button"
                className="checkout-btn"
                disabled={selectedItems.length === 0}
                onClick={handleCheckout}
              >
                Beli ({selectedItems.length})
              </button>
            </SummaryCard>
          </CartLayout>
        )}
      </Container>

      {/* Order Success Modal */}
      {orderSuccess && (
        <SuccessModal>
          <div className="card">
            <CheckCircle2 size={54} color="#03AC0E" style={{ margin: '0 auto' }} />
            <h2>Pembayaran Berhasil!</h2>
            <p>
              Nomor Pesanan: <strong>{orderSuccess.transactionId}</strong><br />
              Total Pembayaran: <strong>Rp{orderSuccess.total.toLocaleString('id-ID')}</strong><br />
              Event telah dicatat di Google Analytics 4, Criteo OneTag, Branch.io, dan Google Tag Manager.
            </p>
            <button onClick={() => { setOrderSuccess(null); window.location.href = '/'; }}>
              Kembali ke Beranda
            </button>
          </div>
        </SuccessModal>
      )}

      <AkamaiTelemetryDrawer />
      <Footer />
    </div>
  );
}
