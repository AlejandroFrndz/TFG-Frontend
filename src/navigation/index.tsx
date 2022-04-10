import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../screens/Home";
import { LandingPage } from "../screens/LandingPage";
import { WIP } from "../screens/WIP";

export const Navigation: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/forgot-password" element={<WIP />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
