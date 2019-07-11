import axios from 'axios';
import {GET_ERRORS, GET_CURRENT_USER} from './types';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../setAuthToken'
import server from '../serverConfig'

export const setCurrentUser = decoded => {
    return {
        type: GET_CURRENT_USER,
        payload: decoded
    }
};

export const loginUser = (user,path) => dispatch => {
    axios.post(`${server}${path}`, user)
        .then(res => {
            const {token} = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        })
        .then(res => {
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

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push('/');
};




