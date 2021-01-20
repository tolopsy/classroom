import React from 'react';
import { Form, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
};

const FormItem = Form.Item

class AssignmentCreate extends React.Component {
    onFinish = values => {
        console.log('Received values of form:', values);
    };

    render() {
        return (
            <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={this.onFinish}>
                <FormItem
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Title',
                        },
                    ]}
                >
                    <Input />
                </FormItem>
                <Form.List
                    name="names"
                >

                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map((field, index) => (
                                <FormItem
                                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                    label={index === 0 ? 'Questions' : ''}
                                    required={false}
                                    key={field.key}
                                >
                                    <FormItem
                                        {...field}
                                        noStyle
                                    >
                                        <Input placeholder="Set question" style={{ width: '60%' }} />
                                    </FormItem>
                                    {fields.length > 1 ? (
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => remove(field.name)}
                                        />
                                    ) : null}
                                </FormItem>
                            ))}
                            <FormItem>
                                <Button
                                    type="secondary"
                                    onClick={() => add()}
                                    style={{ width: '60%' }}
                                    icon={<PlusOutlined />}
                                >
                                    Add question
                                </Button>

                                <Form.ErrorList errors={errors} />
                            </FormItem>
                        </>
                    )}
                </Form.List>
                <FormItem>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </FormItem>
            </Form>
        );

    };
};

export default AssignmentCreate;
