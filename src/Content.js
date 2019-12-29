import React, { Component } from 'react';
import Intro from './Intro.js'
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
            content =  ( 
                <Intro stats={this.props.stats}></Intro>
            )
        } else {
            // When content uri is a sensor type show the type details
            if(this.props.uri.match(/\/api\/types\/[A-Z]{2}$/)) {
                content = (
                    <div className="_sensorType">
                        <SensorTypeDetails sensorType={JSON.parse(localStorage.getItem(this.props.uri))}></SensorTypeDetails>
                    </div>
                )
            }
            else {
                // When content uri is a parts list show the list
                if (this.props.uri.match(/\/api\/types\/[A-Z]{2}\/parts\/$/)) {
                    // Get the parts list from local storage
                    const sensorType = JSON.parse(localStorage.getItem(this.props.uri.slice(0, 13)))
                    const parts = JSON.parse(localStorage.getItem(this.props.uri))
                    content = (
                        <>
                            <h2>{sensorType.sensor_type_sdesc} / Parts</h2>
                            {parts.map((part) => {
                            return (
                                <p><a>{part.sensor_part_name}</a></p>
                            )
                            })}
                        </>
                    )
                }
                else {
                    if (this.props.uri.match(/\/api\/types\/[A-Z]{2}\/sensors\/\?nh_sens_id=null$/)) {
                        // Get the parts list from local storage
                        const sensorType = JSON.parse(localStorage.getItem(this.props.uri.slice(0, 13)))
                        const sensors = JSON.parse(localStorage.getItem(this.props.uri))
                        content = (
                            <>
                                <h2>{sensorType.sensor_type_sdesc} / Sensors</h2>
                                {sensors.map((sensor) => {
                                return (
                                    <p><a>{sensor.BARCODE} - {sensor.SENSOR_PART_NAME}</a></p>
                                )
                                })}
                            </>
                        )
                    }
                    else {
                        if (this.props.uri.match(/\/api\/sensors\/[0123456789]{1,6}$/)) {
                            content = (
                                <h2>{this.props.uri}</h2>
                            )
                        }
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