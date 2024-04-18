import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import ChatPage from "./pages/ChatPage";
import CreateSurveyPage from "./pages/CreateSurveyPage";
import LoginPage from "./pages/LoginPage";
import ViewSurveysPage from "./pages/ViewSurveysPage";

const App: React.FC = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="create-survey" element={<CreateSurveyPage />} />
            <Route path="view-surveys" element={<ViewSurveysPage />} />
        </Routes>
    </BrowserRouter>
);

export default App;
