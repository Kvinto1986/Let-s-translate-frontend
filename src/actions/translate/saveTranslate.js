import axios from 'axios'
import {GET_ERRORS} from '../types';
import server from '../../serverConfig'
import { socket } from "../../components/navigation/Header";

export const saveTranslate = (savedData, saveAlert) => dispatch => {
    axios.post(`${server}api/translates/saveTranslate`, savedData)
    .then(res => {
        socket.emit('newTranslateStatusData', res.data)
        saveAlert()
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