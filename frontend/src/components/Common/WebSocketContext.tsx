import React, { createContext, useContext, ReactNode } from 'react';
import { useWebSocket } from '../../hooks/useWebSocket';
import { RASPBERRY_URL } from '../../apis/constants';

const WebSocketContext = createContext<{ sendMessage?: (message: string) => void }>({});
console.log("11 - 로그인후 토큰 전달을 위한 웹소켓 연결 시도")

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  console.log("12 - 웹소켓 연결 성공")
    const { sendMessage } = useWebSocket(RASPBERRY_URL);
  const value = { sendMessage };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => useContext(WebSocketContext);
