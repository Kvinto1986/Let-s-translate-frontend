import axios from 'axios';
import {GET_CUSTOMER_TEXTS, GET_ERRORS} from './types';
import server from '../serverConfig'

export const registerText = (text, reset) => dispatch => {
    axios.post(`${server}api/texts/registration`, text)
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

export const getTextCustomers = (customer) => dispatch => {
    axios.post(`${server}api/texts/getTextCustomers`, customer)
        .then(res => {
            dispatch({
                type: GET_CUSTOMER_TEXTS,
                payload: res.data
            });
        })
};