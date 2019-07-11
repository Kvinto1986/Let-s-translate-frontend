import axios from 'axios'
import {GET_ERRORS} from '../types';
import server from '../../serverConfig'

export const finishTranslate = (totalData) => dispatch => {
    axios.post(`${server}api/translates/finishTranslate`, totalData)
    .then(res => {
        console.log(res.data);
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