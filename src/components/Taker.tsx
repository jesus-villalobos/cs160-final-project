import React from "react";
import "./../App.css";
import { useNavigate } from "react-router-dom";


import { Layout, Menu, Typography } from "antd";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

// Updated menu items
const items = [
    {
        label: "GPT-Wrapped",
        key: "chat-taker",  // You might need to define the actual path if it’s different
    },
    {
        label: "View Surveys",
        key: "view-surveys-taker",
    },
];

export interface Props {
    pageBody: any;
    pageTitle: string;
}

const TakerFormat: React.FC<Props> = (props: Props) => {
    const navigate = useNavigate();

    return (
        <Layout className="AppLayoutBody">
            <Header className="AppLayoutHeader">
                <Menu
                    theme="dark"
                    mode="horizontal"
                    className="AppLayoutMenuItems"
                    defaultSelectedKeys={["home"]}  // Set default selected key if needed
                    items={items}
                    onClick={(item) => {
                        navigate("/" + item.key);
                    }}
                />
            </Header>

            <Content className="AppLayoutContent">
                <Title level={2}>{props.pageTitle}</Title>
                <div className="AppLayoutContentDiv">{props.pageBody}</div>
            </Content>
            <Footer className="AppLayoutFooter">
                GPT-Wrapped - By Alanda Nguyen, Jesus Villalobos, Peter Zheng,
                Rui Li
            </Footer>
        </Layout>
    );
};



export default TakerFormat;
