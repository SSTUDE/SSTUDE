import React from 'react';
import { useWebSocket } from '../../hooks/useWebSocket';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { messages, handleReconnect } = useWebSocket('wss://localhost:8765');
  const navigate = useNavigate();

  return (
    <>
      <Header></Header>
      <Body>
        <button onClick={() => navigate('/')}>메인</button>
        <ConsoleOutput>
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </ConsoleOutput>
        <button onClick={handleReconnect}>재연결 시도</button>
      </Body>
      <Bottom></Bottom>
    </>
  );
};

const Header = styled.div`
  width: 100vw;
  background-color: red;
`;

const Body = styled.div`
  background-color: lightblue;
`;

const Bottom = styled.div`
  background-color: yellow;
`;

const ConsoleOutput = styled.div`
  font-size: 16px;
  color: black;
  white-space: pre-wrap;
`;

export default Login;
