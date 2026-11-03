import React from 'react';
import styled from '@emotion/styled';
import PopularCategories from './PopularCategories';
import TopUpBillWidget from './TopUpBillWidget';

const SectionWrapper = styled.section`
  max-width: 1200px;
  margin: 0 auto 16px;
  padding: 0 16px;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

export default function FeatureCardsSection() {
  return (
    <SectionWrapper>
      <CardsGrid>
        <PopularCategories />
        <TopUpBillWidget />
      </CardsGrid>
    </SectionWrapper>
  );
}
