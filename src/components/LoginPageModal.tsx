import React, { useState } from "react";
import { Button, Modal } from "antd";

import LoginPageLoginForm from "./LoginPageLoginForm";
import LoginPageNewUserForm from "./LoginPageNewUserForm";

type AuthType = "login" | "signup";

type Props = {
    type: AuthType;
};

const authTypes = {
    login: {
        title: "Login",
        content: <LoginPageLoginForm />,
    },
    signup: {
        title: "Sign Up",
        content: <LoginPageNewUserForm />,
    },
};

const LoginPageModal: React.FC<Props> = (props: Props) => {
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const { title, content } = authTypes[props.type];

    return (
        <>
            <Button type="primary" onClick={showModal} size="large">
                {title}
            </Button>
            <Modal
                title="Title"
                footer={null}
                open={open}
                onCancel={handleCancel}
            >
                {content}
            </Modal>
        </>
    );
};

export default LoginPageModal;
