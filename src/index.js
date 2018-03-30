import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "App";
import registerServiceWorker from "./registerServiceWorker";
import { ThemeProvider } from "styled-components";
import {variables} from "theme";
import { BrowserRouter, HashRouter } from "react-router-dom";

const app = (
  <ThemeProvider theme={variables}>
    {/* <BrowserRouter basename={process.env.PUBLIC_URL} >
      <App />
    </BrowserRouter> */}
    <HashRouter>
      <App/>
    </HashRouter>
  </ThemeProvider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
