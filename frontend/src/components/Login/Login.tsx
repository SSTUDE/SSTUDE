import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const maxReconnectAttempts = 3;
  let reconnectAttempts = 0

  const [messages, setMessages] = useState<string[]>([]); 

  //ANCHOR - console.log 가로채기
  const captureConsoleLog = () => {
    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;

    console.log = (...args) => {
      setMessages(prev => [...prev, `Log: ${args.join(' ')}`]);
      originalConsoleLog(...args);
    };

    console.error = (...args) => {
      setMessages(prev => [...prev, `Error: ${args.join(' ')}`]);
      originalConsoleError(...args);
    };
  };
  
  //ANCHOR - WebSocket
  const connectWebSocket = useCallback(() => {
    console.log(reconnectAttempts)
    const ws = new WebSocket('wss://localhost:8765'); //NOTE - 웹소켓 주소

    ws.onopen = () => {
      console.log('웹소켓 연결됨');
      reconnectAttempts = 0 //NOTE - 연결 성공 시 재연결 시도 횟수 초기화
      //NOTE -  서버에 메시지 보내기
      ws.send('hi, suchan');
    };

    //NOTE - 메시지 수신 이벤트 핸들러
    ws.onmessage = (event) => {
      console.log('수신된 메시지:', event.data)
    };

    //NOTE - 에러 이벤트 핸들러
    ws.onerror = (error) => {
      console.error('웹소켓 에러 발생:', error);
    };

    //NOTE - 연결 종료 이벤트 핸들러
    ws.onclose = () => {
      console.log('웹소켓 연결 종료됨');
      if (reconnectAttempts < maxReconnectAttempts) {
        setTimeout(() => {
          reconnectAttempts++;
          console.log(`재연결 시도 ${reconnectAttempts}`);
          connectWebSocket();
        }, 3000); //NOTE - 3초후 재연결시도
      }
    };
    setSocket(ws);
  }, []);
  
  useEffect(() => {
    captureConsoleLog();
    connectWebSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [connectWebSocket]);

  const handleReconnect = () => {
    reconnectAttempts = 0;
    connectWebSocket();
  };

  const navigate = useNavigate()

  return (
    <>
      <Header></Header>
      <Body>
        <button onClick={()=>navigate('/')}>메인</button>
        <ConsoleOutput>
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </ConsoleOutput>
        <button onClick={handleReconnect}>재연결 시도</button>
      </Body>
      <Bottom></Bottom>
    </>    
  )
}

const Header = styled.div`
  width: 100vw;
  background-color: red;
`

const Body = styled.div`
  background-color: lightblue;
`

const Bottom = styled.div`
  background-color: yellow;
`

const ConsoleOutput = styled.div`
  font-size: 16px;
  color: black;
  white-space: pre-wrap;
`;

export default Login
