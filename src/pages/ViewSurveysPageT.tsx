import React, { useState } from 'react';
import { Space, Table, Modal, Button, Form, Radio, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { saveAs } from 'file-saver';

import TakerFormat from '../components/Taker';

interface QuestionType {
    question: string;
    answers: string[];
    selectedAnswer?: string;
}

interface DataType {
    key: string;
    surveyTitle: string;
    surveyLength: number;
    surveyDescription: string;
    questions: QuestionType[];
}

const initialData: DataType[] = [
    {
        key: '1',
        surveyTitle: 'Some Cool Survey',
        surveyLength: 2,
        surveyDescription: "I promise it's really cool. You'll be asked about trees.",
        questions: [
            {
                question: "What is your favorite type of tree?",
                answers: ["Oak", "Pine", "Maple", "Redwood"],
                selectedAnswer: "Maple"
            },
            {
                question: "How often do you visit forests?",
                answers: ["Weekly", "Monthly", "Yearly", "Never"],
                selectedAnswer: "Monthly"
            }
        ]
    }
];

const ViewSurveysPageT: React.FC = () => {
    const [surveys, setSurveys] = useState(initialData);
    const [isViewModalVisible, setIsViewModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<DataType | null>(null);

    const handleView = (record: DataType) => {
        setCurrentRecord(record);
        setIsViewModalVisible(true);
    };

    const handleEdit = (record: DataType) => {
        setCurrentRecord(record);
        setIsEditModalVisible(true);
    };

    const handleExport = (record: DataType) => {
        const blob = new Blob([JSON.stringify(record, null, 2)], { type: "application/json" });
        saveAs(blob, `${record.surveyTitle.replace(/\s+/g, '_')}.json`);
    };

    const handleSave = (values: DataType) => {
        const updatedSurveys = surveys.map(survey => survey.key === values.key ? values : survey);
        setSurveys(updatedSurveys);
        setIsEditModalVisible(false);
        message.success('Survey updated successfully!');
    };

    const columns = [
        {
            title: 'Title',
            dataIndex: 'surveyTitle',
            key: 'surveyTitle',
            render: (text: string, record: DataType) => <a onClick={() => handleView(record)}>{text}</a>,
        },
        {
            title: '# of Questions',
            dataIndex: 'surveyLength',
            key: 'surveyLength',
        },
        {
            title: 'Description',
            dataIndex: 'surveyDescription',
            key: 'surveyDescription',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: DataType) => (
                <Space size="middle">
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                    <Button onClick={() => handleExport(record)}>Export Data</Button>
                </Space>
            ),
        },
    ];

    return (
        <TakerFormat
            pageTitle="View Surveys"
            pageBody={
                <>
                    <Table columns={columns} dataSource={surveys} />
                    {currentRecord && isViewModalVisible && (
                        <Modal
                            title="View Survey"
                            visible={isViewModalVisible}
                            onCancel={() => setIsViewModalVisible(false)}
                            footer={null}
                        >
                            {currentRecord.questions.map((question, index) => (
                                <Form.Item key={index} label={question.question}>
                                    <Radio.Group
                                        options={question.answers.map(answer => ({ label: answer, value: answer }))}
                                        value={question.selectedAnswer}
                                        disabled
                                    />
                                </Form.Item>
                            ))}
                        </Modal>
                    )}
                    {currentRecord && isEditModalVisible && (
                        <Modal
                            title="Edit Survey"
                            visible={isEditModalVisible}
                            onCancel={() => setIsEditModalVisible(false)}
                            footer={null}
                        >
                            <Form
                                initialValues={currentRecord}
                                onFinish={handleSave}
                                layout="vertical"
                                autoComplete="off"
                            >
                                {currentRecord.questions.map((question, index) => (
                                    <Form.Item key={index} label={question.question}>
                                        <Radio.Group
                                            options={question.answers.map(answer => ({ label: answer, value: answer }))}
                                            value={question.selectedAnswer}
                                            onChange={e => {
                                                const updatedQuestions = [...currentRecord.questions];
                                                updatedQuestions[index].selectedAnswer = e.target.value;
                                                setCurrentRecord({ ...currentRecord, questions: updatedQuestions });
                                            }}
                                        />
                                    </Form.Item>
                                ))}
                                <Button type="primary" htmlType="submit">
                                    Save Changes
                                </Button>
                            </Form>
                        </Modal>
                    )}
                </>
            }
        />
    );
};

export default ViewSurveysPageT;
