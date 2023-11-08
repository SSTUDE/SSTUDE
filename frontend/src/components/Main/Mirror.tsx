import React from 'react';
import styled from 'styled-components';
import MenuBtn from '../Common/MenuBtn';
import HelloWorld from '../Common/HelloWorld';
import DateTime from '../Common/DateTime';
import { useNavigate } from 'react-router-dom';
import { TEXT_COLOR } from '../../constants/defaultSlices';
import Bus from '../Bus/Bus';

const Mirror = () => {
  const navigate = useNavigate()

  return (
    <>
      <Header>
        <MenuBtn type="menu" />
        <HelloWorld />
        <DateTime/>
      </Header>
      <Body>
        <Btn onClick={() => navigate('/')}>초기 화면</Btn>
        <Btn onClick={() => navigate('/')}>초기 화면</Btn>
        <Bus/>
      </Body>
      <Bottom>
      </Bottom>
    </>
  )
}

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
