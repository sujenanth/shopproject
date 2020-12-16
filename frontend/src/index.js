import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Switch, Route, BrowserRouter} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, FormControl, Form, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import ItemPage from "./pages/ItemPage";
import Item from "./components/Item";
import axios from "axios";
import ItemStores from "./stores/ItemStores";
import ItemRegister from "./pages/ItemRegister";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import styled from "@material-ui/core/styles/styled";
import Badge from "@material-ui/core/Badge";

function test(){
    console.log("testtest")
}




function AppRun(){
    return(
        <div className={"wholeapp"}>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">The Black Market</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/">Products</Nav.Link>
                        <Nav.Link href="/">Pricing</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-info">Search</Button>
                    </Form>
                    <Link>
                       <div style={{marginTop:10}}>
                           <Badge badgeContent={ItemStores.selected} color="primary">
                               <ShoppingCartIcon style={{ fontSize: 40 }} className={"shoppingcart"} onClick={() => test()}/>
                           </Badge>
                       </div>
                    </Link>
                </Navbar>
                    <Switch>
                        <Route exact path="/" component={App}/>
                        <Route path="/item/:id" component={ItemPage}/>
                        <Route path="/itemregister" component={ItemRegister}/>
                    </Switch>
        </div>
    )

}
const rootElement = document.getElementById("root");
ReactDOM.render(<BrowserRouter><AppRun/></BrowserRouter>, rootElement);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
