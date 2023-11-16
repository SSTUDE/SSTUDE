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

const Login = () => {
  console.log("0 - 렌더링")
  const { sendMessage } = useWebSocket(RASPBERRY_URL);
  const dispatch = useDispatch<AppDispatch>();
  const [isLogoClickable, setIsLogoClickable] = useState(true);
  const showAlert = useCustomAlert();
  const navigate = useNavigate()


  const handleClick = () => {
    showAlert({
      icon: 'success',
      title: '',
      html: '',
    });
  };

  //NOTE - 로고 클릭
  const handleLogoClick = () => {
    if (!isLogoClickable) return;
    setIsLogoClickable(false);
    const audio = new Audio(sounds.main.blop);
    audio.play();
    console.log("회원가입 시도")
    loginClick()
    setTimeout(() => {
      setIsLogoClickable(true);
    }, 5000);
  };

  // NOTE - 회원가입
  const SignClick = () => {
    const message = { type: "signUp", data: "" };
    console.log("회원가입 - 라즈베리로 { type:signUp, data: } 전송 ")

    showAlert({
      icon: 'info',
      title: '회원가입 진행중... \n 얼굴을 중앙에 위치해 주세요.',
      timer: 20000,
    });
    sendMessage(message)
      .then((response: any) => {
        console.log("회원가입 - 웹소켓 응답 받았고 서버로 전송");
        dispatch(signUpUser({ deviceNum: response.data.userInfo + response.data.serialNum }));
        // dispatch(signUpUser({ deviceNum: "string" }));

        console.log("회원가입 - 응답 받음:", response);
        console.log(" !!!!! 회원가입 성공 !!!!!")
        console.log("회원가입 완료후 로그인 시도")

        Swal.close();
        showAlert({
          icon: 'success',
          title: '회원가입 완료, 로그인이 진행됩니다.',
        });

        setTimeout(() => { loginClick(); }, 1000);

      })
      .catch(error => {
        console.log(error)
        console.error("회원가입 - 메시지 전송에 실패했습니다:", error);
      });
  }

  //NOTE - 로그인
  const loginClick = () => {
    showAlert({
      icon: 'info',
      title: '로그인 진행중...',
    });
    const message = { type: "signIn", data: "" };
    console.log("로그인 - 라즈베리로 { type:signIn, data: } 전송 ")
    sendMessage(message)
      .then((response: any) => {
        // NOTE - 등록되지 않은 유저
        if (response.data.userInfo === "unKnown") {
          showAlert({
            icon: 'info',
            title: '등록된 유저가 아닙니다. \n 회원가입이 진행됩니다',
          });
          SignClick()
        } else {
          //NOTE - 등록된 유저
          console.log("로그인 - 웹소켓 응답 받았고 서버로 전송");
          dispatch(signInUser({ deviceNum: response.data.userInfo + response.data.serialNum }));
          // dispatch(signInUser({ deviceNum: "string" }));
          console.log("로그인 - 응답 받음:", response);
          console.log(" !!!!! 로그인 성공 !!!!!")
          showAlert({
            icon: 'success',
            title: '로그인 완료',
          });
          navigate("/mirror")
        }
      })
      .catch(error => {
        console.log(error)
        console.error("로그인 - 메시지 전송에 실패했습니다:", error);
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
