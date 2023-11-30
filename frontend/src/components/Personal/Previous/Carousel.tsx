import React, { useRef } from "react";
import { styled } from "styled-components";
import { RootState } from "../../../store/store";
import { images } from "../../../constants/images";
import { setCarouselIndex } from "./PreviousSlice";
import { useDispatch, useSelector } from "react-redux";

const CarouselMain = styled.section`
  width: 40vh;
  position: relative;
  top: 21%;
  margin: 0 auto;
`;

const CarouselWrapperContainer = styled.div`
  overflow: hidden;
  box-shadow: 0 0 10px 5px black;
`;

const CarouselWrapper = styled.div`
  display: flex;
  transition: all 0.5s ease-out;
`;

const CarouselSlide = styled.figure`
  flex: 0 0 350px;
  margin: 0;
`;

const CarouselImage = styled.img`
  width: 40vh;
  height: 56vh;
  object-fit: cover;
  object-position: top;
`;

const CarouselPagination = styled.nav`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
`;

const CarouselCircle = styled.div`
  width: 10px;
  height: 10px;
  background-color: #aaa;
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
  &.active {
    background-color: #333;
    transition: all 0.7s;
  }
`;

const Carousel = () => {
  const dispatch = useDispatch();
  const currentSlide = useSelector(
    (state: RootState) => state.previous.CarouselIndex
  );
  const swiperRef = useRef<HTMLDivElement>(null);

  const [touchStart, setTouchStart] = React.useState(0);

  const { clothesData } = useSelector(
    (state: RootState) => state.previous
  );
  const imageList = clothesData?.map((data) => data.imgUri) || [];

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
    const newSlide =
      currentSlide < imageList.length - 1 ? currentSlide + 1 : currentSlide;
    showSlide(newSlide);
  };

  const handleBulletClick = (index: number) => {
    showSlide(index);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchEnd = e.changedTouches[0].clientX;

    if (touchStart - touchEnd > 75) {
      handleNextClick();
    } else if (touchStart - touchEnd < -75) {
      handlePrevClick();
    }
  };

  return (
    <CarouselMain>
      <CarouselWrapperContainer>
        <CarouselWrapper
          ref={swiperRef}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {(imageList.length > 0 ? imageList : [images.personal.errorImg]).map(
            (image: string, index: number) => (
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
            )
          )}
        </CarouselWrapper>
      </CarouselWrapperContainer>

      <CarouselPagination>
        {Array(imageList.length)
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
