import React from "react";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";

import MainAppFormat from "../components/MainAppLayout";

interface DataType {
    surveyTitle: string;
    surveyLength: number;
    surveyDescription: string;
}

const columns: TableProps<DataType>["columns"] = [
    {
        title: "Title",
        dataIndex: "surveyName",
        key: "surveyName",
        render: (_, record) => <a>{record.surveyTitle}</a>,
        width: 300,
    },
    {
        title: "# of Questions",
        dataIndex: "surveyLength",
        key: "surveyLength",
    },
    {
        title: "Description",
        dataIndex: "surveyDescription",
        key: "surveyDescription",
        width: 600,
    },
    {
        title: "Action",
        key: "action",
        render: (_, record) => (
            <Space size="middle">
                <a>View</a>
                <br />
                <a>Edit</a>
                <br />
                <a>Export Data</a>
            </Space>
        ),
    },
];

const data: DataType[] = [
    {
        surveyTitle: "Some Cool Survey",
        surveyLength: 32,
        surveyDescription: "I promise it's really cool. You'll be asked about trees.",
    },
    {
        surveyTitle: "Another Survey I Created",
        surveyLength: 42,
        surveyDescription: "I don't like this one. It's about rocks.",
    },
    {
        surveyTitle: "This is One More Survey",
        surveyLength: 37,
        surveyDescription: "I made this one too. I ask you about colors and shapes and other things.",
    },
    {
        surveyTitle: "Another Cool Survey",
        surveyLength: 22,
        surveyDescription: "I made a couple of these.",
    },
    {
        surveyTitle: "The Best Survey",
        surveyLength: 19,
        surveyDescription: "It's about ducks.",
    },
    {
        surveyTitle: "Survey 6",
        surveyLength: 25,
        surveyDescription: "I'm running out of ideas.",
    },
];

const ViewSurveysPage: React.FC = () => (
    <MainAppFormat
        pageTitle="View Surveys"
        pageBody={<Table columns={columns} dataSource={data} />}
    />
);

export default ViewSurveysPage;
