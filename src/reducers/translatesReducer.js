import { FETCH_TRANSLATES_BY_SELECTED_LANGUAGES } from '../actions/types';

const initialState = {
    translates: []
};

export default function (state = initialState, action ) {
    switch(action.type) {
        case FETCH_TRANSLATES_BY_SELECTED_LANGUAGES:
            return {
                translates: action.payload
            };
        default:
            return state;
    }
}