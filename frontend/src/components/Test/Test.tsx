import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Test = () => {
  const navigate = useNavigate();
  
  return (
    <Body>
      <button onClick={() => navigate('/testwidth')}>테스트 가로</button>
      <button onClick={() => navigate('/testheight')}>테스트 세로</button>
      <button onClick={() => navigate('/')}>메인화면</button>
      <button onClick={() => navigate('/test1')}>Test</button>
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
  background-color: lightblue;
`;

export default Test;
