import React, { Component } from 'react';

class Intro extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        const { typesCount, sensorsCount, partsCount, calibrationsCount} = this.props.stats
        return (
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
    }
}

export default Intro;