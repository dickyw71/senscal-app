import React, { Component } from 'react';
import CalibrationList from './CalibrationList.js';

class SensorCalibrations extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div className="_list _list-sub">
                <CalibrationList 
                    uri={this.props.calibrationsUri}
                    updateContentUri={this.props.updateContentUri}
                ></CalibrationList>
            </div>
        )
    }
}

export default SensorCalibrations;