import { Drawer, Radio, Space } from 'antd';
import {useState} from "react";
import {alignPropType} from "react-bootstrap/DropdownMenu";
import UserStores from "../stores/UserStores";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import styled from "@material-ui/core/styles/styled";
import {Button, withStyles} from '@material-ui/core';
import {useHistory} from 'react-router-dom';

export default function ShopDrawer(props){
    const history = useHistory();

    const { visible, onClose } = props
    const [align, setAlign] = useState("bottom")

    const OverviewButton = styled(Button)({
        backgroundColor: '#3bb78f',
        backgroundImage: 'linear-gradient(315deg, #3bb78f 0%, #0bab64 74%)',
        color: 'white'
    })

    return(
        <>
            <ClickAwayListener onClickAway={() => onClose}>
                <Drawer
                    className={"shopping_drawer"}
                    title="Warenkorb"
                    placement={align}
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                    key={align}
                    height={"500px"}
                >
                    {UserStores.items &&
                    UserStores.items.map((item) =>
                        <div>
                            <span>{item.name} </span><br/>
                            Preis: <b>{item.price} CHF</b><br/>
                            Anzahl: <b>{item.anzahl ? item.anzahl : 0}</b>
                            <br/>
                            <br/>
                        </div>
                    )
                    }
                    <div className={"drawer_button"}>
                        <OverviewButton onClick={() => history.push("/cart")} variant={"contained"}>Zur Übersicht</OverviewButton>
                    </div>
                </Drawer>
            </ClickAwayListener>
        </>
    )
}