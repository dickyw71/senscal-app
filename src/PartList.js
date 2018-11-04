import React, { Component } from 'react';
import PartItem from './PartItem.js';

class PartList extends Component {
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
                                part_name: item.sensor_part_name,
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
        let _listArrow = null  
        let _onClick = null
        let _partlist = null
        let _href = null
        let _className = "_list-item" 

        if (this.state.count > 0) {

            _listArrow = <svg className="_list-arrow"><use href="#icon-dir"></use></svg>
            _className = this.state.isOpen ? "_list-item _list-dir open" : "_list-item _list-dir"
            _onClick = (e) => { e.preventDefault(); this.itemClicked(this.props.uri) }
            _href = this.props.uri

            if (this.state.isOpen) {
                _partlist = (
                    <div className="_list" role="navigation">
                    {this.state.items.map(item =>  <PartItem key={item.part_name} item={item}></PartItem> )}
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
                    <span className="_list-text">Parts</span>             
                </a>
                {_partlist}
            </>
        )
    }
}

export default PartList;