import React, { Component } from 'react';
import axios from 'axios';
import exampleImage from '../../assets/images/cover1.jpg';
import CaseItem from './caseitem';
import './caselist.scss';

class CaseList extends Component {
    state = {
        error: false,
        cases: []
    };

    async componentDidMount(){
        try {
            const result = await axios.get('/api/caselist?case_type=' + this.props.match.params.casetype);

            if(result.data.success === false) {
                throw new Error('Failed to retrieve data');
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

    async componentDidUpdate(prevProps){
        if(prevProps.location.pathname !== this.props.location.pathname){
            try {
                const result = await axios.get('/api/caselist?case_type=' + this.props.match.params.casetype);

                if(result.data.success === false) {
                    throw new Error('Failed to retrieve data');
                }

                this.setState({
                    cases: result.data.data
                })
            } catch(error) {
                this.setState({
                    cases: []
                });
            }
        }
    }

    render(){




        if(this.state.error === true){
            return(
                <div>No list</div>
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
export default CaseList;

