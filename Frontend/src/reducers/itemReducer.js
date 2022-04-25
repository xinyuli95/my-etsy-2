import { 
    LIST_REQUEST,
    LIST_SUCCESS,
    LIST_FAIL,
    ITEM_REQUEST,
    ITEM_SUCCESS,
    ITEM_FAIL
} from '../constants/itemConstants';

// item list
export const listReducer = (state = { items: []}, action) => {
    switch(action.type) {
        case LIST_REQUEST:
            return ({});
        case LIST_SUCCESS:
            console.log("reducer items: ", action.payload)
            return ({ items: action.payload });
        case LIST_FAIL:
            return ({ error: action.payload });
        default:
            return state;
    }
};