import React, { Component } from 'react';

class SensorTypeDetails extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { sensor_type_cd, sensor_type_sdesc } = this.props.sensorType
        return (
            <div className="_sensorTypeDetails">
                <table>
                    <thead>
                        <tr>
                            <th colSpan="2">{sensor_type_sdesc}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Code</td>
                            <td>{sensor_type_cd}</td>
                        </tr>
                        <tr>
                            <td>Parts</td>
                            <td>{this.props.partsCount}</td>
                        </tr>  
                        <tr>
                            <td>Sensors</td>
                            <td>{this.props.sensorsCount}</td>
                        </tr>                                               
                    </tbody>
                </table>
            </div>
        )
    }
}

export default SensorTypeDetails;