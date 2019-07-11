import axios from 'axios'
import {GET_ERRORS} from '../types';
import server from '../../serverConfig'

export const registerMessage = (data, reset) => dispatch => {
    axios.post(`${server}api/messages/registration`, data)
        .then(res => {
            reset()
        })
        .catch(err => {
            if (err.response) {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            }
        })
}