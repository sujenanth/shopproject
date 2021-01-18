import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import {Container} from 'react-bootstrap'
import {useParams} from 'react-router-dom';
import ItemStores from "../stores/ItemStores";
import Button from '@material-ui/core/Button';
import axios from 'axios'
import UserStores from "../stores/UserStores";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export default function ItemPage(){

    const id = useParams();

    const [item, setItem] = useState("")

    const [open, setOpen] = useState(false);

    const handleOpen= () => {
        setOpen(true)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    useEffect(() => {
        axios.post("/api/getItembyId",id).then(function (response){
            setItem(response.data[0]);
            console.log(response.data)
            console.log(item)
        })
    },[id])

    function pushToShoppingCart(){
        UserStores.items.push(item)
        console.log(UserStores.items)
        handleOpen();
    }

    return(
        <React.Fragment>
                    <div className={"itemsection_withimg"}>
                        <div style={{float: 'right'}}>
                            <h1>{item.name}</h1>
                            <div style={{textAlign:'right'}}>
                                <p>Preis: {item.price}</p>
                                <p>Kategorie: {item.kategorie}</p>
                            </div>
                            <Button className={"buy_button"} onClick={() => pushToShoppingCart()} style={{width : '100%', color: 'white'}} variant="contained">Buy</Button>
                        </div>
                        <div className={"itemsectionbutton"}>

                        </div>
                        <div className={"imgsection"}><img className={"itemimg"} src={item.imageurl} alt=""/></div>
                    </div>
                    <div className={"itemsectiontext"}>
                        <h1>Beschreibung</h1>
                    </div>
                    <div>
                        <p>{item.description}</p>
                    </div>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Zum Warenkorb hinzugefügt
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
}