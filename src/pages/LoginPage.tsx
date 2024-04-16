import React from "react";
import "./../App.css";
import { Flex, Typography } from "antd";

import LoginPageModal from "../components/LoginPageModal";

const { Title } = Typography;

const LoginPage: React.FC = () => {
    return (
        <div className="LoginPageBody">
            <Title level={1} className="LoginPageTitle">
                Welcome to GPT-Wrapped
            </Title>
            <Title level={2} className="LoginPageTitle">
                Please login or sign up to continue
            </Title>

            <Flex gap="small" wrap="wrap" className="LoginPageButtons">
                <LoginPageModal type="login" />
                <LoginPageModal type="signup" />
            </Flex>
        </div>
    );
};

export default LoginPage;
