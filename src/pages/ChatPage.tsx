import React from "react";
import "./../App.css";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
} from "@chatscope/chat-ui-kit-react";

import "react-chat-elements/dist/main.css";

import MainAppFormat from "./../components/MainAppLayout";

const ChatPage: React.FC = () => {
    return (
        <div className="AppLayoutContainer">
            <MainAppFormat
                pageBody={
                    <div className="ChatPageBody">
                        <Message
                            model={{
                                message: "Hello my friend",
                                sender: "Joe",
                                sentTime: "just now",
                                direction: "incoming",
                                position: "single",
                            }}
                        />
                    </div>
                }
            />
        </div>
    );
};

export default ChatPage;
