import { styled } from "styled-components";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { images } from "../../../constants/images";
import { useDispatch, useSelector } from "react-redux";
import { PersonalBeautyResults } from "../Main/PersonalSlice";
import { AppDispatch, RootState } from "../../../store/store";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column-reverse;
  height: 65vh;
  color: white;
`;

const StyledFigure = styled.figure`
  position: relative;
  top: 20%;
  transform: translateX(0%);
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 40vh;
    height: 56vh;
    object-fit: cover;
    object-position: top;
    box-shadow: 0 0 10px 5px black;
  }

  p {
    position: absolute;
    font-size: 2rem;
    color: white;
  }
`;

const InfoArticle = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  background-color: #000000c2;
  height: 35%;
`;

const ColorNameEN = styled.div<{ isWarm: boolean; isCool: boolean }>`
  font-family: "LeferiPoint-BlackObliqueA" !important;
  font-size: 3.5rem !important;
  color: ${(props) =>
    props.isWarm ? "#f0776c" : props.isCool ? "#469be1" : "white"};

  display: flex;
  align-items: flex-end;
  margin: 3% 0 0 0;
`;

const ColorNameKR = styled.div<{ isWarm: boolean; isCool: boolean }>`
  font-family: "KBO-Dia-Gothic_bold" !important;
  font-size: 2rem;
  color: ${(props) =>
    props.isWarm ? "#f0776c" : props.isCool ? "#469be1" : "white"};

  padding: 0 !important;
`;

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
  const { beauty } = useSelector((state: RootState) => state.personal);

  const containsWarm = (result: string | undefined) => {
    return result ? result.includes("웜") : false;
  };

  const containsCool = (result: string | undefined) => {
    return result ? result.includes("쿨") : false;
  };

  const handleButtonClick = () => {
    handleAsyncReducer();
    navigate("/personalcolorsresults");
  };

  const handleAsyncReducer = useCallback(async () => {
    const data = {
      date: "2023-11-14",
    };
    try {
      const res = await dispatch(PersonalBeautyResults(data)).unwrap();
      if (res) {
        return res;
      }
    } catch (e) {
      console.error("Failed to fetch calendar data:", e);
    }
  }, [dispatch]);

  return (
    <StyledSection>
      <InfoArticle>
        <ColorNameEN
          isWarm={containsWarm(beauty?.result)}
          isCool={containsCool(beauty?.result)}
        >
          {beauty?.eng || "No Results"}
        </ColorNameEN>
        <ColorNameKR
          isWarm={containsWarm(beauty?.result)}
          isCool={containsCool(beauty?.result)}
        >
          {beauty?.result || "진단 값이 없습니다"}
        </ColorNameKR>

        <DetailButton onClick={handleButtonClick}>상세 보기</DetailButton>
      </InfoArticle>

      <StyledFigure>
        <img
          src={beauty?.imgUri || "non-existent-url"}
          alt="사진이 없습니다"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = images.personal.errorImg;
          }}
        />
      </StyledFigure>
    </StyledSection>
  );
};
export default PreviousPersonalColorResults;
