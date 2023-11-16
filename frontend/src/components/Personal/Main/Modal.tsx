// 달력에 있는 날짜 클릭 시 나오는 모달창
import { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import PreviousPersonalColorResults from "../Previous/PreviousPersonalColorResults";
import PreviousClothesResults from "../Previous/PreviousClothesResults";
import Button from "./HeaderButton";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

// 그라데이션 애니메이션
const GradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// 팝업 애니메이션
const popup = keyframes`
  0% {
    transform: scale(0.7);  // 시작 시 70% 크기
    opacity: 0;  // 시작 시 투명
  }
  100% {
    transform: scale(1);  // 끝날 때 100% 크기
    opacity: 1;  // 끝날 때 불투명
  }
`;

// 모달 뒤 배경
const ModalOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.5);
`;

// 모달 컨테이너
const ModalContainer = styled.div<ModalContainerProps>`
  position: relative;
  overflow: auto;

  width: 35%;
  /* max-height: 95%; */

  background-size: 200% 200%;
  border-radius: 5px;

  color: black;
  animation: ${GradientAnimation} 3s linear infinite, ${popup} 0.3s;
  background-image: ${(props) => props.backgroundColor || "white"};
`;

// 날짜
const DateContainer = styled.div`
  position: fixed;
  top: 60px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: #ffffff;
  color: black;
  z-index: 1;

  width: 20%;
  height: 8vh;

  border-radius: 5px;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);

  p {
    text-align: center;
    font-size: 40px;
    font-family: "Giants-Bold";

    margin: 0;
  }

  animation: ${popup} 0.3s;
`;

// 모달 닫기 버튼
const ModalCloseButton = styled.button`
  position: absolute;
  right: 20px;
  top: 20px;

  cursor: pointer;
  font-size: 20px;

  border: none;
  background: none;

  width: 40px;
  height: 40px;
  padding: 0;
  opacity: 0.3;
  background: transparent;

  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: 14px;
    height: 22px;
    width: 4px;
    background-color: #000000;
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
  &:hover {
    opacity: 1;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  width: 100%;
  margin: 5% 0;

  position: relative;
`;

const StyledLink = styled.div`
  flex: 1;
  text-decoration: none;
  /* width: 100%; */
`;

type ModalProps = {
  activeButton: string;
  onClose: () => void;
  selectedDate: Date;
};

type ModalContainerProps = {
  backgroundColor: string;
};

const Modal: React.FC<ModalProps> = ({ onClose, selectedDate }) => {
  // const navigate = useNavigate();
  const { beauty } = useSelector((state: RootState) => state.personal); // Redux에서 beauty 객체를 가져옵니다.

  const containsWarm = (result: string | undefined) => {
    return result ? result.includes("웜") : false;
  };

  const containsCool = (result: string | undefined) => {
    return result ? result.includes("쿨") : false;
  };

  // beauty.result 값에 따라 배경색을 결정합니다.
  const backgroundColor = containsWarm(beauty?.result)
    ? "linear-gradient(270deg, #ebb7a2, #fc9898, #e1665b)"
    : containsCool(beauty?.result)
    ? "linear-gradient(270deg, #a4a4f9, #76b6fe, #6f6afb)"
    : "white"; // 기본값

  const [currentView, setCurrentView] = useState("personalColor");

  const handleClickPersonalColor = () => {
    setCurrentView("personalColor");
  };

  const handleClickClothes = () => {
    setCurrentView("clothes");
  };
  const handleClose = () => {
    onClose();
  };

  const stopPropagation = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };

  const currentDate = selectedDate;
  const year = currentDate.getFullYear().toString().slice(2); // 년
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // 월
  const day = String(currentDate.getDate()).padStart(2, "0"); // 일

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]; // ex. (월)
  const dayOfWeek = daysOfWeek[currentDate.getDay()];

  const formattedDate = `${year}.${month}.${day}(${dayOfWeek})`; // 설정된 값
  console.log(formattedDate);

  return (
    <ModalOverlay onClick={handleClose}>
      <DateContainer>
        <p>{formattedDate}</p>
      </DateContainer>
      <ModalContainer
        onClick={stopPropagation}
        backgroundColor={backgroundColor}
      >
        <HeaderContainer>
          <StyledLink>
            <Button
              isActive={currentView === "personalColor"}
              onClick={handleClickPersonalColor}
            >
              퍼스널 컬러 진단
            </Button>
          </StyledLink>
          <StyledLink>
            <Button
              isActive={currentView === "clothes"}
              onClick={handleClickClothes}
            >
              의상 진단
            </Button>
          </StyledLink>
        </HeaderContainer>

        {currentView === "personalColor" ? (
          <PreviousPersonalColorResults />
        ) : (
          <PreviousClothesResults />
        )}

        <ModalCloseButton onClick={handleClose} />
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
