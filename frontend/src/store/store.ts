import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../components/Login/LoginSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
