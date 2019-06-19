import { combineReducers } from 'redux';

import authReducer from './authReduser';
import errorsReduser from './errorsReduser'

export default combineReducers({
    auth: authReducer,
    errors:errorsReduser
});