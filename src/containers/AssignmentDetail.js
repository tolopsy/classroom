import React from 'react';
import { connect } from 'react-redux';
import { Card, Skeleton } from 'antd';

import { getAssignmentDetail } from '../store/actions/assignments';
import Question from './Question';
import Hoc from '../hoc/hoc';
import Choices from '../components/Choices';


const cardStyle = {
    marginTop: "20px",
    marginBottom: "20px",
}


class AssignmentDetail extends React.Component {

    state = {
        userAnswers: {},
    }

    onChange = (e, questionId) => {
        console.log("checked ", e.target.value);
        const { userAnswers } = this.state;
        userAnswers[questionId] = e.target.value
        this.setState({ userAnswers });
    }

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
        const { userAnswers } = this.state;
        console.log("Assignemnt", assignment);
        return (
            <Hoc>
                {Object.keys(assignment).length > 0 ? (
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
                                                        <Card
                                                            type="inner"
                                                            key={q.id}
                                                            title={`${q.order}. ${q.question}`}
                                                            style={cardStyle}>
                                                            <Choices
                                                                questionId={q.order}
                                                                choices={q.choices}
                                                                change={this.onChange}
                                                                userAnswers={userAnswers}
                                                            />
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
                    : null
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
