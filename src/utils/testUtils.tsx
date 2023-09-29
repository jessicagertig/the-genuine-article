import React, { ReactElement, StrictMode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { ModalProvider } from "src/context/ModalContext";
import { WindowSizeProvider } from "src/context/WindowSizeContext";
import { AuthProvider } from "src/context/AuthContext";

import myTheme from "src/styles/theme";
import customTheme from "src/styles/customTheme";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <StrictMode>
          <ThemeProvider theme={customTheme}>
            <EmotionThemeProvider theme={myTheme}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <WindowSizeProvider>
                  <ModalProvider>
                    <AuthProvider>
                      {children}
                    </AuthProvider>
                  </ModalProvider>
                </WindowSizeProvider>
              </LocalizationProvider>
            </EmotionThemeProvider>
          </ThemeProvider>
      </StrictMode>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
