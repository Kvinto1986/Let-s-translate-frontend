import {
    FETCH_DIALOG,
} from '../actions/types';

const initialState = [];

export default function (state = initialState, action ) {
    switch(action.type) {
        case FETCH_DIALOG:
            return  action.payload;
        default:
            return state;
    }
}