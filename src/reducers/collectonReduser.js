import {
    GET_COLLECTIONS,
} from '../actions/types';

const initialState = [];

export default function (state = initialState, action ) {
    switch(action.type) {
        case GET_COLLECTIONS:
            return  action.payload;
        default:
            return state;
    }
}