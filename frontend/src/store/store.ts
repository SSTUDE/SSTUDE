import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../components/Login/LoginSlice";
import BusReducer from "../components/Bus/BusSlice";
import HealthReducer from "../components/Health/HealthSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    bus: BusReducer,
    health: HealthReducer,
  },
});

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
