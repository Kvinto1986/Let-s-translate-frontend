import { 
    FETCH_ALL_MESSAGES,
} from '../actions/types';

const initialState = [];

export default function (state = initialState, action ) {
    switch(action.type) {
        case FETCH_ALL_MESSAGES:
           return  action.payload;
        default:
            return state;
    }
}