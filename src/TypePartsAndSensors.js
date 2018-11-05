import React, { Component } from 'react';
import PartList from './PartList.js';
import SensorList from './SensorList.js';

class TypePartsAndSensors extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div className="_list _list-sub">
                <PartList 
                    uri={this.props.partsUri}
                    updateContentUri={this.props.updateContentUri}
                >
                </PartList>
                <SensorList 
                    uri={this.props.sensorsUri}
                    updateContentUri={this.props.updateContentUri}
                >
                </SensorList>
            </div>
        )
    }
}

export default TypePartsAndSensors;