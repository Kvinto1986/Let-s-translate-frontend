import axios from 'axios';
import {GET_COMMENTS, GET_ERRORS} from './types';
import server from '../serverConfig'

export const registerComment = (comment, reset) => dispatch => {
    console.log(comment)
    axios.post(`${server}api/comments/registration`, comment)
        .then(() => reset())
        .then(() => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
        })
        .catch(err => {
            if (err.response) {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            }
        });
};

export const getComments = (textId) => dispatch => {
    axios.post(`${server}api/comments/getComments`, textId)
        .then(res => {
            dispatch({
                type: GET_COMMENTS,
                payload: res.data
            });
        })
};