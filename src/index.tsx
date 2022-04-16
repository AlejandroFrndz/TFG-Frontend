import React from "react";
import ReactDOM from "react-dom";
//import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import { Navigation } from "./navigation";
import store from "./redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const container = document.getElementById("root") as HTMLElement;

ReactDOM.render(
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <Navigation />
    </DndProvider>
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
