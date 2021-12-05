import React from 'react';
import { SimpleMode } from './SimpleMode';
import { MainContainer } from './styles';

/**
 * Main
 * 
 * TODO: move the generate biz to a unique module
 */
export const Main = React.memo(() => {
  return (
    <MainContainer>
      <SimpleMode />
    </MainContainer>
  );
});

Main.displayName = 'Main';
