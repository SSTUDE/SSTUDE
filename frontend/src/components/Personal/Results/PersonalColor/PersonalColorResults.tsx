
import Palette from "./Palette";
import ResultsImg from "./ResultsImg";
import ResultsInfo from "./ResultsInfo";
import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import { useNavigate } from "react-router";
import MainButton from "../../Main/MainButton";
import DiagnosisLoading from "../DiagnosisLoading";
import { AppDispatch } from "../../../../store/store";
import { PersonalCalender } from "../../Main/PersonalSlice";
import React, { useEffect, useState, useCallback } from "react";
import { PersonalBeautyResults } from "../../Main/PersonalSlice";

const StyledContainer = styled.div`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

// 페이지 제목
const StyledTitle = styled.p`
  display: flex;
  justify-content: center;
  margin: 1.5% 0;
  font-size: 4rem;
  font-family: "Giants-Bold";
`;

// 사진 + 설명 결과 컨테이너
const StyledResultsContainer = styled.section`
  display: flex;
  position: relative;
  right: -25%;
  width: 75%;
  height: 65vh;
`;

// 캘린더로 이동하기 위한 아이콘
const StyledCalenderButton = styled.button`
  position: absolute;
  left: 12.3%;
  top: 5.9%;
  width: 104px;
  height: 104px;
  padding: 0;
  background-color: #4f4f4f;
  border: 2px solid white;
  border-radius: 15%;
  cursor: pointer;
`;

const CalenderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    color="white"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

// 퍼스널 컬러 결과 컨테이너
const StyledPersonalColorResults = styled.section``;

const PersonalColorResults = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const date = `${year}-${month}-${day}`;

  dispatch(PersonalBeautyResults({ date: date }));

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer); 
  }, []);

  const handleCalenderClick = async () => {
    const response = await handlePersonalCalender();
    navigate("/personalmain", { state: { diagnosisData: response } });
  };

  // 퍼스널 캘린더(뷰티 메인) 호출
  const handlePersonalCalender = useCallback(async () => {
    try {
      const res = await dispatch(PersonalCalender()).unwrap();
      if (res) {
        return res;
      }
    } catch (e) {
      console.error("Failed to fetch calendar data:", e);
    }
  }, [dispatch]);

  return (
    <StyledContainer>
      {isLoading ? (
        <DiagnosisLoading />
      ) : (
        <>
          <MainButton />
          <StyledTitle>진단 결과</StyledTitle>
          <MainButton />
          <StyledCalenderButton onClick={handleCalenderClick}>
            <CalenderIcon />
          </StyledCalenderButton>
          <StyledResultsContainer>
            <ResultsImg />
            <ResultsInfo />
          </StyledResultsContainer>

          <StyledPersonalColorResults>
            <Palette />
          </StyledPersonalColorResults>
        </>
      )}
    </StyledContainer>
  );
};

export default PersonalColorResults;
