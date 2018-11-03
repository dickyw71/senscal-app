import React, { Component } from 'react';
import './List-Item.css';

class SensorItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
 
        this.itemClicked = this.itemClicked.bind(this);
    }

    itemClicked(code) {
       
    }

    render () {
        return (
            <a 
                href={this.props.uri} 
                className={this.state.isOpen ? "_list-item _list-dir open" : "_list-item _list-dir"} 
                key={this.props.item.barcode}
                onClick={(e) => { 
                    e.preventDefault() 
                    this.itemClicked(this.props.item.barcode)
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