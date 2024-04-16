import React from "react";
import "./App.css";

import ChatPage from "./pages/ChatPage";

const App: React.FC = () => (
    <div className="AppLayoutContainer">
        <ChatPage pageBody={<></>} />
    </div>
);

export default App;
