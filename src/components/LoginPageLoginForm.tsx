import React from "react";
import { useNavigate } from "react-router-dom";

import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, message } from "antd";

import { useAtom } from "jotai";
import {
    validateUserExists,
    setCurrentUserInStore,
    logoutCurrentUser,
    SurvAiUser,
} from "../state/store";

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const LoginPageLoginForm: React.FC = () => {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const [, logoutUser] = useAtom(logoutCurrentUser);
    const [, validateUser] = useAtom(validateUserExists);
    const [, setCurrentUser] = useAtom(setCurrentUserInStore);

    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
        console.log("Success:", values);

        // check if there is currently a user logged in
        const userExists = validateUser(values as unknown as SurvAiUser);

        if (userExists) {
            console.log("User exists ... logging in");

            logoutUser();
            setCurrentUser(values as unknown as SurvAiUser);
            setTimeout(() => {
                navigate("/chat");
            }, 2000);
        } else {
            console.log("User does not exist ... throw some error");

            messageApi.open({
                type: "error",
                content: "User does not exist! Please sign up.",
            });
        }
    };

    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
        errorInfo
    ) => {
        console.log("Failed:", errorInfo);

        messageApi.open({
            type: "error",
            content:
                "There was an error processing your login attempt. Please try again.",
        });
    };

    return (
        <>
            {contextHolder}
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item<FieldType>
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default LoginPageLoginForm;
