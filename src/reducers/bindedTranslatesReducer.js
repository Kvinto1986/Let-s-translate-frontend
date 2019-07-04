import {
    FETCH_TRANSLATOR_TRANSLATES,
} from '../actions/types';

const initialState = [];

export default function (state = initialState, action ) {
    switch(action.type) {
        case FETCH_TRANSLATOR_TRANSLATES:
            return  action.payload;
        default:
            return state;
    }
}
