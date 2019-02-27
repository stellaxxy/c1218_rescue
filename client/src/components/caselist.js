import React, { Component } from 'react';
import axios from 'axios';

class CaseList extends Component {
    state = {
        cases: []
    };

    async componentDidMount(){
        const result = await axios.get('/api/caselist');
        //console.log('data from caselist:', data);
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
                    <img src={'../assets/images/cover1.jpg'}/>
                </div>
            </div>
        );
    }
}

export default CaseList;