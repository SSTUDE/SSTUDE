import React from "react";
import { createGlobalStyle, styled } from "styled-components";

const GlobalStyle = createGlobalStyle`
@-webkit-keyframes whirl-color-range {
  0% {
    -webkit-box-shadow: 0px 20px 0 0 #9a12b3, 15px 20px 0 0 #d13fec, 30px 20px 0 0 #e79cf5, 45px 20px 0 0 #fdf9fe, 60px 20px 0 0 white;
            box-shadow: 0px 20px 0 0 #9a12b3, 15px 20px 0 0 #d13fec, 30px 20px 0 0 #e79cf5, 45px 20px 0 0 #fdf9fe, 60px 20px 0 0 white; }
  20% {
    -webkit-box-shadow: 0px 20px 0 0 #d13fec, 15px 20px 0 0 #e79cf5, 30px 20px 0 0 #fdf9fe, 45px 20px 0 0 white, 60px 20px 0 0 #9a12b3;
            box-shadow: 0px 20px 0 0 #d13fec, 15px 20px 0 0 #e79cf5, 30px 20px 0 0 #fdf9fe, 45px 20px 0 0 white, 60px 20px 0 0 #9a12b3; }
  40% {
    -webkit-box-shadow: 0px 20px 0 0 #e79cf5, 15px 20px 0 0 #fdf9fe, 30px 20px 0 0 white, 45px 20px 0 0 #9a12b3, 60px 20px 0 0 #d13fec;
            box-shadow: 0px 20px 0 0 #e79cf5, 15px 20px 0 0 #fdf9fe, 30px 20px 0 0 white, 45px 20px 0 0 #9a12b3, 60px 20px 0 0 #d13fec; }
  60% {
    -webkit-box-shadow: 0px 20px 0 0 #fdf9fe, 15px 20px 0 0 white, 30px 20px 0 0 #9a12b3, 45px 20px 0 0 #d13fec, 60px 20px 0 0 #e79cf5;
            box-shadow: 0px 20px 0 0 #fdf9fe, 15px 20px 0 0 white, 30px 20px 0 0 #9a12b3, 45px 20px 0 0 #d13fec, 60px 20px 0 0 #e79cf5; }
  80% {
    -webkit-box-shadow: 0px 20px 0 0 white, 15px 20px 0 0 #9a12b3, 30px 20px 0 0 #d13fec, 45px 20px 0 0 #e79cf5, 60px 20px 0 0 #fdf9fe;
            box-shadow: 0px 20px 0 0 white, 15px 20px 0 0 #9a12b3, 30px 20px 0 0 #d13fec, 45px 20px 0 0 #e79cf5, 60px 20px 0 0 #fdf9fe; }
  100% {
    -webkit-box-shadow: 0px 20px 0 0 #9a12b3, 15px 20px 0 0 #d13fec, 30px 20px 0 0 #e79cf5, 45px 20px 0 0 #fdf9fe, 60px 20px 0 0 white;
            box-shadow: 0px 20px 0 0 #9a12b3, 15px 20px 0 0 #d13fec, 30px 20px 0 0 #e79cf5, 45px 20px 0 0 #fdf9fe, 60px 20px 0 0 white; } }
@keyframes whirl-color-range {
  0% {
    -webkit-box-shadow: 0px 20px 0 0 #9a12b3, 15px 20px 0 0 #d13fec, 30px 20px 0 0 #e79cf5, 45px 20px 0 0 #fdf9fe, 60px 20px 0 0 white;
            box-shadow: 0px 20px 0 0 #9a12b3, 15px 20px 0 0 #d13fec, 30px 20px 0 0 #e79cf5, 45px 20px 0 0 #fdf9fe, 60px 20px 0 0 white; }
  20% {
    -webkit-box-shadow: 0px 20px 0 0 #d13fec, 15px 20px 0 0 #e79cf5, 30px 20px 0 0 #fdf9fe, 45px 20px 0 0 white, 60px 20px 0 0 #9a12b3;
            box-shadow: 0px 20px 0 0 #d13fec, 15px 20px 0 0 #e79cf5, 30px 20px 0 0 #fdf9fe, 45px 20px 0 0 white, 60px 20px 0 0 #9a12b3; }
  40% {
    -webkit-box-shadow: 0px 20px 0 0 #e79cf5, 15px 20px 0 0 #fdf9fe, 30px 20px 0 0 white, 45px 20px 0 0 #9a12b3, 60px 20px 0 0 #d13fec;
            box-shadow: 0px 20px 0 0 #e79cf5, 15px 20px 0 0 #fdf9fe, 30px 20px 0 0 white, 45px 20px 0 0 #9a12b3, 60px 20px 0 0 #d13fec; }
  60% {
    -webkit-box-shadow: 0px 20px 0 0 #fdf9fe, 15px 20px 0 0 white, 30px 20px 0 0 #9a12b3, 45px 20px 0 0 #d13fec, 60px 20px 0 0 #e79cf5;
            box-shadow: 0px 20px 0 0 #fdf9fe, 15px 20px 0 0 white, 30px 20px 0 0 #9a12b3, 45px 20px 0 0 #d13fec, 60px 20px 0 0 #e79cf5; }
  80% {
    -webkit-box-shadow: 0px 20px 0 0 white, 15px 20px 0 0 #9a12b3, 30px 20px 0 0 #d13fec, 45px 20px 0 0 #e79cf5, 60px 20px 0 0 #fdf9fe;
            box-shadow: 0px 20px 0 0 white, 15px 20px 0 0 #9a12b3, 30px 20px 0 0 #d13fec, 45px 20px 0 0 #e79cf5, 60px 20px 0 0 #fdf9fe; }
  100% {
    -webkit-box-shadow: 0px 20px 0 0 #9a12b3, 15px 20px 0 0 #d13fec, 30px 20px 0 0 #e79cf5, 45px 20px 0 0 #fdf9fe, 60px 20px 0 0 white;
            box-shadow: 0px 20px 0 0 #9a12b3, 15px 20px 0 0 #d13fec, 30px 20px 0 0 #e79cf5, 45px 20px 0 0 #fdf9fe, 60px 20px 0 0 white; } }

.color-range:before {
  -webkit-animation: whirl-color-range .5s infinite ease;
          animation: whirl-color-range .5s infinite ease;
  content: '';
  height: 20px;
  -webkit-transform: translate(-30px, -20px);
          transform: translate(-30px, -20px);
  width: 10px; }
`;
const LoadingComponent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: whirl-color-range 0.5s infinite ease;
`;

const Loading = () => {
  return (
    <>
      <GlobalStyle />
      <LoadingComponent />
    </>
  );
};

export default Loading;
