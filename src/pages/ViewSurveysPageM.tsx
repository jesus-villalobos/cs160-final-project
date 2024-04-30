import React, { useState } from 'react';
import { Space, Table, Modal, Button, Form, Input, message, List, Tag, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { saveAs } from 'file-saver';

import MakerFormat from '../components/Maker';

interface QuestionType {
    question: string;
    answers: string[];
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
                answers: ["Oak", "Pine", "Maple", "Redwood"]
            },
            {
                question: "How often do you visit forests?",
                answers: ["Weekly", "Monthly", "Yearly", "Never"]
            }
        ]
    },
    // Additional survey data can be added here
];

const ViewSurveysPageM: React.FC = () => {
    const [surveys, setSurveys] = useState(initialData);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<DataType | null>(null);

    const handleEdit = (record: DataType) => {
        setCurrentRecord(record);
        setIsModalVisible(true);
    };

    const handleExport = (record: DataType) => {
        const blob = new Blob([JSON.stringify(record, null, 2)], { type: "application/json" });
        saveAs(blob, `${record.surveyTitle.replace(/\s+/g, '_')}.json`);
    };

    const handleSave = (values: DataType) => {
        const updatedSurveys = surveys.map(survey => survey.key === values.key ? values : survey);
        setSurveys(updatedSurveys);
        setIsModalVisible(false);
        message.success('Survey updated successfully!');
    };

    const columns = [
        {
            title: 'Title',
            dataIndex: 'surveyTitle',
            key: 'surveyTitle',
            render: (text: string, record: DataType) => <a onClick={() => handleEdit(record)}>{text}</a>,
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
        <MakerFormat
            pageTitle="View Surveys"
            pageBody={
                <>
                    <Table columns={columns} dataSource={surveys} />
                    {currentRecord && (
                        <Modal
                            title="Edit Survey"
                            visible={isModalVisible}
                            onCancel={() => setIsModalVisible(false)}
                            footer={null}
                        >
                            <Form
                                initialValues={currentRecord}
                                onFinish={handleSave}
                                layout="vertical"
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Survey Title"
                                    name="surveyTitle"
                                    rules={[{ required: true, message: 'Please input the title of the survey!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Description"
                                    name="surveyDescription"
                                >
                                    <Input.TextArea rows={4} />
                                </Form.Item>
                                <Form.List
                                    name="questions"
                                    initialValue={currentRecord.questions}
                                >
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map((field, index) => (
                                                <div key={field.key}>
                                                    <Form.Item
                                                        {...field}
                                                        label={`Question ${index + 1}`}
                                                        name={[field.name, 'question']}
                                                        fieldKey={[field.fieldKey ?? '', 'question']}
                                                        rules={[{ required: true, message: 'Missing question' }]}
                                                    >
                                                        <Input placeholder="Enter question" />
                                                    </Form.Item>
                                                    <Form.List
                                                        name={[field.name, 'answers']}
                                                    >
                                                        {(answerFields, { add: addAnswer, remove: removeAnswer }) => (
                                                            <>
                                                                {answerFields.map(answerField => (
                                                                    <Form.Item
                                                                        {...answerField}
                                                                        key={answerField.key}
                                                                        label="Answer"
                                                                        name={[answerField.name]}
                                                                        fieldKey={[answerField.fieldKey ?? '']}
                                                                        rules={[{ required: true, message: 'Missing answer' }]}
                                                                    >
                                                                        <Input placeholder="Enter answer" />
                                                                    </Form.Item>
                                                                ))}
                                                                <Button type="dashed" onClick={() => addAnswer()} icon={<PlusOutlined />}>
                                                                    Add Answer
                                                                </Button>
                                                            </>
                                                        )}
                                                    </Form.List>
                                                    <MinusCircleOutlined onClick={() => remove(index)} />
                                                </div>
                                            ))}
                                            <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                                                Add Question
                                            </Button>
                                        </>
                                    )}
                                </Form.List>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Save Changes
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Modal>
                    )}
                </>
            }
        />
    );
};

export default ViewSurveysPageM;
