import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from '../LandingPage/Navbar';
import {Link} from 'react-router-dom';

class User extends Component {
    constructor(){
        super();
        this.state = {  
            items : []
        }
     

        this.addFavorite = this.addFavorite.bind(this);
    } 

    addFavorite = (e) => {
        console.log(e.target.value)
    }

    //get the items data from backend  
    componentDidMount(){
        axios.get('http://localhost:3001/home')
                .then((response) => {
                //update the state with the response data
                this.setState({
                    items : this.state.items.concat(response.data) 
                });
            });
    }

    render(){
        //iterate over items to create a table row
        let details = this.state.items.map(item => {
            return(
                <div className="col">
                    <div className="item">
                        <div className="name"> {item.itemID} </div>
                        <div className="price"> {item.price} </div>     
                    </div>   
                </div>
            )
        })
        //if not logged in go to login page
        let redirectVar = null;
        let user = "";

        if(!cookie.load('cookie')){
            redirectVar = <Navigate to= "/login"/>
        } else {
            user = cookie.load('cookie');
        }


        return(
            <div>
                {redirectVar}
                <div><Navbar/></div>
                <div className="container">
                    <h2>{ user }</h2>
                    <li><Link to="/edit-user">edit</Link></li>
                        <div className="row">
                            { details }
                        </div>                
                </div> 
            </div> 
        )
    }
}

export default User;