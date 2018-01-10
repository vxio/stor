import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "App";
import registerServiceWorker from "./registerServiceWorker";
import { ThemeProvider } from "styled-components";
import theme from "theme";
import styled from "styled-components";
import { BrowserRouter } from "react-router-dom";

const app = (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
