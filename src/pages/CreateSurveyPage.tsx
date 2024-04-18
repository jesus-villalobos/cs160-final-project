import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space } from "antd";

import MainAppFormat from "../components/MainAppLayout";

const CreateSurveyPage: React.FC = () => {
    const [form] = Form.useForm();

    function submitSurvey() {
        const formValues = JSON.stringify(form.getFieldsValue(), null, 2);
        console.log(formValues);
    }

    const pageBody = (
        <div className="SurveyPageBody">
            <div className="SurveyPageInputs">
                <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    form={form}
                    name="dynamic_form_complex"
                    autoComplete="off"
                    initialValues={{ questionConfigs: [{}] }}
                >
                    <Form.List name="questionConfigs">
                        {(fields, { add, remove }) => (
                            <div
                                style={{
                                    display: "flex",
                                    rowGap: 16,
                                    flexDirection: "column",
                                }}
                            >
                                {fields.map((field) => (
                                    <Card
                                        size="small"
                                        title={`Field ${field.name + 1}`}
                                        key={field.key}
                                        extra={
                                            <CloseOutlined
                                                onClick={() => {
                                                    remove(field.name);
                                                }}
                                            />
                                        }
                                    >
                                        <Form.Item
                                            label="Question Description"
                                            name={[
                                                field.name,
                                                "questionDescription",
                                            ]}
                                        >
                                            <Input placeholder="Describe the question here..." />
                                        </Form.Item>

                                        {/* Nest Form.List */}
                                        <Form.Item label="Target Item">
                                            <Form.List
                                                name={[
                                                    field.name,
                                                    "questionSubsections",
                                                ]}
                                            >
                                                {(subFields, subOpt) => (
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            flexDirection:
                                                                "column",
                                                            rowGap: 16,
                                                        }}
                                                    >
                                                        {subFields.map(
                                                            (subField) => (
                                                                <Space
                                                                    key={
                                                                        subField.key
                                                                    }
                                                                >
                                                                    <Form.Item
                                                                        noStyle
                                                                        name={[
                                                                            subField.name,
                                                                            "description",
                                                                        ]}
                                                                    >
                                                                        <Input placeholder="Users should answer..." />
                                                                    </Form.Item>
                                                                    <CloseOutlined
                                                                        onClick={() => {
                                                                            subOpt.remove(
                                                                                subField.name
                                                                            );
                                                                        }}
                                                                    />
                                                                </Space>
                                                            )
                                                        )}
                                                        <Button
                                                            type="dashed"
                                                            onClick={() =>
                                                                subOpt.add()
                                                            }
                                                            block
                                                        >
                                                            + Add Sub Item
                                                        </Button>
                                                    </div>
                                                )}
                                            </Form.List>
                                        </Form.Item>
                                    </Card>
                                ))}

                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    block
                                >
                                    + Add Item
                                </Button>
                            </div>
                        )}
                    </Form.List>

                    {/* <Form.Item noStyle shouldUpdate>
                    {() => (
                        <Typography>
                            <pre>
                                {JSON.stringify(form.getFieldsValue(), null, 2)}
                            </pre>
                        </Typography>
                    )}
                </Form.Item> */}
                </Form>
            </div>
            <div className="SurveyPageSubmitButton">
                <Button type="primary" onClick={submitSurvey}>
                    Submit
                </Button>
            </div>
        </div>
    );

    return (
        <>
            <MainAppFormat pageTitle="Create New Survey" pageBody={pageBody} />
        </>
    );
};

export default CreateSurveyPage;
