"use client";

import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const MuiProvider = ({ children }: Props) => {
  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          mode: "light", // or 'dark'
        },
      })}
    >
      {children}
    </ThemeProvider>
  );
};

export default MuiProvider;
