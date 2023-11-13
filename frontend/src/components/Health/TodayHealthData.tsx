import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { images } from "../../constants/images";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

// 차트 전체 컨테이너
const StyledChartContainer = styled.section`
  display: flex;
  justify-content: center;

  margin: 4% 0;
`;

//
const StyledKcalDataContainer = styled.article`
  display: flex;
  justify-content: center;

  width: 40%;
  height: 20vh;
  padding: 1%;

  border: 6px solid white;
  border-radius: 20px;
`;

const CircleChartContainer = styled.section`
  position: relative;
  max-width: 180px;
  width: 100%;
`;

const CircleChart = styled.svg`
  transform: rotate(-90deg);
  overflow: visible;
`;

const CircleConsumedKcalChartPercentage = styled.span`
  font-family: "KBO-Dia-Gothic_bold";
  font-size: 1.5rem;
  font-weight: 700;

  position: absolute;
  left: -70%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const CircleBruntKcalChartPercentage = styled.span`
  font-family: "KBO-Dia-Gothic_bold";
  font-size: 1.5rem;
  font-weight: 700;

  position: absolute;
  right: -70%;
  top: 50%;
  transform: translate(50%, -50%);
`;

const CircleBruntKcalChartSpan = styled.span`
  color: #fa5834;
`;

const CircleConsumedKcalChartSpan = styled.span`
  color: #35b6e9;
`;

// 애니메이션 정의
const fillAnimation = keyframes`
  0% {
    stroke-dasharray: 0 100;
  }
  100% {
    stroke-dasharray: 100 100;
  }
`;

const Circle = styled.circle`
  animation: ${fillAnimation} 1s linear;
`;

const options = ["far-left", "left", "center", "right", "far-right"];

const CarouselContainer = styled.div`
  display: flex;
  text-align: center;
  position: relative;

  font-family: "KBO-Dia-Gothic_bold";

  height: 450px;
  max-width: 800px;
  min-width: 600px;
  padding: 20px;
  margin: 0 auto;
`;

const CarouselCard = styled.div<{ position: string }>`
  height: 300px;
  width: 200px;
  padding: 20px;

  transition: 1s;
  opacity: 1;

  position: absolute;
  top: 0;

  background-color: #4fb7fc;
  color: #fff;
  cursor: pointer;

  box-shadow: 3px 5px 8px #4c4a4a;

  ${(props) => {
    switch (props.position) {
      case "far-left":
        return `
          left: 15%;
          transform: scale(.9) translateY(0%) translateX(-50%);
          z-index: 5;
          background-color: #a5bbcb;
        `;
      case "left":
        return `
          left: 30%;
          transform: scale(1) translateY(0%) translateX(-50%);
          z-index: 10;
          background-color: #a6d9f9;
        `;
      case "center":
        return `
          left: 50%;
          transform: scale(1.05) translateY(0%) translateX(-50%);
          z-index: 15;
        `;
      case "right":
        return `
          left: 70%;
          transform: scale(1) translateY(0%) translateX(-50%);
          z-index: 10;
          background-color: #a6d9f9;
        `;
      case "far-right":
        return `
          left: 80%;
          transform: scale(.9) translateY(0%) translateX(-50%);
          z-index: 5;
          background-color: #a5bbcb;
        `;
      default:
        return "";
    }
  }}
`;

const CarouselIcon = styled.img`
  border-radius: 50%;
  height: 75px;
  width: 75px;

  margin: 30px;
`;

const CarouselTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0 0 2rem 0;
`;

const CarouselText = styled.p`
  font-size: 1.5rem;
  margin: 0 0 2rem 0;
`;

const TodayHealthData = () => {
  const [cardPositions, setCardPositions] = useState(options);
  const [burntKcalPercentage, setBurntKcalPercentage] = useState(0);
  const [consumedKcalPercentage, setConsumedKcalPercentage] = useState(0);

  const { detailData } = useSelector((state: RootState) => state.health);
  const [totalKcal, setTotalKcal] = useState(0);

  useEffect(() => {
    // API에서 받아온 데이터의 초기값이 설정되어 있지 않을 수 있으므로,
    // Optional Chaining을 사용하여 undefined 또는 null을 방지합니다.
    const fetchedBurntKcal = detailData?.burntKcal || 0;
    const fetchedConsumedKcal = detailData?.consumedKcal || 0;

    // totalKcal을 계산합니다.
    const total = fetchedBurntKcal + fetchedConsumedKcal;

    // 계산된 totalKcal을 상태에 저장합니다.
    setTotalKcal(total);

    // 비율을 계산하고, 상태를 업데이트합니다.
    setBurntKcalPercentage((fetchedBurntKcal / total) * 100);
    setConsumedKcalPercentage((fetchedConsumedKcal / total) * 100);
  }, [detailData]); // detailData가 변경될 때마다 이 useEffect는 실행됩니다.

  const currentDate = new Date();

  const optionsDate = {
    year: "2-digit" as const,
    month: "2-digit" as const,
    day: "2-digit" as const,
    weekday: "short" as const,
  };

  const formattedDate = currentDate
    .toLocaleDateString("ko-KR", optionsDate)
    .replace(/\. /g, ".")
    .replace(/, /g, " (")
    .replace(/,/g, "")
    .replace(/ PM/g, ")")
    .replace(/ AM/g, ")")
    .replace(/: /g, ":")
    .split(" (")[0];

  const [cardsData, setCardsData] = useState([
    {
      icon: `${images.health.steps}`,
      title: "걸음 수",
      text: detailData?.steps
        ? `${detailData.steps} Steps`
        : "데이터가 없습니다.",
    },
    {
      icon: `${images.health.sleepTime}`,
      title: "수면 시간",
      text: detailData?.sleepTime
        ? `${Math.floor(detailData.sleepTime / 60)}시간 ${
            detailData.sleepTime % 60
          }분`
        : "데이터가 없습니다.",
    },
    {
      icon: `${images.health.clock}`,
      title: "Today's Date",
      text: "yyyy.mm.dd(d) time",
    },
    {
      icon: `${images.health.burntKcal}`,
      title: "소모 Kcal",
      text: detailData?.burntKcal
        ? `${detailData.burntKcal} Kcal`
        : "데이터가 없습니다.",
    },

    {
      icon: `${images.health.consumedKcal}`,
      title: "섭취 Kcal",
      text: detailData?.consumedKcal
        ? `${detailData.consumedKcal} Kcal`
        : "데이터가 없습니다.",
    },
  ]);

  const moveToCenter = (index: number) => {
    const newPositions = [...options];
    const turns = (index + 3) % options.length;
    for (let i = 0; i < turns; i++) {
      const lastElement = newPositions.pop();
      if (lastElement) {
        newPositions.unshift(lastElement);
      }
    }
    setCardPositions(newPositions);
  };

  return (
    <>
      <StyledChartContainer>
        <StyledKcalDataContainer>
          <CircleChartContainer>
            <CircleChart viewBox="0 0 36 36">
              <Circle
                stroke="#fa5834"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                cx="18"
                cy="18"
                r="16"
                strokeDasharray={`${burntKcalPercentage} 100`}
              />
              <Circle
                stroke="#35b6e9"
                strokeWidth="4"
                fill="none"
                strokeLinecap="butt"
                cx="18"
                cy="18"
                r="16"
                strokeDasharray={`${consumedKcalPercentage} 100`}
                strokeDashoffset={-burntKcalPercentage}
              />
            </CircleChart>
            <CircleConsumedKcalChartPercentage>
              <CircleConsumedKcalChartSpan>섭취</CircleConsumedKcalChartSpan>{" "}
              Kcal: {consumedKcalPercentage.toFixed(1)}%
            </CircleConsumedKcalChartPercentage>
            <CircleBruntKcalChartPercentage>
              <CircleBruntKcalChartSpan>소모</CircleBruntKcalChartSpan> Kcal:
              {burntKcalPercentage.toFixed(1)}%
            </CircleBruntKcalChartPercentage>
          </CircleChartContainer>
        </StyledKcalDataContainer>
      </StyledChartContainer>
      <CarouselContainer>
        {options.map((option, index) => (
          <CarouselCard
            key={index}
            id={option}
            className="carousel-card"
            position={cardPositions[index]}
            onClick={() => moveToCenter(index)}
          >
            {index === 2 ? (
              <>
                <CarouselIcon src={cardsData[index].icon} alt="" />
                <CarouselTitle>오늘 날짜</CarouselTitle>
                <CarouselText>{formattedDate}</CarouselText>
              </>
            ) : (
              <>
                <CarouselIcon src={cardsData[index].icon} alt="" />
                <CarouselTitle>{cardsData[index].title}</CarouselTitle>
                <CarouselText>{cardsData[index].text}</CarouselText>
              </>
            )}
          </CarouselCard>
        ))}
      </CarouselContainer>
    </>
  );
};

export default TodayHealthData;
