import { useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";

export const useWebSocket = (url: string, maxReconnectAttempts: number = 3) => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);
  const [messages, setMessages] = useState<string[]>([]);

  // 웹소켓 연결 함수
  const connect = () => {
    console.log(`시도횟수 : ${reconnectAttempts.current}`);
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
  
  //NOTE - 카메라 껏다 키면 바로 로그인 작업 들어가나?
// 메시지 보내기
const sendMessage = (message: any) => {
  return new Promise((resolve, reject) => {
    console.log("sendMessage 함수 시작");

    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.error("웹소켓 연결 실패"); 
      return reject(new Error("웹소켓이 연결되지 않았습니다."));
    }

    const messageListener = (event: any) => {
      console.log("메시지 수신됨", event);
      const responseData = JSON.parse(event.data);

      if (responseData && responseData.type === message.type) {
        console.log("예상 응답 수신", responseData);
        resolve(responseData);
        socket.removeEventListener("message", messageListener);
      }
    };

    socket.addEventListener("message", messageListener);

    console.log("메시지 전송", message);
    socket.send(JSON.stringify(message));
  }); 
};


  return { messages, handleReconnect, sendMessage };
};
