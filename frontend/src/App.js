import logo from './logo.svg';
import './App.css';
import './stylesheet.css';
import {Container, Row, Col} from 'react-bootstrap';
import {useEffect, useState} from "react";
import {useHistory} from 'react-router-dom';

import axios from 'axios';
import ItemStores from "./stores/ItemStores";
import Item from './components/Item';
import React from 'react';

function App() {
    const [isLoaded, setIsLoaded] = useState(false);
    const history = useHistory();
    const [items, setItems] = useState([]);

    useEffect(() => {
        console.log('getting data');
        loadData();
        setIsLoaded(true);
    }, [])

    useEffect(() => {
        console.log('loading');
    }, [isLoaded])




     function loadData() {
        axios.get("http://localhost:8080/api/getItems").then(function (response) {
            setItems(response.data);
            ItemStores.items = response.data;
            setIsLoaded(true);
            /*
            items.sort((a,b) =>
                Number(a.price) - Number(b.price)
            )
            setItems(items)*/
        })



    }

    const pushToItem = (itemid) => {
        console.log(itemid)
        history.push(`/item/${itemid}`)
    }

    if(isLoaded) {
        {ItemStores.items = items}
        return (
            <div className="overlay">
                <Container fluid className={"shopcontainer"}>
                    <div className="w-100 p-3">
                        <Row className={"row"}>
                            {
                                items.map((item) =>
                                    <Item
                                        name={item.name}
                                        image={item.imageurl}
                                        preis={item.price}
                                        onClick={() => pushToItem(item._id)}
                                    />
                                )
                            }
                        </Row>
                    </div>
                </Container>
            </div>
        );
    }
    else {
        return (
            <h1>is Loading</h1>
        )
    }
}

export default App;

