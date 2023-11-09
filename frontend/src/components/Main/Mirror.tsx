import Bus from '../Bus/Bus';
import styled from 'styled-components';
import MenuBtn from '../Common/MenuBtn';
import React, { useState } from 'react';
import DateTime from '../Common/DateTime';
import HelloWorld from '../Common/HelloWorld';
import { useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import { TEXT_COLOR } from '../../constants/defaultSlices';

const Mirror = () => {
  const navigate = useNavigate();
  const [busIndex, setBusIndex] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => setBusIndex((prev) => (prev + 1) % 2),
    onSwipedRight: () => setBusIndex((prev) => (prev - 1 + 2) % 2),
    preventScrollOnSwipe : true, 
    trackMouse: true
  });

  return (
    <>
      <Header>
        <MenuBtn type="menu" />
        <HelloWorld />
        <DateTime />
      </Header>
      <Body {...handlers}>
        <Btn onClick={() => navigate('/')}>초기 화면</Btn>
        <Btn onClick={() => navigate('/')}>초기 화면</Btn>
        {busIndex === 0 ? <Bus /> : <Btn onClick={() => navigate('/')}>초기 화면</Btn>}
      </Body>
      <Bottom />
    </>
  );
};

const Header = styled.div`
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  padding: 0 20px;
`;

const Body = styled.div`
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  padding: 0 20px; 
`;

const Bottom = styled.div`
  /* background-color: yellow; */
`

const Btn = styled.p`
padding: 10px 20px;
font-size: 1.5em;
font-weight: bold;
margin: 5px; 
color: ${TEXT_COLOR};
cursor: pointer; 
`;


export default Mirror
