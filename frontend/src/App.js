import logo from './logo.svg';
import './App.css';
import './stylesheet.css';
import {Container, Row, Col} from 'react-bootstrap';
import {useEffect, useState} from "react";
import {useHistory, useParams} from 'react-router-dom';

import axios from 'axios';
import ItemStores from "./stores/ItemStores";
import Item from './components/Item';
import React from 'react';
import {Card} from 'antd';
import Meta from "antd/es/card/Meta";
import {Grid} from '@material-ui/core';
import {forEach} from "react-bootstrap/ElementChildren";
import UserStores from "./stores/UserStores";

function App(props) {

    const param = useParams();

    const [isLoaded, setIsLoaded] = useState(false);
    const history = useHistory();
    const [items, setItems] = useState([]);
    const [kategorie, setKategorie] = useState([]);
    const [sorted, setSorted] = useState([])

    let correctParam = false;

    useEffect(() => {
        console.log(ItemStores.kategorie)
        setIsLoaded(true);
        loadData().then(r => {
            setItems(r)
            ItemStores.items = r
            let array = r;
            let uniquenames = [];
            array.forEach(item => {
                uniquenames.push(item.kategorie)
            })
            uniquenames = uniquenames.filter(onlyUnique)
            setKategorie(uniquenames);
            })
        console.log(localStorage.getItem("user"))
    }, [])

    useEffect(() => {
        if(param.kategorie){
            const test = ItemStores.items.filter(d => d.kategorie === param.kategorie);
            setItems(test)
        }
        else{
            setItems(ItemStores.items)
        }
    },[kategorie, setKategorie, param])

    useEffect(() => {
        console.log(sorted)
        console.log(ItemStores.items)
        console.log(items)
    },[sorted])

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    useEffect(() => {
        console.log(param)
    },[param])


    async function loadData() {
        let data;
        await axios.get("api/getAllItems").then(function (response) {
            data = response.data;
            setItems(items)
        })
        setItems(data);
        return data;
    }

    if(isLoaded) {
        return (
            <div>
                <Grid
                    container
                    spacing={3}
                >

                            {sorted === [] ?
                            items.map((item) => (
                                <Grid
                                    item
                                    xs={3}
                                >
                                <Card
                                    hoverable
                                    style={{width: 240}}
                                    cover={<img alt={item.name} src={item.imageurl}
                                                onClick={() => history.push(`/item/` + item._id)}
                                    />
                                    }
                                >
                                    <Meta title={item.name} description={item.kategorie}/>
                                </Card>
                                </Grid>
                            )) :
                                items.map((item) => (
                                    <Grid
                                        item
                                        xs={3}
                                    >
                                    <Card
                                        hoverable
                                        style={{width: 240}}
                                        cover={<img alt={item.name} src={item.imageurl}
                                                    onClick={() => {
                                                        UserStores.currentItem = item.name
                                                        history.push(`/item/` + item._id)
                                                    }
                                                }
                                        />
                                        }
                                    >
                                        <Meta title={item.name} description={item.kategorie}/>
                                    </Card>
                                    </Grid>
                                ))
                            }
                </Grid>
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

