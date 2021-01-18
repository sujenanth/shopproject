import { Drawer, Button, Radio, Space } from 'antd';
import {useState} from "react";
import {alignPropType} from "react-bootstrap/DropdownMenu";
import UserStores from "../stores/UserStores";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

export default function ShopDrawer(props){
    const { visible, onClose } = props
    const [align, setAlign] = useState("bottom")

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
                            Preis: <b>{item.price} CHF</b>
                            <br/>
                            <br/>
                        </div>
                    )
                    }
                </Drawer>
            </ClickAwayListener>
        </>
    )
}