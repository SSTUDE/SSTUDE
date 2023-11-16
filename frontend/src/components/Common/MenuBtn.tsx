import styled from "styled-components";
import { useDispatch } from "react-redux";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { images } from "../../constants/images";
import { AppDispatch } from "../../store/store";
import { healthTodayData } from "../Health/HealthSlice";
import {
  PersonalCalender,
} from "../Personal/Main/PersonalSlice";

type ButtonType = "beauty" | "health" | "question";

interface MenuBtnProps {
  type: ButtonType;
}

function MenuBtn({ type }: MenuBtnProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const handleClick = async () => {
    if (type === "beauty") {
      const response = await handlePersonalCalender();
      navigate("/personalmain", { state: { diagnosisData: response } });
    } else if (type === "health") {
      const response = await handleHealthTodayData();
      navigate("/healthmain");
    }
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

  // 오늘 헬스 데이터(헬스 메인) 호출
  const handleHealthTodayData = useCallback(async () => {
    try {
      const res = await dispatch(healthTodayData()).unwrap();
      if (res) {
        return res;
      }
    } catch (e) {
      console.error("Failed to fetch calendar data:", e);
    }
  }, [dispatch]);

  const getImageSrc = (type: ButtonType): string => {
    const imageMap: { [key in ButtonType]: string } = {
      beauty: images.default.beautyBtn,
      health: images.default.healthBtn,
      question: images.default.questionBtn,
    };
    return imageMap[type];
  };

  return (
    <Wrap type={type} onClick={handleClick}>
      <Button>
        <img src={getImageSrc(type)} alt={`${type} 버튼`} />
      </Button>
    </Wrap>
  );
}

const Wrap = styled.div<{ type: ButtonType }>`
  width: 100px;
  height: 100px;
  border-radius: 15%;
  background-color: #4f4f4f;
  border: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    transform: scale(1.5);
  }
`;

export default MenuBtn;
