import React, { useCallback } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { images } from "../../constants/images";
import { AppDispatch } from "../../store/store";
import { setMenuBtn } from "../Main/MirrorSlice";
import { RootState } from "../../store/store";
import {
  PersonalClothesResults,
  PersonalCalender,
} from "../Personal/Main/PersonalSlice";
import { healthTodayData } from "../Health/HealthSlice";

type ButtonType = "beauty" | "health" | "question";

interface MenuBtnProps {
  type: ButtonType;
}

function MenuBtn({ type }: MenuBtnProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleClick = async () => {
    if (type === "beauty") {
      const response = await handlePersonalCalender();
      navigate("/personalmain", { state: { diagnosisData: response } });
    } else if (type === "health") {
      const response = await handleHealthTodayData();
      navigate("/healthmain");
    } else if (type === "question") {
      // navigate('/question');
    }
  };

  const now = new Date();
  const year = now.getFullYear();
  const month = parseInt((now.getMonth() + 1).toString().padStart(2, '0'), 10); 

  // 퍼스널 캘린더(뷰티 메인) 호출
  const handlePersonalCalender = useCallback(async () => {
    const data = {
      year: year,
      month: month,
    };
    try {
      console.log("try 뜨나요");
      const res = await dispatch(PersonalCalender(data)).unwrap();
      console.log("결과는요?", res);
      if (res) {
        // dispatch(setMemberId(res.memberId));
        return res;
      }
    } catch (e) {
      console.error("Failed to fetch calendar data:", e);
    }
  }, [dispatch]);

  // 오늘 헬스 데이터(헬스 메인) 호출
  const handleHealthTodayData = useCallback(async () => {
    try {
      console.log("오늘 헬스 데이터 try 뜨나요");
      const res = await dispatch(healthTodayData()).unwrap();
      console.log("오늘 헬스 데이터 결과는요?", res);
      if (res) {
        // dispatch(setMemberId(res.memberId));
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
