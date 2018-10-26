import React, { Component } from 'react';
import './Sidebar.css';

class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        }
    }

    componentDidMount() {
        fetch('/api/types')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: false,
                        error: error
                    })
                }
            )
    }

    render() {
        let typelist = undefined;

        if (this.state.items.length === 0) {
            typelist = <p>Failed to load Sensor Types with error {this.state.error}</p>
        }
        else {
            typelist = this.state.items.map((type) => {
                let href = `/api/types/${type.sensor_type_cd}/sensors/?nh_sens_id=null`
                return (
                <a href={href} className="_list-item" key={type.sensor_type_cd}>
                    <span>{type.sensor_type_cd}  {type.sensor_type_sdesc}</span>
                </a>
                )
            })
        }

        return (
            <div className="_list" role="navigation">
                {typelist}
            </div>
        );
    }
}

export default Sidebar;