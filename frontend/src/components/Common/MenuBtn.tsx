import styled from 'styled-components';
import React, { useCallback } from 'react';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { images } from '../../constants/images';
import { AppDispatch } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { healthTodayData } from "../Health/HealthSlice";
import { PersonalCalender } from "../Personal/Main/PersonalSlice";

type ButtonType = 'home' | 'beauty' | 'health' | 'question';


interface MenuBtnProps {
  type: ButtonType;
}

function MenuBtn({ type }: MenuBtnProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { signOut } = useSelector((state: RootState) => state.login);

  const handleClick = async () => {
    if (type === 'home') {
      if (signOut) {
        localStorage.setItem("SSTUDE", "")
        navigate('/login')
      } else {
        navigate('/mirror')
      }
    } else if (type === "beauty") {
      const response = await handlePersonalCalender();
      navigate("/personalmain", { state: { diagnosisData: response } });
    } else if (type === "health") {
      const response = await handleHealthTodayData();
      navigate("/healthmain");
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
      home: images.default.homeBtn,
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

const Wrap = styled.div<{ type: ButtonType; }>`
  width: 100px;
  height: 100px;
  border-radius: 15%;
  background-color: #4F4F4F;
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
