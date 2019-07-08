import {
    GET_CUSTOMER_TRANSLATES,
} from '../actions/types';

const initialState = [];

export default function (state = initialState, action ) {
    switch(action.type) {
        case GET_CUSTOMER_TRANSLATES:
            return  action.payload;
        default:
            return state;
    }
}