import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "./Calender.css";
import { enGB } from "date-fns/esm/locale";
import MainButton from "../Personal/Main/MainButton";
import PrevHealth from "./PrevHealth";
import axios from "axios";

type Dates = string[];

// const dates: Dates = ["25", "28", "30"];

const HealthCalender: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [year, setYear] = useState(startDate.getFullYear());
  const [month, setMonth] = useState(startDate.getMonth() + 1);
  const [dates, setDates] = useState<string[]>([]);
  const [currentComponent, setCurrentComponent] = useState("HealthCalendar");

  // API
  const [day, setDay] = useState("");
  const [healthData, setHealthData] = useState({
    steps: null,
    burntKcal: null,
    consumedKcal: null,
    sleepTime: null,
  });

  const handleDayClick = (dateStr: string) => {
    if (dates.includes(dateStr)) {
      setDay(dateStr);
      setCurrentComponent("PrevHealth");
    } else {
      setCurrentComponent("HealthCalendar");
    }
    console.log(currentComponent);
  };

  useEffect(() => {
    if (currentComponent === "PrevHealth" && day) {
      axios
        .post("http://example.com/health/day", { year, month, day })
        .then((response) => {
          const { steps, burntKcal, consumedKcal, sleepTime } = response.data;
          setHealthData({ steps, burntKcal, consumedKcal, sleepTime });
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }, [currentComponent, day]);

  // // year나 month가 변경될 때마다 API 호출 대신 dummy 데이터 업데이트
  // useEffect(() => {
  //   if (year === 2023 && month === 11) {
  //     setDates([
  //       "1",
  //       "3",
  //       "5",
  //       "7",
  //       "9",
  //       "11",
  //       "13",
  //       "15",
  //       "17",
  //       "19",
  //       "21",
  //       "23",
  //       "25",
  //       "27",
  //       "29",
  //       "31",
  //     ]);
  //   } else {
  //     setDates([]);
  //   }
  // }, [year, month]);

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
              const dateStr = date.getDate().toString();
              const isDateInList = dates.includes(dateStr);
              return (
                <>
                  <div>{day}</div>
                  <div onClick={() => handleDayClick(dateStr)}>
                    {isDateInList ? (
                      <span className="icon">❤️</span> // 하트 아이콘 추가
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
