import { useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { processMessage } from "../components/Login/LoginSlice";
import { addCameraMessage } from "../components/Personal/Capture/CaptureSlice";

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

      if (["signUp", "signIn", "signOut"].includes(event.data.type)) {
        dispatch(processMessage(event.data));
      } else if (event.data.type === "on" || event.data.type === "off") {
        dispatch(addCameraMessage(event.data));
      }
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

  // 메시지 보내기
  const sendMessage = (message: any) => {
    return new Promise((resolve, reject) => {
      // WebSocket이 열려있는지 확인
      if (!socket || socket.readyState !== WebSocket.OPEN) {
        return reject(new Error("웹소켓이 연결되지 않았습니다."));
      }

      // 메시지 수신 리스너 설정
      const messageListener = (event: any) => {
        const responseData = JSON.parse(event.data);

        // 예상 응답이 맞는지 확인 후 처리
        if (responseData && responseData.type === message.type) {
          resolve(responseData);
          socket.removeEventListener("message", messageListener);
        }
      };

      // 메시지 리스너 등록
      socket.addEventListener("message", messageListener);

      // 메시지 전송
      socket.send(JSON.stringify(message));
    }); 
  };

  return { messages, handleReconnect, sendMessage };
};
