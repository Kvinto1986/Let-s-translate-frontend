import axios from 'axios'
import server from '../../serverConfig'
import {FETCH_TRANSLATES_TO_REVIEW} from '../types';
import {socket} from '../../components/navigation/Header';

export const translateReview = (data, languages, status, reviewMessageData) => dispatch => {
    axios.post(`${server}api/translates/translateReview`, {data, status,reviewMessageData})
        .then(res => {
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