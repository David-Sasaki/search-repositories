import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import RepoPage from "./pages/RepoPage/RepoPage";
import SettingPage from "./pages/SettingPage/SettingPage";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/repo" element={<RepoPage />} />
    <Route path="/setting" element={<SettingPage />} />
  </Routes>
);

export default AppRoutes;
