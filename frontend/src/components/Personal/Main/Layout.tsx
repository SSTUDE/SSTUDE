import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PreviousClothesResults from "../Previous/PreviousClothesResults";
import Header from "./Header";

const Layout = () => {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState("previouspersonalcolor");

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
          />
          <Route path="/previousclothes" element={<PreviousClothesResults />} />
        </Routes>
      </main>
    </>
  );
};

export default Layout;
