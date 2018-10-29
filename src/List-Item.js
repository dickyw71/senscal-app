import React, { Component } from 'react';
import './List-Item.css';

class ListItem extends Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <a href={null} className="_list-item _list-dir" key={this.props.type.sensor_type_cd}>
            <svg className="_list-arrow">
                <use href="#icon-dir"></use>
            </svg>
            <span className="_list-text">{this.props.type.sensor_type_cd}  {this.props.type.sensor_type_sdesc}</span>
        </a>
        )
    }
}

export default ListItem;