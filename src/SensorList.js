import React, { Component } from 'react';
import SensorItem from './SensorItem.js';
import SensorCalibrations from './SensorCalibrations.js'

class SensorList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            items: [],
            isOpen: false,
            count: 0,
            start: 0,
            end: 0
        }
        this.itemClicked = this.itemClicked.bind(this)
        this.showMoreClicked = this.showMoreClicked.bind(this)
    }

    itemClicked() {
        this.setState((prevState) => {
            return {
               isOpen: prevState.isOpen ? false : true
            }
        })
        this.props.updateContentUri(this.props.uri)
    }

    showMoreClicked() {
        this.setState((prevState) => {
            return {
                end: (prevState.end+100 > prevState.count) ? prevState.count : prevState.end + 50
            }
        })
    }

    componentDidMount() {
        fetch(this.props.uri)
            .then(res => res.json())
            .then(
                (result) => {
                    localStorage.setItem(this.props.uri, JSON.stringify(result))
                    this.setState({
                        items: result.map((item) => { 
                            return {
                                barcode: item.BARCODE,
                                part_name: item.SENSOR_PART_NAME,
                                sensor: item,
                                calibrationsUri: `/api/sensors/${item.SENSOR_ID}/calibrations/`,
                                isOpen: false
                            }
                        }),
                        isLoaded: true,
                        count: result.length,
                        end: result.length > 50 ? 50 : result.length
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

        let _listArrow = null  
        let _onClick = null
        let _sensorList = null
        let _href = null
        let _className = "_list-item" 

        if (this.state.count > 0) {

            _listArrow = <svg className="_list-arrow"><use href="#icon-dir"></use></svg>
            _className = this.state.isOpen ? "_list-item _list-dir open" : "_list-item _list-dir"
            _onClick = (e) => { e.preventDefault(); this.itemClicked(this.props.uri) }
            _href = this.props.uri
        }

        let visibleItems = this.state.items.slice(this.state.start, this.state.end)

        if (this.state.isOpen) {
            _sensorList = (
                <div className="_list _list-sub" role="navigation">
                    {visibleItems.map((item) => {
                       return ( 
                            <>
                                <SensorItem 
                                    key={item.barcode}
                                    item={item}
                                    updateContentUri={this.props.updateContentUri}
                                ></SensorItem>
                                <SensorCalibrations 
                                    key={item.barcode + "_calibrations"}
                                    calibrationsUri={item.calibrationsUri} 
                                    updateContentUri={this.props.updateContentUri}
                                ></SensorCalibrations>
                            </>
                       )
                    })}
                    {this.state.end === this.state.count ? null :
                        <span 
                            className="_list-item _list-pagelink" 
                            role="link" 
                            onClick={this.showMoreClicked}
                        >Show more… ({this.state.count - this.state.end })
                        </span>
                    }
                </div>
            )
        }
        
        return (
            <>
                <a 
                    href={_href} 
                    className={_className} 
                    key={this.props.uri} 
                    onClick={_onClick}
                    tabIndex="-1"
                >
                    {_listArrow}
                    <span className="_list-count">{this.state.count}</span> 
                    <span className="_list-text">Sensors</span>             
                </a>
                {_sensorList}
            </>
        );
    }
}

export default SensorList;