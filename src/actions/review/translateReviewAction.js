import axios from 'axios'
import server from '../../serverConfig'
import {FETCH_TRANSLATES_TO_REVIEW} from '../types';

export const translateReview = (data, languages) => dispatch => {
    axios.post(`${server}api/translates/translateReview`, data)
    .then(res => {
        console.log(res.data)

        // Update table
        axios.post(`${server}api/translates/getTranslatesForReview`, languages)
        .then(res => {
            dispatch({
                type: FETCH_TRANSLATES_TO_REVIEW,
                payload: res.data
            });
        })

    })
    .catch(err => console.log(err))
}