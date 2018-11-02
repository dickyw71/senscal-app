import React, { Component } from 'react';
import PartItem from './PartItem.js';

class PartList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            items: [],
            isOpen: false,
            count: "..."
        }

        this.itemClicked = this.itemClicked.bind(this)
    }

    itemClicked() {

    }

    componentDidMount() {
        fetch(this.props.uri)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.map((item) => { 
                            return {
                                part_name: item.SENSOR_PART_NAME,
                                part: item,
                                isOpen: false
                            }
                        }),
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
        return (        
            <div className=" _list _list-sub" role="navigation">
                <a 
                    href={this.props.uri} 
                    className={this.state.isOpen ? "_list-item _list-dir open" : "_list-item _list-dir"} 
                    key={this.props.uri} 
                    onClick={(e) => { 
                        e.preventDefault() 
                        this.itemClicked(this.props.uri)
                    }}
                    tabIndex="-1"
                    >
                    <svg className="_list-arrow">
                        <use href="#icon-dir"></use>
                    </svg>
                    <span className="_list-count">{this.state.count}</span> 
                    <span className="_list-text">Parts</span>             
                </a>
            </div>
        )
    }
}

export default PartList;