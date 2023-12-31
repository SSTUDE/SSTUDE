import { styled } from "styled-components";
import MainButton from "../../Main/MainButton";
import { useNavigate } from "react-router-dom";
import { images } from "../../../../constants/images";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, useCallback } from "react";
import { AppDispatch, RootState } from "../../../../store/store";
import {
  PersonalCalender,
  PersonalClothesResults,
} from "../../Main/PersonalSlice";

const StyledContainer = styled.div`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-family: "KBO-Dia-Gothic_bold";
`;

const StyledTitle = styled.p`
  display: flex;
  justify-content: center;
  margin: 1.5% 0;
  font-size: 4rem;
  font-family: "Giants-Bold";
`;

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

const StlyedInfoContainer1 = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
`;

const StyledEmptyContainer = styled.article``;

const StyledImgContainer1 = styled.img<StyledComponentProps>`
  position: relative;
  top: 40px;
  width: 48vh;
  height: 64vh;
  margin: 0;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  object-position: top;
  border-radius: 20px;
  box-shadow: 0 0 60px 30px
    ${(props) => convertHexToRGBA(props.shadowColor, 0.5)};
`;

const StyledCurScoreContainer1 = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50vh;
  height: 65vh;
  margin: 0;
  gap: 30px;
`;

const StyledCurScoreTitle1 = styled.h1`
  font-size: 4rem;
  margin: 0;
`;

const StyledCurScore1 = styled.p<{ score: number | null }>`
  font-size: 2.5rem;
  margin-bottom: 50px;
  color: ${(props) =>
    props.score === null
      ? "black"
      : props.score >= 1 && props.score <= 24
      ? "red"
      : props.score >= 25 && props.score <= 49
      ? "orange"
      : props.score >= 50 && props.score <= 74
      ? "green"
      : "blue"};
`;

const StlyedInfoContainer2 = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
`;

const StyledCurImgContainer2 = styled.section`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const StyledAfterScoreTitle2 = styled.h1`
  color: #ffffff;
  font-size: 3rem;
  text-align: center;
  margin: 0;
`;

const StyledCurImg2 = styled.img<StyledComponentProps>`
  position: relative;
  width: 48vh;
  height: 64vh;
  margin: 0;
  object-fit: cover;
  object-position: top;
  border-radius: 20px;
  box-shadow: 0 0 35px 10px
    ${(props) => convertHexToRGBA(props.shadowColor, 0.6)};
`;

const StyledAfterScore2 = styled.h1<{ score: number | null }>`
  font-size: 2.5rem;
  text-align: center;
  margin: 0;
  color: ${(props) => getScoreColor(props.score)};
`;

const StyledPrevImgContainer2 = styled.section`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const StyledBeforeScoreTitle2 = styled.h1`
  font-size: 3rem;
  text-align: center;
  margin: 0;
`;

const StyledPrevImg2 = styled.img<StyledComponentProps>`
  position: relative;
  width: 48vh;
  height: 64vh;
  margin: 0;
  object-fit: cover;
  object-position: top;
  border-radius: 20px;
  box-shadow: 0 0 35px 15px
    ${(props) => convertHexToRGBA(props.shadowColor, 0.6)};
`;

const StyledBeforeScore2 = styled.h1<{ score: number | null }>`
  font-size: 2.5rem;
  text-align: center;
  margin: 0;
  color: ${(props) => getScoreColor(props.score)};
`;

const convertHexToRGBA = (hex: string, opacity: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const getScoreColor = (score: number | null) => {
  if (score === null) {
    return "#FFFFFF";
  } else if (score >= 1 && score <= 24) {
    return "#fe4848";
  } else if (score >= 25 && score <= 49) {
    return "#FAED27";
  } else if (score >= 50 && score <= 74) {
    return "#3BB143";
  } else {
    return "#60adf9";
  }
};

type StyledComponentProps = {
  shadowColor: string;
};

const ClothesResults = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const clothesResults = useSelector(
    (state: RootState) => state.personal.clothesResults
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSingleResult, setIsSingleResult] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const clothesResults = await dispatch(PersonalClothesResults()).unwrap();
      if (clothesResults) {
        setIsLoading(false);
        setIsSingleResult(clothesResults.length < 2);
      }
    };
    fetchData();
  }, []);

  const handleCalenderClick = async () => {
    const response = await handlePersonalCalender();
    navigate("/personalmain", { state: { diagnosisData: response } });
  };
  const handlePersonalCalender = useCallback(async () => {
    try {
      const res = await dispatch(PersonalCalender()).unwrap();
      return res;
    } catch (e) {}
  }, [dispatch]);

  return (
    <StyledContainer>
      {isLoading ? (
        <></>
      ) : (
        <>
          <MainButton />
          <StyledCalenderButton onClick={handleCalenderClick}>
            <CalenderIcon />
          </StyledCalenderButton>
          <StyledTitle>진단 결과</StyledTitle>
          {isSingleResult ? (
            <StlyedInfoContainer1>
              <StyledEmptyContainer />
              <StyledImgContainer1
                src={
                  clothesResults && clothesResults[0]
                    ? clothesResults[0].imguri
                    : images.personal.errorImg
                }
                shadowColor={getScoreColor(
                  clothesResults && clothesResults[0]
                    ? Math.floor(clothesResults[0].score)
                    : null
                )}
              />
              <StyledCurScoreContainer1>
                <StyledCurScoreTitle1>현재 점수</StyledCurScoreTitle1>
                <StyledCurScore1
                  score={
                    clothesResults && clothesResults[0]
                      ? clothesResults[0].score
                      : null
                  }
                >
                  {clothesResults && clothesResults[0] ? (
                    <>
                      <span>{Math.floor(clothesResults[0].score)}</span>
                      <span style={{ color: "white", fontSize: "3.5rem" }}>
                        점
                      </span>
                    </>
                  ) : (
                    <span style={{ color: "red", fontSize: "3rem" }}>
                      점수가 없습니다.
                    </span>
                  )}
                </StyledCurScore1>
              </StyledCurScoreContainer1>
            </StlyedInfoContainer1>
          ) : (
            <StlyedInfoContainer2>
              <StyledEmptyContainer />
              <StyledCurImgContainer2>
                <StyledAfterScoreTitle2>현재 사진</StyledAfterScoreTitle2>
                <StyledCurImg2
                  src={
                    clothesResults && clothesResults[0]
                      ? clothesResults[0].imguri
                      : images.personal.errorImg
                  }
                  shadowColor={getScoreColor(
                    clothesResults && clothesResults[0]
                      ? clothesResults[0].score
                      : null
                  )}
                />
                <StyledAfterScore2
                  score={
                    clothesResults && clothesResults[0]
                      ? clothesResults[0].score
                      : null
                  }
                >
                  {clothesResults && clothesResults[0] ? (
                    <>
                      <span style={{ fontSize: "3rem" }}>
                        {Math.floor(clothesResults[0].score)}
                      </span>
                      <span style={{ color: "white", fontSize: "2.5rem" }}>
                        {" "}
                        점
                      </span>
                    </>
                  ) : (
                    <span style={{ color: "red", fontSize: "2rem" }}>
                      점수가 없습니다.
                    </span>
                  )}
                </StyledAfterScore2>
              </StyledCurImgContainer2>
              <StyledPrevImgContainer2>
                <StyledBeforeScoreTitle2>이전 사진</StyledBeforeScoreTitle2>
                <StyledPrevImg2
                  src={
                    clothesResults && clothesResults[1]
                      ? clothesResults[1].imguri
                      : images.personal.errorImg
                  }
                  shadowColor={getScoreColor(
                    clothesResults && clothesResults[1]
                      ? clothesResults[1].score
                      : null
                  )}
                />
                <StyledBeforeScore2
                  score={
                    clothesResults && clothesResults[1]
                      ? clothesResults[1].score
                      : null
                  }
                >
                  {clothesResults && clothesResults[1] ? (
                    <>
                      <span style={{ fontSize: "3rem" }}>
                        {Math.floor(clothesResults[1].score)}
                      </span>
                      <span style={{ color: "white", fontSize: "2.5rem" }}>
                        {" "}
                        점
                      </span>
                    </>
                  ) : (
                    <span style={{ color: "red", fontSize: "2rem" }}>
                      점수가 없습니다.
                    </span>
                  )}
                </StyledBeforeScore2>
              </StyledPrevImgContainer2>
            </StlyedInfoContainer2>
          )}
        </>
      )}
    </StyledContainer>
  );
};

export default ClothesResults;