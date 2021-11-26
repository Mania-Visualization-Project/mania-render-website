import styled from 'styled-components';

export const Container = styled.div`
  .mr-app {
    width: 100%;

    .app-header {
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

    }
  }
`;
