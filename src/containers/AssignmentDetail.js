import React from 'react';
import { connect } from 'react-redux';
import { Card, Skeleton } from 'antd';

import { getAssignmentDetail } from '../store/actions/assignments';
import Question from './Question';
import Hoc from '../hoc/hoc';

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
        const assignment = this.props.assignment
        console.log("Assignemnt", assignment);
        return (
            <Hoc>
                {Object.keys(assignment).length >  0 ? (
                    <Hoc>
                        {
                            this.props.loading ?
                                <Skeleton />
                                :

                                <div>
                                    <Card title={assignment.title}>
                                        <Question
                                            questions={assignment.questions.map(
                                                q => {
                                                    return (
                                                        <Card type="inner" key={q.id} title={`${q.order}. ${q.question}`}>
                                                        </Card>
                                                    )
                                                }
                                            )}
                                        />
                                    </Card>
                                </div>
                        }
                    </Hoc>
                )
                :null
                }
            </Hoc>

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
