import React from "react";
import { styled } from "styled-components";
// import images from "../../../constants/images";

const StyledContainer = styled.div`
  width: 100%;
  height: 70vh;
  /* background-color: beige; */
`;

const StyledImgContainer = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  height: 70%;

  img {
    border-radius: 20px;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ColorNameEN = styled.div`
  font-size: 3rem;
  margin: 1%;
`;

const ColorNameKR = styled.div`
  font-size: 2rem;
`;

const DetailButton = styled.button`
  /* margin-top: 5%; */
  margin: 3% 0;
  height: 3%;

  background-color: transparent;
  border: none;

  cursor: pointer;

  color: white;
`;

const PreviousPersonalColorResults = () => {
  return (
    <>
      <StyledContainer>
        <StyledImgContainer>{/* <img src={images.}} /> */}</StyledImgContainer>
        <InfoContainer>
          <ColorNameEN>Summer Mute</ColorNameEN>
          <ColorNameKR>여름 뮤트</ColorNameKR>
          <DetailButton>상세 보기</DetailButton>
        </InfoContainer>
      </StyledContainer>
    </>
  );
};
export default PreviousPersonalColorResults;
