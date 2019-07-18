import axios from 'axios';
import server from '../../serverConfig'
import {FETCH_DIALOG} from '../types'
import { socket } from '../../components/navigation/Header';

export const getUniqueDialog = (data) => dispatch => {
    axios.post(`${server}api/messages/getDialog`, data)
    .then(res => {
        dispatch({
            type: FETCH_DIALOG,
            payload: res.data
        });
        socket.emit('didMountUnreadMessageCountDiscard', data.user)
        window.scrollTo(0,document.body.scrollHeight);
    })
    .catch(err => console.log(err.response.data));
};