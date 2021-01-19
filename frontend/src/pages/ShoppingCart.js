import UserStores from "../stores/UserStores";
import React, {useEffect, useState, useCallback} from "react";
import {TableContainer} from '@material-ui/core';
import {Table, TableRow, TableBody, TableHead, TableCell} from '@material-ui/core';
import {Button} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

export default function ShoppingCart(props){

    const [items, setItems] = useState(UserStores.items);
    const [test, setTest] = useState("test");
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    useEffect(() => {
        UserStores.items = items;
    },[items])

    function increase(item) {
        let tempitems = items;
        for(let x = 0; x < tempitems.length; x++){
            if(tempitems[x]._id === item._id){
                tempitems[x].anzahl = tempitems[x].anzahl + 1;
                forceUpdate();
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
                    let test = arrayRemove(tempitems, item)
                    UserStores.items = test;
                    setItems(test)
                }
                else {
                    forceUpdate();
                    tempitems[x].anzahl = tempitems[x].anzahl - 1;
                    return () => setItems(tempitems)
                }
            }
        }
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
                            <TableCell>Löschen & Hinzufügen</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item) => (
                            <TableRow>
                                <TableCell><img src={item.imageurl} alt="image"/></TableCell>
                                <TableCell><b>{item.name}</b></TableCell>
                                <TableCell>{item.price}</TableCell>
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
                                    onClick={() => decrease(item)}><DeleteIcon/></Button>
                                    <Button style={{
                                        backgroundImage: 'linear-gradient(315deg, #eb3349  0%, #f45c43 74%)',
                                        color: 'white'
                                    }} variant={"outlined"}
                                    onClick={() => increase(item)}
                                    ><AddIcon/></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
}