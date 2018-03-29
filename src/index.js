import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "App";
import registerServiceWorker from "./registerServiceWorker";
import { ThemeProvider } from "styled-components";
import {variables} from "theme";
import { HashRouter } from "react-router-dom";

const app = (
  <ThemeProvider theme={variables}>
    <HashRouter >
      <App />
    </HashRouter>
  </ThemeProvider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
