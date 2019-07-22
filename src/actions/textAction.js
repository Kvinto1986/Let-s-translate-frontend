import axios from 'axios';
import {GET_COLLECTIONS, GET_CUSTOMER_TEXTS, GET_ERRORS} from './types';
import server from '../serverConfig'
import { socket } from "../components/navigation/Header";

export const registerText = (text, reset) => dispatch => {
    axios.post(`${server}api/texts/registration`, text)
        .then(res => {
            socket.emit('newTextData', res.data)
        })
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

export const getAllCollections = (customer) => dispatch => {
    axios.post(`${server}api/texts/getAllCollections`,customer)
        .then(res => {
            dispatch({
                type: GET_COLLECTIONS,
                payload: res.data
            });
        })
};

export const registrationCollection = (collection,reset) => dispatch => {
    axios.post(`${server}api/texts/changeCollection`, collection)
        .then(() =>reset())
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

export const deleteTexts = (texts,reset) => dispatch => {
    axios.post(`${server}api/texts/deleteTexts`,texts)
        .then(() =>reset())
        .catch(err => {
            if (err.response) {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            }
        });
};

export const updateText = (text, reset) => dispatch => {
    axios.post(`${server}api/texts/updateText`, text)
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