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
    flex: 1;
    
    .pc-title {
      display: flex;
      flex-direction: row;
      flex: 1;
      
      .nav-menu {
        background-color: transparent;
        flex: 1;
        border-bottom: transparent;
        color: #ffffff;
        
        .nav-menu-item {
          color: #ffffff;
          
          &:hover {
            color: ghostwhite;
          }
        }
      }
    }
    
    .mobile-title {
      display: none;
      padding-left: 15px;
      
      .dropdown-menu {
        min-width: 172px;
      }
      
      .hamburger-button {
        font-size: 24px;
        width: 40px;
        height: 64px;
      }
    }

    @media screen and (max-width: 767px) {
      .pc-title {
        display: none;
      }
      
      .mobile-title {
        display: flex;
      }
    }
  }

  .setting-button {
    height: 64px;
    display: none;
    
    @media screen and (max-width: 767px) {
      display: flex;
    }
  }
`;
