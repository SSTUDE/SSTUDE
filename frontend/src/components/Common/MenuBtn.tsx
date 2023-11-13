import React, { useCallback } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { images } from "../../constants/images";
import { AppDispatch } from "../../store/store";
import { setMenuBtn } from "../Main/MirrorSlice";
import { RootState } from "../../store/store";
import { PersonalCalender } from "../Personal/Main/PersonalSlice";
import { healthTodayData } from "../Health/HealthSlice";

type ButtonType = "menu" | "beauty" | "health" | "question";

interface MenuBtnProps {
  type: ButtonType;
}

function MenuBtn({ type }: MenuBtnProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isMenuOpen = useSelector((state: RootState) => state.mirror.isMenuOpen);

  const handleClick = async () => {
    if (type === "menu") {
      dispatch(setMenuBtn());
    } else if (type === "beauty") {
      const response = await handlePersonalCalender();
      console.log("메뉴에서 뷰티 눌렀을 때 되나요?", response);
      navigate("/personalmain", { state: { diagnosisData: response } });
    } else if (type === "health") {
      const response = await handleHealthTodayData();
      console.log("메뉴에서 헬스 눌렀을 때 되나요?", response);
      navigate("/healthmain");
    } else if (type === "question") {
      // navigate('/question');
    }
  };

  const handlePersonalCalender = useCallback(async () => {
    const data = {
      year: 2023,
      month: 11,
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

  const handleHealthTodayData = useCallback(async () => {
    try {
      console.log("try 뜨나요");
      const res = await dispatch(healthTodayData()).unwrap();
      console.log("결과는요?", res);
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
      menu: images.default.menuBtn,
      beauty: images.default.beautyBtn,
      health: images.default.healthBtn,
      question: images.default.questionBtn,
    };
    return imageMap[type];
  };

  return (
    <Wrap $isMenuOpen={isMenuOpen} type={type} onClick={handleClick}>
      <Button>
        <img src={getImageSrc(type)} alt={`${type} 버튼`} />
      </Button>
    </Wrap>
  );
}

const Wrap = styled.div<{ $isMenuOpen: boolean; type: ButtonType }>`
  width: 100px;
  height: 100px;
  border-radius: 15%;
  background-color: ${(props) =>
    props.type === "menu" && props.$isMenuOpen ? "#2ecc71" : "#4F4F4F"};
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
