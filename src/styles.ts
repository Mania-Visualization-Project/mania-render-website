import styled from 'styled-components';

export const Container = styled.div`
  
  .mr-app {
    width: 100%;

    .app-header {
      position: fixed;
      width: 100%;
      z-index: 9999;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding-right: 0;
      background-color: #40a9ff;
      
      @media screen and (max-width: 768px) {
        padding-left: 0;
      }
    }

    .app-content {
      padding-top: 80px;
      padding-bottom: 100px;
    }

    .app-footer {
      padding: 5px;
      width: 100%;
      position: fixed;
      bottom: 0;
    }
  }
`;
