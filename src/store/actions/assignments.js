import axios from 'axios';
import * as actionTypes from './actionTypes';

const getAssignmentListStart = () => {
    return {
        type: actionTypes.GET_ASSIGNMENT_LIST_START
    }
}

const getAssignmentListSuccess = assignments => {
    return {
        type: actionTypes.GET_ASSIGNMENT_LIST_SUCCESS,
        assignments
    }
}

const getAssignmentListFail = error => {
    return {
        type: actionTypes.GET_ASSIGNMENT_LIST_FAIL,
        error: error
    }
}

export const getAssignment = token => {
    return dispatch => {
        dispatch(getAssignmentListStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            "Authorization": `${token}`,
        }
        axios.get("http://127.0.0.1:8000/assignments/").then(
            res => {
                const assignments = res.data;
                dispatch(getAssignmentListSuccess(assignments));
            }
        )
            .catch(
                error => {
                    dispatch(getAssignmentListFail());
                }
            )
    }
}


const getAssignmentDetailStart = () => {
    return {
        type: actionTypes.GET_ASSIGNMENT_DETAIL_START
    }
}

const getAssignmentDetailSuccess = assignment => {
    return {
        type: actionTypes.GET_ASSIGNMENT_DETAIL_SUCCESS,
        assignment
    }
}

const getAssignmentDetailFail = error => {
    return {
        type: actionTypes.GET_ASSIGNMENT_DETAIL_FAIL,
        error: error
    }
}

export const getAssignmentDetail = (token, id) => {
    return dispatch => {
        dispatch(getAssignmentDetailStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            "Authorization": `${token}`,
        }
        axios.get(`http://127.0.0.1:8000/assignments/${id}/`).then(
            res => {
                const assignment = res.data;
                dispatch(getAssignmentDetailSuccess(assignment));
            }
        )
            .catch(
                error => {
                    dispatch(getAssignmentDetailFail());
                }
            )
    }
}