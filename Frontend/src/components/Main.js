import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Home from './Home/Home';
import Delete from './Delete/Delete';
import Create from './Create/Create';
import Navbar from './LandingPage/Navbar';
import Search from './Search/Search';
import User from './User/User';
import UserEdit from './User/UserEdit';
import Shop from './Shop/Shop';

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                    {/*Render Different Component based on Route*/}
                    <Route path="/" component={Navbar}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/delete" component={Delete}/>
                    <Route path="/shop" component={Shop}/>
                    <Route path="/signup" component={Signup}/>
                    <Route path="/search/:id" component={Search}/>
                    <Route path="/user" component={User}/>
                    <Route path="/edit-user" component={UserEdit}/>
                    <Route path="/create" component={Create}/>
                
            </div>
        )
    }
}
//Export The Main Component
export default Main;