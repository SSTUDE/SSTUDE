
// import styled from 'styled-components';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useWebSocket } from '../../hooks/useWebSocket';
// import { TEXT_COLOR } from '../../constants/defaultSlices';


// const WebSocket = () => {
//   const { messages, handleReconnect, sendMessage } = useWebSocket('ws://localhost:8765');
//   const [inputMessage, setInputMessage] = useState('');
//   const navigate = useNavigate();

//   const handleSendMessage = () => {
//     sendMessage(inputMessage);
//     setInputMessage('');
//   };

//   return (
//     <>
//       <Header></Header>
//       <Body>
//         <ConsoleOutput>
//           {messages.map((msg, index) => (
//             <div key={index}>{msg}</div>
//           ))}
//         </ConsoleOutput>
//         <input
//           type="text"
//           value={inputMessage}
//           onChange={(e) => setInputMessage(e.target.value)}
//           placeholder="메시지 입력"
//         />
//         <Btn onClick={handleSendMessage}>메시지 보내기</Btn>
//         <Btn onClick={handleReconnect}>재연결 시도</Btn>
//         <Btn onClick={() => navigate('/')}>초기 화면</Btn>
//       </Body>
//       <Bottom></Bottom>
//     </>
//   );
// };

// const Header = styled.div`
//   width: 100vw;
//   /* background-color: red; */
// `;

// const Body = styled.div`
//   /* background-color: lightblue; */
//   text-align: center;
// `;

// const Bottom = styled.div`
//   /* background-color: yellow; */
// `;

// const ConsoleOutput = styled.div`
//   font-size: 16px;
//   color: ${TEXT_COLOR};
//   white-space: pre-wrap;
// `;

// const Btn = styled.p`
// padding: 10px 20px;
// font-size: 1.5em;
// font-weight: bold;
// margin: 5px; 
// color: ${TEXT_COLOR};
// cursor: pointer; 
// `;

// export default WebSocket;
export {}