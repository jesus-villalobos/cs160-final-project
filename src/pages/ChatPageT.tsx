import React, { useState } from "react";
import "./../App.css";
import { Input, Space, Button, Collapse, Form, Checkbox, Radio, Row, notification } from "antd";
import TakerFormat from "../components/Taker";


const { Panel } = Collapse;

const surveyTitle = "Pizza Preferences";

// Typical survey questions in the form of array of JS objects for sake of EXAMPLE
// Actcual configs of multiple choice questions should be in JSON format
type Question = {
    question: string;
    type: "multi-choice" | "multi-select" | "open-ended";
    choices: string[];
};

const question_metadata: Question[] = [
    // Question 1
    {
        question: "Where do you buy your pizza?",
        type: "multi-choice",
        choices: ["Dominoes", "Pizza Hut", "Little Caesars", "Papa John's"
        ]
    },
    // Question 2
    {
        question: "How do you think their pizza tastes?",
        type: "multi-choice",
        choices: ["Delicious", "Good", "Okay", "Bad", "Disgusting"]
    },
    // Question 3
    {
        question: "What toppings do you usually get on your pizza?",
        type: "multi-select",
        choices: ["Pepperoni", "Sausage", "Mushrooms", "Green Peppers", "Onions", "Olives", "Pineapple", "Anchovies", "Extra Cheese"]
    },
    // Question 4
    {
        question: "How could that pizza be improved?",
        type: "open-ended",
        choices: []
    }
]

const currentConvo = [
    {
        messageContents: // ask the first quesiton
            "Hello! I am survAI. I will be asking you a few questions to gather information for the survey. Let's get started!",
        sender: "SYSTEM",
    }
];

// ------------------  Reagent Setup  ------------------------
// question is a string concatenation of all questions so far
const questions = question_metadata.map((question, index) => {
    return `${index + 1}. ${question.question}`;
}
).join("\n");
const convo = currentConvo;

// Converts array of messages 
// (in format of {messageContents: ..., sender: (USER or SYSTEM) })
// to string for prompting
function convoToText(conversation: any[]) {
    var convo_str = "";
    conversation.forEach(msg => {
        convo_str += `${msg.sender}:  ${msg.messageContents}\n`;
    });
    return convo_str;
}

async function exportConversation() {
    const transcript = convoToText(convo);  // Assuming form holds conversation data
    const surveyMetadata = JSON.stringify(question_metadata) // Process metadata differently
    

    try {
// import fetch from 'node-fetch'; // for node.js

        const response = await fetch(
            'https://noggin.rea.gent/wet-orca-2216',
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer rg_v1_9tesyjpo79j625yruzbfuccls84mq408u3p5_ngk',
            },
            body: JSON.stringify({
                // fill variables here.
                "survey": surveyMetadata,
                "convo": transcript,
            }),
            }
        ).then(response => response.text());
        console.log('Received data:', response); // You can handle this data however you need to

        // parse response as json
        const response_data = JSON.parse(response);
        
        // attach transcript to the data
        const data = {
            "response":response_data,
            "convo":transcript
        };

        // download the data to a file titled "response.json"
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify(data)], {type: 'application/json'});
        element.href = URL.createObjectURL(file);
        element.download = "response.json";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();


    } catch (error) {
        console.error('Failed to export conversation:', error);
    }
}

const ChatPageT: React.FC = () => {
    const [input, setInput] = useState("");
    const [chatMessages, setChatMessages] = useState(currentConvo); // Used to update convo so far
    const [surveyAnswers, setSurveyAnswers] = useState({});
    const [chatComplete, setChatComplete] = useState(false);
    const [surveyCompleted, setSurveyCompleted] = useState(false);
    const [form] = Form.useForm()

    // Func updating chat display
    const updateTextContents = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    // "Complete Survey" button functionality
    const handleCompleteSurvey = async () => {
        try {
            // Check if normal survey form is completed
            await form.validateFields();

            // Check if survey chat is completed
            if (chatComplete) {
                const surveyData = {
                    title: surveyTitle,
                    surveyAnswers: surveyAnswers,
                    chatConvo: chatMessages
                };
                // TO DO:
                // SEND JSON results to database HERE !!!!!!!!!!!!!!!!!!!!
                console.log(JSON.stringify(surveyData));    // Logging survey results as JSON temporarily

                setSurveyCompleted(true); // Survey officially completed
            } else {
                console.log("SURVEY INCOMPLETE");
                notification.error({
                    message: 'Survey is incomplete.',
                    description: 'Please finish your conversation with survAI.',
                });
            }
        } catch (error) {
            console.log("SURVEY INCOMPLETE");
            // Form validation failed, show error message or handle accordingly
            notification.error({
                message: 'Survey is incomplete.',
                description: 'Please fill in all required fields.',
            });
        }
    }

    const updateSurveyAnswerChange = (question: string, answer: any) => {
        setSurveyAnswers({ ...surveyAnswers, [question]: answer });
    }

    // Func handling user's submitted chat response
    async function handleSubmit() {
        // Adding user's submitted chat msg
        const newUserMessage = {
            messageContents: input,
            sender: "USER",
        };
        setChatMessages([...chatMessages, newUserMessage]);
        setInput(""); // Clear input after submitting

        console.log(input);
        currentConvo.push(newUserMessage);

        // Calling reagent API for survAI chat
        const response = await fetch(
            'https://noggin.rea.gent/thoughtful-guan-3811',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer rg_v1_9p9gyu0nkflmw0wycwq44mt3hi4w3k42kncs_ngk',
                },
                body: JSON.stringify({
                    // fill variables here.
                    "questions": questions,
                    "convo": convoToText(convo),
                }),
            }
        ).then(response => response.text());

        // IF chatbot announces it is done gathering info, end survAI convo
        console.log(response);

        // Adding System's chat msg
        const newSystemMessage = {
            messageContents: response,
            sender: "SYSTEM",
        };

        setChatMessages([...currentConvo, newSystemMessage]);
        // Clear input box after submitting
        setInput("");
        currentConvo.push(newSystemMessage);
        console.log(convoToText(convo));

        if (response.includes("We have gathered enough information.")) {
            // Disable chat function
            setChatComplete(true);
            console.log("CEASED SURVAI COVERSATION.");
        } 
        
    };



    return (
        <TakerFormat pageTitle={surveyTitle} pageBody={
            <>
            <Collapse accordion size="large">

                {/* ------------------  Normal Survey Section  ------------------------ */}
                <Panel header="Questions" key="normalsurvey">
                    <div className="NormalSurveyArea">
                            <p><b>Please Fill in the Following Questions</b></p>
                    <Form
                        requiredMark={false}
                        layout="vertical"
                        form={form}
                    >
                        {question_metadata.map((question, index) => (
                            <Form.Item
                                name = {`q-${index + 1}`}
                                label={<span style={{ fontWeight: 'bold', fontSize: '20px' }}>
                                    {index+1}.) {question["question"]}
                                        </span>
                                }
                                rules={[{ required: true, message: 'Please pick an item!' }]}
                            >
                                {/* Create multiple CHOICE questions */}
                                {question.type == 'multi-choice' && (
                                    <Radio.Group onChange={(e) => updateSurveyAnswerChange(`QUESTION ${index + 1}`, e.target.value)}>
                                    {question.choices.map((answer: string, i) => (
                                        <Radio 
                                            key={i} 
                                            style={{display: 'block'}}
                                            // value={`q-${index+1}-option-${i + 1}`}
                                            value={answer}
                                        >
                                            {answer}
                                        </Radio>
                                    ))}
                                </Radio.Group>
                                )}

                                {/* Create multiple SELECT questions */}
                                {question.type === "multi-select" && (
                                    <Checkbox.Group 
                                        style={{ display: 'block', marginBottom: '8px' }} 
                                        onChange={(values) => updateSurveyAnswerChange(`QUESTION ${index + 1}`, values)}>
                                        
                                     
                                        {question.choices.map((option, optionIndex) => (
                                            <Row>
                                            <Checkbox 
                                            key={optionIndex} 
                                            value={option}
                                            style={{ marginBottom: '8px' }}
                                            >
                                                {option}
                                            </Checkbox>
                                            </Row>
                                        ))}
                                    </Checkbox.Group>
                                )}
                                {/* Create open-ended questions */}
                                {question.type === "open-ended" && (
                                    <Input 
                                        onChange={(e) => updateSurveyAnswerChange(`QUESTION ${index + 1}`, e.target.value)}
                                    />
                                )}
                            </Form.Item>
                        ))}
                    </Form>
                    </div>
                </Panel>


                {/* ------------------  survAI Section  ------------------------ */}
                <Panel header="Chat" key="chatbot">
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
                                {/* Chat Submit Button */}
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
                {/* Thank You Message Section */}
                {surveyCompleted && (
                    <div style={{ textAlign: 'center', padding: "1px", fontSize: "24px", color:"green", fontWeight: "bold" }}>
                        <p>Thank you for your participation! We have received your input.</p>
                    </div>
                )}
                {!surveyCompleted && (
                <div style={{ textAlign: 'center', padding: "15px"}}>
                    <Button 
                    size="large"
                    type="primary"
                    onClick={exportConversation}
                    >
                        Export Chat
                    </Button>
                </div>
                )}
                {!surveyCompleted && (
                <div style={{ textAlign: 'center', padding: "15px"}}>
                    <Button 
                    size="large"
                    type="primary"
                    onClick={handleCompleteSurvey}
                    >
                        Complete Survey
                    </Button>
                </div>
                )}
                </>
        } />
    );
    
};

export default ChatPageT;
