import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import CaseItem from './caseitem';
import './caselist.scss';

class CaseList extends Component {
    state = {
        cases: null
    };

    async componentDidMount(){
        this.setState({
            cases: this.props.cases || []
        })

    }

    async componentDidUpdate(prevProps){
        if(prevProps != this.props && this.props.cases){
            /*
            if(this.props.cases.length === 0){
                this.setState({
                    error: true
                });
            }
            */
            this.setState({
                cases: this.props.cases
            })
        }
    }

    render(){
        if(this.props.error === true){
            return (
                <div className="noData">Sorry an error has occurred. Please try again later.</div>
            );
        }

        if(!this.state.cases){
            return(
                <div className="noData">Loading</div>
            );
        } else if(this.state.cases.length === 0){
            return (
                <div className="noData">No data available</div>
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

