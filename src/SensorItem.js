import React, { Component } from 'react';
import './List-Item.css';

class SensorItem extends Component {
    constructor(props) {
        super(props)
 
        this.itemClicked = this.itemClicked.bind(this);
    }

    itemClicked(code) {
        this.props.onItemClicked(code)
    }

    render () {
        return (
            <a 
                href={this.props.item.sensorsUri} 
                className={this.props.item.isOpen ? "_list-item _list-dir open" : "_list-item _list-dir"} 
                key={this.props.item.code}
                onClick={(e) => { 
                    e.preventDefault() 
                    this.itemClicked(this.props.item.code)
                }}
                tabIndex="-1"
                >
                <svg className="_list-arrow">
                    <use href="#icon-dir"></use>
                </svg>
                <span className="_list-text">{this.props.item.barcode} - {this.props.item.part_name}</span>
            </a>
        )
    }
}

export default SensorItem;