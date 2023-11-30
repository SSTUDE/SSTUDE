import styled, { keyframes } from "styled-components";

const ringSize = "500px";

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
  top: -50%;
  transform: translateY(50%);
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
