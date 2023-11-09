import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "./Calender.css";
import { enGB } from "date-fns/esm/locale";
import Modal from "./Modal";
import MainButton from "./MainButton";
import CameraButton from "./CameraButton";

type DiagnosisData = {
  [key: string]: { personalColor: boolean; outfit: boolean };
};

const diagnosisData: DiagnosisData = {
  "2023-10-25": { personalColor: true, outfit: false },
  "2023-10-28": { personalColor: false, outfit: true },
  "2023-10-30": { personalColor: true, outfit: true },
};

const Calender: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("personalColor");

  const handleClickPersonalColor = () => {
    setActiveButton("personalColor");
    setIsModalOpen(true);
  };

  const handleClickClothes = () => {
    setActiveButton("previousclothes");
    setIsModalOpen(true);
  };

  return (
    <div className="test">
      <MainButton />
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => {
          setStartDate(date);
          setIsModalOpen(true);
        }}
        inline
        locale={enGB}
        calendarStartDay={0}
        formatWeekDay={(nameOfDay: string) =>
          nameOfDay.slice(0, 3).toUpperCase()
        }
        renderDayContents={(day: React.ReactNode, date: Date) => {
          const dateStr = date.toLocaleDateString("fr-CA");
          const diagnosis = diagnosisData[dateStr];
          return (
            <>
              <div>{day}</div>
              <div>
                {diagnosis ? (
                  <div>
                    {diagnosis.personalColor && (
                      <span className="icon">🎨</span>
                    )}
                    {diagnosis.outfit && <span className="icon">👗</span>}
                  </div>
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
            style={{ margin: 10, display: "flex", justifyContent: "center" }}
          >
            <button
              className="button"
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
            >
              {"<"}
            </button>
            <div>
              {date.getFullYear()}. {("0" + (date.getMonth() + 1)).slice(-2)}
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
      <CameraButton />
      {isModalOpen && (
        <Modal
          activeButton={activeButton}
          onClose={() => setIsModalOpen(false)}
          selectedDate={startDate}
        />
      )}
    </div>
  );
};

export default Calender;
