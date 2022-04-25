import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from '../LandingPage/Navbar';
import {Link} from 'react-router-dom';

class Shop extends Component {
    constructor(){
        super();
        this.state = {  
            items: [],
            shop: "",
            name: "",
            haveShop: true
        }
     

        this.addFavorite = this.addFavorite.bind(this);
    } 

    addFavorite = (e) => {
        console.log(e.target.value)
    }

    componentWillMount(){
        const name = cookie.load('cookie')
        if(!name){
            this.setState({
                name : ''
            })
        } else {
            this.setState({
                name : name
            })
        }

        const data = {
            name: name
        }

        axios.post('http://localhost:3001/shop', data)
                .then((response) => {
                    console.log(response.data);
                    if (response.data === "Shop not found") {
                        this.setState({
                            haveShop: false 
                        });
                    }else {
                        //update the state with the response data
                        this.setState({
                            items : this.state.items.concat(response.data.items) 
                        });
                        this.setState({
                            shop : response.data.shopID 
                        });
                        console.log("shop: ", this.state.shop)
                    }
                
                });

    }

    //get the items data from backend  
    //componentDidMount(){
       
    //}

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

        if(!cookie.load('cookie')){
            redirectVar = <Navigate to= "/login"/>
        } else if (!this.state.haveShop) {
            redirectVar = <Navigate to= "/create"/>
        }

        return(
            <div>
                {redirectVar}
                <div><Navbar/></div>
                <div className="container">
                    <h2>{ this.state.shop }</h2>
                        <div className="row">
                            { details }
                        </div>                
                </div> 
            </div> 
        )
    }
}

export default Shop;