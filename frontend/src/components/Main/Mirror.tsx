import Bus from '../Bus/Bus';
import styled, { keyframes } from 'styled-components';
import MenuBtn from '../Common/MenuBtn';
import React, { useState } from 'react';
import DateTime from '../Common/DateTime';
import HelloWorld from '../Common/HelloWorld';
import { useNavigate } from 'react-router-dom';
import { TEXT_COLOR } from '../../constants/defaultSlices';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

const Mirror = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('bus');

  const isMenuOpen = useSelector((state: RootState) => state.mirror.isMenuOpen);

  const renderCenterContent = () => {
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
    <Container>
      <Left>
        <Header>
          <MenuBtn type="menu" />
          <MenuBtn type="beauty" />
          <MenuBtn type="health" />
        </Header>
        <Body>
        </Body>
      </Left>
      <Center>
        <Header>
          <HelloWorld />
        </Header>
        <Body>
          <Btn onClick={() => navigate('/')}>초기 화면</Btn>
        </Body>
      </Center>
      {isMenuOpen ? (
        <RightMenuOpen>
        <MenuGrid><MenuBtn type="question" /></MenuGrid>
        <MenuGrid><MenuBtn type="question" /></MenuGrid>
        <MenuGrid><MenuBtn type="question" /></MenuGrid>
        <MenuGrid><MenuBtn type="question" /></MenuGrid>
        <MenuGrid><MenuBtn type="question" /></MenuGrid>
        <MenuGrid><MenuBtn type="question" /></MenuGrid>
        <MenuGrid><MenuBtn type="question" /></MenuGrid>
        <MenuGrid><MenuBtn type="question" /></MenuGrid>
      </RightMenuOpen>
      ) : (
        <Right>
          <Header>
            <DateTime />
          </Header>
          <Body>
            <PageHeader>
              <PageButton onClick={() => setActivePage('bus')}>버스 정보</PageButton>
              <PageButton onClick={() => setActivePage('bus1')}>버스 정보</PageButton>
            </PageHeader>
            <PageBody key={activePage}>
              {renderCenterContent()}
            </PageBody>
          </Body>
        </Right>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const Left = styled.div`
  flex: 25%;
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const Center = styled.div`
  flex: 50%;
  display: flex;
  flex-direction: column;
`;

const Right = styled.div`
  flex: 25%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex; 
  height: 22%;
  justify-content: center;
  align-items: center; 
  padding: 0 20px;
  gap: 20px;
`;

const Body = styled.div`
  height: 78%;
  justify-content: center;
  padding: 0 20px; 
`;

const Btn = styled.p`
padding: 10px 20px;
font-size: 1.5em;
font-weight: bold;
text-align:center;
margin: 5px; 
color: ${TEXT_COLOR};
cursor: pointer; 
`;

const PageHeader = styled.div`
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
  transition: all 0.3s ease; 

  &:focus {
    outline: none;
    margin: 0 30px;
    color: #2ecc71;
    transform: translateY(-2px); 
  }

  &:active {
    transform: translateY(1px); 
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const PageBody = styled.div`
  display: flex;
  justify-content: center;
  opacity: 1; 
  animation: ${fadeIn} 1s ease forwards;
`;

const RightMenuOpen = styled.div`
  flex: 25%;
  display: flex;
  flex-direction: row; // 방향을 row로 변경
  flex-wrap: wrap; // 아이템들이 줄바꿈되도록 설정
  justify-content: center; // 가운데 정렬
  align-items: center; // 세로축 가운데 정렬
  background-color: rgba(0, 0, 0, 0.7);
  gap: 10px;
`;

const MenuGrid = styled.div`
  display: flex;
  flex-basis: calc(50% - 10px); // 가로 크기를 부모의 50%로 설정하고, gap을 고려하여 조정
  justify-content: center;
  align-items: center;
  margin-bottom: 10px; // 세로 간격
`;


export default Mirror
