import { createRoot } from "react-dom/client";

import App from "src/layouts/AppWithLayout";
import AppWrapper from "./AppWrapper";
import reportWebVitals from "src/reportWebVitals";
import "./styles/styles.scss";

const rootElement = document.getElementById("root")!; // non null assertion operator tells TS that element will always exist - may need to explicetly type instead when using some eslint extensions
const root = createRoot(rootElement);

const WrappedApp = AppWrapper(App);

root.render(<WrappedApp />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
