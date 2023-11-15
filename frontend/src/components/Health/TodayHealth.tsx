// 헬스 메인 페이지
import React, { useCallback, useState } from "react";
import TodayHealthCard from "./TodayHealthData";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { HealthCalender, healthCertCode } from "./HealthSlice";
import MainButton from "../Personal/Main/MainButton";

const StyledMainContainer = styled.section``;

const StyledTitle = styled.p`
  display: flex;
  justify-content: center;

  margin: 1.5% 0;

  font-size: 4rem;
  font-family: "Giants-Bold";
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

// 인증 코드 관련 Style
// 전체 컨테이너
const StyledContainer = styled.section`
  position: absolute;
  top: 0;
  right: 0;

  margin: 1.5%;
  font-family: "Giants-Bold";
`;

// 인증 코드 제목 + 버튼 컨테이너
const StyledCertContainer = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

// 인증 코드 제목
const StlyedCertCodeTitle = styled.p`
  font-size: 2.5rem;
  color: white;

  margin-right: 10px;
`;

// 인증 코드 받기 위한 버튼
const StyledCertCodeButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100px;
  height: 30px;

  background-color: transparent;
  border: 2px solid white;
  border-radius: 10px;

  font-family: "Giants-Bold";
  color: white;
  cursor: pointer;
`;

// 인증 코드 받는 창
const StyledCertCode = styled.div`
  width: 264px;

  border-bottom: 2px solid white;

  padding-bottom: 5px;
  margin: 15px 0;
`;

// 인증 코드 입력하라는 알림
const StyledCertCodeAlert = styled.p`
  font-size: 1rem;
  color: white;
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

const TodayHealth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [buttonClicked, setButtonClicked] = useState(false);

  const { certification } = useSelector((state: RootState) => state.health);

  const handleCalenderClick = () => {
    handleMonth();
    navigate("/healthcalender");
  };

  const handleMonth = useCallback(async () => {
    const data = {
      year: 2023,
      month: 11,
    };
    console.log("헬스 데이터 들어오나요?", data);
    const actionResult = await dispatch(HealthCalender(data));
    const res = actionResult.payload;
    if (res) {
      // dispatch(setMemberId(res.memberId));
    }
  }, [dispatch]);

  const handleCertification = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      try {
        console.log("인증 코드 전송 되나요");
        const res = await dispatch(healthCertCode()).unwrap();
        console.log("인증 코드 결과는요?", res);
        if (res) {
          // 버튼 클릭 상태를 true로 설정
          setButtonClicked(true);
          // ...
        }
      } catch (e) {
        console.error("Failed to fetch calendar data:", e);
      }
    },
    [dispatch]
  );

  return (
    <StyledMainContainer>
      <MainButton />
      <StyledCalenderButton onClick={handleCalenderClick}>
        <CalenderIcon />
      </StyledCalenderButton>
      <StyledTitle>오늘의 일일 활동</StyledTitle>
      <TodayHealthCard />
      <StyledContainer>
        <StyledCertContainer>
          <StlyedCertCodeTitle>인증 코드</StlyedCertCodeTitle>
          <StyledCertCodeButton onClick={handleCertification}>
            코드 받기
          </StyledCertCodeButton>
        </StyledCertContainer>
        <StyledCertCode>
          {buttonClicked ? certification?.certification || "-" : "-"}
        </StyledCertCode>
        <StyledCertCodeAlert>모바일에 코드를 입력하세요.</StyledCertCodeAlert>
      </StyledContainer>
    </StyledMainContainer>
  );
};

export default TodayHealth;
