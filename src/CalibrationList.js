import React, { Component } from 'react';
import CalibrationItem from './CalibrationItem.js';

class CalibrationList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            items: [],
            isOpen: false,
            count: 0
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
                                cert_no: item.cert_no,
                                cal_date: item.cal_date,
                                calibrator: item.calibrated_by,
                                calibration: item
                            }
                        }),
                        isLoaded: true,
                        count: result.length
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
        let _callist = null
        let _href = null
        let _className = "_list-item" 

        if (this.state.count > 0) {

            _listArrow = <svg className="_list-arrow"><use href="#icon-dir"></use></svg>
            _className = this.state.isOpen ? "_list-item _list-dir open" : "_list-item _list-dir"
            _onClick = (e) => { e.preventDefault(); this.itemClicked(this.props.uri) }
            _href = this.props.uri

            if (this.state.isOpen) {
                _callist = (
                    <div className="_list" role="navigation">
                        {this.state.items.map(item => <CalibrationItem 
                                key={item.cert_no} 
                                date={item.cal_date}
                                cal_by={item.calibrator}
                                item={item}
                                updateContentUri={this.props.updateContentUri}
                            ></CalibrationItem> 
                        )
                        }
                    </div>
                )
            }
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
                    <span className="_list-text">Calibrations</span>             
                </a>
                {_callist}
            </>
        )
    }
}

export default CalibrationList;