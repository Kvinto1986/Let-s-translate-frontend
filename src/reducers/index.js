import { combineReducers } from 'redux'

import authReducer from './authReduser'
import errorsReduser from './errorsReduser'
import translatesReducer from './translatesReducer'
import translatePageReducer from './translatePageReducer'
import messagesReducer from './messagesReducer'
import dialogReducer from './dialogReduser'
import bindedTranslatesReducer from './bindedTranslatesReducer'

export default combineReducers({
    auth: authReducer,
    errors: errorsReduser,
    translatesData: translatesReducer,
    selectedTranslate: translatePageReducer,
    messages: messagesReducer,
    dialogReducer: dialogReducer,
    bindedTranslates: bindedTranslatesReducer
});