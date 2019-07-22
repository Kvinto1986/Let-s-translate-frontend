import axios from 'axios'
import {GET_ERRORS} from '../types';
import server from '../../serverConfig'

export const startTranslate = (data) => dispatch => {
    axios.post(`${server}api/messages/registration`, data)
    .then(res => {
        console.log('Message created!')
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