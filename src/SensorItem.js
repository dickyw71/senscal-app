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

    itemClicked() {
        this.setState((prevState) => {
            return {
               isOpen: prevState.isOpen ? false : true
            }
        })
        const sensorUri = `/api/sensors/${this.props.item.sensor.SENSOR_ID}/?view=full`
        fetch(sensorUri)
        .then( resp => resp.json())
        .then(
            (result) => {
                localStorage.setItem(sensorUri, JSON.stringify(result))
                this.props.updateContentUri(sensorUri)
            },
            (error) => {}
        )    
    }

    render () {
        const { barcode, part_name } = this.props.item
        return (
            <a 
                href={this.props.uri} 
                className={this.state.isOpen ? "_list-item _list-dir open" : "_list-item _list-dir"} 
                key={barcode}
                onClick={(e) => { 
                    e.preventDefault() 
                    this.itemClicked()
                }}
                tabIndex="-1"
                >
                <svg className="_list-arrow">
                    <use href="#icon-dir"></use>
                </svg>
                <span className="_list-text">{barcode} - {part_name}</span>
            </a>
        )
    }
}

export default SensorItem;