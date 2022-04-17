import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "src/screens/Home";
import { LandingPage } from "src/screens/LandingPage";
import { WIP } from "src/screens/WIP";

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
