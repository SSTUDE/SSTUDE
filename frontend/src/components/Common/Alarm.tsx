import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { koKR } from "@mui/x-date-pickers/locales";
import { GlobalStyles } from "@mui/system";
import styled from "styled-components";

const theme = createTheme(
  {
    palette: {
      primary: { main: "#000000" },
    },
  },
  koKR
);

const TimePickerWrapper = styled.div`
  // 전체 DIV
  .MuiPickersLayout-root.MuiPickersLayout-landscape {
    display: flex;
    flex-direction: row;
    /* height: 100%; */
    align-items: center;
    justify-content: center;
    padding: 0;
  }
  // 서브 DIV
  .MuiPickersToolbar-root.MuiPickersLayout-toolbar {
    /* height: 100vh; */
    width: 100vh;
    position: relative;
    top: -300px;
    right: 350px;
    z-index: 1;
  }
  // 시계 파트 전체 DIV
  .MuiPickersLayout-root.MuiPickersLayout-landscape {
    display: grid;
    grid-auto-columns: max-content auto max-content;
    grid-auto-rows: max-content auto max-content;
    overflow: hidden;
    min-width: 320px;
    /* background-color: #f8bdbd; */
    background-color: transparent;
    height: 100vh;
  }
  // 시계만 있는 DIV
  .MuiTimePickerToolbar-hourMinuteLabel.MuiTimePickerToolbar-hourMinuteLabelLandscape {
    margin-top: 0;
    font-size: 2rem;
  }
  // 시간 선택하기
  .MuiTypography-root.MuiTypography-overline {
    font-size: 1rem;
    color: black;
  }
  // 시간 선택 안 되었을 때
  .MuiTypography-root.MuiTypography-h3.MuiPickersToolbarText-root {
    font-size: 10rem;
    color: gray;
    margin-right: 10px;
    font-family: "IAMAPLAYER";
  }
  // 시간 선택 되었을 때
  .MuiTypography-root.MuiTypography-h3.MuiPickersToolbarText-root.Mui-selected {
    color: #fff;
  }
  // :
  .MuiTypography-root.MuiTypography-h3.MuiTimePickerToolbar-separator.MuiPickersToolbarText-root {
    font-size: 10rem;
    color: grey;
  }
  // AM PM 전체 DIV
  .MuiTimePickerToolbar-ampmSelection.MuiTimePickerToolbar-ampmLandscape {
    /* flex: 0; */
  }
  // AM PM 선택 안 되었을 때
  .MuiTypography-root.MuiTypography-subtitle2.MuiTimePickerToolbar-ampmLabel.MuiPickersToolbarText-root {
    font-size: 5rem;
    color: rgba(173, 163, 163, 0.87);
    margin-right: 30px;
    font-family: "IAMAPLAYER";
  }
  // AM PM 선택 되었을 때
  .MuiTypography-root.MuiTypography-subtitle2.MuiTimePickerToolbar-ampmLabel.MuiPickersToolbarText-root.Mui-selected {
    color: #fff;
  }
  // 시계 감싸는 DIV
  .MuiTimeClock-root {
    margin: auto;
    /* width: 700px; */
    /* height: 700ox; */
    /* max-height: 1000px; */
    margin-top: 5vh;
  }
  .MuiClock-root {
    margin: 0;
  }
  // 시계 내부
  .MuiClock-clock {
    /* width: 660px; */
    /* height: 660px; */
    /* background-color: rgba(173, 163, 163, 0.597); */
    background-color: #fff;
  }
  // 시계 전체 컨테이너
  .MuiPickersLayout-contentWrapper {
    transform: scale(3);
  }
  // 시계 시간 및 분 선택 안 되었을 때
  .MuiClockNumber-root {
    color: black;
    font-family: "IAMAPLAYER";
  }
  // 시계 시간 및 분 선택되었을 때
  .MuiClockNumber-root.Mui-selected {
    color: white;
  }
  // 시계 핀 중앙
  .MuiClock-pin {
    width: 12px;
    height: 12px;
    background-color: gray;
  }
  // 시계 침
  .MuiClockPointer-root {
    background-color: gray;
  }
  // 시계 침 끝 동그라미
  .MuiClockPointer-thumb {
    border: 13px solid gray;
    left: calc(50% - 15px);
    top: -18px;
  }
  // 취소 확인 버튼 DIV
  .MuiDialogActions-root.MuiDialogActions-spacing.MuiPickersLayout-actionBar {
    position: relative;
    bottom: 50px;
    left: 400px;
    padding: 0;
  }
  // 취소 확인 버튼
  .MuiButtonBase-root.MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButton-sizeMedium.MuiButton-textSizeMedium.MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButton-sizeMedium.MuiButton-textSizeMedium {
    font-size: 2.5rem;
    color: white;
    font-family: "Giants-Bold";
  }
`;

export default function Alarm() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePickerWrapper>
          <StaticTimePicker defaultValue={dayjs()} />
        </TimePickerWrapper>
      </LocalizationProvider>
    </ThemeProvider>
  );
}