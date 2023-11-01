import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./Header";
import PreviousPersonalColorResults from "../Previous/PreviousPersonalColorResults";
import PreviousClothesResults from "../Previous/PreviousClothesResults";

const Layout = () => {
  const [activeButton, setActiveButton] = useState("previouspersonalcolor");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/previouspersonalcolor") {
      setActiveButton("previouspersonalcolor");
    }
  }, [location]);

  return (
    <>
      <Header activeButton={activeButton} setActiveButton={setActiveButton} />
      <main>
        <Routes>
          <Route
            path="/previouspersonalcolor"
            element={<PreviousPersonalColorResults />}
          />
          <Route path="/previousclothes" element={<PreviousClothesResults />} />
        </Routes>
      </main>
    </>
  );
};

export default Layout;
