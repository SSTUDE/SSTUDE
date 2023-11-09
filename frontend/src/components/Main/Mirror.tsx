import React, { useState } from 'react';
import Bus from '../Bus/Bus';
import styled from 'styled-components';
import MenuBtn from '../Common/MenuBtn';
import DateTime from '../Common/DateTime';
import HelloWorld from '../Common/HelloWorld';
import { useNavigate } from 'react-router-dom';
import { TEXT_COLOR } from '../../constants/defaultSlices';

const Mirror = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('bus');

  const renderRightContent = () => {
    switch (activePage) {
      case 'bus':
        return <Bus />;
      case 'bus1':
        return <Bus />;
      default:
        return null;
    }
  };

  return (
    <>
      <Header>
        <Left>
          <MenuBtn type="menu" />
        </Left>
        <Center>
          <HelloWorld />
        </Center>
        <Right>
          <DateTime />
        </Right>
      </Header>
      <MainContainer>
        <Left>
        </Left>
        <Center>
          <Btn onClick={() => navigate('/test')}>초기 화면</Btn>
        </Center>
        <Right>
          <RightHeader>
            <PageButton onClick={() => setActivePage('bus')}>버스 정보</PageButton>
            <PageButton onClick={() => setActivePage('bus1')}>버스 정보</PageButton>
          </RightHeader>
          {renderRightContent()}
        </Right>
      </MainContainer>
    </>
  );
};

const Header = styled.div`
  display: flex; 
  height: 22%;
  align-items: center; 
  padding: 0 20px;
`;

const Left = styled.div`
  flex: 25%; 
  display: flex;
  justify-content: flex-end;
`;

const Center = styled.div`
  flex: 50%; 
  display: flex; 
  justify-content: space-around; 
`;

const Right = styled.div`
  flex: 25%; 
  display: flex;
  flex-direction: column;
  align-items: center; 
`;

const MainContainer = styled.div`
  display: flex; 
  padding: 0 20px; 
  height: 78%;
`;

const Btn = styled.p`
padding: 10px 20px;
font-size: 1.5em;
font-weight: bold;
margin: 5px; 
color: ${TEXT_COLOR};
cursor: pointer; 
`;

const RightHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  
`;

const PageButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  border: none;
  font-size: 22px;
  background-color: transparent;
  color: ${TEXT_COLOR};
  cursor: pointer;
  &:focus {
    outline: none;
    border-bottom: 2px solid ${TEXT_COLOR}; 
  }
`;



export default Mirror
