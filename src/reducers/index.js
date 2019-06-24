import { combineReducers } from 'redux';

import authReducer from './authReduser';
import errorsReduser from './errorsReduser'
import translatesReducer from './translatesReducer'

export default combineReducers({
    auth: authReducer,
    errors:errorsReduser,
    translatesData: translatesReducer
});