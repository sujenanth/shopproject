import React, {useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Switch, Route, BrowserRouter} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ItemPage from "./pages/ItemPage";
import ItemStores from "./stores/ItemStores";
import ItemRegister from "./pages/ItemRegister";
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    ShopOutlined,
    UserOutlined,
    EditOutlined
} from '@ant-design/icons';
import {useHistory} from 'react-router-dom';
import axios from "axios";
import UserStores from "./stores/UserStores";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import {Divider, Tooltip} from "@material-ui/core";
import {Switch as AntDSwitch} from 'antd';
import Login from "./components/Login";
import Fab from '@material-ui/core/Fab';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShopDrawer from "./components/ShopDrawer";
import ShoppingCart from "./pages/ShoppingCart";


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;



function AppRun(){


    const [collapsed, setCollapsed] = useState(false);
    const [items, setItems] = useState([]);
    const [theme, setTheme] = useState("dark")
    const history = useHistory();

    const [show, setShow] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [load, setLoad] = useState(false);
    const [kategorie, setKategorie] = useState([]);
    const [path, setPath] = useState("");

    const [showDraw, setShowDraw] = useState(false);


    const handleCloseDraw = () => {
        setShowLogin(false)
    }


    async function loadData() {
        let data;
        await axios.get("api/getAllItems").then(function (response) {
            data = response.data;
            let array = response.data;
            let uniquenames = [];
            array && array.forEach(item => {
                uniquenames.push(item.kategorie)
            })
            uniquenames = uniquenames.filter(onlyUnique)
            setKategorie(uniquenames)
            ItemStores.kategorie = uniquenames;
        })
        setItems(data);
        return data
    }
    const onCollapse = () =>{
        console.log(collapsed);
        setCollapsed(!collapsed);
    }

    const changeTheme = value => {
        if(value === true){
            setTheme('dark')
        }
        else{
            setTheme('light')
        }
    }

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    useEffect(() =>{
        console.log("running from index")
        if(items.length === 0){
            loadData().then((r) =>{
                    setItems(r)
                    ItemStores.items = r;
                }
            )
        }
    },[items.length])

    useEffect(() => {
        if(items === undefined){
            setLoad(false)
        }
        else{
            setLoad(true)
        }
    })

    const handleClose = () => {
        setShow(false)
        setShowLogin(false)
    }

    const handleOpen = () => {
        setShow(true)
    }

    const handleOpenLogin = () => {
        setShowLogin(true);
    }


    return(
        <Layout className={"ant-menu-dark"} style={{minHeight : '100%'}}>
            <Sider className={"ant-menu-dark"} theme={theme} collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="external_logo" >
                    <a onClick={() => history.push("/")}><img className={"marketlogo"} src="https://www.logolynx.com/images/logolynx/90/90cdeb260df361a39d97540d9c75a814.png" alt="logo"/></a>
                </div>
                <Menu theme={theme} defaultSelectedKeys={['1']} mode="inline">
                    <SubMenu key={1} icon={<ShopOutlined />} title="Shop">
                        {kategorie.map((item) => (
                            <Menu.Item onMouseDown={() => {
                                history.push('/'+item)
                            }}>{item}</Menu.Item>
                        ))}
                    </SubMenu>
                    <SubMenu key={2} icon={<UserOutlined />} title="User">
                        {UserStores.isLoggedIn !== 'true' ?
                            <Menu.Item  onClick={() => handleOpenLogin()}>
                                Login
                            </Menu.Item>
                            :
                            <>
                        <Menu.Item onClick={() => {
                            localStorage.clear()
                            window.location.reload();
                        }}>
                            Logout
                        </Menu.Item>
                        <Menu.Item onClick={() => history.push('/itemregister')}>
                            register item
                        </Menu.Item>
                        </>}
                    </SubMenu>
                    <Menu.Item icon={<EditOutlined/>} onClick={() => handleOpen()}>
                        Settings
                    </Menu.Item>
                </Menu>
            </Sider>
            <Login open={showLogin} setClose={() => handleClose()}/>
            <Modal open={show} onClose={handleClose} center classNames={{
                overlay: 'customOverlay',
                modal: 'customModal',
            }}>
                <h2>Settings</h2>
                <Divider/>
                <br/>
                <div style={{display : 'flex'}}>
                    <p>Dark Mode:   </p>
                    <AntDSwitch onChange={(e) => changeTheme()}/>
                </div>
            </Modal>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{
                    display : "flex",
                    alignContent : "center",
                    padding: 0,
                    justifyContent : "center",
                    backgroundColor : '#f0f2f5',
                    marginTop: '10px'
                }} >
                    <h1 style={{ paddingTop : '5px'}}>Black Market</h1>
                </Header>
                <Divider/>
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item><a href={"/"}>Shop</a></Breadcrumb.Item>
                        {path !== '' &&
                            <Breadcrumb.Item>{path}</Breadcrumb.Item>
                        }
                    </Breadcrumb>
                    <div className="root" style={{ padding: 24, minHeight: 360 }}>
                        <Switch>
                            <Route exact path="/" component={App}/>
                            <Route path="/item/:id" component={ItemPage}/>
                            <Route exact path="/cart" component={ShoppingCart}/>
                            <Route path="/itemregister" component={ItemRegister}/>
                            <Route path="/:kategorie" component={App}/>
                        </Switch>
                    </div>
                </Content>
                <div className={"tooltip_class"}>
                    <Tooltip title={"Warenkorb"} aria-label="add">
                        <Fab color="primary" onClick={() => setShowDraw(true)}>
                            <ShoppingCartIcon/>
                        </Fab>
                    </Tooltip>
                </div>
                <ShopDrawer visible={showDraw} onClose={() => {
                    setShowDraw(false)
                }} />
            </Layout>
        </Layout>
    )
}
const rootElement = document.getElementById("root");
ReactDOM.render(<BrowserRouter><AppRun/></BrowserRouter>, rootElement);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
