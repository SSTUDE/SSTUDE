import { RootState } from '../../store/store';
import { sounds } from '../../constants/sounds';
import { images } from '../../constants/images';
import { AppDispatch } from '../../store/store';
import { RASPBERRY_URL } from '../../apis/constants';
import styled, { keyframes } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useWebSocket } from '../../hooks/useWebSocket';
import { TEXT_COLOR } from '../../constants/defaultSlices';
import React, { useCallback, useEffect, useState } from 'react';
import { signUpUser, signInUser, setMemberId } from "./LoginSlice";

const Login = () => {
  const { sendMessage } = useWebSocket(RASPBERRY_URL);
  const [signUpAlert, setsignUpAlert] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const loginState = useSelector((state: RootState) => state.login);
  const [isLogoClickable, setIsLogoClickable] = useState(true);

  const handleSignUp = useCallback(async () => {
    const data = {
      deviceNumber: "d204"
      // deviceNumber: loginState.serialNum + loginState.userInfo
    };
    const actionResult = await dispatch(signUpUser(data));
    const res = actionResult.payload;
    if (res && res.memberId) {
      dispatch(setMemberId(res.memberId));
      setsignUpAlert('회원가입 완료');
      //NOTE - 서버쪽 되면 미러 네비게이션 주석 해제할거임 + 위에 회원가입 알림 지울거임
      // navigate('/mirror');
    }
  }, [dispatch]);

  const handleSignIn = useCallback(async () => {
    const data = {
      deviceNumber: "d204"
      // deviceNumber: loginState.serialNum + loginState.s
    };
    const actionResult = await dispatch(signInUser(data));
    const res = actionResult.payload;
    if (res && res.memberId) {
      dispatch(setMemberId(res.memberId));
      setsignUpAlert('로그인 완료');
      //NOTE - 서버쪽 되면 미러 네비게이션 주석 해제할거임
      // navigate('/mirror');
    }
  }, [dispatch]);

  useEffect(() => {
    if (loginState.signUp) {
      //NOTE - 회원가입 체크용 + 서버 연결되면 완료 알림 지울거
      setsignUpAlert('회원가입 완료');
      // handleSignUp();
    } else if (loginState.signIn) {
      //NOTE - 로그인 체크용 + 서버 연결되면 완료 알림 지울거
      setsignUpAlert('로그인 완료');
      // handleSignIn();
    }
  }, [loginState, handleSignUp, handleSignIn]);

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

  const handleLogoClick = () => {
    if (!isLogoClickable) return;

    setIsLogoClickable(false);
    const audio = new Audio(sounds.main.blop);
    audio.play();

    const message = JSON.stringify({ type: "signUp", data: "" });
    console.log("로고 눌렀고 서버로 { type:signUp, data: } 전송 ")
    sendMessage(message);

    setTimeout(() => {
      setIsLogoClickable(true);
    }, 5000);
  };

  return (
    <Wrap>
      <StyledImage
        src={images.main.logo}
        alt="로고"
        onClick={handleLogoClick}
      />
      <Btn>{signUpAlert}</Btn>
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
font-size: 1.5em;
font-weight: bold;
margin: 5px; 
color: ${TEXT_COLOR};
cursor: pointer; 
`

export default Login;