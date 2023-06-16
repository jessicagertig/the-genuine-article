import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "react-query";

import App from "src/layouts/AppWithLayout";
import myTheme from "src/styles/theme";
import customTheme from "src/styles/customTheme";
import reportWebVitals from "src/reportWebVitals";
import "./styles/styles.scss";

const rootElement = document.getElementById("root")!; // non null assertion operator tells TS that element will always exist - may need to explicetly type instead when using some eslint extensions
const root = createRoot(rootElement);

/* REACT QUERY
--===================================================-- */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

root.render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <Router>
        <ThemeProvider theme={customTheme}>
          <EmotionThemeProvider theme={myTheme}>
            <App />
          </EmotionThemeProvider>
        </ThemeProvider>
      </Router>
    </StrictMode>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
