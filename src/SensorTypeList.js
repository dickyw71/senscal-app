import React, { Component } from 'react';
import SensorTypeItem from './SensorTypeItem.js';
import SensorList from './SensorList.js';
import './Sidebar.css';
import PartList from './PartList.js';

class SensorTypeList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        }

        this.handleItemClicked = this.handleItemClicked.bind(this)
    }

    handleItemClicked(code) {
        let _items = this.state.items.map((item) => {
            if (item.code === code) {
                item.isOpen = item.isOpen ? false : true
            }
            return item;
        })
        this.setState((prevState) => {
            return {
                items: _items
            }
        })
    }

    componentDidMount() {
        fetch('/api/types')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        items: result.map((item) => { 
                            return {
                                code: item.sensor_type_cd,
                                desc: item.sensor_type_sdesc,
                                sensorType: item,
                                partsUri: `/api/types/${item.sensor_type_cd}/parts/`,
                                sensorsUri: `/api/types/${item.sensor_type_cd}/sensors/?nh_sens_id=null`,
                                isOpen: false
                            }
                        }),
                        isLoaded: true
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

        if (this.state.error) {
            typelist = <p>Failed to load Sensor Types with error {this.state.error}</p>
        }
        else if (this.state.items.length === 0) {
            typelist = null
        }
        else {
            typelist = this.state.items.map((item) => {
                
                let elements = []
                elements.push(<SensorTypeItem key={item.code} item={item} onItemClicked={this.handleItemClicked}></SensorTypeItem>)
                if(item.isOpen) {
                    elements.push(<PartList key={item.partsUri} uri={item.partsUri}></PartList>)
                    // elements.push(<SensorList key={item.sensorsUri} uri={item.sensorsUri}></SensorList>)
                }
 
                return elements
            })
        }

        return (
            <div className="_list" role="navigation">
                {typelist}
            </div>
        );
    }
}

export default SensorTypeList;