// 통통 튀는 공 로딩
// import styled, { keyframes, css } from "styled-components";

// const circle = `
//   0% {
//     top: 60px;
//     height: 5px;
//     border-radius: 50px 50px 25px 25px;
//     transform: scaleX(1.7);
//   }
//   40% {
//     height: 20px;
//     border-radius: 50%;
//     transform: scaleX(1);
//   }
//   100% {
//     top: 0%;
//   }
// `;

// const shadow = `
//   0% {
//     transform: scaleX(1.5);
//   }
//   40% {
//     transform: scaleX(1);
//     opacity: .7;
//   }
//   100% {
//     transform: scaleX(.2);
//     opacity: .4;
//   }
// `;

// const Circle = styled.div`
//   width: 20px;
//   height: 20px;
//   position: absolute;
//   border-radius: 50%;
//   background-color: #fff;
//   left: 15%;
//   transform-origin: 50%;
//   animation: ${circle} 0.5s alternate infinite ease;

//   &:nth-child(2) {
//     left: 45%;
//     animation-delay: 0.2s;
//   }

//   &:nth-child(3) {
//     left: auto;
//     right: 15%;
//     animation-delay: 0.3s;
//   }
// `;

// const Shadow = styled.div`
//   width: 20px;
//   height: 4px;
//   border-radius: 50%;
//   background-color: rgba(255, 255, 255, 0.5);
//   position: absolute;
//   top: 62px;
//   transform-origin: 50%;
//   z-index: -1;
//   left: 15%;
//   filter: blur(1px);
//   animation: ${shadow} 0.5s alternate infinite ease;

//   &:nth-child(4) {
//     left: 45%;
//     animation-delay: 0.2s;
//   }

//   &:nth-child(5) {
//     left: auto;
//     right: 15%;
//     animation-delay: 0.3s;
//   }
// `;

// const Wrapper = styled.div`
//   width: 200px;
//   height: 60px;
//   position: absolute;
//   left: 50%;
//   top: 50%;
//   transform: translate(-50%, -50%) scale(2);
// `;

// const Text = styled.span`
//   position: absolute;
//   top: 75px;
//   font-family: "Lato";
//   font-size: 20px;
//   letter-spacing: 12px;
//   color: #fff;
//   left: 15%;
// `;
// const DiagnosisLoading = () => {
//   return (
//     <>
//       <Wrapper>
//         <Circle></Circle>
//         <Circle></Circle>
//         <Circle></Circle>
//         <Shadow></Shadow>
//         <Shadow></Shadow>
//         <Shadow></Shadow>
//         <Text>진단 중...</Text>
//       </Wrapper>
//     </>
//   );
// };

// export default DiagnosisLoading;

// 모던한 컬러 circle
import styled, { keyframes } from "styled-components";

const ringSize = "300px";

const redanim = keyframes`
  0%   {transform:  rotate(0deg)   scaleX(0.90) scaleY(1.00);}
  50%  {transform:  rotate(180deg) scaleX(0.90) scaleY(1.00);}
  100% {transform:  rotate(360deg) scaleX(0.90) scaleY(1.00);}
`;

const greenanim = keyframes`
  0%   {transform:  rotate(31deg) scaleX(0.90) scaleY(1.00);}
  25%  {transform:  rotate(121deg) scaleX(1.00) scaleY(0.90);}
  50%  {transform:  rotate(211deg) scaleX(0.90) scaleY(1.00);}
  75%  {transform:  rotate(301deg) scaleX(1.00) scaleY(0.90);}
  100% {transform:  rotate(391deg) scaleX(0.90) scaleY(1.00);}
`;

const blueanim = keyframes`
  0%   {transform:  rotate(413deg) scaleX(0.90) scaleY(1.00);}
  50%  {transform:  rotate(233deg) scaleX(0.90) scaleY(1.00);}
  100% {transform:  rotate(53deg) scaleX(0.90) scaleY(1.00);}
`;

const yellowanim = keyframes`
  0%   {transform:  rotate(472deg) scaleX(0.90) scaleY(1.00);}
  25%  {transform:  rotate(382deg) scaleX(1.00) scaleY(0.90);}
  50%  {transform:  rotate(292deg) scaleX(0.90) scaleY(1.00);}
  75%  {transform:  rotate(202deg) scaleX(1.00) scaleY(0.90);}
  100% {transform:  rotate(112deg) scaleX(0.90) scaleY(1.00);}
`;

const Container = styled.div`
  margin: auto;
  width: ${ringSize};
  height: ${ringSize};
  position: relative;
  top: -100%;
  transform: translateY(100%);
`;

const Ring = styled.div`
  width: ${ringSize};
  height: ${ringSize};
  border-radius: ${ringSize};
  position: absolute;
  mix-blend-mode: screen;
  background: transparent;
`;

const Red = styled(Ring)`
  border: calc(${ringSize}*0.06) solid #d50f1c;
  animation: ${redanim} linear 6s infinite;
`;

const Green = styled(Ring)`
  border: calc(${ringSize}*0.06) solid #009927;
  animation: ${greenanim} linear 6s infinite;
`;

const Blue = styled(Ring)`
  border: calc(${ringSize}*0.06) solid #3569e1;
  animation: ${blueanim} linear 6s infinite;
`;

const Yellow = styled(Ring)`
  border: calc(${ringSize}*0.06) solid #edb40f;
  animation: ${yellowanim} linear 6s infinite;
`;

const DiagnosisLoading = () => {
  return (
    <Container>
      <Red />
      <Green />
      <Blue />
      <Yellow />
    </Container>
  );
};

export default DiagnosisLoading;

// import React from 'react'

// const DiagnosisLoading = () => {
//   return (
//     <div>DiagnosisLoading</div>
//   )
// }

// export default DiagnosisLoading
