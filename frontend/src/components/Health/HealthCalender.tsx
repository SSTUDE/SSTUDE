import React, { useEffect, useState, useCallback } from "react";
import DatePicker from "react-datepicker";
import "./Calender.css";
import { enGB } from "date-fns/esm/locale";
import MainButton from "../Personal/Main/MainButton";
import PrevHealth from "./PrevHealth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { healthPrevData } from "./HealthSlice";

const HealthCalender: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [currentComponent, setCurrentComponent] = useState("HealthCalendar");
  const dispatch = useDispatch<AppDispatch>();
  const { calendarData } = useSelector((state: RootState) => state.health);
  const [healthData, setHealthData] = useState<any>(null);
  const [day, setDay] = useState("");

  const handlePrevDetailData = useCallback(async () => {
    const data = {
      year: 2023,
      month: 11,
      day: 12,
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
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => {
              setStartDate(date);
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
                  <div onClick={() => handleDayClick(dateStr)}>
                    {isDateInList ? (
                      <span className="icon">❤️</span>
                    ) : (
                      <div>
                        <span className="icon">•</span>
                      </div>
                    )}
                  </div>
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
