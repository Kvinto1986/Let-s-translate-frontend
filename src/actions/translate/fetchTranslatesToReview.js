import axios from 'axios'
import server from '../../serverConfig'
import {FETCH_TRANSLATES_TO_REVIEW} from '../types';

export const fetchTranslatesToReview = (languages, translatorEmail) => dispatch => {
    axios.post(`${server}api/translates/getTranslatesForReview`, {languages, translatorEmail})
    .then(res => {
        dispatch({
            type: FETCH_TRANSLATES_TO_REVIEW,
            payload: res.data
        });
    })
    .catch(err => console.log(err))
}