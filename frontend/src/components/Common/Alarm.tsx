import * as React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { koKR } from "@mui/x-date-pickers/locales";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useWebSocket } from "../../hooks/useWebSocket";
import { RASPBERRY_URL } from "../../apis/constants";
import { useCustomAlert } from "../../hooks/useAlert";

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
    /* height: 700px; */
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
  // 시계 터치영역 조절 (100/배율)%
  .MuiClock-squareMask {
    /* left: 33.333%; */
    /* top: 33.333%; */
    /* background-color: red; */
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
`;

const SelectTimeBg = styled.div`
  position: fixed;
  right: 12.6%; 
  bottom: 4.2%; 
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`

const UnSelectTimeBg = styled.div`
  position: fixed;
  right: 18.4%; 
  bottom: 4.2%; 
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`

const SelectTime = styled.p`
  font-size: 2.5rem;
  color: white;
  font-family: "Giants-Bold";
  padding: 10px;
`;

export default function Alarm() {
  // const { sendMessage } = useWebSocket(RASPBERRY_URL);
  const showAlert = useCustomAlert();
  const [selectTime, setSelectTime] = React.useState(dayjs());

  const timeChange = (newTime: any) => {
    setSelectTime(newTime);
  };

  const navigate = useNavigate();

  const HandleUnSelect = () => {
    navigate('/mirror');
  };

  const HandleSelect = () => {
    const hour = selectTime.hour();
    const minute = selectTime.minute();

    const message = {
      start_hour: hour,
      start_minute: minute,
      play_times: 1,
      duration_minutes: 1
    };

    console.log(message)

    // sendMessage(message)
    //   .then((response) => {
    //     console.log("알람 응답옴", response)
    showAlert({
      icon: 'success',
      title: '알람이 설정 되었습니다.',
      timer: 1500,
    });
    navigate('/mirror');
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePickerWrapper>
          <StaticTimePicker
            displayStaticWrapperAs="mobile"
            value={selectTime}
            onChange={timeChange}
          />
          <UnSelectTimeBg onClick={HandleUnSelect}>
            <SelectTime>취소</SelectTime>
          </UnSelectTimeBg>
          <SelectTimeBg onClick={HandleSelect}>
            <SelectTime>확인</SelectTime>
          </SelectTimeBg>
        </TimePickerWrapper>
      </LocalizationProvider>
    </ThemeProvider>
  );
}