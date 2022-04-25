import axios from 'axios';
import { 
        USER_DETAILS_FAIL, 
        USER_DETAILS_REQUEST,
        USER_DETAILS_SUCCESS, 
        SIGNUP_FAIL,SIGNUP_REQUEST, 
        SIGNUP_SUCCESS, 
        LOGIN_FAIL, 
        LOGIN_REQUEST, 
        LOGIN_SUCCESS, 
        USER_SIGNOUT, 
        USER_UPDATE_PROFILE_FAIL, 
        USER_UPDATE_PROFILE_REQUEST, 
        USER_UPDATE_PROFILE_SUCCESS 
    } from '../constants/userConstants.js';


// sign up
export const signup = (name, email, password) => async (dispatch) => {
    dispatch({ type: SIGNUP_REQUEST, payload: { name, email, password}});

    try{
        
        // use axios for http post request when user REGISTERg in 
        const response = await axios.post('http://localhost:3001/signup', { name, email, password});
        // if success, dispatch success and set payload to data 
        dispatch({ type: SIGNUP_SUCCESS, payload:  response.data });
        //also dispatch SignIn_Success because userSignin.userInfo is what we use to valid user
        dispatch({ type: LOGIN_SUCCESS, payload:  response.data });
        // save data to localStorage
        localStorage.setItem('userInfo', JSON.stringify(response.data));

    }catch(error) {
        // Get error message for exception
        dispatch({ type: SIGNUP_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message});
    }
};

// log in
export const login = (email, password) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST, payload: { email, password}});

    try{
        // use axios for http post request when user signing in 
        const response = await axios.post('http://localhost:3001/login', { email, password});
        // if success, dispatch success and set payload to data 
        dispatch({ type: LOGIN_SUCCESS, payload:  response.data });
        // save data to localStorage
        localStorage.setItem('userInfo', JSON.stringify(response.data));

    }catch(error) {
        // if error, dispatch FAIL, set payload to error message 
        dispatch({ type: LOGIN_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message});
    }
};
