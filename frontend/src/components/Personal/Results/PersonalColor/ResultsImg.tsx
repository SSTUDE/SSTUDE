import React from "react";
import { images } from "../../../../constants/images";
import { styled, keyframes } from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

const shadowDropCenter = keyframes`
  0% {
    transform: translateZ(0);
    box-shadow: 0 0 0 0 rgb(50, 195, 243);
  }
  100% {
    transform: translateZ(50px);
  box-shadow: 0 0 10px 5px;
  }
`;

const StyledContainer = styled.section`
  display: inline-block;
  display: flex;
  justify-content: center;
  width: 50%;
`;

const StyledImg = styled.img`
  width: 65%;
  margin: 2%;

  border-radius: 20px;
  box-shadow: 0 0 10px 5px;

  animation: ${shadowDropCenter} 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;

const ResultsImg = () => {
  const { beautyResults } = useSelector((state: RootState) => state.personal);
  console.log("유저 이미지 넘어오나요?", beautyResults?.user_img);
  return (
    <StyledContainer>
      <StyledImg
        src={beautyResults?.user_img || "non-existent-url"}
        alt="사진이 없습니다"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = images.personal.errorImg;
          console.log("오류 이미지로 변경 완료");
        }}
      />
    </StyledContainer>
  );
};

export default ResultsImg;
