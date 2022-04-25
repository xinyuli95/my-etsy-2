import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { signupReducer, loginReducer } from '../reducers/userReducer';

// TODO: set initial state
const initialState = {
    // user info initial state
    // userSignin: {
    //    userInfo: localStorage.getItem('userInfo') 
    //        ? JSON.parse(localStorage.getItem('userInfo')) 
    //        : null
    //},
};

// TODO: create reducers
const reducer = combineReducers({
    signupStore: signupReducer,
    loginStore: loginReducer,
});

// register with Chrome Redux extension
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer, 
    initialState, 
    storeEnhancers(applyMiddleware(thunk))
);

export default store;
