import React, { StrictMode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { ModalProvider } from "src/context/ModalContext";
import { WindowSizeProvider } from "src/context/WindowSizeContext";
import { AuthProvider } from "src/context/AuthContext";
import { ToastProvider } from "src/context/ToastContext";

import myTheme from "src/styles/theme";
import customTheme from "src/styles/customTheme";

/* REACT QUERY
--===================================================-- */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const AppWrapper = <P extends {}>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
  return (props: P) => (
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <Router>
          <ThemeProvider theme={customTheme}>
            <EmotionThemeProvider theme={myTheme}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <WindowSizeProvider>
                  <ToastProvider>
                    <ModalProvider>
                      <AuthProvider>
                        <WrappedComponent {...props} />
                      </AuthProvider>
                    </ModalProvider>
                  </ToastProvider>
                </WindowSizeProvider>
              </LocalizationProvider>
            </EmotionThemeProvider>
          </ThemeProvider>
        </Router>
      </StrictMode>
    </QueryClientProvider>
  );
};

export default AppWrapper;
