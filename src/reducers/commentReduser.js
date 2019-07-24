import {
    GET_COMMENTS,
} from '../actions/types';

const initialState = [];

export default function (state = initialState, action ) {
    switch(action.type) {
        case GET_COMMENTS:
            return  action.payload;
        default:
            return state;
    }
}