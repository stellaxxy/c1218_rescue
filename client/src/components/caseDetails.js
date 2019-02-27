import React, {Component} from 'react';
import axios from 'axios';
import Image from '../images';

class CaseDetails extends Component {

    state = {
        data: []
    }

    async componentDidMount() {
        const resp = await axios.get('http://localhost:9000/api/casedetails');
        console.log('response:', resp);

        const { description ,images , size } = resp;

        this.setState({
            data: response.data
        })

    }

    render() {


        return (
            <div>
                <h4>{size}</h4>
                <div className ="product-image">

                    <img src = />
                </div>
            </div>
        );


    }


}

export default CaseDetails;