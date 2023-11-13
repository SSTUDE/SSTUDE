import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { images } from "../../../constants/images";
import { RootState } from "../../../store/store";
import { PersonalClothesState } from "./types";
import { setCarouselIndex } from "./PreviousSlice";

const CarouselMain = styled.section`
  width: 300px;

  position: relative;

  margin: 0 auto;
`;

// 이미지 보이게 하기 위한 더 큰 컨테이너
const CarouselWrapperContainer = styled.div`
  /* height: 70%; */

  overflow: hidden;
  box-shadow: 0 0 10px 5px black;
`;

// 캐러셀 감싸는 컨테이너
const CarouselWrapper = styled.div`
  display: flex;
`;

// 캐러셀 슬라이드
const CarouselSlide = styled.figure`
  flex: 0 0 300px;
  margin: 0;
`;

// 캐러셀 이미지
const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  
  object-fit: cover;
`;

// 버튼 컨테이너
const CarouselButtonContainer = styled.div`
  position: absolute;
  top: 0%;
  width: 100%;
`;

// 캐러셀 버튼
const CarouselButton = styled.button<CarouselButtonProps>`
  width: 200px;  
  height: 400px; 
  border-radius: 100px; 
  color: #fff;
  background: transparent;
  border: none;
  outline: none;
  ${({ position }) => position && `position: absolute; ${position}: -100px;`}
  &:focus {
    outline: none;
  }
  &::-moz-focus-inner {
    border: 0;
  }
`;


// 이전 버튼
const CarouselPrev = styled(CarouselButton)`
  left: -100px;
`;

// 다음 버튼
const CarouselNext = styled(CarouselButton)`
  right: -100px;
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
  const dispatch = useDispatch();
  const currentSlide = useSelector((state: RootState) => state.previous.CarouselIndex);
  const swiperRef = useRef<HTMLDivElement>(null);

  const clothesData = useSelector((state: RootState) => state.previous);
  const imageList = [images.personal.dummy1, images.personal.errorImg, images.default.menuBtn];

  const showSlide = (slideIndex: number) => {
    if (swiperRef.current) {
      swiperRef.current.style.transform = `translateX(-${slideIndex * 100}%)`;
    }
    dispatch(setCarouselIndex(slideIndex));
  };

  const handlePrevClick = () => {
    const newSlide = currentSlide > 0 ? currentSlide - 1 : currentSlide;
    showSlide(newSlide);
  };

  const handleNextClick = () => {
    const newSlide = currentSlide < imageList.length - 1 ? currentSlide + 1 : currentSlide;
    showSlide(newSlide);
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
                src={image} 
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
