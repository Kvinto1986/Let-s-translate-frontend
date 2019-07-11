import axios from 'axios'
import server from '../../serverConfig'
import {GET_ERRORS} from '../types'

export const editProfileData = (data, user) => dispatch => {
    let route;

    if(user.role === 'admin' || user.role === 'translator') {
        route = 'api/users'
    }
    else if (user.role === 'customer') {
        route = 'api/customers'
    }

    return new Promise((resolve, reject) => {
        axios.post(`${server}${route}/edit`, {data, user})
        .then(() => {
            resolve('Success')
        })
        .catch(err => {
            reject('Fail')
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
    }) 
}