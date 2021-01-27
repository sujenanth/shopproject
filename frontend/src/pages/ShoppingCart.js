import UserStores from "../stores/UserStores";
import React, {useEffect, useState, useCallback} from "react";
import {TableContainer} from '@material-ui/core';
import {Table, TableRow, TableBody, TableHead, TableCell} from '@material-ui/core';
import {Button} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import {Divider} from '@material-ui/core';
import {Modal} from 'react-responsive-modal';

export default function ShoppingCart(props){

    const [items, setItems] = useState(UserStores.items);
    const [test, setTest] = useState("test");
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const [tempitem, setTempitem] = useState();

    const [confirm, setConfirm] = useState(false);

    useEffect(() => {
        UserStores.items = items;
    },[items])

    function increase(item) {
        let tempitems = items;
        for(let x = 0; x < tempitems.length; x++){
            if(tempitems[x]._id === item._id){
                tempitems[x].anzahl = tempitems[x].anzahl + 1;
                forceUpdate();
                console.log(tempitems)
                return () => setItems(tempitems)
            }
        }
    }

    useEffect(() => {
        console.log("asdasd")
        setTest("asdasd")
    },[setItems])

    useEffect(() => {
        console.log(items)
    },[items])

    function decrease(item){
        let tempitems = items;
        for(let x = 0; x < tempitems.length; x++){
            if(tempitems[x]._id === item._id){
                if(tempitems[x].anzahl === 1){
                    forceUpdate()
                    setTempitem(item)
                    /*
                    let test = arrayRemove(tempitems, item)
                    UserStores.items = test;
                    setItems(test)
                    */
                    setConfirm(true)
                }
                else {
                    forceUpdate();
                    tempitems[x].anzahl = tempitems[x].anzahl - 1;
                    return () => setItems(tempitems)
                }
            }
        }
    }

    function confirmDecrase(){
        forceUpdate()
        let tempitems = items;
        let test = arrayRemove(tempitems, tempitem)
        UserStores.items = test;
        setItems(test)
        setConfirm(false)
    }


    function arrayRemove(arr, value) {
        return arr.filter(function(ele){
            return ele._id !== value._id;
        });
    }


        return(
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Preis</TableCell>
                            <TableCell>Anzahl</TableCell>
                            <TableCell>Hinzufügen & Löschen</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item) => (
                            <TableRow>
                                <TableCell><img src={item.imageurl} alt="image"/></TableCell>
                                <TableCell><b>{item.name}</b></TableCell>
                                <TableCell>{item.price} CHF</TableCell>
                                <TableCell>{
                                    item.anzahl ? (
                                        item.anzahl
                                    ) : 1
                                }</TableCell>
                                <TableCell>
                                    <Button style={{
                                        backgroundImage: 'linear-gradient(315deg, #3bb78f 0%, #0bab64 74%)',
                                        color: 'white',
                                        marginRight: '10px'
                                    }} variant={"outlined"}
                                    onClick={() => increase(item)}><AddIcon/></Button>
                                    <Button style={{
                                        backgroundImage: 'linear-gradient(315deg, #eb3349  0%, #f45c43 74%)',
                                        color: 'white'
                                    }} variant={"outlined"}
                                    onClick={() => decrease(item)}
                                    ><DeleteIcon/></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Modal classNames={{
                    modal: 'confirmModal'
                }} center open={confirm} onClose={() => setConfirm(false)}>
                    <h2> Wollen sie wirklich den Artikel aus dem Warenkorb entfernen?</h2>
                    <Divider/>
                    <div className={"confirm_buttons"}>
                        <Button style={{
                            backgroundImage:'linear-gradient(315deg, #3bb78f 0%, #0bab64 74%)',
                            color: 'white'
                        }}
                        onClick={() => setConfirm(false)}>Nein</Button>
                        <Button style={{
                            backgroundImage:'linear-gradient(315deg, #eb3349  0%, #f45c43 74%)',
                            color: 'white'
                        }} onClick={() => confirmDecrase()}>Ja</Button>
                    </div>
                </Modal>
            </TableContainer>
        )
}