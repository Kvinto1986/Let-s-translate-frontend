import axios from 'axios';
import server from '../serverConfig'
import {FETCH_TRANSLATES_BY_SELECTED_LANGUAGES} from './types'

export const fetchTranslatesByAvailableLanguages = (languages) => dispatch => {
    // Yan API ...
    axios.get(`${server}api/translates/fetchByAvailableLanguages`, languages)
    .then(res => {
        dispatch({
            type: FETCH_TRANSLATES_BY_SELECTED_LANGUAGES,
            payload: res.data
        });
    })
    .catch(err => console.log(err.response.data));
};