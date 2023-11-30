import { useState, useEffect, useRef } from "react";

export const useWebSocket = (url: string, maxReconnectAttempts: number = 3) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);
  const [messages, setMessages] = useState<string[]>([]);

  const connect = () => {

    const ws = new WebSocket(url);

    ws.onopen = () => {
      reconnectAttempts.current = 0;
    };

    ws.onmessage = (event) => {
    };

    ws.onerror = (error) => {
      console.error("웹소켓 오류:", error);
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

  useEffect(() => {
    connect();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const handleReconnect = () => {
    reconnectAttempts.current = 0;
    connect();
  };

  const sendMessage = (message: any) => {
    return new Promise((resolve, reject) => {
      if (!socket || socket.readyState !== WebSocket.OPEN) {
        console.error("웹소켓이 연결되지 않았습니다.");
        return
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
