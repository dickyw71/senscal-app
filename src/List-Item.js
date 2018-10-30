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

    onItemOpen(type_code) {
        this.setState((prevState) => {
            return {
                isOpen: prevState.isOpen ? false : true
            }
        })
        
    }
    

    render () {
        const type_code = this.props.type.sensor_type_cd

        return (
            <a 
            href="#" 
            className={this.state.isOpen ? "_list-item _list-dir open" : "_list-item _list-dir"} 
            key={type_code}
            onClick={(e) => { 
                e.preventDefault() 
                this.onItemOpen(type_code)
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