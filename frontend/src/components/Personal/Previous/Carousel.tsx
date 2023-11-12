import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { images } from "../../../constants/images";
import { RootState } from "../../../store/store";
import { PersonalClothesState } from "../Main/types";

const CarouselMain = styled.section`
  width: 300px;

  position: relative;

  margin: 0 auto;
  user-select: none;
`;

// 이미지 보이게 하기 위한 더 큰 컨테이너
const CarouselWrapperContainer = styled.div`
  height: 70%;

  overflow: hidden;
  box-shadow: 0 0 10px 5px black;
`;

// 캐러셀 감싸는 컨테이너
const CarouselWrapper = styled.div`
  display: flex;
  transition: transform 1s;
  /* width: 0; */
`;

// 캐러셀 슬라이드
const CarouselSlide = styled.figure`
  flex: 0 0 300px;
  position: relative;
  margin: 0;
  height: 70%;
  max-width: 100%;
  max-height: 100%;
`;

// 캐러셀 이미지
const CarouselImage = styled.img`
  display: block;
  width: 100%;
  height: auto;

  /* border-radius: 20px; */
  object-fit: cover;
`;

// 버튼 컨테이너
const CarouselButtonContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

// 캐러셀 버튼
// 버튼 안 보임
const CarouselButton = styled.button<CarouselButtonProps>`
  width: 50px;
  height: 50px;
  color: #fff;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  ${({ position }) => position && `position: absolute; ${position}: -70px;`}
`;

// 이전 버튼
const CarouselPrev = styled(CarouselButton)`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  left: -70px;
`;

// 다음 버튼
const CarouselNext = styled(CarouselButton)`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  right: -70px;
`;

// 현재 슬라이드 위치
const CarouselPagination = styled.nav`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
`;

// 슬라이드 위치 요소
const CarouselCircle = styled.div`
  width: 10px;
  height: 10px;
  background-color: #aaa;
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
  &.active {
    background-color: #333;
  }
`;

type CarouselButtonProps = {
  position?: "left" | "right";
};

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const swiperRef = useRef<HTMLDivElement>(null);

  const clothes = useSelector((state: RootState) => state.personal.clothes);
  const imageList = clothes ? [clothes.imgUri] : [];

  const showSlide = (slideIndex: number) => {
    if (swiperRef.current) {
      swiperRef.current.style.transform = `translateX(-${slideIndex * 100}%)`;
    }
    setCurrentSlide(slideIndex);
  };

  const handlePrevClick = () => {
    if (currentSlide > 0) {
      showSlide(currentSlide - 1);
    }
  };

  const handleNextClick = () => {
    if (currentSlide < 2) {
      showSlide(currentSlide + 1);
    }
  };

  const handleBulletClick = (index: number) => {
    showSlide(index);
  };

  return (
    <CarouselMain>
      <CarouselWrapperContainer>
        <CarouselWrapper
          ref={swiperRef}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {imageList.map((image: string, index: number) => (
            <CarouselSlide key={index}>
              <CarouselImage
                src={image} // 이미지 URL로 직접 매핑
                alt="사진이 없습니다"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = images.personal.errorImg;
                }}
              />
            </CarouselSlide>
          ))}
        </CarouselWrapper>
      </CarouselWrapperContainer>
      <CarouselButtonContainer>
        <CarouselPrev onClick={handlePrevClick} position="left" />
        <CarouselNext onClick={handleNextClick} position="right" />
      </CarouselButtonContainer>
      <CarouselPagination>
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <CarouselCircle
              key={index}
              className={currentSlide === index ? "active" : ""}
              onClick={() => handleBulletClick(index)}
            />
          ))}
      </CarouselPagination>
    </CarouselMain>
  );
};
export default Carousel;
