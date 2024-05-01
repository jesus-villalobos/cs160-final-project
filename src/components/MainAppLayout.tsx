import React from "react";
import "./../App.css";
import { useNavigate } from "react-router-dom";

import { Layout, Menu, Typography } from "antd";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const items = [
    {
        label: "SurvAI",
        key: "home",
    },
    {
        label: "Create New Survey",
        key: "create-survey",
    },
    {
        label: "View Surveys",
        key: "view-surveys",
    },
];

export interface Props {
    pageBody: any;
    pageTitle: string;
}

const MainAppFormat: React.FC<Props> = (props: Props) => {
    const navigate = useNavigate();

    return (
        <Layout className="AppLayoutBody">
            <Header className="AppLayoutHeader">
                <Menu
                    theme="dark"
                    mode="horizontal"
                    className="AppLayoutMenuItems"
                    defaultSelectedKeys={["home"]}
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
                SurvAI - By Alanda Nguyen, Jesus Villalobos, Peter Zheng,
                Rui Li
            </Footer>
        </Layout>
    );
};

export default MainAppFormat;
