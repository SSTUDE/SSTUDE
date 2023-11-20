import Swal from "sweetalert2";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router";
import { sounds } from '../../constants/sounds';
import { images } from '../../constants/images';
import { AppDispatch } from '../../store/store';
import { RASPBERRY_URL } from '../../apis/constants';
import { useCustomAlert } from "../../hooks/useAlert";
import styled, { keyframes } from 'styled-components';
import { signInUser, signUpUser } from "./LoginSlice";
import { useWebSocket } from '../../hooks/useWebSocket';
import { TEXT_COLOR } from '../../constants/defaultSlices';
import { saveBusListForServer, saveBusStopForServer } from "../Bus/BusSlice";

const Login = () => {
  const { sendMessage } = useWebSocket(RASPBERRY_URL);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const showAlert = useCustomAlert();
  const [isLogoClickable, setIsLogoClickable] = useState(true);

  //NOTE - 로고 클릭
  const handleLogoClick = () => {
    if (!isLogoClickable) return;
    setIsLogoClickable(false);
    const audio = new Audio(sounds.main.blop);
    audio.play();
    loginClick()
    setTimeout(() => {
      setIsLogoClickable(true);
    }, 5000);
  };

  // NOTE - 회원가입
  const SignClick = () => {
    const message = { type: "signUp", data: "" };
    showAlert({
      icon: 'info',
      title: '회원가입 중입니다... \n 얼굴을 중앙에 위치해 주세요.',
      timer: 20000,
    });
    sendMessage(message)
      .then((response: any) => {
    // dispatch(signUpUser({ deviceNum: 'string' }));
    dispatch(signUpUser({ deviceNum: response.data.userInfo + response.data.serialNum }));

    Swal.close();
    showAlert({
      icon: 'success',
      title: '회원가입 완료, 로고를 눌러주세요.',
    });
    setTimeout(() => { loginClick(); }, 1000);
    })
    .catch((error: Error) => {
      console.log(error)
    });
  }

  //NOTE - 로그인
  const loginClick = () => {
    const message = { type: "signIn", data: "" };
    sendMessage(message)
    .then((response: any) => {

    // dispatch(signInUser({ deviceNum: 'string' }));
    dispatch(signInUser({ deviceNum: response.data.userInfo + response.data.serialNum }));
    showAlert({
      icon: 'success',
      title: '로그인 완료',
    });
    dispatch(saveBusStopForServer())
    dispatch(saveBusListForServer())
    navigate("/mirror")

  })
  .catch((error: Error) => {
    console.log(error)
    showAlert({
      icon: 'error',
      title: '로그인 실패. 다시 시도해주세요',
    });
  });
  }

  return (
    <Wrap>
      <StyledImage
        src={images.main.logo}
        alt="로고"
        onClick={handleLogoClick}
      />
      <Btn onClick={() => SignClick()}>회원가입</Btn>
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
  position: absolute;
  bottom: 20%;
  right: 10%;
  padding: 10px 20px;
  font-size: 3em;
  font-weight: bold;
  margin: 5px;
  color: ${TEXT_COLOR};
  cursor: pointer;
`;

export default Login;
