import { useState, useEffect, useRef } from "react";

export const useWebSocket = (url: string, maxReconnectAttempts: number = 3) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);
  const [messages, setMessages] = useState<string[]>([]);

  const captureConsoleLog = () => {
    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;

    console.log = (...args: any[]) => {
      setMessages((prev) => [...prev, `Log: ${args.join(" ")}`]);
      originalConsoleLog(...args);
    };

    console.error = (...args: any[]) => {
      setMessages((prev) => [...prev, `Error: ${args.join(" ")}`]);
      originalConsoleError(...args);
    };
  };

  // 웹소켓 연결 함수
  const connect = () => {
    console.log(`시도횟수 : ${reconnectAttempts.current}`)
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("웹소켓 연결됨");
      reconnectAttempts.current = 0;
    };

    ws.onmessage = (event) => {
      console.log("수신된 메시지:", event.data);
    };

    ws.onerror = (error) => {
      console.error("웹소켓 에러 발생:", error);
    };

    ws.onclose = () => {
      console.log("웹소켓 연결 종료됨");
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
    captureConsoleLog();
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

  return { messages, handleReconnect };
};
