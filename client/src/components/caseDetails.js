
import '../assets/css/casedetails.scss';
import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import CaseDetailImage from '../assets/images/image11.jpg';


class CaseDetails extends Component {

    state = {
        data: null
    }

    async componentDidMount() {

        const response = await axios.get('/api/casedetails?id=23');  // instead of 23 we will use this.props.id
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

                <div className="w3-container">
                    <div className="w3-container w3-half">
                                <img src={CaseDetailImage}/>
                            </div>
                            <div className="w3-container w3-half">
                                <div className="orange text-white">City
                                    : {this.state.data.location.city}</div>
                                <div>Case id: {this.state.data.id}</div>
                                <div>PET TYPE : {this.state.data.animalDetail.animalType}</div>
                                <div>PET COLOR: {this.state.data.animalDetail.color}</div>
                            </div>
                </div>




              )
        }

        return (
            <div>
            <div className="w3-container">
                <h2 className="header ">Please help me</h2>

                    <div className="w3-container w3-half">
                        <img src={CaseDetailImage}/>
                    </div>

                        <div className="w3-container w3-half">
                            <div className="orange text-white bold s12">City
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
                <div className="center" >
                    <Link to className="waves-effect waves-light btn orange text-white">Go Back</Link>
                    <Link to className="waves-effect waves-light btn orange text-white" float="right">CONTACT</Link>
                    <Link to className="waves-effect waves-light btn orange text-white" float="right">CLOSE</Link>
                </div>

            </div>


        );

    }

}

export default CaseDetails;