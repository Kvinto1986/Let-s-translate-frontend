import {
    GET_CUSTOMER_TEXTS,
} from '../actions/types';

const initialState = [];

export default function (state = initialState, action ) {
    switch(action.type) {
        case  GET_CUSTOMER_TEXTS:
            return  action.payload;
        default:
            return state;
    }
}