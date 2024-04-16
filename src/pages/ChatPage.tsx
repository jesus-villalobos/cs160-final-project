import React from "react";
import "./../App.css";

import MainAppFormat from "./../components/MainAppLayout";

type Props = {
    pageBody: any;
};

const ChatPage: React.FC<Props> = (props: Props) => {
    return (
        <div className="AppLayoutContainer">
            <MainAppFormat pageBody={<></>} />
        </div>
    );
};

export default ChatPage;
