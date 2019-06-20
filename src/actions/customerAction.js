import axios from 'axios';
import {GET_ERRORS} from './types';
import server from '../serverConfig'

export const registerCustomer = (customer, reset) => dispatch => {
    axios.post(`${server}api/customers/registration`, customer)
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