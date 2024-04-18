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
    },
    {
        title: "Action",
        key: "action",
        render: (_, record) => (
            <Space size="middle">
                <a>View Survey: {record.surveyTitle}</a>
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
        surveyDescription: "New York No. 1 Lake Park",
    },
    {
        surveyTitle: "Another Survey I Created",
        surveyLength: 42,
        surveyDescription: "London No. 1 Lake Park",
    },
    {
        surveyTitle: "This is One More Survey",
        surveyLength: 32,
        surveyDescription: "Sydney No. 1 Lake Park",
    },
    {
        surveyTitle: "Some Cool Survey",
        surveyLength: 32,
        surveyDescription: "New York No. 1 Lake Park",
    },
    {
        surveyTitle: "Another Survey I Created",
        surveyLength: 42,
        surveyDescription: "London No. 1 Lake Park",
    },
    {
        surveyTitle: "This is One More Survey",
        surveyLength: 32,
        surveyDescription: "Sydney No. 1 Lake Park",
    },
];

const ViewSurveysPage: React.FC = () => (
    <MainAppFormat
        pageTitle="View Surveys"
        pageBody={<Table columns={columns} dataSource={data} />}
    />
);

export default ViewSurveysPage;
