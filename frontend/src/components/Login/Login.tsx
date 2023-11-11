import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
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
  console.log("0 - 렌더링")

  const { sendMessage } = useWebSocket(RASPBERRY_URL);
  const [signUpAlert, setsignUpAlert] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const loginState = useSelector((state: RootState) => state.login);
  const [isLogoClickable, setIsLogoClickable] = useState(true);
  const navigate = useNavigate();

  // const handleSignUp = useCallback(async () => {
  //   const data = {
  //     // deviceNum: "d204"
  //     deviceNum: loginState.serialNum + loginState.userInfo
  //   };
  //   console.log("5 - 회원가입 deviceNum", data)
  //   const actionResult = await dispatch(signUpUser(data));
  //   const res = actionResult.payload;
  //   if (res && res.memberId) {
  //     dispatch(setMemberId(res.memberId));
  //     setsignUpAlert('회원가입 완료');
  //     //NOTE - 서버쪽 되면 미러 네비게이션 주석 해제할거임 + 위에 회원가입 알림 지울거임
  //     // navigate('/mirror');
  //   }
  // }, [dispatch]);

  // const handleSignIn = useCallback(async () => {
  //   const data = {
  //     // deviceNum: "d204"
  //     deviceNum: loginState.serialNum + loginState.userInfo
  //   };
  //   console.log("9 - 로그인 deviceNum", data)
  //   const actionResult = await dispatch(signInUser(data));
  //   const res = actionResult.payload;
  //   if (res && res.memberId) {
  //     dispatch(setMemberId(res.memberId));
  //     setsignUpAlert('로그인 완료');
  //     //NOTE - 서버쪽 되면 미러 네비게이션 주석 해제할거임
  //     navigate('/mirror');
  //   }
  // }, [dispatch]);

  useEffect(() => {
    console.log("useEffect 재작동")
    console.log("1 -  로고 페이지 입장")
    if (loginState.signIn) {
      console.log("8 -  로그인 시도")
      //NOTE - 로그인 체크용 + 서버 연결되면 완료 알림 지울거
      setsignUpAlert('로그인 완료');
      // handleSignIn();
    } else if (loginState.signUp) {
      console.log("4 -  회원가입 시도")
      //NOTE - 회원가입 체크용 + 서버 연결되면 완료 알림 지울거
      setsignUpAlert('회원가입 완료');
      // handleSignUp();
    }
    console.log("2 - 로그인, 회원가입 아직 안됨")
  }, [loginState]);

  const handleLogoClick = () => {

    console.log("3 -  로고 클릭해서 회원가입 시도")

    if (!isLogoClickable) return;

    setIsLogoClickable(false);
    const audio = new Audio(sounds.main.blop);
    audio.play();

    const message = JSON.stringify({ type: "signUp", data: "" });
    console.log("로고 눌렀고 라즈베리로 { type:signUp, data: } 전송 ")
    sendMessage(message);

    setTimeout(() => {
      setIsLogoClickable(true);
    }, 5000);
  };

  // NOTE - 이건 라즈베리 없어도 되게 하는 더미데이터 작동 코드에용
  const SignClick = () => {
    const message = JSON.stringify({ type: "signUp", data: "" });
    console.log("로고 눌렀고 라즈베리로 { type:signUp, data: } 전송 ")
<<<<<<< HEAD
    sendMessage({ type: "signUp", data: "" })
    .then(response => {
      // console.log(loginState);
      // if (loginState.signUp) {
      console.log("웹소켓 응답 받았고 서버로 회원가입 전송")
      dispatch(signUpUser());
      // }
=======
    sendMessage(message)
    .then((response: any) => { // 여기서 'any' 대신 더 구체적인 타입을 사용하는 것이 좋습니다.
      if (loginState.signUp) {
        console.log("웹소켓 응답 받았고 서버로 회원가입 전송");
        dispatch(signUpUser({deviceNum : response.data.userInfo+response.data.serialNum}));
      }
>>>>>>> origin/iot
      // 서버로부터의 응답 처리
      console.log("응답 받음:", response);
    })
    .catch(error => {
      console.log(error)
      // 에러 처리
      console.error("메시지 전송에 실패했습니다:", error);
    });    // if (loginState.signUp) {
    //   console.log("서버로 전송")
    // }
  }

  const loginClick = () => {
    const message = JSON.stringify({ type: "signIn", data: "" });
    console.log("로고 눌렀고 라즈베리로 { type:signIn, data: } 전송 ")
    sendMessage(message)
    .then((response: any) => { // 여기서 'any' 대신 더 구체적인 타입을 사용하는 것이 좋습니다.
      if (loginState.signIn) {
        console.log("웹소켓 응답 받았고 서버로 회원가입 전송");
        dispatch(signUpUser({deviceNum : response.data.userInfo+response.data.serialNum}));
      }
      // 서버로부터의 응답 처리
      console.log("응답 받음:", response);
    })
    .catch(error => {
      console.log(error)
      // 에러 처리
      console.error("메시지 전송에 실패했습니다:", error);
    });    // if (loginState.signIn) {
    //   console.log("서버로 전송")
    // }
  }

  return (
    <Wrap>
      <StyledImage
        src={images.main.logo}
        alt="로고"
        onClick={handleLogoClick}
      />
      <Btn onClick={() => SignClick()}>회원가입</Btn>
      <Btn onClick={() => loginClick()}>로그인</Btn>
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
font-size: 3em;
font-weight: bold;
margin: 5px; 
color: ${TEXT_COLOR};
cursor: pointer; 
`

export default Login;
