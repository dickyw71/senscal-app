import React, { Component } from 'react';
import SensorTypeDetails from './SensorTypeDetails.js'
import './Content.css';


class Content extends Component {
    constructor(props) {
        super(props)

    }



    render() {
        let content = null
        // When content uri is undefined
        if (this.props.uri === undefined || this.props.uri === "") {
            const { typesCount, sensorsCount, partsCount, calibrationsCount} = this.props.stats
            content =  ( 
                <div className="_intro">
                    <h1>Sensor Calibration</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Current totals</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Sensors</td>
                                <td>{sensorsCount}</td>
                            </tr>
                            <tr>
                                <td>Calibrations</td>
                                <td>{calibrationsCount}</td>
                            </tr>
                            <tr>
                                <td>Sensor types</td>
                                <td>{typesCount}</td>
                            </tr>
                            <tr>
                                <td>Part defs.</td>
                                <td>{partsCount}</td>
                            </tr>
                        </tbody>
                    </table>   
                </div>
            )
        } else {
            // When content uri is a sensor type show the type details
            if(this.props.uri.match(/\/api\/types\/[A-Z]{2}$/)) {
                content = (
                    <div className="_sensorType">
                        <h1>{this.props.uri}</h1>
                        <SensorTypeDetails sensorType={JSON.parse(localStorage.getItem(this.props.uri))}></SensorTypeDetails>
                    </div>
                )
            }
            else {
                // When content uri is a parts list show the list
                if (this.props.uri.match(/\/api\/types\/[A-Z]{2}\/parts\/$/)) {
                    // Get the parts list from local storage
                    content = <p>Parts list {this.props.uri}</p>
                }
                else {
                    if (this.props.uri.match(/\/api\/types\/[A-Z]{2}\/sensors\/\?nh_sens_id=null$/)) {
                        // Get the parts list from local storage
                        content = <p>Sensors list {this.props.uri}</p>
                    }
                }
            }
        }
        return ( 
            <div className="_content">
                {content}
            </div> )
    }
}

export default Content;