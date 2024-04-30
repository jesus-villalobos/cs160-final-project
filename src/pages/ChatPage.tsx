import React, { useState } from "react";
import { atom, useAtom } from "jotai";
import { Input, Space, Button } from "antd";

import "./../App.css";
import { addNewSurveyResults, ChatMessage, SurvAiChat } from "../state/store";
import MainAppFormat from "./../components/MainAppLayout";

const sampleChatMessages = [
    {
        messageContents: "Do you like pineapple on pizza?",
        sender: "SYSTEM",
    },
];

// Variables for ChatGPT Prompt
const questions =
    "Do you like pineapple on pizza? Why do you dislike or like it? What toppings do you prefer on your pizza?";
const convo = sampleChatMessages;

// Converts array of messages
// (in format of {messageContents: ..., sender: (USER or SYSTEM) })
// to string for prompting
function convoToText(conversation: any[]) {
    var convo_str = "";
    conversation.forEach((msg) => {
        convo_str += `${msg.sender}:  ${msg.messageContents}\n`;
    });
    return convo_str;
}

// --------------------- Begin Chat State ---------------------
const surveyChatAtom = atom<SurvAiChat>({
    chatMessages: sampleChatMessages as ChatMessage[],
});

const chatMessageFunctions = atom(
    (get: any): ChatMessage[] => get(surveyChatAtom).chatMessages,
    (get: any, set: any, newMessage: ChatMessage): void => {
        const chatState = get(surveyChatAtom);
        console.log("Adding new message to chat state", chatState.chatMessages);
        set(surveyChatAtom, {
            chatMessages: [...chatState.chatMessages, newMessage],
        });
    }
);
// --------------------- End Chat State ---------------------

const ChatPage: React.FC = () => {
    const [input, setInput] = useState("");
    // Used to update convo so far
    const [getMessages, addNewChatMessage] = useAtom(chatMessageFunctions);
    const [, pushNewSurveyResults] = useAtom(addNewSurveyResults);

    async function handleSubmit() {
        // Adding user's submitted chat msg
        const newUserMessage = {
            messageContents: input,
            sender: "USER",
        };

        addNewChatMessage(newUserMessage as ChatMessage);
        setInput(""); // Clear input after submitting

        console.log(input);
        sampleChatMessages.push(newUserMessage);

        const response = await fetch(
            "https://noggin.rea.gent/thoughtful-guan-3811",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        "Bearer rg_v1_9p9gyu0nkflmw0wycwq44mt3hi4w3k42kncs_ngk",
                },
                body: JSON.stringify({
                    // fill variables here.
                    questions: questions,
                    convo: convoToText(convo),
                }),
            }
        ).then((response) => response.text());

        console.log(response);

        // Adding System's chat msg
        const newSystemMessage = {
            messageContents: response,
            sender: "SYSTEM",
        };

        addNewChatMessage(newSystemMessage as ChatMessage);
        // Clear input box after submitting
        setInput("");
        sampleChatMessages.push(newSystemMessage);

        console.log(convoToText(convo));
    }

    const updateTextContents = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    return (
        <MainAppFormat
            pageTitle="Chat"
            pageBody={
                <div className="ChatPageBody">
                    <div className="ChatPageMessagesSection">
                        {getMessages.map((message, index) => (
                            <div
                                key={index}
                                className={`ChatMessage${message.sender}`}
                            >
                                <div className="ChatMessageTextArea">
                                    {message.messageContents}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="ChatPageUserInputSection">
                        <Space.Compact style={{ width: "100%" }}>
                            <Input
                                size="large"
                                placeholder="Input your response..."
                                value={input}
                                onChange={updateTextContents}
                            />
                            <Button
                                size="large"
                                onClick={handleSubmit}
                                type="primary"
                            >
                                Submit
                            </Button>
                        </Space.Compact>
                    </div>
                </div>
            }
        />
    );
};

export default ChatPage;
