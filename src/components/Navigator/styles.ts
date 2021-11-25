import styled from 'styled-components';

export const NavigatorContainer = styled.div`
  flex: 1;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .right-options {
    display: flex;
    flex-direction: row;
  }

  .title-content {
    color: #fff;
  }

  .setting-button {
    height: 64px;
    display: none;
    
    @media screen and (max-width: 768px) {
      display: flex;
    }
  }
`;
