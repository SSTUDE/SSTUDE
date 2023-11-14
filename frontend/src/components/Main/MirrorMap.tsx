import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { TEXT_COLOR } from '../../constants/defaultSlices';

const MirrorMap = () => {
  const navigate = useNavigate()
  return (
    <>
      <Header></Header>
      <Body>
        <Btn onClick={() => navigate('/login')}>로그인</Btn>
        <Btn onClick={() => navigate('/mirror')}>메인페이지</Btn>
        <Btn onClick={() => navigate('/test')}>테스트</Btn>
      </Body>
      <Bottom></Bottom>
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
font-size: 3em;
font-weight: bold;
margin: 5px; 
color: ${TEXT_COLOR};
cursor: pointer; 
`

export default MirrorMap
