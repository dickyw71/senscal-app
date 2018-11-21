import React, { Component } from 'react';
import SensorItem from './SensorItem.js';

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
    }

    itemClicked() {
        this.setState((prevState) => {
            return {
               isOpen: prevState.isOpen ? false : true
            }
        })
        this.props.updateContentUri(this.props.uri)
    }

    componentDidMount() {
        fetch(this.props.uri)
            .then(res => res.json())
            .then(
                (result) => {
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
                        end: result.length > 100 ? 100 : result.length
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
                    {visibleItems.map(item => <SensorItem key={item.barcode} uri={item.calibrationsUri} item={item}></SensorItem>)}
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