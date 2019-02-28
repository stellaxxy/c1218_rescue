import React, { Component } from 'react';
import axios from 'axios';
import exampleImage from '../assets/images/cover1.jpg';

class CaseList extends Component {
    state = {
        cases: []
    };

    async componentDidMount(){
        const result = await axios.get('/api/caselist');
        console.log('data from caselist:', result);
        this.setState({
            cases: result.data.data
        })
    }

    render(){
        if(this.state.cases.length === 0){
            return(
                <div>Loading</div>
            );
        }
        const { coverImg } = this.state.cases[0];

        return(
            <div className="container">
                <div>
                    <img src={exampleImage}/>
                </div>
            </div>
        );
    }
}

export default CaseList;