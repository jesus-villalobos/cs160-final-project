import React, { useState } from "react";
import "./../App.css";

import { Input, Space, Button } from "antd";

import MainAppFormat from "./../components/MainAppLayout";

const sampleChatMessages = [
    {
        messageContents:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        sender: "USER",
    },
    {
        messageContents:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        sender: "SYSTEM",
    },
    {
        messageContents:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        sender: "USER",
    },
    {
        messageContents:
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
        sender: "SYSTEM",
    },
    {
        messageContents:
            "Nulla ut libero odio. Pellentesque eleifend lacus vel ante aliquam faucibus. Fusce condimentum lectus eget ex convallis aliquam. Vestibulum eleifend non quam eget euismod. Nulla at nulla tellus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent a sem nec nisi aliquet facilisis maximus a massa. Phasellus ornare lacus urna, eget vehicula massa faucibus sagittis. Nunc vel lorem sed odio eleifend congue eu id tortor. Nullam ultricies turpis in tempus vestibulum. Aliquam finibus purus id arcu semper lacinia. Aenean eget massa vel ex convallis egestas. Curabitur ante est, posuere vel mollis quis, mollis vitae sapien. Nullam vel urna at libero ullamcorper volutpat. Nullam non diam hendrerit nibh condimentum lacinia ultricies nec enim.",
        sender: "USER",
    },
    {
        messageContents:
            "Nunc semper suscipit tellus, a iaculis nulla aliquam ac. Maecenas faucibus tellus sit amet lacus hendrerit hendrerit. Morbi eu mi sagittis, tincidunt nisl nec, vulputate dui. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque pretium ipsum nunc, quis congue nibh facilisis in. Vestibulum dignissim dapibus convallis. Morbi a luctus eros. Aliquam erat volutpat.",
        sender: "SYSTEM",
    },
    {
        messageContents:
            "Nunc semper suscipit tellus, a iaculis nulla aliquam ac. Maecenas faucibus tellus sit amet lacus hendrerit hendrerit. Morbi eu mi sagittis, tincidunt nisl nec, vulputate dui. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque pretium ipsum nunc, quis congue nibh facilisis in. Vestibulum dignissim dapibus convallis. Morbi a luctus eros. Aliquam erat volutpat.",
        sender: "USER",
    },
    {
        messageContents:
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
        sender: "SYSTEM",
    },
    {
        messageContents:
            "Nam id fringilla mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam gravida, orci vitae tincidunt volutpat, augue leo bibendum est, consequat porttitor metus libero vel sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi ultricies, velit sed maximus congue, libero nibh ultrices purus, vel semper lacus libero et sem. Integer vehicula ligula eu magna scelerisque finibus. In justo mi, venenatis et tempor in, elementum a felis. Donec sodales condimentum turpis, sodales vestibulum mi dapibus vitae. Vivamus rutrum risus ac sapien eleifend iaculis.",
        sender: "USER",
    },
];

const ChatPage: React.FC = () => {
    const [input, setInput] = useState("");

    function handleSubmit() {
        console.log(input);
    }

    function updateTextContents(e: any) {
        const input = e.target.value;
        setInput(input);
    }

    return (
        <>
            <MainAppFormat
                pageTitle="Chat"
                pageBody={
                    <>
                        <div className="ChatPageBody">
                            <div className="ChatPageMessagesSection">
                                {sampleChatMessages.map((message, index) => (
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
                    </>
                }
            />
        </>
    );
};

export default ChatPage;
