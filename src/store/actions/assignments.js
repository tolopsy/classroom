import axios from 'axios';
import * as actionTypes from './actionTypes';

export const getAssignmentListStart = () => {
    return {
        type: actionTypes.GET_ASSIGNMENT_LIST_START
    }
}

export const getAssignmentListSuccess = assignments => {
    return {
        type: actionTypes.GET_ASSIGNMENT_LIST_SUCCESS,
        assignments
    }
}

export const getAssignmentListFail = error => {
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