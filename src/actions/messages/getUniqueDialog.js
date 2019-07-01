import axios from 'axios';
import server from '../../serverConfig'
// import {FETCH_ALL_MESSAGES} from '../types'

export const getUniqueDialog = (data) => dispatch => {
    axios.post(`${server}api/messages/getDialog`, data)
    .then(res => {
        console.log(res.data);
        
        // dispatch({
        //     type: FETCH_ALL_MESSAGES,
        //     payload: res.data
        // });
    })
    .catch(err => console.log(err.response.data));
};