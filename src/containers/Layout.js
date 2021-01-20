import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../store/actions/auth'
// import '../css/Layout.css';

const { Header, Content, Footer } = Layout;

class CustomLayout extends Component {
    render() {
        return (
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">
                            <Link to="/">Post</Link>
                        </Menu.Item>
                        {
                            this.props.isAuthenticated ?
                                <Menu.Item key="2" onClick={this.props.logout}>
                                    Logout
                            </Menu.Item>
                                :
                                <Menu.Item key="2">
                                    <Link to="/login">Login</Link>
                                </Menu.Item>
                        }

                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item><Link to='/'>Home</Link></Breadcrumb.Item>
                        {this.props.token !== null ?
                            <Breadcrumb.Item><Link to={`/profile/${this.props.userId}`}>Profile</Link></Breadcrumb.Item>
                            : null
                        }
                        {this.props.token !== null && this.props.is_teacher ?
                            <Breadcrumb.Item><Link to='/create'>Create</Link></Breadcrumb.Item>
                            : null
                        }
                    </Breadcrumb>
                    <div className="site-layout-content">
                        {this.props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        );
    }

}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        token: state.auth.token,
        is_teacher: state.auth.is_teacher
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomLayout));