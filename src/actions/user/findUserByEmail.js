import axios from 'axios';
import server from '../../serverConfig'
import {FETCH_CHAT_MEMBER_DATA} from '../types'

export const findUserByEmail = user => dispatch => {
    axios.post(`${server}api/users/findUserByEmail`, user)
    .then(res => {
        dispatch({
            type: FETCH_CHAT_MEMBER_DATA,
            payload: res.data
        });
    })
};