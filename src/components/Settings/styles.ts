import { Card } from 'antd';
import styled from 'styled-components';

export const SettingsButtonContainer = styled.div`
  height: 40px;
  width: 40px;
  
  .trigger-button {
    width: 40px;
    height: 40px;
    color: #ffffff;
    font-size: 24px;
    transition: .3s color ease-out;
    
    &:hover {
      cursor: pointer;
      color: #e9e9e9;
    }
  }
`;

export const SettingsPanelContainer = styled(Card)`
  width: calc(100% - 20px);
  height: calc(100% - 50px);
  background-color: #fff;
  margin-top: 20px;
`;
