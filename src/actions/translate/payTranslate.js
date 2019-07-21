import axios from 'axios'

import server from '../../serverConfig'

export const payTranslate = (id,reset) => dispatch => {
    axios.post(`${server}api/translates/payTranslate`, id)
        .then(() => reset())
};

export const cancelTranslate = (id,reset) => dispatch => {
    axios.post(`${server}api/translates/cancelTranslate`, id)
        .then(() => reset())
};