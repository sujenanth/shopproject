import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import {Container} from 'react-bootstrap'
import {useParams} from 'react-router-dom';
import ItemStores from "../stores/ItemStores";
import Button from '@material-ui/core/Button';
import axios from 'axios'


export default function ItemPage(){

    const id = useParams();

    const [item, setItem] = useState("")

    useEffect(() => {
        axios.post("http://172.20.10.12:8080/api/getItembyId",id).then(function (response){
            setItem(response.data[0]);
            console.log(response.data)
            console.log(item)
        })
    },[id])



    return(
        <React.Fragment>
            <div className={"itemsectionpage"}>
                <div className={"itemsection"}>
                    <div className={"itemtitle"}>
                        <h1>{item.name}</h1>
                    </div>
                    <div className={"itemsectionbutton"}>
                        <Button variant="contained">Buy</Button>
                    </div>
                    <div className={"imgsection"}><img className={"itemimg"} src={item.imageurl} alt=""/></div>
                    <div className={"itemsectiontext"}>
                        <h1>Beschreibung</h1>
                    </div>
                    <div>
                        <p>{item.description}</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}