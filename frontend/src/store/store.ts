import Position from "./PositionSlice";
import AirQuality from "./AirQualitySlice";
import WeatherReducer from "./WeatherSlice";
import { configureStore } from "@reduxjs/toolkit";
import BusReducer from "../components/Bus/BusSlice";
import loginReducer from "../components/Login/LoginSlice";
import HealthReducer from "../components/Health/HealthSlice";
import PersonalReducer from "../components/Personal/Main/PersonalSlice";
import CaptureReducer from "../components/Personal/Capture/CaptureSlice";
import PreviousReducer from "../components/Personal/Previous/PreviousSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    bus: BusReducer,
    health: HealthReducer,
    capture: CaptureReducer,
    weather: WeatherReducer,
    airQuality: AirQuality,
    position: Position,
    personal: PersonalReducer,
    previous: PreviousReducer,
  },
});

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
