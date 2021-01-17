import React, {Component} from 'react';
import { Form, Input, Button, Spin} from 'antd';
import { NavLink } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

const layout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 3,
    span: 16,
  },
};

const FormItem = Form.Item

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;



class LoginForm extends Component {
    onFinish = (values) => {
        console.log('Success:', values);
        this.props.onAuth(values.username, values.password);
        this.props.history.push("/");
      };
    
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    render(){
        let errorMessage = null;
        if (this.props.error){
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }
        return (
            <div>
                {errorMessage}
                {
                this.props.loading ?
                
                <Spin indicator={antIcon} />

                :

                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
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
                        label="Password"
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        ]}
                    >
                        <Input.Password />
                    </FormItem>
                
                    <FormItem {...tailLayout}>
                        <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>
                        Login
                        </Button> 
                        Or 
                        <NavLink to="/signup" style={{marginRight: '10px'}}>
                            &nbsp;Sign up
                        </NavLink>
                    </FormItem>
                </Form>
                }
            </div>
          );
    }
}

const mapStateToProps = state => {
    return {
      loading: state.auth.loading,
      error: state.auth.error
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);