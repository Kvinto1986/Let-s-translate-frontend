import axios from 'axios';
import server from '../../serverConfig'
import {FETCH_ALL_MESSAGES} from '../types'

export const fetchAllMessages = senderData => dispatch => {
    axios.post(`${server}api/messages/getMessages`, senderData)
    .then(res => {
        dispatch({
            type: FETCH_ALL_MESSAGES,
            payload: res.data
        });
    })
    .catch(err => console.log(err.response.data));
};