import React, { Component } from 'react';
import './List-Item.css';

class CalibrationItem extends Component {
    constructor(props) {
        super(props)

        this.itemClicked = this.itemClicked.bind(this);
    }

    itemClicked() {
        const calibrationUri = `/api/calibrations/${this.props.item.sensor_cal_id}?view=full`
        fetch(calibrationUri)
        .then( resp => resp.json())
        .then(
            (result) => {
                localStorage.setItem(calibrationUri, JSON.stringify(result))
                this.props.updateContentUri(calibrationUri)
            },
            (error) => {}
        )    
    }

    render() {
        let cal_date = new Date(Date.parse(this.props.date)).toDateString()
        return (
            <a
                href={`/api/calibrations/${this.props.item.sensor_cal_id}`}
                className="_list-item _list-dir"
                key={this.props.item.cert_no}
                onClick={(e) => { 
                    e.preventDefault() 
                    this.itemClicked()
                }}
                tabIndex="-1"
            >
                <span
                    className="_list-text"
                >{this.props.item.cert_no}{this.props.item.calibration.most_recent_cal_flag ? " *" : null} ({cal_date || this.props.date}) [{this.props.cal_by}]</span>
            </a>
        )
    }
}

export default CalibrationItem;