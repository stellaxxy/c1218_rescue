import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import CaseItem from './caseitem';
import './caselist.scss';

class CaseList extends Component {
    state = {
        cases: []
    };

    async componentDidMount(){
        this.setState({
            cases: this.props.cases || []
        })
    }

    async componentDidUpdate(prevProps){
        if(prevProps != this.props && this.props.cases && this.props.cases.length > 0){
            this.setState({
                cases: this.props.cases
            })
        }
    }

    render(){
        if(!this.state.cases || this.state.cases.length === 0){
            return(
                <div>Loading</div>
            );
        }

        const caseItemArray = this.state.cases.map(item => {
            return <CaseItem key={item.id} {...item}/>
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