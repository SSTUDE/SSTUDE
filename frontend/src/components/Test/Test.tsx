import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { TEXT_COLOR } from '../../constants/defaultSlices'

const Test = () => {
  const navigate = useNavigate();

  return (
    <Body>
      <Btn onClick={() => navigate('/testwidth')}>테스트 가로</Btn>
      <Btn onClick={() => navigate('/testheight')}>테스트 세로</Btn>
      <Btn onClick={() => navigate('/testmain')}>Test</Btn>
      <Btn onClick={() => navigate('/websocket')}>웹소켓</Btn>
      <Btn onClick={() => navigate('/testcolor')}>색 테스트</Btn>
      <Btn onClick={() => navigate('/')}>초기 화면</Btn>
    </Body>
  );
};

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  /* background-color: lightblue; */
`;

const Btn = styled.p`
padding: 10px 20px;
font-size: 1.5em;
font-weight: bold;
margin: 5px; 
color: ${TEXT_COLOR};
cursor: pointer; 
`;

export default Test;
