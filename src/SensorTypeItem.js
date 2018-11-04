import React, { Component } from 'react';
import './List-Item.css';

class SensorTypeItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
 
        this.itemClicked = this.itemClicked.bind(this);
    }

    itemClicked() {
        this.setState((prevState) => {
            return {
               isOpen: prevState.isOpen ? false : true
            }
        })
    }

    render () {
        return (
            <a 
                href={'/api/types/' + this.props.item.code}
                className={this.state.isOpen ? "_list-item _list-dir open" : "_list-item _list-dir"} 
                key={this.props.item.code}
                onClick={(e) => { 
                    e.preventDefault() 
                    this.itemClicked()
                }}
                tabIndex="-1"
                >
                <svg className="_list-arrow">
                    <use href="#icon-dir"></use>
                </svg>
                <span className="_list-text">{this.props.item.code}  {this.props.item.desc}</span>
            </a>
        )
    }
}

export default SensorTypeItem;