import React from 'react'
import styled, { keyframes } from 'styled-components';
import MenuBtn from '../Common/MenuBtn';

const MenuBar = () => {

  return (
    <MenuBarContainer>
      <MenuGrid><MenuBtn type="question" /></MenuGrid>
      <MenuGrid><MenuBtn type="question" /></MenuGrid>
      <MenuGrid><MenuBtn type="question" /></MenuGrid>
      <MenuGrid><MenuBtn type="question" /></MenuGrid>
      <MenuGrid><MenuBtn type="question" /></MenuGrid>
      <MenuGrid><MenuBtn type="question" /></MenuGrid>
      <MenuGrid><MenuBtn type="question" /></MenuGrid>
      <MenuGrid><MenuBtn type="question" /></MenuGrid>
    </MenuBarContainer>
  )
}

const slideIn = keyframes`
from {
  transform: translateX(100%); 
}
to {
  transform: translateX(0);
}
`;

const MenuBarContainer = styled.div`
  flex: 25%;
  display: flex;
  flex-direction: row; 
  flex-wrap: wrap; 
  justify-content: center; 
  align-items: center; 
  background-color: rgba(0, 0, 0, 0.7);
  gap: 10px;
  animation: ${slideIn} 0.5s ease-out forwards;
`;

const MenuGrid = styled.div`
  display: flex;
  flex-basis: calc(50% - 10px);
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

export default MenuBar