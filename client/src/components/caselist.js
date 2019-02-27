import React, {Component} from 'react';
import axios from 'axios';

class CaseList extends Component {

    state = {
        success: false,
        data: []

    }

    async componentDidMount() {
        const resp = await axios.get('http://localhost:9000/api/caselist');
        console.log('response:', resp);

        this.setState({
            success: true,
            data: response.data.data

        })

    }

    render() {
        return (
            <div>
                LIST
            </div>
        );


    }


}

export default CaseList;