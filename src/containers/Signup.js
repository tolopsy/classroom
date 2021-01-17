import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Select,
} from 'antd';

import * as  actions from '../store/actions/auth';

const FormItem = Form.Item;

const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 3,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 3,
    },
  },
};

class SignupForm extends Component {


  onFinish = (values) => {
    console.log('Received values of form: ', values);
    let is_student = false;
    if (values.userType === 'student') is_student = true;

    console.log("is_student", is_student)
    this.props.onAuth(values.username, values.email, values.password, values.confirm, is_student);
    this.props.history.push("/");
  };

  render() {
    return (
      <Form
        {...formItemLayout}

        name="register"
        onFinish={this.onFinish}

        scrollToFirstError
      >
        <FormItem
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </FormItem>
        <FormItem
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </FormItem>

        <FormItem
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </FormItem>

        <FormItem
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject('The two passwords that you entered do not match!');
              },
            }),
          ]}
        >
          <Input.Password />
        </FormItem>

        <FormItem
          label="Select user type"
          name="userType"
          rules={[
            {
              required: true,
              message: 'Please select user type',
            },
          ]}
        >
          <Select placeholder="Please, select a user type">
            <Option value="student">Student</Option>
            <Option value="teacher">Teacher</Option>
          </Select>
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Sign up
            </Button>
            Or
            <NavLink to="/login" style={{ marginRight: '10px' }}>
            &nbsp;Sign up
            </NavLink>
        </FormItem>
      </Form>
    );
  }

};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, email, password1, password2, is_student) => dispatch(actions.authSignup(username, email, password1, password2, is_student))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);