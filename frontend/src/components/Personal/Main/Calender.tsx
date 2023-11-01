import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "./Calender.css";
import { ko } from "date-fns/esm/locale";
import Modal from "./Modal";

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
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => {
          setStartDate(date);
          setIsModalOpen(true);
        }}
        inline
        locale={ko}
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
              {date.toLocaleString("ko-KR", { year: "numeric", month: "long" })}
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
      {isModalOpen && (
        <Modal
          activeButton={activeButton}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Calender;
