import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../components/Login/LoginSlice";
import BusReducer from "../components/bus/BusSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    bus: BusReducer,
  },
});

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
