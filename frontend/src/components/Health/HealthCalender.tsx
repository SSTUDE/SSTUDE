import React, { useEffect, useState, useCallback } from "react";
import DatePicker from "react-datepicker";
import "./Calender.css";
import { enGB } from "date-fns/esm/locale";
import MainButton from "../Personal/Main/MainButton";
import PrevHealth from "./PrevHealth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { healthPrevData } from "./HealthSlice";
import { images } from "../../constants/images";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useCustomAlert } from "../../hooks/useAlert";

// 오늘 헬스 데이터로 이동하기 위한 아이콘
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
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [currentComponent, setCurrentComponent] = useState("HealthCalendar");
  const dispatch = useDispatch<AppDispatch>();
  const { calendarData } = useSelector((state: RootState) => state.health);
  const [healthData, setHealthData] = useState<any>(null);
  const [day, setDay] = useState("");
  const navigate = useNavigate();

  const handlTodayHealthDataClick = () => {
    navigate("/healthmain");
  };

  // 알림창
  const showAlert = useCustomAlert();

  const now = new Date();
  const year = now.getFullYear();
  const month = parseInt((now.getMonth() + 1).toString().padStart(2, '0'), 10);
  const days = parseInt(now.getDate().toString().padStart(2, '0'), 10);

  const handlePrevDetailData = useCallback(async () => {
    const data = {
      year: year,
      month: month,
      day: days,
    };
    console.log("이전 헬스 데이터 날짜 불러지나요?", data);
    const actionResult = await dispatch(healthPrevData(data));
    const res = actionResult.payload;
    if (res) {
      setHealthData(res);
    }
  }, [dispatch]);

  const handleDayClick = async (dateStr: string) => {
    if (calendarData?.dates.includes(dateStr)) {
      setDay(dateStr);
      await handlePrevDetailData();
      setCurrentComponent("PrevHealth");
    } else {
      setCurrentComponent("HealthCalendar");
    }
    console.log(currentComponent);
  };

  useEffect(() => {
    if (currentComponent === "PrevHealth" && day) {
      handlePrevDetailData();
    }
  }, [currentComponent, day, handlePrevDetailData]);

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
        />
      )}
    </>
  );
};

export default HealthCalender;
