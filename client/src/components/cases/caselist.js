import React, { Component } from 'react';
import axios from 'axios';
import exampleImage from '../../assets/images/cover1.jpg';
import CaseItem from './caseitem';
import './caselist.scss';
import { connect } from 'react-redux';


class CaseList extends Component {
    state = {
        error: false,
        cases: []
    };

    async renderPage(){
        try {
            const { caseType, animalType, animalSize } = this.props;
            const queryStringArray = [{caseType}, {animalType}, {animalSize}];

            let endpointString = '/api/caselist?';

            queryStringArray.map(item => {
                if(Object.values(item)[0] !== null){
                    if(endpointString[endpointString.length-1] !== '?'){
                        endpointString = endpointString + '&';
                    }
                    endpointString = endpointString + Object.keys(item)[0] + '=' + Object.values(item)[0];
                }
            });


            const result = await axios.get(endpointString);

            if(result.data.success === false) {
                throw new Error('Failed to retrieve data');
            }

            if(result.data.data.length === 0){
                throw new Error('No data available');
            }

            this.setState({
                cases: result.data.data
            })
        } catch(error) {
            this.setState({
                error: true,
                cases: []
            });
        }
    }

    componentDidMount(){
        this.renderPage();
    }

    componentDidUpdate(prevState){
        if(prevState.caseType !== this.props.caseType || prevState.animalSize !== this.props.animalSize || prevState.animalType !== this.props.animalType){
            this.setState({
                error: false
            });
            this.renderPage();
        }

    }

    render(){

        if(this.state.error === true){
            return(
                <div>No Matching Data</div>
            );
        }
        if(this.state.cases.length === 0){
            return(
                <div>Loading</div>
            );
        }

        const caseItemArray = this.state.cases.map(item => {
            return <CaseItem key={item.id} coverImg={exampleImage} {...item} />
        });

        return(
            <div className="caseListContainer">
                {caseItemArray}
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        caseType: state.activeCase.caseType,
        animalType: state.activeCase.animalType,
        animalSize: state.activeCase.animalSize
    };
}

export default connect(mapStateToProps)(CaseList);

