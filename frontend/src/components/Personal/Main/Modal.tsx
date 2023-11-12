// 달력에 있는 날짜 클릭 시 나오는 모달창
import { useState } from "react";
import { styled, keyframes } from "styled-components";
import PreviousPersonalColorResults from "../Previous/PreviousPersonalColorResults";
import PreviousClothesResults from "../Previous/PreviousClothesResults";
import Button from "./HeaderButton";

const GradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
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
const ModalContainer = styled.div`
  position: relative;
  overflow: auto;

  width: 32%;
  max-height: 95%;

  background: linear-gradient(270deg, #a4a4f9, #76b6fe, #6f6afb);
  background-size: 200% 200%;
  animation: ${GradientAnimation} 4s linear infinite;
  border-radius: 5px;

  color: black;
`;

// 날짜
const DateContainer = styled.div`
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: #ffffff;

  width: 20%;
  height: 7vh;

  border-radius: 5px;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);

  p {
    text-align: center;
    font-size: 40px;
    font-family: "Giants-Bold";

    margin: 0;
  }
`;

// 모달 닫기 버튼
const ModalCloseButton = styled.button`
  position: absolute;
  right: 20px;
  top: 20px;

  cursor: pointer;
  font-size: 20px;

  padding: 0;

  border: none;
  background: none;
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

const Modal: React.FC<ModalProps> = ({
  activeButton,
  onClose,
  selectedDate,
}) => {
  // const navigate = useNavigate();

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
      <ModalContainer onClick={stopPropagation}>
        <DateContainer>
          <p>{formattedDate}</p>
        </DateContainer>

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

        <ModalCloseButton onClick={handleClose}>닫기</ModalCloseButton>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
