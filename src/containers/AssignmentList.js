import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { List, Divider, Skeleton } from 'antd';

import { getAssignment } from '../store/actions/assignments';
import Hoc from '../hoc/hoc';

class AssignmentList extends React.Component {
    componentDidMount() {
        if (this.props.token !== undefined && this.props.token !== null) {
            this.props.getAssignment(this.props.token);
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
                this.props.getAssignment(newProps.token);
            }
        }
    }

    renderItem(item) {
        return (
            <Link to="assignments/1">
                <List.Item>{item.title}</List.Item>
            </Link>
        )
    }


    render() {
        return (
            <Hoc>
                {
                    this.props.loading ?
                        <Skeleton active />

                        :
                        <div>
                            <Divider orientation="left">Assignment List</Divider>
                            <List
                                size="large"
                                bordered
                                dataSource={this.props.assignments}
                                renderItem={item => this.renderItem(item)}
                            />
                        </div>
                }
            </Hoc>

        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        assignments: state.assignments.assignments,
        loading: state.assignments.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAssignment: (token) => dispatch(getAssignment(token))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(AssignmentList);