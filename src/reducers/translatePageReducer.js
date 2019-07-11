import { 
    FETCH_TRANSLATE_BY_ID,
} from '../actions/types';

const initialState = {
    data: {}
};

export default function (state = initialState, action ) {
    switch(action.type) {
        case FETCH_TRANSLATE_BY_ID:
            return {
                data: action.payload
            };
        default:
            return state;
    }
}