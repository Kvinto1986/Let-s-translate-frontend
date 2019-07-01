import axios from 'axios';
import server from '../../serverConfig'
// import {FETCH_SINGLE_MESSAGE_HISTORY} from '../types'

export const fetchMessageHistory = messagingID => dispatch => {
    axios.post(`${server}api/messages/getMessageHistory`, {messagingID})
    .then(res => {
        // dispatch({
        //     type: FETCH_SINGLE_MESSAGE_HISTORY,
        //     payload: res.data
        // });
    })
    .catch(err => console.log(err.response.data));
};