import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import ChatPageT from "./pages/ChatPageT";
import ChatPageM from "./pages/ChatPageM";
import CreateSurveyPage from "./pages/CreateSurveyPage";
import LoginPage from "./pages/LoginPage";
import ViewSurveysPageM from "./pages/ViewSurveysPageM";
import ViewSurveysPageT from "./pages/ViewSurveysPageT";
import ChoosePage from "./pages/ChoosePage";

const App: React.FC = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="choice" element={<ChoosePage />} />
            <Route path="chat-taker" element={<ChatPageT />} />
            <Route path="chat-maker" element={<ChatPageM />} />
            <Route path="create-survey" element={<CreateSurveyPage />} />
            <Route path="view-surveys-maker" element={<ViewSurveysPageM />} />
            <Route path="view-surveys-taker" element={<ViewSurveysPageT />} />


        </Routes>
    </BrowserRouter>
);

export default App;
