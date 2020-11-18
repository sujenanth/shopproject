import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Switch, Route, BrowserRouter} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, FormControl, Form, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';


function test(){
    console.log("testtest")
}

function AppRun(){
    return(
        <React.Fragment>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">The Black Market</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Products</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                </Form>
              <Link><img onClick={() => test()} className={"warenkorb"} src="https://image.flaticon.com/icons/png/512/34/34387.png" alt="logo"/></Link>
            </Navbar>
            <div className={"app"}>
                <Switch>
                    <Route path={"/"} component={App}/>
                </Switch>
            </div>
        </React.Fragment>
    )
}
const rootElement = document.getElementById("root");
ReactDOM.render(<BrowserRouter><AppRun/></BrowserRouter>, rootElement);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
