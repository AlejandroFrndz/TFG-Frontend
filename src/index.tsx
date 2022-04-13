import React from "react";
import ReactDOM from "react-dom";
//import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import { Navigation } from "./navigation";
import store from "./redux";

const container = document.getElementById("root") as HTMLElement;

ReactDOM.render(
  <Provider store={store}>
    <Navigation />
  </Provider>,
  container
);

/*
This is React 18 code. We'll upgrade back up when antd v5 with React 18 support is released
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <Navigation />
  </Provider>
);
*/
