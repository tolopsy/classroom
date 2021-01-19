import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';

import { getAssignmentDetail } from '../store/actions/assignments';

class AssignmentDetail extends React.Component {
    componentDidMount() {
        if (this.props.token !== undefined && this.props.token !== null) {
            this.props.getAssignmentDetail(this.props.token, this.props.match.params.id);
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
                this.props.getAssignmentDetail(newProps.token, newProps.match.params.id);
            }
        }
    }

    render() {
        const title = this.props.assignment.title
        return (
            <div>
                <Card title={title}>
                    <Card type="inner" title="Inner Card title">
                        Inner Card content
                    </Card>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        assignment: state.assignments.currentAssignment,
        loading: state.assignments.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAssignmentDetail: (token, id) => dispatch(getAssignmentDetail(token, id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentDetail);
