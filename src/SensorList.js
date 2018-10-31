import React, { Component } from 'react';
import SensorItem from './SensorItem.js';

class SensorList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            items: []
        }
    }

    componentDidMount() {
        fetch(this.props.uri)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.map((item) => { 
                            return {
                                barcode: item.BARCODE,
                                part_name: item.SENSOR_PART_NAME,
                                sensor: item,
                                calibrationsUri: `/api/sensors/${item.SENSOR_ID}/calibrations/`,
                                isOpen: false
                            }
                        })
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: false,
                        error: error
                    })
                }
            )
    }

    render() {
        let sensorList = undefined;

        if (this.state.error) {
            sensorList = <p>Failed to load Sensors with error {this.state.error}</p>
        }
        else if (this.state.items.length === 0) {
            sensorList = <p>Loading please wait...</p>
        }
        else {
            console.log(this.state.items[0])
            sensorList = this.state.items.map((item) => {
                let sensorListItem = <SensorItem key={item.barcode} item={item} onItemClicked={this.handleItemClicked}></SensorItem> 
  
                return sensorListItem;
            })
        }

        return (
            <div className=" _list _list-sub" role="navigation">
                {sensorList}
            </div>
        );
    }
}

export default SensorList;