import axios from 'axios';
import server from '../serverConfig'
import {FETCH_TRANSLATE_BY_ID} from './types'

export const fetchTranslateDataByID = (id) => dispatch => {
    axios.post(`${server}api/texts/fetchTranslateFullData`, {id})
    .then(res => {
        dispatch({
            type: FETCH_TRANSLATE_BY_ID,
            payload: res.data
        });
    })
    .catch(err => console.log(err.response.data));
};