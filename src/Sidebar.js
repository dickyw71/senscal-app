import React, { Component } from 'react';
import './Sidebar.css';
import jsondata from './types.json';

class Sidebar extends Component {

    render() {
        let types = [];

        types = this.props.types;

        let typelist = types.map((type) => {
            let href = `/api/types/${type.sensor_type_cd}/sensors/?nh_sens_id=null`
            return (
            <a href={href} className="_list-item" key={type.sensor_type_cd}>
                <span>{type.sensor_type_cd}  {type.sensor_type_sdesc}</span>
            </a>
            )
        })

        return (
            <div className="_list" role="navigation">
                {typelist}
            </div>
        );
    }
}

export default Sidebar;