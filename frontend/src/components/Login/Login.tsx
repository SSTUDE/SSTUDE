import React, { useState } from 'react';
import { useWebSocket } from '../../hooks/useWebSocket';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { messages, handleReconnect, sendMessage } = useWebSocket('wss://localhost:8765');
  const navigate = useNavigate();
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    sendMessage(inputMessage);
    setInputMessage('');
  };

  return (
    <>
      <Header></Header>
      <Body>
        <ConsoleOutput>
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </ConsoleOutput>
        <input 
          type="text" 
          value={inputMessage} 
          onChange={(e) => setInputMessage(e.target.value)} 
          placeholder="메시지 입력" 
        />
        <button onClick={handleSendMessage}>메시지 보내기</button>
        <button onClick={handleReconnect}>재연결 시도</button>
        <button onClick={() => navigate('/')}>메인</button>
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
  text-align: center;
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
