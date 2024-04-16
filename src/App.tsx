import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";

const App: React.FC = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="chat" element={<ChatPage />} />
        </Routes>
    </BrowserRouter>
);

export default App;
