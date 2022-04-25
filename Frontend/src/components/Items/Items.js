import React, {useState, useEffect} from 'react';
import '../../App.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getList } from '../../actions/itemActions';

function Items(props) {
    //const keyword = props.match.params.id;

    const dispatch = useDispatch();
    const listStore = useSelector(state => state.listStore);
    const { items, error } = listStore;

    useEffect(()=>{ 
        dispatch(getList())
        }, [])

    return (
        <div>
            {console.log("Items are: ", items)}
            {items.map(item => {
                <div className="col">
                    <div className="item">
                        <div className="name"> {item.itemID} </div>
                        <div className="price"> {item.price} </div>     
                    </div>   
                </div>
                })

            }
        </div>
    );
  }

export default Items;

