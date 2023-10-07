import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";


import myTheme from "src/styles/theme";
import customTheme from "src/styles/customTheme";

const ThemeProviders = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <ThemeProvider theme={customTheme}>
      <EmotionThemeProvider theme={myTheme}>
        { children }
      </EmotionThemeProvider>
    </ThemeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: ThemeProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };