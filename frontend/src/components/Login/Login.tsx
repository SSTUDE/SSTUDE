import { signInUser, signUpUser } from "./LoginSlice";
import {  useDispatch } from 'react-redux';
import { sounds } from '../../constants/sounds';
import { images } from '../../constants/images';
import { AppDispatch } from '../../store/store';
import React, { useEffect, useState } from 'react';
import { RASPBERRY_URL } from '../../apis/constants';
import styled, { keyframes } from 'styled-components';
import { useWebSocket } from '../../hooks/useWebSocket';
import { TEXT_COLOR } from '../../constants/defaultSlices';

const Login = () => {
  console.log("0 - 렌더링")

  const { sendMessage } = useWebSocket(RASPBERRY_URL);
  const dispatch = useDispatch<AppDispatch>();
  const [isLogoClickable, setIsLogoClickable] = useState(true);

  useEffect(() => {
    loginClick()
  }, []);

  const handleLogoClick = () => {
    if (!isLogoClickable) return;
    setIsLogoClickable(false);
    const audio = new Audio(sounds.main.blop);
    audio.play();
    console.log("회원가입 시도")
    SignClick()
    setTimeout(() => {
      setIsLogoClickable(true);
    }, 5000);
  };

  // NOTE - 이건 라즈베리 없어도 되게 하는 더미데이터 작동 코드에용
  const SignClick = () => {
    const message = { type: "signUp", data: "" };
    console.log("회원가입 - 라즈베리로 { type:signUp, data: } 전송 ")

    sendMessage(message)
    .then((response: any) => { 
      console.log("회원가입 - 웹소켓 응답 받았고 서버로 전송");
      dispatch(signUpUser({deviceNum : response.data.userInfo+response.data.serialNum}));
      // dispatch(signUpUser({deviceNum : "string"}));

      console.log("회원가입 - 응답 받음:", response);
      console.log(" !!!!! 회원가입 성공 !!!!!")
      console.log("회원가입 완료후 로그인 시도")
      loginClick()
    })
    .catch(error => {
      console.log(error)
      console.error("회원가입 - 메시지 전송에 실패했습니다:", error);
    });  
  }

  const loginClick = () => {
    const message = { type: "signIn", data: "" };
    console.log("로그인 - 라즈베리로 { type:signIn, data: } 전송 ")
    sendMessage(message)
    .then((response: any) => {
        console.log("로그인 - 웹소켓 응답 받았고 서버로 전송");
        dispatch(signInUser({deviceNum : response.data.userInfo+response.data.serialNum}));
        // dispatch(signInUser({deviceNum : "string"}));
      console.log("로그인 - 응답 받음:", response);
      console.log(" !!!!! 로그인 성공 !!!!!")
    })
    .catch(error => {
      console.log(error)
      console.error("로그인 - 메시지 전송에 실패했습니다:", error);
    });   
  }

  return (
    <Wrap>
      <StyledImage
        src={images.main.logo}
        alt="로고"
        // onClick={handleLogoClick}
      />
      <Btn onClick={() => SignClick()}>회원가입</Btn>
      <Btn onClick={() => loginClick()}>로그인</Btn>
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

const flip = keyframes`
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
`;

const StyledImage = styled.img`
  width: 50%; 
  height: auto;
  animation: ${pulse} 2s infinite ease-in-out;
  &:hover {
    animation: ${flip} 0.5s ease-in-out forwards;
  }
`;

const Btn = styled.p`
padding: 10px 20px;
font-size: 3em;
font-weight: bold;
margin: 5px; 
color: ${TEXT_COLOR};
cursor: pointer; 
`

export default Login;
