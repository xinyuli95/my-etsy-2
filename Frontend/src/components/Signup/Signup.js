import React, {useState, useEffect} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../LandingPage/Navbar';
import { signup } from '../../actions/userActions';

//Define a Signup Component
function Signup(props) {
    // initial states
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // user store info
    const signupStore = useSelector(state => state.signupStore);
    const { userInfo, error } = signupStore;

    const dispatch = useDispatch();
    
    //submit Signup handler to send a request to the node backend
    const submitSignup = (e) => {
        //prevent page from refresh
        e.preventDefault();
        dispatch(signup(username, email, password)); 
    }
    //redirect based on successful login
    useEffect(() => {
        let redirectVar = null;
        if(userInfo) {
            props.history.push("/login");
        }
    }, [userInfo]);

    return(
        <div>
            <div className="container">
                
                <div className="login-form">
                    <div className="main-div">
                        <div className="panel">
                            <h2>User Signup</h2>
                            <p>Please enter your username and password</p>
                        </div>
                            <form action="http://127.0.0.1:3000/signup" method="post">
                                <p style={{color: 'red'}}>{error}</p>
                                <div className="form-group">
                                    <input onChange = {(e) => setUsername(e.target.value)} type="text" className="form-control" name="username" value={username} placeholder="Username"/>
                                </div>
                                <div className="form-group">
                                    <input onChange = {(e) => setEmail(e.target.value)} type="email" className="form-control" name="email" value={email} placeholder="Email"/>
                                </div>
                                <div className="form-group">
                                    <input onChange = {(e) => setPassword(e.target.value)} type="password" className="form-control" name="password" value={password} placeholder="Password"/>
                                </div>
                                <button onClick = {submitSignup} className="btn btn-primary">Sign Up</button>
                            </form>                
                    </div>
                </div>
            </div>
        </div>
    )
}
//export Login Component
export default Signup;