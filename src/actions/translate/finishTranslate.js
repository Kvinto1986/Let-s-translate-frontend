import axios from 'axios'
import {GET_ERRORS} from '../types';
import server from '../../serverConfig'

export const finishTranslate = (totalData,reset) => dispatch => {
    axios.post(`${server}api/translates/finishTranslate`, totalData)
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