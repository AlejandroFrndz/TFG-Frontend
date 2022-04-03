import React from "react";
import { createRoot } from "react-dom/client";
import "antd/dist/antd.css";
import { Navigation } from "./navigation";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(<Navigation />);
