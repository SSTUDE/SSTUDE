import React from 'react';
import styled from 'styled-components';
import MenuBtn from '../Common/MenuBtn';
import HelloWorld from '../Common/HelloWorld';
import DateTime from '../Common/dateTime';
import { useNavigate } from 'react-router-dom';
import { TEXT_COLOR } from '../../constants/defaultSlices';

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
      </Body>
      <Bottom>
        <Btn onClick={() => navigate('/')}>초기 화면</Btn>
      </Bottom>
    </>
  )
}

const Header = styled.div`
  width: 100vw;
  /* background-color: red; */
`

const Body = styled.div`
  text-align: center;
  /* background-color: lightblue; */
`

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
