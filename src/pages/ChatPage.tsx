import React from "react";
import "./../App.css";

import MainAppFormat from "./../components/MainAppLayout";

const ChatPage: React.FC = () => {
    return (
        <div className="AppLayoutContainer">
            <MainAppFormat pageBody={<></>} />
        </div>
    );
};

export default ChatPage;
