import { RootState } from '../../store';
import images from '../../assets/images';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useWebSocket } from '../../hooks/useWebSocket';
import { TEXT_COLOR } from '../../constants/defaultSlices';

const Login = () => {
  const { sendMessage } = useWebSocket('ws://localhost:8765');
  const loginState = useSelector((state: RootState) => state.login);
  const navigate = useNavigate();
  const [signUp, setsignUp] = useState('')

  useEffect(() => {
    if (loginState.signIn === true) {
      setsignUp('회원가입 완료')
      // navigate('/mirror');
    }
  }, [loginState, navigate]);

  const handleLogoClick = () => {
    const message = JSON.stringify({ type: "signUp", data: "" });
    sendMessage(message);
  };

  //NOTE - 회원가입
  //NOTE - 로고 웹소켓으로 SignUp 메시지 전송 - clear
  //NOTE - 이후 웹소켓으로 SerialNumber, folderName 값을 받음 - clear
  //NOTE - Request Body로 Device Num: SerialNumber + folderName 담아서 서버로 전송
  //NOTE - memberId 받아옴

  //NOTE - 회원가입 -> 로그인3
  //NOTE - 3번 한번 더 함
  //NOTE - 액세스 토큰 받아옴
  //NOTE - 해당 토큰 리덕스에 저장해서 재활용

  //NOTE - 로그인
  //NOTE - 2번 하고 리덕스에서 같은값인지 체크
  //NOTE - 다를시 3번 하고
  //NOTE - 액세스 토큰 받아옴
  //NOTE - 해당 토큰 리덕스에 저장해서 재활용

  return (
    <Wrap>
      <StyledImage src={images.logo} alt="로고" onClick={handleLogoClick} />
      <Btn>{signUp}</Btn>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const StyledImage = styled.img`
  width: 50%; 
  height: auto;
  animation: ${pulse} 2s infinite ease-in-out;
`;

const Btn = styled.p`
padding: 10px 20px;
font-size: 1.5em;
font-weight: bold;
margin: 5px; 
color: ${TEXT_COLOR};
cursor: pointer; 
`

export default Login;