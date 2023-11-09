import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { images } from "../../constants/images";

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

const TodayHealthCard = () => {
  const [cardPositions, setCardPositions] = useState(options);

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

  // useEffect(() => {
  //   axios.get('API endpoint') // API endpoint를 실제 API endpoint로 교체
  //     .then(response => {
  //       const data = response.data;
  //       setCardsData([
  //         {
  //           icon: images.health.steps,
  //           title: "Steps",
  //           text: `${data.steps} steps`,
  //         },
  //         {
  //           icon: images.health.burntKcal,
  //           title: "Burnt Kcal",
  //           text: `${data.burntKcal} Kcal`,
  //         },
  // {
  // icon: `${images.health.steps}`,
  // title: "Steps",
  // text: "3396 steps",
  //  },
  //         {
  //           icon: images.health.sleepTime,
  //           title: "Sleep Time",
  //           text: data.sleepTime,
  //         },
  //         {
  //           icon: images.health.consumedKcal,
  //           title: "Consumed Kcal",
  //           text: `${data.consumedKcal} Kcal`,
  //         },
  //       ]);
  //     })
  //     .catch(error => {
  //       console.error('Failed to fetch health data:', error);
  //     });
  // }, []);

  const [cardsData, setCardsData] = useState([
    {
      icon: `${images.health.steps}`,
      title: "걸음 수",
      text: "3396 걸음",
    },
    {
      icon: `${images.health.sleepTime}`,
      title: "수면 시간",
      text: "4시간 46분",
    },
    {
      icon: `${images.health.clock}`,
      title: "Today's Date",
      text: "yyyy.mm.dd(d) time",
    },
    {
      icon: `${images.health.burntKcal}`,
      title: "소모 Kcal",
      text: "654 Kcal",
    },

    {
      icon: `${images.health.consumedKcal}`,
      title: "섭취 Kcal",
      text: "47 Kcal",
    },
  ]);

  // const rotateRight = () => {
  //   const newPositions = cardPositions.map((position, index) => {
  //     return cardPositions[(index + 1) % cardPositions.length];
  //   });
  //   setCardPositions(newPositions);
  // };

  // const rotateLeft = () => {
  //   const newPositions = cardPositions.map((position, index) => {
  //     return cardPositions[
  //       (index - 1 + cardPositions.length) % cardPositions.length
  //     ];
  //   });
  //   setCardPositions(newPositions);
  // };

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
              <CarouselTitle>Today's Date</CarouselTitle>
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
  );
};

export default TodayHealthCard;
