import React, { useRef, useState } from "react";
import { styled } from "styled-components";
import { images } from "../../../constants/images";

const CarouselMain = styled.section`
  width: 458px;
  /* height: 70%; */

  position: relative;

  margin: 0 auto;
  user-select: none;
`;

// 이미지 보이게 하기 위한 더 큰 컨테이너
const CarouselWrapperContainer = styled.div`
  overflow: hidden;
`;

const CarouselWrapper = styled.div`
  display: flex;
  transition: transform 1s;
  /* width: 0; */
`;

// 캐러셀 슬라이드
const CarouselSlide = styled.figure`
  flex: 0 0 458px;
  position: relative;
  margin: 0;
`;

// 캐러셀 이미지
const CarouselImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 20px;
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
const CarouselButton = styled.button`
  width: 50px;
  height: 50px;
  /* color: #fff; */
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;

// 이전 버튼
const CarouselPrev = styled(CarouselButton)`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  left: -70px;

  /* background-color: rgba(0, 0, 0, 0.3); */
  padding-top: 5px;
  padding-bottom: 5px;
`;

// 다음 버튼
const CarouselNext = styled(CarouselButton)`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  right: -70px;
  /* background-color: rgba(0, 0, 0, 0.3); */
`;

// 현재 슬라이드 위치
const CarouselPagination = styled.nav`
  position: absolute;
  bottom: -30px;
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

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const swiperRef = useRef<HTMLDivElement>(null);

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
    <>
      <CarouselMain>
        <CarouselWrapperContainer>
          <CarouselWrapper ref={swiperRef}>
            <CarouselSlide>
              <CarouselImage
                src={images.personal.dummy1}
                alt="사진이 없습니다"
              />
            </CarouselSlide>
            <CarouselSlide>
              <CarouselImage
                src={images.personal.dummy1}
                alt="사진이 없습니다"
              />
            </CarouselSlide>
            <CarouselSlide>
              <CarouselImage
                src={images.personal.dummy1}
                alt="사진이 없습니다"
              />
            </CarouselSlide>
          </CarouselWrapper>
        </CarouselWrapperContainer>
        <CarouselButtonContainer>
          <CarouselPrev onClick={handlePrevClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="currentColor"
              className="bi bi-chevron-double-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
              <path
                fill-rule="evenodd"
                d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </CarouselPrev>
          <CarouselNext onClick={handleNextClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="currentColor"
              className="bi bi-chevron-double-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
              />
              <path
                fill-rule="evenodd"
                d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </CarouselNext>
        </CarouselButtonContainer>

        <CarouselPagination>
          {[0, 1, 2].map((_, index) => (
            <CarouselCircle
              key={index}
              className={currentSlide === index ? "active" : ""}
              onClick={() => handleBulletClick(index)}
            ></CarouselCircle>
          ))}
        </CarouselPagination>
      </CarouselMain>
    </>
  );
};
export default Carousel;
