import React, {Component} from 'react';
import axios from 'axios';
import CaseDetailImage from '../assets/images/image11.jpg';
import './caseDetails.scss';

class CaseDetails extends Component {

    state = {
        data: null
    }

    async componentDidMount() {

        const response = await axios.get('http://localhost:9000/api/casedetails?id=23');
        console.log('response:', response.data.data);

       


       this.setState({
            data: response.data.data
        })

    }

    render() {
        if (!this.state.data) {
            return (
                <h1>Loading</h1>
            )
        }

        if(this.props.googlemap){
            return (
                <div className="row">
                    <div className="col s12 m6">
                        <div className="card">
                            <div className="card-image">
                                <img src={CaseDetailImage}/>
                            </div>
                            <div className="card-content">
                                <div className="orange text-white">City
                                    : {this.state.data.location.city}</div>
                                <div>Case id: {this.state.data.id}</div>
                                <div>PET TYPE : {this.state.data.animalDetail.animalType}</div>
                                <div>PET COLOR: {this.state.data.animalDetail.color}</div>

                            </div>
                        </div>
                    </div>
                </div>

              )
        }

        return (
            <div>
                <h2 className="header">Please help me</h2>
                <div className="card horizontal">
                    <div className="card-image">
                        <img src={CaseDetailImage}/>
                    </div>
                    <div className="card-stacked">
                        <div className="card-content">
                            <div className="orange text-white">City
                                : {this.state.data.location.city}</div>
                            <div>Case id: {this.state.data.id}</div>
                            <div>PET NAME:{this.state.data.animalDetail.name}</div>
                            <div>PET TYPE : {this.state.data.animalDetail.animalType}</div>
                            <div>PET BREED : {this.state.data.animalDetail.breed}</div>
                            <div>PET COLOR: {this.state.data.animalDetail.color}</div>
                            <div>GENDER: {this.state.data.animalDetail.gender}</div>
                            <div>Animal Size: {this.state.data.animalDetail.size}</div>
                            <div>DATE LOST: {this.state.data.date}</div>
                            <div>PHONE: mobile</div>
                            <div>PET DESCRIPTION:{this.state.data.animalDetail.description} </div>
                            <div>AREA LAST SEEN : {this.state.data.location.street}</div>
                            <div>Zip Code:{this.state.data.location.zipcode}</div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

}

export default CaseDetails;