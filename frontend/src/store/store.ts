import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../components/Login/LoginSlice";
import BusReducer from "../components/Bus/BusSlice";
import MirrorReducer from "../components/Main/MirrorSlice";
import HealthReducer from "../components/Health/HealthSlice";
import CaptureReducer from "../components/Personal/Capture/CaptureSlice";
import WeatherReducer from './WeatherSlice'
import AirQuality from "./AirQualitySlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    bus: BusReducer,
    mirror: MirrorReducer,
    health: HealthReducer,
    capture: CaptureReducer,
    weather: WeatherReducer,
    air: AirQuality,
  },
});

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
