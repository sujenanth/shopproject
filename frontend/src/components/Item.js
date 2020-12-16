import React from 'react';
import {Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class Item extends React.Component{
    render(){
        return(
                <div className={"itempreview"}>
                    <Link><img onClick={() => this.props.onClick()} src={this.props.image} alt={this.props.alt}/></Link>
                    <h2>{this.props.name}</h2>
                    <b>Preis: </b><span>{this.props.preis}</span>
                </div>
        )
    }
}

export default Item;