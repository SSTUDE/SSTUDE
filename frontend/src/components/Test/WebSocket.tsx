
import styled from 'styled-components';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWebSocket } from '../../hooks/useWebSocket';
import { TEXT_COLOR } from '../../constants/defaultSlices';


const WebSocket = () => {
  const { messages, handleReconnect, sendMessage } = useWebSocket('ws://localhost:8765');
  const [inputMessage, setInputMessage] = useState('');
  const navigate = useNavigate();

  const handleSendMessage = () => {
    sendMessage(inputMessage);
    setInputMessage('');
  };

  //NOTE - 회원가입
  //NOTE - 리덕스에서 받은 TryLogin 이 true이면 웹소켓으로 SignUp 메시지 전송
  //NOTE - 이후 웹소켓으로 SerialNumber, folderName 값을 받음
  //NOTE - Request Body로 Device Num: SerialNumber + folderName 담아서 서버로 전송
  //NOTE - memberId 받아옴

  //NOTE - 회원가입 -> 로그인
  //NOTE - 3번 한번 더 함
  //NOTE - 액세스 토큰 받아옴
  //NOTE - 해당 토큰 리덕스에 저장해서 재활용

  //NOTE - 로그인
  //NOTE - 2번 하고 리덕스에서 같은값인지 체크
  //NOTE - 다를시 3번 하고
  //NOTE - 액세스 토큰 받아옴
  //NOTE - 해당 토큰 리덕스에 저장해서 재활용

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
        <Btn onClick={handleSendMessage}>메시지 보내기</Btn>
        <Btn onClick={handleReconnect}>재연결 시도</Btn>
        <Btn onClick={() => navigate('/')}>초기 화면</Btn>
      </Body>
      <Bottom></Bottom>
    </>
  );
};

const Header = styled.div`
  width: 100vw;
  /* background-color: red; */
`;

const Body = styled.div`
  /* background-color: lightblue; */
  text-align: center;
`;

const Bottom = styled.div`
  /* background-color: yellow; */
`;

const ConsoleOutput = styled.div`
  font-size: 16px;
  color: ${TEXT_COLOR};
  white-space: pre-wrap;
`;

const Btn = styled.p`
padding: 10px 20px;
font-size: 1.5em;
font-weight: bold;
margin: 5px; 
color: ${TEXT_COLOR};
cursor: pointer; 
`;

export default WebSocket;