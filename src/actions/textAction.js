import axios from 'axios';
import {GET_ERRORS} from './types';
import server from '../serverConfig'

export const registerText = (text) => dispatch => {
    console.log(text)
    axios.post(`${server}api/texts/registration`, text)
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