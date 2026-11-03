import React from 'react';
import styled from '@emotion/styled';
import { Star, ThumbsUp, CheckCircle } from 'lucide-react';

const ReviewsSection = styled.div`
  margin-top: 36px;
  border-top: 1px solid #E5E7EB;
  padding-top: 24px;
`;

const RatingOverview = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
  background: #F8F9FA;
  padding: 20px 28px;
  border-radius: 12px;
  margin-bottom: 24px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ScoreBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .big-score {
    font-size: 48px;
    font-weight: 800;
    color: #212121;
    line-height: 1;
  }

  .stars {
    display: flex;
    color: #FFC400;
    margin: 6px 0;
  }

  .sub {
    font-size: 12px;
    color: #6D7588;
  }
`;

const ReviewItem = styled.div`
  border-bottom: 1px solid #F0F3F7;
  padding: 16px 0;

  .user-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;

    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }

    .name {
      font-size: 13px;
      font-weight: 700;
      color: #212121;
    }

    .date {
      font-size: 11px;
      color: #9FA6B0;
    }
  }

  .comment {
    font-size: 13px;
    color: #212121;
    line-height: 1.5;
    margin-bottom: 8px;
  }

  .helpful {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #6D7588;
    cursor: pointer;
    background: none;
    border: none;

    &:hover {
      color: #03AC0E;
    }
  }
`;

const dummyReviews = [
  {
    name: 'Budi Santoso',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop',
    rating: 5,
    date: '2 hari lalu',
    comment: 'Barang datang sesuai pesanan, packing sangat tebal dengan bubble wrap rapi. Kualitas bahannya luar biasa bagus untuk harga segini. Seller fast respon, recommended!'
  },
  {
    name: 'Sarah Wijaya',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop',
    rating: 5,
    date: '1 minggu lalu',
    comment: 'Pengiriman kilat banget pakai Bebas Ongkir. Produk mulus tanpa cacat, finishing sangat rapi dan presisi. Pasti bakal repeat order lagi di toko ini.'
  },
  {
    name: 'Rian Pratama',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=60&h=60&fit=crop',
    rating: 4,
    date: '2 minggu lalu',
    comment: 'Mantap joss, berfungsi optimal. Hanya pengiriman dari kurir sedikit delay karena cuaca hujan, tapi produk aman 100% berkat packing kokoh.'
  }
];

export default function ProductReviewsTab({ product }) {
  return (
    <ReviewsSection>
      <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>
        Ulasan Pembeli ({product.reviewsCount?.toLocaleString('id-ID') || '1.420'})
      </h3>

      <RatingOverview>
        <ScoreBox>
          <div className="big-score">{product.rating}</div>
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} fill="#FFC400" />
            ))}
          </div>
          <div className="sub">{product.reviewsCount || 1420} rating pembeli</div>
        </ScoreBox>

        <div style={{ flex: 1, fontSize: 13, color: '#6D7588' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#03AC0E', fontWeight: 600, marginBottom: 6 }}>
            <CheckCircle size={16} /> 98% pembeli merasa puas dengan kualitas barang
          </div>
          <div>Berdasarkan penilaian asli pembeli terverifikasi di Tokopedia.</div>
        </div>
      </RatingOverview>

      {dummyReviews.map((rev, idx) => (
        <ReviewItem key={idx}>
          <div className="user-row">
            <img src={rev.avatar} alt={rev.name} />
            <div>
              <div className="name">{rev.name}</div>
              <div className="date">{rev.date}</div>
            </div>
            <div style={{ display: 'flex', color: '#FFC400', marginLeft: 'auto' }}>
              {[...Array(rev.rating)].map((_, i) => (
                <Star key={i} size={13} fill="#FFC400" />
              ))}
            </div>
          </div>
          <div className="comment">{rev.comment}</div>
          <button className="helpful">
            <ThumbsUp size={13} /> Membantu (12)
          </button>
        </ReviewItem>
      ))}
    </ReviewsSection>
  );
}
