import React from "react";
import "./../App.css";
import { Button, Flex } from "antd";

import MainAppFormat from "./../components/MainAppLayout";

const LoginPage: React.FC = () => {
    return (
        <div>
            <MainAppFormat
                pageBody={
                    <Flex gap="small" wrap="wrap">
                        <Button type="primary">Login</Button>
                        <Button type="primary">Sign Up</Button>
                    </Flex>
                }
            />
        </div>
    );
};

export default LoginPage;
