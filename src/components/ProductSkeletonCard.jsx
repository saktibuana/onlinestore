import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const SkeletonCardWrapper = styled.div`
  background: #FFFFFF;
  border-radius: 9px;
  border: 1px solid #E5E7EB;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const SkeletonImage = styled.div`
  width: 100%;
  padding-top: 100%;
  background: linear-gradient(90deg, #F0F3F7 25%, #E5E7EB 50%, #F0F3F7 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`;

const SkeletonBody = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SkeletonLine = styled.div`
  height: ${(props) => props.height || '12px'};
  width: ${(props) => props.width || '100%'};
  border-radius: 4px;
  background: ${(props) =>
    props.highlight
      ? 'linear-gradient(90deg, #E5F9F6 25%, #C7F1EA 50%, #E5F9F6 75%)'
      : props.discount
      ? 'linear-gradient(90deg, #FFEBE8 25%, #FFD6D0 50%, #FFEBE8 75%)'
      : 'linear-gradient(90deg, #F0F3F7 25%, #E5E7EB 50%, #F0F3F7 75%)'};
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`;

export default function ProductSkeletonCard() {
  return (
    <SkeletonCardWrapper>
      <SkeletonImage />
      <SkeletonBody>
        <SkeletonLine height="14px" width="85%" />
        <SkeletonLine height="12px" width="60%" />
        <SkeletonLine height="16px" width="45%" highlight />
        <SkeletonLine height="10px" width="30%" discount />
        <SkeletonLine height="10px" width="70%" />
      </SkeletonBody>
    </SkeletonCardWrapper>
  );
}
