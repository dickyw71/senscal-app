import React, { Component } from 'react';
import SensorTypeItem from './SensorTypeItem.js';
import TypePartsAndSensors from './TypePartsAndSensors.js'
import './Sidebar.css';

class SensorTypeList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        }
    }

    componentDidMount() {
        fetch('/api/types')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        items: result.map((item) => { 
                            return {
                                code: item.sensor_type_cd,
                                desc: item.sensor_type_sdesc,
                                sensorType: item,
                                partsUri: `/api/types/${item.sensor_type_cd}/parts/`,
                                sensorsUri: `/api/types/${item.sensor_type_cd}/sensors/?nh_sens_id=null`,
                            }
                        }),
                        isLoaded: true
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
        let typelist = undefined;

        if (this.state.error) {
            typelist = <p>Failed to load Sensor Types with error {this.state.error}</p>
        }
        else if (this.state.items.length === 0) {
            typelist = null
        }
        else {
            typelist = this.state.items.map(item => 
                <>
                    <SensorTypeItem 
                        key={item.code} 
                        item={item} 
                        updateContentUri={this.props.updateContentUri}
                    ></SensorTypeItem>
                    <TypePartsAndSensors 
                        key={item.code + "_parts_sensors"} 
                        partsUri={item.partsUri} 
                        sensorsUri={item.sensorsUri}
                        updateContentUri={this.props.updateContentUri}
                    ></TypePartsAndSensors>
                </>
            )        
        }

        return (
            <div className="_list" role="navigation">
                {typelist}
            </div>
        );
    }
}

export default SensorTypeList;