import React, { createContext, useContext, ReactNode } from 'react';
import { useWebSocket } from '../../hooks/useWebSocket';
import { RASPBERRY_URL } from '../../apis/constants';

const WebSocketContext = createContext<{ sendMessage?: (message: string) => void }>({});

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
    const { sendMessage } = useWebSocket(RASPBERRY_URL);
  const value = { sendMessage };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => useContext(WebSocketContext);
