import "./Calender.css";
import PrevHealth from "./PrevHealth";
import DatePicker from "react-datepicker";
import { enGB } from "date-fns/esm/locale";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { images } from "../../constants/images";
import MainButton from "../Personal/Main/MainButton";
import { useCustomAlert } from "../../hooks/useAlert";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { healthPrevData, healthTodayData } from "./HealthSlice";
import React, { useEffect, useState, useCallback } from "react";

const StyledTodayHealthDataButton = styled.button`
  position: absolute;
  left: 12.3%;
  top: 5.9%;

  width: 104px;
  height: 104px;
  padding: 0;

  background-color: #4f4f4f;
  border: 2px solid white;
  border-radius: 15%;

  cursor: pointer;
`;

const TodayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100"
    height="100"
    viewBox="0 0 22 22"
    fill="none"
    color="white"
    stroke="currentColor"
    strokeWidth="0.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <text x="1" y="16" fontSize="13px" fontFamily="IAMAPLAYER">
      T
    </text>
    <text x="6.5" y="16" fontSize="6px" fontFamily="IAMAPLAYER">
      oday
    </text>
  </svg>
);

const HealthCalender: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { calendarData } = useSelector((state: RootState) => state.health);
  const [day, setDay] = useState("");
  const [healthData, setHealthData] = useState<any>(null);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [currentComponent, setCurrentComponent] = useState("HealthCalendar");

  const handlTodayHealthDataClick = () => {
    handleHealthTodayData();
    navigate("/healthmain");
  };

  const showAlert = useCustomAlert();

  const handleDayClick = async (dateStr: string) => {
    if (calendarData?.dates.includes(dateStr)) {
      setDay(dateStr);
      const dateParts = dateStr.split("-");
      setStartDate(
        new Date(
          parseInt(dateParts[0]),
          parseInt(dateParts[1]) - 1,
          parseInt(dateParts[2])
        )
      );
      await handlePrevDetailData();
      setCurrentComponent("PrevHealth");
    } else {
      setCurrentComponent("HealthCalendar");
    }
  };

  const handlePrevDetailData = useCallback(async () => {
    const data = {
      year: startDate.getFullYear(),
      month: startDate.getMonth() + 1,
      day: startDate.getDate(),
    };
    const actionResult = await dispatch(healthPrevData(data));
    const res = actionResult.payload;
    if (res) {
      setHealthData(res);
    }
  }, [dispatch, startDate]);

  useEffect(() => {
    if (currentComponent === "PrevHealth" && day) {
      handlePrevDetailData();
    }
  }, [currentComponent, day, handlePrevDetailData]);

  const handleHealthTodayData = useCallback(async () => {
    try {
      const res = await dispatch(healthTodayData()).unwrap();
      if (res) {
        return res;
      }
    } catch (e) {
      console.error("Failed to fetch calendar data:", e);
    }
  }, [dispatch]);

  return (
    <>
      {currentComponent === "HealthCalendar" ? (
        <div className="test">
          <MainButton />
          <StyledTodayHealthDataButton onClick={handlTodayHealthDataClick}>
            <TodayIcon />
          </StyledTodayHealthDataButton>

          <DatePicker
            selected={startDate}
            onChange={(date: Date) => {
              setStartDate(date);
              const dateStr = `${date.getFullYear()}-${(
                "0" +
                (date.getMonth() + 1)
              ).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
              const isDateInList = calendarData?.dates.includes(dateStr);
              if (!isDateInList) {
                showAlert({
                  icon: "info",
                  title: "일일 운동 데이터가 없습니다.",
                });
              }
            }}
            inline
            locale={enGB}
            calendarStartDay={0}
            formatWeekDay={(nameOfDay: string) =>
              nameOfDay.slice(0, 3).toUpperCase()
            }
            renderDayContents={(day: React.ReactNode, date: Date) => {
              const dateStr = `${date.getFullYear()}-${(
                "0" +
                (date.getMonth() + 1)
              ).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
              const isDateInList = calendarData?.dates.includes(dateStr);

              return (
                <>
                  <div>{day}</div>
                  {isDateInList ? (
                    <div onClick={() => handleDayClick(dateStr)}>
                      <img
                        className="icon"
                        src={images.health.heartBeat}
                        alt="사진이 없습니다"
                      />
                    </div>
                  ) : (
                    <div>•</div>
                  )}
                </>
              );
            }}
            renderCustomHeader={({
              date,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }: {
              date: Date;
              decreaseMonth: () => void;
              increaseMonth: () => void;
              prevMonthButtonDisabled: boolean;
              nextMonthButtonDisabled: boolean;
            }) => (
              <div
                style={{
                  margin: 10,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  className="button"
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                >
                  {"<"}
                </button>
                <div>
                  {date.getFullYear()}.{" "}
                  {("0" + (date.getMonth() + 1)).slice(-2)}
                </div>
                <button
                  className="button"
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                >
                  {">"}
                </button>
              </div>
            )}
          />
        </div>
      ) : (
        <PrevHealth
          healthData={healthData}
          setCurrentComponent={setCurrentComponent}
          selectedDate={startDate.toISOString()}
        />
      )}
    </>
  );
};

export default HealthCalender;
