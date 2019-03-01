import React, { Component } from 'react';
import axios from 'axios';
import exampleImage from '../../assets/images/cover1.jpg';
import CaseItem from './caseitem';
import './caselist.scss';

class CaseList extends Component {
    state = {
        cases: []
    };

    async componentDidMount(){
        const result = await axios.get('/api/caselist?case_type=' + this.props.match.params.casetype);

        this.setState({
            cases: result.data.data
        })
    }

    async componentDidUpdate(prevProps){
        if(prevProps.location.pathname !== this.props.location.pathname){
            const result = await axios.get('/api/caselist?case_type=' + this.props.match.params.casetype);

            this.setState({
                cases: result.data.data
            })
        }
    }

    render(){

        if(this.state.cases.length === 0){
            return(
                <div>Loading</div>
            );
        }

        const caseItemArray = this.state.cases.map(item => {
            const { caseType, location, id } = item;
            return <CaseItem key={id} coverImg={exampleImage} location={location} caseType={caseType}/>
        });

        return(
            <div className="caseListContainer">
                {caseItemArray}
            </div>
        );
    }
}
export default CaseList;

