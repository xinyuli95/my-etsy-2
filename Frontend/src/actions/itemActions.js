import axios from 'axios';
import { 
    LIST_REQUEST,
    LIST_SUCCESS,
    LIST_FAIL,
    ITEM_REQUEST,
    ITEM_SUCCESS,
    ITEM_FAIL
} from '../constants/itemConstants';

export const getList = () => async (dispatch) => {
    dispatch({
        type: LIST_REQUEST
    });

    try{
        const response = await axios.get('http://localhost:3001/home');
        console.log("Item response: ", response)
        dispatch({ type: LIST_SUCCESS, payload: response.data});
    } catch(error) {
        dispatch({ type: LIST_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};