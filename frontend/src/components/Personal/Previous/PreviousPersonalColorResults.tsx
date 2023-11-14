import React, { useCallback } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { PersonalBeautyResults } from "../Main/PersonalSlice";
import { images } from "../../../constants/images";

// 퍼스널 컬러 진단 컨테이너
const StyledSection = styled.section`
  display: flex;
  flex-direction: column-reverse; 
  width: 100%;
  height: 65vh;
  color: white;
`;

// 이미지 컨테이너
const StyledFigure = styled.figure`

  display: flex;
  justify-content: center;

  img {
    width: 300px;
    object-fit: cover;
  }
`;

// 퍼스널 컬러 정보
const InfoArticle = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
  top: -60px;
  z-index: 1;

  background-color: #000000c2;
`;

// 진단 영문명
const ColorNameEN = styled.div`
  font-family: "LeferiPoint-BlackObliqueA" !important;
  font-size: 3.5rem !important;
  color: #469be1;

  display: flex;
  align-items: flex-end;

  margin: 3% 0 0 0;
`;

// 진단 한글
const ColorNameKR = styled.div`
  font-family: "KBO-Dia-Gothic_bold" !important;
  font-size: 2rem;
  color: #469be1;

  padding: 0 !important;
`;

// 상세보기 버튼
const DetailButton = styled.button`
  margin: 4% 0;

  background-color: transparent;
  border: none;

  cursor: pointer;
  font-size: 1.5rem;
  color: white;
  font-family: "KBO-Dia-Gothic_bold" !important;
`;

const PreviousPersonalColorResults = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleButtonClick = () => {
    handleAsyncReducer();
    console.log("상세보기 버튼 누를 때 API 호출 되나요?");
    navigate("/personalcolorsresults");
  };

  const { beauty } = useSelector((state: RootState) => state.personal);

  const handleAsyncReducer = useCallback(async () => {
    const data = {
      date: "2023-11-12",
    };
    console.log("액션 객체 확인:", PersonalBeautyResults(data));
    try {
      console.log("진단 결과 뜨나요");
      const res = await dispatch(PersonalBeautyResults(data)).unwrap();
      console.log("진단 결과값은요?", res);
      if (res) {
        // dispatch(setMemberId(res.memberId));
        return res;
      }
    } catch (e) {
      console.error("Failed to fetch calendar data:", e);
    }
  }, [dispatch]);

  return (
    <StyledSection>
    <InfoArticle>
      <ColorNameEN>{beauty?.eng || "No Results"}</ColorNameEN>
      <ColorNameKR>{beauty?.result || "진단 값이 없습니다"}</ColorNameKR>
      <DetailButton onClick={handleButtonClick}>상세 보기</DetailButton>
    </InfoArticle>
      <StyledFigure>
        <img
          src={beauty?.imgUri || "non-existent-url"}
          alt="사진이 없습니다"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = images.personal.errorImg;
            console.log("오류 이미지로 변경 완료");
          }}
        />
      </StyledFigure>
    </StyledSection>
  );
};
export default PreviousPersonalColorResults;
