import React, { Component } from 'react';
import './Content.css';


class Content extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        const { typesCount, sensorsCount, partsCount, calibrationsCount} = this.props.stats
        return (
            <div className="_intro">
                <h1>Sensor Calibration</h1>   
                <p>{this.props.uri}</p>
                <p>Currently there are {typesCount} sensor types comprised of {sensorsCount} sensors, based on {partsCount} parts and with {calibrationsCount} calibration records.</p>
            </div>
        )
    }
}

export default Content;