import { 
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    SIGNUP_FAIL, 
    SIGNUP_REQUEST, 
    SIGNUP_SUCCESS, 
    SIGNIN_FAIL, 
    SIGNIN_REQUEST, 
    SIGNIN_SUCCESS, 
    USER_SIGNOUT, 
    USER_UPDATE_PROFILE_FAIL, 
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_RESET,
    USER_UPDATE_PROFILE_SUCCESS
} from '../constants/userConstants';

// Signup
export const signupReducer = (state = {}, action) => {
    switch(action.type) {
        case SIGNUP_REQUEST:
            return ({});
        case SIGNUP_SUCCESS:
            return ({ userInfo: action.payload });
        case SIGNUP_FAIL:
            return ({ error: action.payload });
        default:
            return state;
    }
};