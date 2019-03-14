import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import CaseItem from './caseitem';
import './caselist.scss';

class CaseList extends Component {
    state = {
        error: false,
        cases: []
    };

    async componentDidMount(){
        this.setState({
            cases: this.props.cases || []
        })

    }

    async componentDidUpdate(prevProps){
        if(prevProps != this.props && this.props.cases){
            if(this.props.cases.length === 0){
                this.setState({
                    error: true
                });
            }
            this.setState({
                cases: this.props.cases
            })
        }
    }

    render(){
        //console.log('caselist props:', this.props.filterValues);

        if(this.state.error === true){
            return (
                <div>No Data Available</div>
            );
        }

        if(!this.state.cases || this.state.cases.length === 0){
            return(
                <div>Loading</div>
            );
        }

        const caseItemArray = this.state.cases.map(item => {
            return <CaseItem filterValues={this.props.filterValues} key={item.id} {...item}/>
        });

        return(
            <div className="caseListContainer">
                {caseItemArray}
            </div>
        );
    }
}
export default CaseList;

/*
  <div className="decor">
                    <img src="../../assets/images/image1.jpg"/>
                </div>
 */