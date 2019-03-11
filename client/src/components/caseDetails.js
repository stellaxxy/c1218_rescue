import '../assets/css/casedetails.scss';
import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';



class CaseDetails extends Component {

    state = {
        data: null
    }

    async componentDidMount() {
        const {caseid} = this.props.match.params;
        const response = await axios.get('/api/casedetails?id=' + caseid);

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
        if (this.props.googlemap) {
            return (

                <div className="w3-container">
                    <div className="w3-container w3-half">
                        <img src={this.state.data.coverImg}/>
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

        var caseUrl= "/contactPage/"+this.state.data.id;

        return (

            <div>
                <div className="w3-container">
                    <h2 className="header ">Please help me</h2>

                    <div className="w3-container w3-half">
                        <img src={this.state.data.coverImg}/>
                    </div>

                    <div className="w3-container w3-half">
                        <div className="orange text-white bold s12">City: {this.state.data.location.city}</div>
                        <div>Case id: {this.state.data.id}</div>
                        <div>Pet name: {this.state.data.animalDetail.name}</div>
                        <div>Pet type: {this.state.data.animalDetail.animalType}</div>
                        <div>Pet breed: {this.state.data.animalDetail.breed}</div>
                        <div>Pet color: {this.state.data.animalDetail.color}</div>
                        <div>Gender: {this.state.data.animalDetail.gender}</div>
                        <div>Animal size: {this.state.data.animalDetail.size}</div>
                        <div>Date lost: {this.state.data.date}</div>
                        <div>Pet description: {this.state.data.animalDetail.description} </div>
                        <div>Area last seen: {this.state.data.location.location}</div>
                        <div>Zip code: {this.state.data.location.zipcode}</div>
                    </div>
                </div>
                <div className="center">
                    <Link to="/caselist" className="waves-effect waves-light btn orange text-white">Go Back</Link>
                    <Link to={caseUrl} className="waves-effect waves-light btn orange text-white"
                          float="right">CONTACT</Link>
                </div>

            </div>


        );

    }

}

export default CaseDetails;