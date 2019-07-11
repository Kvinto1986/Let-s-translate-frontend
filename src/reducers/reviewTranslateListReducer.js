import {
    FETCH_TRANSLATES_TO_REVIEW,
} from '../actions/types';

const initialState = [];

export default function (state = initialState, action ) {
    switch(action.type) {
        case FETCH_TRANSLATES_TO_REVIEW:
            return action.payload;
        default:
            return state;
    }
}