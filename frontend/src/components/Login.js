import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import {Divider, FormControl, InputLabel, Input, FormHelperText, TextField} from '@material-ui/core'
import {useState} from "react";
import {Button} from '@material-ui/core';
import useForm from "antd/es/form/hooks/useForm";
import axios from "axios";
import UserStores from "../stores/UserStores";

const txtfield = {
    width : '100%'
}
const formstyle = {
    width: '50%'
}

const buttonstyle = {
    marginTop: '10px',
    width : '100%',
    background: 'linear-gradient(45deg, #cc2b5e 30%, #753a88 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
}

export default function Login(props){

    const {open, setClose} = props;

    const { register, handleSubmit, errors, reset } = useForm();

    const [username, setUsername] = useState()
    const [password, setPassword] = useState();

    const [error, setError] = useState(false);

    const doLogin = async () => {
        let teacher = {
            name: username,
            password: password,
        }
        await axios.post('/api/login/',teacher).then(
            data => {
                if(data.data.success){
                    console.log("success")
                    UserStores.username = username;
                    UserStores.password = password;
                    localStorage.setItem("user", 'true')
                    window.location.reload();
                    console.log(localStorage.getItem("user"))
                }
                else{
                    console.log("error")
                    setError(true)
                    reset();
                }
            }
        ).catch(error => {
            
        })
    }

    return(
        <Modal classNames={{
            overlay: 'customOverlay',
            modal: 'customModal',
        }} center open={open} onClose={setClose}>
            <h2>Login</h2>
            <Divider/>
            <br/>
            <div className={"loginsection"}>
                {error &&
                    <div>
                        <p style={{color : 'red'}}>Login ist falsch</p>
                    </div>
                }
                <form style={formstyle}>
                    <div>
                        <InputLabel htmlFor="my-input"/>
                        <TextField name="username" style={txtfield} value={username} onChange={(e) => setUsername(e.target.value)}
                                   label={"Username"} id="username" aria-describedby="my-helper-text" />
                        <FormHelperText id="my-helper-text">Ihr Username</FormHelperText>
                    </div>
                    <div>
                        <InputLabel htmlFor="my-input"/>
                        <TextField name="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                   style={txtfield} label={"Password"} id="password" type={"password"} aria-describedby="my-helper-text" />
                        <FormHelperText id="my-helper-text">Ihres Passwort</FormHelperText>
                    </div>
                    <div>
                        <Button onClick={() => doLogin()} style={buttonstyle}>
                            Log In
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}