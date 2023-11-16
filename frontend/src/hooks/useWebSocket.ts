import { useState, useEffect, useRef } from "react";

export const useWebSocket = (url: string, maxReconnectAttempts: number = 3) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);
  const [messages, setMessages] = useState<string[]>([]);

  // 웹소켓 연결 함수
  const connect = () => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      reconnectAttempts.current = 0;
    };

    ws.onmessage = (event) => {
    };

    ws.onerror = (error) => {
    };

    ws.onclose = () => {
      if (reconnectAttempts.current < maxReconnectAttempts) {
        setTimeout(() => {
          reconnectAttempts.current++;
          connect();
        }, 3000);
      }
    };

    setSocket(ws);
  };

  // 웹소켓 연결 및 정리
  useEffect(() => {
    connect();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  // 재연결 핸들러
  const handleReconnect = () => {
    reconnectAttempts.current = 0;
    connect();
  };

  // 메시지 보내기
  const sendMessage = (message: any) => {
    return new Promise((resolve, reject) => {

      if (!socket || socket.readyState !== WebSocket.OPEN) {
        return reject(new Error("웹소켓이 연결되지 않았습니다."));
      }

      const messageListener = (event: any) => {
        const responseData = JSON.parse(event.data);

        if (responseData && responseData.type === message.type) {
          resolve(responseData);
          socket.removeEventListener("message", messageListener);
        }
      };

      socket.addEventListener("message", messageListener);

      socket.send(JSON.stringify(message));
    });
  };

  return { messages, handleReconnect, sendMessage };
};
