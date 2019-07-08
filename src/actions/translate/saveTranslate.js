import axios from 'axios'
import {GET_ERRORS} from '../types';
import server from '../../serverConfig'

export const saveTranslate = (savedData) => dispatch => {
    axios.post(`${server}api/translates/saveTranslate`, savedData)
    .then(res => {
        console.log(res.data);
        
        // ...
    })
    // .catch(err => {
    //     // if (err.response) {
    //         dispatch({
    //             type: GET_ERRORS,
    //             payload: err.response.data
    //         });
    //     // }
    // })
}