import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import { Navigation } from "./navigation";
import store from "./redux";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <Navigation />
  </Provider>
);
