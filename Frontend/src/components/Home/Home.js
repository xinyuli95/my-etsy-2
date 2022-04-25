import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from '../LandingPage/Navbar';
import Items from '../Items/Items';

function Home() {
    return(
        <div>
            <div className="container">
                
                <h2>List of All items</h2>
                    <div className="row">
                        <div><Items/></div>
                    </div>                
            </div> 
        </div> 
    )
}
/*
{
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
                        <button value={item.itemID} onClick = {this.addFavorite} className="btn btn-primary">Favorite</button>                 
                    </div>   
                </div>
            )
        })
        //if not logged in go to login page
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        return(
            <div>
                {redirectVar}
                <div><Navbar/></div>
                <div className="container">
                    <h2>List of All items</h2>
                        <div className="row">
                            { details }
                        </div>                
                </div> 
            </div> 
        )
    }
}
*/
//export Home Component
export default Home;