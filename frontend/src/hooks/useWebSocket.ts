import { useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { processMessage } from "../components/Login/LoginSlice";
// import { addCameraMessage } from "../components/Personal/Capture/CaptureSlice";

export const useWebSocket = (url: string, maxReconnectAttempts: number = 3) => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);
  const [messages, setMessages] = useState<string[]>([]);

  // const captureConsoleLog = () => {
  //   const originalConsoleLog = console.log;
  //   const originalConsoleError = console.error;

  //   console.log = (...args: any[]) => {
  //     setMessages((prev) => [...prev, `Log: ${args.join(" ")}`]);
  //     originalConsoleLog(...args);
  //   };

  //   console.error = (...args: any[]) => {
  //     setMessages((prev) => [...prev, `Error: ${args.join(" ")}`]);
  //     originalConsoleError(...args);
  //   };
  // };

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
      }
      else if (event.data.type === "on" || event.data.type === "off") {
        // dispatch(addCameraMessage(event.data));
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
    // captureConsoleLog();
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

    // 선택적: 타임아웃을 설정하여 일정 시간 후에 응답이 없으면 Promise를 reject
    // const timeout = setTimeout(() => {
    //   socket.removeEventListener("message", messageListener);
    //   reject(new Error("Response timeout."));
    // }, 10000); // 10초 후 타임아웃

    // 클린업 함수: 타임아웃 클리어
    // const cleanup = () => {
    //   clearTimeout(timeout);
    // };

    // 현재 생성된 Promise에 대한 참조를 cleanup 함수에 연결
    // 이것이 올바른 방법입니다.
    // Promise의 .then()과 .catch()를 통해 cleanup 함수가 호출되도록 설정
  })//.then(cleanup).catch(cleanup);
};
  
  return { messages, handleReconnect, sendMessage };
};
