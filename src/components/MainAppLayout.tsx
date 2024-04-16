import React from "react";
import "./../App.css";

import { Layout, Menu, theme } from "antd";

const { Header, Content, Footer } = Layout;

const items = [
    {
        label: "GPT-Wrapped",
        key: "home",
    },
    {
        label: "Create New Survey",
        key: "create",
    },
    {
        label: "View Surveys",
        key: "view-surveys",
    },
    {
        label: "View Feedback",
        key: "view-feedback",
    },
];

type Props = {
    pageBody: any;
};

const MainAppFormat: React.FC<Props> = (props: Props) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    console.log(colorBgContainer, borderRadiusLG);

    return (
        <Layout className="AppLayoutBody">
            <Header className="AppLayoutHeader">
                <Menu
                    theme="dark"
                    mode="horizontal"
                    className="AppLayoutMenuItems"
                    defaultSelectedKeys={["home"]}
                    items={items}
                />
            </Header>
            <Content className="AppLayoutContent">
                <div className="AppLayoutContentDiv">{props.pageBody}</div>
            </Content>
            <Footer className="AppLayoutFooter">
                GPT-Wrapped - By Alanda Nguyen, Jesus Villalobos, Peter Zheng,
                Rui Li
            </Footer>
        </Layout>
    );
};

export default MainAppFormat;
