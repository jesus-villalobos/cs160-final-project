import React from "react";
import "./../App.css";

import { Input, Flex } from "antd";

import MainAppFormat from "./../components/MainAppLayout";

const { TextArea } = Input;

const sampleChatMessages = [
    {
        messageContents: "Hello there this is my first message.",
        sender: "USER",
    },
    {
        messageContents: "Hi. How can I help you today?",
        sender: "SYSTEM",
    },
    {
        messageContents: "How are you? I'm trying to make a survery chatbot.",
        sender: "USER",
    },
    {
        messageContents:
            "I am good. I can help you with that. What do you need help with?",
        sender: "SYSTEM",
    },
    {
        messageContents: "What is your name? I am trying to make a survey.",
        sender: "USER",
    },
];

const ChatPage: React.FC = () => {
    return (
        <>
            <MainAppFormat
                pageTitle="Chat"
                pageBody={
                    <>
                        <div className="ChatPageBody">
                            <Flex vertical gap={16}>
                                {sampleChatMessages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`ChatMessage${message.sender}`}
                                    >
                                        <TextArea
                                            disabled
                                            autoSize
                                            variant="borderless"
                                            color="black"
                                            defaultValue={
                                                message.messageContents
                                            }
                                        />
                                    </div>
                                ))}
                                <br />
                            </Flex>
                        </div>
                    </>
                }
            />
        </>
    );
};

export default ChatPage;
