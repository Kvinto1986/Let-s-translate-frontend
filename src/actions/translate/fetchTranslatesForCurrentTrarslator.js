import axios from 'axios'
import server from '../../serverConfig'
import {FETCH_TRANSLATOR_TRANSLATES} from '../types';

export const fetchTranslatesForCurrentTrarslator = email => dispatch => {
    axios.post(`${server}api/translates/fetchUnReadyTranslates`, email)
    .then(res => {
        dispatch({
            type: FETCH_TRANSLATOR_TRANSLATES,
            payload: res.data
        });
    })
    .catch(err => console.log(err))
}