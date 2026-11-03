import React, { useState } from 'react';
import styled from '@emotion/styled';
import ProductCard from './ProductCard';
import ProductSkeletonCard from './ProductSkeletonCard';
import { analytics } from '../services/analytics';
import { gtm } from '../services/gtm';

const GridSection = styled.section`
  max-width: 1200px;
  margin: 20px auto 40px;
  padding: 0 16px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 520px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;
`;

const LoadMoreButton = styled.button`
  background: #FFFFFF;
  border: 1px solid #03AC0E;
  color: #03AC0E;
  font-size: 14px;
  font-weight: 700;
  padding: 12px 48px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #EBF7ED;
    box-shadow: 0 4px 12px rgba(3, 172, 14, 0.2);
  }
`;

export default function ProductGrid({ items, onQuickView }) {
  const [visibleCount, setVisibleCount] = useState(18);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const displayedItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    gtm.pushEvent('load_more_products', { current_count: visibleCount });

    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 12, items.length));
      setIsLoadingMore(false);
    }, 600);
  };

  return (
    <GridSection>
      <CardGrid>
        {displayedItems.map((prod) => (
          <ProductCard
            key={prod.id}
            product={prod}
            onQuickView={onQuickView}
          />
        ))}

        {/* Skeleton loaders at the bottom, exactly matching the screenshot! */}
        {hasMore && (
          <>
            <ProductSkeletonCard />
            <ProductSkeletonCard />
            <ProductSkeletonCard />
            <ProductSkeletonCard />
            <ProductSkeletonCard />
            <ProductSkeletonCard />
          </>
        )}
      </CardGrid>

      {hasMore && (
        <LoadMoreContainer>
          <LoadMoreButton
            type="button"
            onClick={handleLoadMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? 'Memuat Produk...' : 'Muat Lebih Banyak'}
          </LoadMoreButton>
        </LoadMoreContainer>
      )}
    </GridSection>
  );
}
