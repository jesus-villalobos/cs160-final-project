import React, { useState } from "react";
import { Input, Space, Button, Collapse, Form, Checkbox, Radio, Row, notification } from "antd";
import MakerFormat from "../components/Maker";
import "./../App.css";

const { Panel } = Collapse;
const surveyTitle = "Generate your survey";

const currentConvo = [
    {
        messageContents: "Hello! Please tell me what survey you need.",
        sender: "SYSTEM",
    },
];

function convoToText(conversation: { sender: string, messageContents: string }[]) {
    return conversation.map(msg => `${msg.sender}: ${msg.messageContents}\n`).join('');
}

const ChatPageM = () => {
    const [input, setInput] = useState("");
    const [chatMessages, setChatMessages] = useState(currentConvo);
    const [surveyAnswers, setSurveyAnswers] = useState({});
    const [chatComplete, setChatComplete] = useState(false);
    const [surveyCompleted, setSurveyCompleted] = useState(false);
    const updateTextContents = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleCompleteSurvey = () => {
        setSurveyCompleted(true);
        notification.success({
            message: 'Survey Completion',
            description: 'Thank you for completing the survey!',
            placement: 'bottomRight'
        });
    };

    const updateSurveyAnswerChange = (qID: string, values: string[] | string) => {
        const updatedAnswers = Array.isArray(values) ? values.join(", ") : String(values);
        setSurveyAnswers(prevAnswers => ({ ...prevAnswers, [qID]: updatedAnswers }));
    };

    const handleSubmit = async () => {
        const newUserMessage = {
            messageContents: input,
            sender: "USER",
        };

        setChatMessages([...chatMessages, newUserMessage]);
        setInput("");
        currentConvo.push(newUserMessage);

        try {
            const response = await fetch('https://noggin.rea.gent/impressed-mongoose-8188', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer rg_v1_xwu38u6prbu4sr2pourpby82cj5vyyz483ha_ngk',
                },
                body: JSON.stringify({
                    "survey": "survey response here",
                    "conv": convoToText(currentConvo),
                }),
            }).then(response => response.text());

            const newSystemMessage = {
                messageContents: response,
                sender: "SYSTEM",
            };

            setChatMessages([...chatMessages, newSystemMessage]);
            setInput("");
            currentConvo.push(newSystemMessage);

            if (response.includes("We have gathered enough information.")) {
                setChatComplete(true);
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
            notification.error({
                message: 'Network Error',
                description: 'Failed to send data to the server.',
                placement: 'bottomRight'
            });
        }
    };

    return (
        <MakerFormat pageTitle={surveyTitle} pageBody={
            <>
                <Collapse accordion size="large">
                    <Panel header="survAI Survery generator" key="chatbot">
                        <div className="ChatPageBody">
                            <div className="ChatPageMessagesSection">
                                {chatMessages.map((message, index) => (
                                    <div key={index} className={`ChatMessage${message.sender}`}>
                                        <div className="ChatMessageTextArea">
                                            {message.messageContents}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {!chatComplete && (
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
                            )}
                        </div>
                    </Panel>
                </Collapse>
                {surveyCompleted ? (
                    <div style={{ textAlign: 'center', padding: "1px", fontSize: "24px", color: "green", fontWeight: "bold" }}>
                        <p>Thank you for your participation! We have received your input.</p>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: "15px" }}>
                        <Button 
                            size="large"
                            type="primary"
                            onClick={handleCompleteSurvey}
                        >
                            Save Survey
                        </Button>
                    </div>
                )}
            </>
        } />
    );
};

export default ChatPageM;