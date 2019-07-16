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

export const confirmationCustomer = (hash, handleChangeRedirectTrue,handleChangeRedirectFalse) => dispatch => {
    axios.post(`${server}api/customers/confirmationCustomer`, hash)
        .then((data) => {
            if(data) handleChangeRedirectTrue()
        })
        .catch(err => {
            if (err.response) {
                handleChangeRedirectFalse()
            }
        });
};

export const restoreCustomerPassword = (email) => dispatch => {
    axios.post(`${server}api/customers/restorePassword`, email)
        .then((data) => {
        console.log(data)
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

export const newCustomerPassword = (password,handleChangeRedirectTrue,handleChangeRedirectFalse) => dispatch => {
    axios.post(`${server}api/customers/newPassword`, password)
        .then((data) => {
            if(data) handleChangeRedirectTrue(data.data)
        })
        .catch(err => {
            if (err.response) {
                handleChangeRedirectFalse()
            }
        });
};