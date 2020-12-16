import {Button,Form} from 'react-bootstrap'
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import axios from 'axios'


const item = ({
    name: '',
    price: '',
    description: '',
    imageurl: ''
})



export default function ItemRegister(){
    const { handleSubmit,reset } = useForm();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [imageurl, setImageurl] = useState("");
    const [description, setDescription] = useState("");
    function Submit(data){
        item.name = name;
        item.price = price;
        item.imageurl = imageurl;
        item.description = description;
        axios.post("http://172.20.10.12:8080/api/newItem",item)
        console.log(item)
        reset()
    }
    return(
        <form onSubmit={handleSubmit(Submit)} className={"register"}>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control
                   value={name} onChange={(e) => setName(e.target.value)} type="text" name={"itemname"} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Preis</Form.Label>
                <Form.Control
                    value={price} onChange={(e) => setPrice(e.target.value)} type="text" name={"itemprice"} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2">
                <Form.Label>imageurl</Form.Label>
                <Form.Control
                    value={imageurl} onChange={(e) => setImageurl(e.target.value)} type={"text"} name={"itemimageurl"}/>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    value={description} onChange={(e) => setDescription(e.target.value)} name={"itemdescription"} as="textarea" rows={3} />
            </Form.Group>
            <Button
                type="submit"
            >
                Weiter
            </Button>
        </form>
    )
}