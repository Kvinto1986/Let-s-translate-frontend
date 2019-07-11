import axios from 'axios';
import {GET_CUSTOMER_TRANSLATES} from '../types';
import server from '../../serverConfig'

export const getCustomersTranslates = (customer) => dispatch => {
    axios.post(`${server}api/translates/getCustomersTranslates`, customer)
        .then(res => {
            dispatch({
                type: GET_CUSTOMER_TRANSLATES,
                payload: res.data
            });
        })
};