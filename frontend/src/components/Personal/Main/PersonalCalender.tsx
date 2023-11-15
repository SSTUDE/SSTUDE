import React, { useState, useEffect, useCallback } from "react";
import DatePicker from "react-datepicker";
import "./Calender.css";
import { enGB } from "date-fns/esm/locale";
import Modal from "./Modal";
import MainButton from "./MainButton";
import CameraButton from "./CameraButton";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { PersonalBeautyModal } from "./PersonalSlice";
import { PersonalClothesyModal } from "../Previous/PreviousSlice";
import { useCustomAlert } from "../../../hooks/useAlert";
import { images } from "../../../constants/images";

type DiagnosisData = {
  makeup: string[];
  clothes: string[];
};

const PersonalCalender: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const diagnosisData =
    (location.state as { diagnosisData: DiagnosisData })?.diagnosisData || {};

  // 달력 라이브러리
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("personalColor");

  // 메이크업 및 의상 진단값 있는 경우
  const [makeupDates, setMakeupDates] = useState<string[]>([]);
  const [clothesDates, setClothesDates] = useState<string[]>([]);

  // 알림창
  const showAlert = useCustomAlert();

  const handleClick = () => {
    showAlert({
      icon: "success",
      title: "",
      html: "",
    });
  };

  useEffect(() => {
    setMakeupDates(diagnosisData.makeup || []);
    setClothesDates(diagnosisData.clothes || []);
  }, [diagnosisData]);

  const handleClickClothes = () => {
    setActiveButton("previousclothes");
    setIsModalOpen(true);
  };

  const now = new Date();
  const year = now.getFullYear();
  const month = parseInt((now.getMonth() + 1).toString().padStart(2, '0'), 10);
  const days = parseInt(now.getDate().toString().padStart(2, '0'), 10);
  
  const handlePersonalModal = useCallback(async () => {
    const data = {
      year: year,
      month: month,
      day: days,
    };
    try {
      console.log("try 뜨나요");
      const res = await dispatch(PersonalBeautyModal(data)).unwrap();
      console.log("결과는요?", res);
      if (res) {
        // dispatch(setMemberId(res.memberId));
        return res;
      }
    } catch (e) {
      console.error("Failed to fetch calendar data:", e);
    }
  }, [dispatch]);

  
  
  const handleClothesModal = useCallback(async () => {
    const data = {
      year: year,
      month: month,
      day: days,
    };
    try {
      console.log("의상 try 뜨나요");
      const res = await dispatch(PersonalClothesyModal(data)).unwrap();
      console.log("의상 결과는요?", res);
      if (res) {
        // dispatch(setMemberId(res.memberId));
        return res;
      }
    } catch (e) {
      console.error("Failed to fetch calendar data:", e);
    }
  }, [dispatch]);

  return (
    <div className="test">
      <MainButton />
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => {
          setStartDate(date);
          const dateStr = date.toLocaleDateString("fr-CA");
          const isMakeupDay = makeupDates.includes(dateStr);
          const isClothesDay = clothesDates.includes(dateStr);
          if (isMakeupDay || isClothesDay) {
            setIsModalOpen(true);
            handlePersonalModal();
            handleClothesModal();
          } else {
            showAlert({
              icon: "info",
              title: "메이크업 또는 의상 진단 결과가 없습니다",
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
          const dateStr = date.toLocaleDateString("fr-CA");
          const isMakeupDay = makeupDates.includes(dateStr);
          const isClothesDay = clothesDates.includes(dateStr);

          return (
            <>
              <div>{day}</div>
              <div>
                {isMakeupDay && (
                  <img
                    className="icon"
                    src={images.personal.palette}
                    alt="사진이 없습니다"
                  />
                )}
                {isClothesDay && (
                  <img
                    className="icon"
                    src={images.personal.dress}
                    alt="사진이 없습니다"
                  />
                )}
                {!isMakeupDay && !isClothesDay && (
                  <span className="dotIcon">•</span>
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

export default PersonalCalender;
