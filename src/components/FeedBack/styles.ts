import styled from 'styled-components';

export const FeedBackWrapper = styled.div`
  
`;

export const FeedBackPanelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  
  .f-item {
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    
    .text-name {
      font-size: 28px;
    }
    
    .github {
      color: #000;
      font-size: 144px;
    }
  }
`;
