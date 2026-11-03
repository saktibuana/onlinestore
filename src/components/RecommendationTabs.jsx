import React from 'react';
import styled from '@emotion/styled';
import { categories } from '../data/products';
import { analytics } from '../services/analytics';
import { gtm } from '../services/gtm';
import { criteo } from '../services/criteo';

const TabsWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  position: sticky;
  top: 72px;
  z-index: 50;
  background-color: #FFFFFF;
  border-bottom: 1px solid #E5E7EB;
`;

const ScrollContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TabItem = styled.button`
  background: none;
  border: none;
  padding: 14px 4px;
  font-size: 15px;
  font-weight: ${(props) => (props.active ? '700' : '500')};
  color: ${(props) => (props.active ? '#03AC0E' : '#6D7588')};
  position: relative;
  white-space: nowrap;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #03AC0E;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 3px;
    background-color: ${(props) => (props.active ? '#03AC0E' : 'transparent')};
    border-radius: 3px 3px 0 0;
    transition: background-color 0.2s;
  }
`;

export default function RecommendationTabs({ activeTab, onTabChange }) {
  const handleTabClick = (tab) => {
    onTabChange(tab.id);

    // Track analytics events
    gtm.pushEvent('tab_switch', {
      tab_id: tab.id,
      tab_name: tab.name
    });
  };

  return (
    <TabsWrapper>
      <ScrollContainer>
        {categories.map((tab) => (
          <TabItem
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => handleTabClick(tab)}
            type="button"
          >
            {tab.name}
          </TabItem>
        ))}
      </ScrollContainer>
    </TabsWrapper>
  );
}
