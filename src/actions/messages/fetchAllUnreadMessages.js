import axios from 'axios';
import server from '../../serverConfig'
import {FETCH_ALL_UNREAD_MESSAGES} from '../types'

export const fetchAllUnreadMessages = user => dispatch => {
    axios.post(`${server}api/messages/fetchAllUnreadMessages`, user)
    .then(res => {
        dispatch({
            type: FETCH_ALL_UNREAD_MESSAGES,
            payload: res.data
        });
    })
};