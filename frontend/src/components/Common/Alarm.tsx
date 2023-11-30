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
import { useDispatch } from "react-redux";
import { setAlarmTime } from "./CommonSlice";

const theme = createTheme(
  {
    palette: {
      primary: { main: "#000000" },
    },
  },
  koKR
);

const TimePickerWrapper = styled.div`
  .MuiPickersLayout-root {
    background-color: transparent;
    overflow: unset;
  }
  .MuiPickersToolbar-content {
    flex-direction: column;
  }
  .MuiTimePickerToolbar-ampmSelection {
    flex-direction: row;
    margin: 0;
  }
  .MuiButtonBase-root.Mui-disabled.MuiIconButton-root.Mui-disabled.MuiIconButton-edgeEnd.MuiIconButton-sizeMedium.MuiPickersArrowSwitcher-button {
    color: #000000;
  }
  .MuiButtonBase-root.MuiIconButton-root.Mui-disabled.MuiIconButton-edgeEnd.MuiIconButton-sizeMedium.MuiPickersArrowSwitcher-button {
    color: #000000;
  }
  .MuiButtonBase-root.Mui-disabled.MuiIconButton-root.Mui-disabled.MuiIconButton-edgeStart.MuiIconButton-sizeMedium.MuiPickersArrowSwitcher-button {
    color: #000000;
  }
  .MuiPickersArrowSwitcher-root.MuiTimeClock-arrowSwitcher {
    top: -100px;
  }
  .MuiPickersLayout-root.MuiPickersLayout-landscape {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0;
  }
  .MuiPickersToolbar-root.MuiPickersLayout-toolbar {
    width: 60vh;
    position: relative;
    z-index: 1;
    right: -150px;
  }
  .MuiPickersLayout-root.MuiPickersLayout-landscape {
    display: grid;
    grid-auto-columns: max-content auto max-content;
    grid-auto-rows: max-content auto max-content;
    overflow: hidden;
    min-width: 320px;
    background-color: transparent;
    height: 100vh;
  }
  .MuiTimePickerToolbar-hourMinuteLabel.MuiTimePickerToolbar-hourMinuteLabelLandscape {
    margin-top: 0;
    font-size: 2rem;
  }  .MuiTypography-root.MuiTypography-overline {
    font-size: 1rem;
    color: black;
  }
  .MuiTypography-root.MuiTypography-h3.MuiPickersToolbarText-root {
    font-size: 10rem;
    color: #7c7c7c;
    margin-right: 10px;
    font-family: "IAMAPLAYER";
  }
  .MuiTypography-root.MuiTypography-h3.MuiPickersToolbarText-root.Mui-selected {
    color: #fff;
  }
  .MuiTypography-root.MuiTypography-h3.MuiTimePickerToolbar-separator.MuiPickersToolbarText-root {
    font-size: 10rem;
    color: grey;
  }

  .MuiTypography-root.MuiTypography-subtitle2.MuiTimePickerToolbar-ampmLabel.MuiPickersToolbarText-root {
    font-size: 5rem;
    color: #7c7c7c;
    margin-right: 30px;
    font-family: "IAMAPLAYER";
  }
  .MuiTypography-root.MuiTypography-subtitle2.MuiTimePickerToolbar-ampmLabel.MuiPickersToolbarText-root.Mui-selected {
    color: #fff;
  }
  .MuiTimeClock-root {
    margin: auto;
    margin-top: 5vh;
    width: auto;
    position: relative;
    right: -20px;
  }
  .MuiClock-root {
    margin: 0;
  }
  .MuiClock-clock {
    background-color: #fff;
  }
  .MuiPickersLayout-contentWrapper {
    grid-column: 2/4;
    transform: scale(3);
  }
  .MuiClockNumber-root {
    color: black;
    font-family: "IAMAPLAYER";
  }
  .MuiClockNumber-root.Mui-selected {
    color: white;
  }
  .MuiClock-pin {
    width: 12px;
    height: 12px;
    background-color: gray;
  }
  .MuiClockPointer-root {
    background-color: gray;
  }
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
`;

const UnSelectTimeBg = styled.div`
  position: fixed;
  right: 18.4%;
  bottom: 4.2%;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const SelectTime = styled.p`
  font-size: 2.5rem;
  color: white;
  font-family: "Giants-Bold";
  padding: 10px;
`;

export default function Alarm() {
  const { sendMessage } = useWebSocket(RASPBERRY_URL);
  const showAlert = useCustomAlert();
  const dispatch = useDispatch();
  const [selectTime, setSelectTime] = React.useState(dayjs());

  const timeChange = (newTime: any) => {
    setSelectTime(newTime);
  };

  const navigate = useNavigate();

  const HandleUnSelect = () => {
    navigate("/mirror");
  };

  const HandleSelect = () => {
    const hour = selectTime.hour();
    const minute = selectTime.minute();

    dispatch(setAlarmTime({ hour, minute }));

    const data = {
      start_hour: hour,
      start_minute: minute,
      play_times: 1,
      duration_minutes: 1,
    };

    const message = {
      type: "alarm",
      data,
    };

    sendMessage(message)
        showAlert({
          icon: "success",
          title: "알람이 설정 되었습니다.",
          timer: 1500,
        });
        navigate("/mirror");
  };

  return (
    <TimePickerWrapper>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
        </LocalizationProvider>
      </ThemeProvider>
    </TimePickerWrapper>
  );
}
