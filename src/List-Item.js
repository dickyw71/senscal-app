import React, { Component } from 'react';
import './List-Item.css';

class ListItem extends Component {
    constructor(props) {
        super(props)
        this.state ={
            isOpen: false
        }

        this.onItemOpen = this.onItemOpen.bind(this);
    }

    onItemOpen() {
        this.setState((prevState) => {
            return {
                isOpen: prevState.isOpen ? false : true
            }
        })
    }
    

    render () {
        return (
            <a 
            href="#" 
            className={this.state.isOpen ? "_list-item _list-dir open" : "_list-item _list-dir"} 
            key={this.props.type.sensor_type_cd}
            onClick={(e) => { 
                e.preventDefault() 
                this.onItemOpen()
            }}
            >
            <svg className="_list-arrow">
                <use href="#icon-dir"></use>
            </svg>
            <span className="_list-text">{this.props.type.sensor_type_cd}  {this.props.type.sensor_type_sdesc}</span>
        </a>
        )
    }
}

export default ListItem;