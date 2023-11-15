// 홈 및 뒤로가기 버튼
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { RootState } from "../../../store/store";
import { useWebSocket } from "../../../hooks/useWebSocket";
import { RASPBERRY_URL } from "../../../apis/constants";
import useWebcam from "../../../hooks/useWebCam";

// 전체 컨테이너
const StyledContainer = styled.div``;

// 홈 버튼
const StyledHomeButton = styled.button`
  position: absolute;
  left: 5.35%;
  top: 5.9%;

  width: 104px;
  height: 104px;

  background-color: #4f4f4f;
  border: 2px solid white;
  border-radius: 15%;

  cursor: pointer;
`;

// 홈 아이콘
const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    color="white"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.3}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

// 뒤로가기 버튼
// const StyledPrevButton = styled.button`
//   position: absolute;
//   right: 5%;
//   top: 5%;

//   width: 150px;
//   height: 150px;

//   background-color: transparent;
//   border: none;

//   cursor: pointer;
// `;

// 뒤로가기 아이콘
// const BackIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//     color="white"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M15 19l-7-7 7-7"
//     />
//   </svg>
// );

const MainButton = () => {
  const navigate = useNavigate();
  const { signOut } = useSelector((state: RootState) => state.login);
  const { sendMessage } = useWebSocket(RASPBERRY_URL);
  const message = { type: "camera", data: "off" };
  const { stopWebcam } = useWebcam();

  const handleHomeClick = () => {
    


  if (onclick){
    stopWebcam();
      console.log("카메라 종료");
      setTimeout(() => {
        sendMessage(message)
          .then((response) => {
            console.log("응답옴: ", response);
          })
          .catch(error => {
            console.log("에러 발생", error);
          });
      }, 1000);
    }


    if (signOut) {
      localStorage.removeItem("SSTUDE");
      navigate('/login')
    } else {
      navigate('/mirror')
    }
  };
  
  // const handlePrevClick = () => {
  //   navigate(-1);
  // };

  return (
    <StyledContainer>
      <StyledHomeButton onClick={handleHomeClick}>
        <HomeIcon />
      </StyledHomeButton>
      {/* <StyledPrevButton onClick={handlePrevClick}>
        <BackIcon />
      </StyledPrevButton> */}
    </StyledContainer>
  );
};

export default MainButton;
