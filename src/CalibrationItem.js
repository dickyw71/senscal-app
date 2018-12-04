import React, { Component } from 'react';
import './List-Item.css';

class CalibrationItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let cal_date = new Date(Date.parse(this.props.date)).toDateString()
        return (
            <a
                className="_list-item _list-dir"
                key={this.props.item.cert_no}
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