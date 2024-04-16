import React from "react";
import { useNavigate } from "react-router-dom";

import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";

type FieldType = {
    username?: string;
    password?: string;
    confirmPassword?: string;
    email?: string;
    remember?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
};

const LoginPageNewUserForm: React.FC = () => {
    const navigate = useNavigate();

    const onClick = () => {
        setTimeout(() => {
            navigate("/chat");
        }, 2000);
    };

    return (
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
                    { required: true, message: "Please input your username!" },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[
                    { required: true, message: "Please input your password!" },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
                label="Confirm Password"
                name="confirmPassword"
                rules={[
                    {
                        required: true,
                        message: "Please confirm your password!",
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[
                    { required: true, message: "Please input your email!" },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" onClick={onClick}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginPageNewUserForm;
