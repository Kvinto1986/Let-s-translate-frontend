import axios from 'axios';
import server from '../../serverConfig'
import {FETCH_DIALOG} from '../types'

export const getUniqueDialog = (data) => dispatch => {
    axios.post(`${server}api/messages/getDialog`, data)
    .then(res => {
        dispatch({
            type: FETCH_DIALOG,
            payload: res.data
        });
    })
    .catch(err => console.log(err.response.data));
};