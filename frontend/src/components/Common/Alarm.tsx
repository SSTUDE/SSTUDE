import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { koKR } from "@mui/x-date-pickers/locales";

const theme = createTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
  },
  koKR
);

export default function Alarm() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["StaticTimePicker"]}>
          <DemoItem label="">
            <StaticTimePicker defaultValue={dayjs()} />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    </ThemeProvider>
  );
}