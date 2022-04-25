import React, {useState, useEffect} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/userActions';
import {Redirect} from 'react-router';
import Navbar from '../LandingPage/Navbar';

//Define a Login Component
function Login(props){
    // initial states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // user store info
    const loginStore = useSelector(state => state.loginStore);
    const { userInfo, error } = loginStore;

    const dispatch = useDispatch();

    //submit Login handler to send a request to the node backend
    const submitLogin = (e) => {
        //prevent page from refresh
        e.preventDefault();
        dispatch(login(email, password)); 
    }

    //redirect based on successful login
    useEffect(() => {
        let redirectVar = null;
        if(userInfo) {
            props.history.push("/home");
        }
    }, [userInfo]);

    return(
       <div className="container">
           
           <div className="login-form">
               <div className="main-div">
                   <div className="panel">
                       <h2>Login</h2>
                       <p>Please enter your username and password</p>
                   </div>
                       <p style={{color: 'red'}}>{error}</p>
                       <div className="form-group">
                           <input onChange = {(e) => setEmail(e.target.value)} type="text" className="form-control" name="email" value={email} placeholder="Email"/>
                       </div>
                       <div className="form-group">
                           <input onChange = {(e) => setPassword(e.target.value)} type="password" className="form-control" name="password" value={password} placeholder="Password"/>
                       </div>
                       <button onClick = {submitLogin} className="btn btn-primary">Login</button>                 
               </div>
           </div>
       </div>
    );
}
//export Login Component
export default Login;