import axios from 'axios';
import server from '../serverConfig'
import {FETCH_TRANSLATES_BY_SELECTED_LANGUAGES} from './types'

export const fetchTranslatesByAvailableLanguages = (languages) => dispatch => {
    axios.post(`${server}api/texts/fetchByAvailableLanguages`, languages)
    .then(res => {
        dispatch({
            type: FETCH_TRANSLATES_BY_SELECTED_LANGUAGES,
            payload: res.data
        });
    })
    .catch(err => console.log(err.response.data));
};