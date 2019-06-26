import { combineReducers } from 'redux';

import authReducer from './authReduser';
import errorsReduser from './errorsReduser'
import translatesReducer from './translatesReducer'
import translatePageReducer from './translatePageReducer'
import messagesReducer from './messagesReducer'

export default combineReducers({
    auth: authReducer,
    errors:errorsReduser,
    translatesData: translatesReducer,
    selectedTranslate: translatePageReducer,
    messages: messagesReducer
});