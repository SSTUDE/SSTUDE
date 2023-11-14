import React, { useState } from "react";
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
  width: auto;
`;

const StyledImg = styled.img`
  /* width: 65%; */
  margin: 2%;

  border-radius: 20px;
  box-shadow: 0 0 10px 5px;

  animation: ${shadowDropCenter} 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  width: 48vh;
  height: 64vh;
  object-fit: cover;
`;

const ResultsImg = () => {
  const { beautyResults } = useSelector((state: RootState) => state.personal);
  console.log("유저 이미지 넘어오나요?", beautyResults?.user_img);
  // 이미지 로딩 상태
  const [isLoading, setIsLoading] = useState(true);

  return (
    <StyledContainer>
      {isLoading && <p>로딩 중...</p>}
      <StyledImg
        src={beautyResults?.user_img || "non-existent-url"}
        alt="사진이 없습니다"
        onLoad={() => setIsLoading(false)} // 이미지 로딩 완료 시 상태 업데이트
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = images.personal.errorImg;
          console.log("오류 이미지로 변경 완료");
          setIsLoading(false); // 이미지 로딩 실패 시 상태 업데이트
        }}
      />
    </StyledContainer>
  );
};

export default ResultsImg;
