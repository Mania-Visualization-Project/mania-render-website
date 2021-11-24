import styled from 'styled-components';
import { Card } from 'antd';

export const MainContainer = styled(Card)`
  max-width: 1200px;
  margin: 20px auto;
  background-color: #fff;
  
  .main-wrapper, .upload-wrapper, .btn-wrapper {
    width: 100%;
  }

  .upload-wrapper, .btn-wrapper {
    padding: 20px;
  }
`;
