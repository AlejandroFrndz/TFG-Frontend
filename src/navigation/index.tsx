import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CheatSheetsHub } from "src/screens/CheatSheets/Hub";
import { CheatSheetsSwitch } from "src/screens/CheatSheets/Switch";
import { Home } from "src/screens/Home";
import { LandingPage } from "src/screens/LandingPage";
import { Project } from "src/screens/Project";
import { WIP } from "src/screens/WIP";

export const Navigation: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/forgot-password" element={<WIP />} />
        <Route path="/home" element={<Home />} />
        <Route path="/project/:projectId" element={<Project />} />
        <Route path="/tags" element={<CheatSheetsHub />} />
        <Route path="/tags/:type" element={<CheatSheetsSwitch />} />
      </Routes>
    </BrowserRouter>
  );
};
