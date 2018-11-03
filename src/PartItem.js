import React, { Component } from 'react';
import './List-Item.css';

class PartItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <a 
              className="_list-item _list-dir"
              key={this.props.item.part_name}
              tabIndex="-1"
              >
              <span className="_list-text">{this.props.item.part_name}</span>
            </a> 
        )
    }
}

export default PartItem;
