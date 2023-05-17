import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from 'src/layouts/AppWithLayout';
import myTheme from "src/styles/theme";
import reportWebVitals from 'src/reportWebVitals';
import { ThemeProvider } from '@chakra-ui/react';
import './styles/styles.scss'

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Router>
      <ThemeProvider theme={myTheme}>
        <App />
      </ThemeProvider>
    </Router>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
