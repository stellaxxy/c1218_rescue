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
                        <div>Pet type : {this.state.data.animalDetail.animalType}</div>
                        <div>Pet color: {this.state.data.animalDetail.color}</div>
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

                    <table className="centered striped">
                        <thead>
                        <tr>
                            <th>City:{this.state.data.location.city} </th>
                        </tr>
                        <tr>
                            <th>Case id: {this.state.data.id}</th>
                        </tr>
                        <tr>
                            <th>Pet name: {this.state.data.animalDetail.name}</th>
                        </tr>
                        <tr>
                            <th>Pet name: {this.state.data.animalDetail.name}</th>
                        </tr>
                        <tr>
                            <th>Pet breed: {this.state.data.animalDetail.breed}</th>
                        </tr>
                        <tr>
                            <th>Pet color: {this.state.data.animalDetail.color}</th>
                        </tr>
                        <tr>
                            <th>Gender: {this.state.data.animalDetail.gender}</th>
                        </tr>
                        <tr>
                            <th>Animal size: {this.state.data.animalDetail.size}</th>
                        </tr>
                        <tr>
                            <th>Date lost: {this.state.data.date}</th>
                        </tr>
                        <tr>
                            <th>Pet description: {this.state.data.animalDetail.description}</th>
                        </tr>
                        <tr>
                            <th>Area last seen: {this.state.data.location.location}</th>
                        </tr>
                        <tr>
                            <th>Zip code: {this.state.data.location.zipcode}</th>
                        </tr>
                        </thead>

                    </table>



               </div>
                <footer className="page-footer">
                    <div className="btn-panel">
                    <Link to="/caselist" className="waves-effect waves-light btn btn-action deep-orange accent-4">Go Back</Link>
                    <Link to={"/contactPage/"+this.state.data.id} className="waves-effect waves-light btn btn-action deep-orange accent-4"
                          float="right">Contact</Link>
                    </div>
                </footer>

            </div>





        );

    }

}

export default CaseDetails;

/* <footer className="page-footer">
          <div className="btn-panel">
            <button className="waves-effect waves-light btn btn-action" form="uploadform" type="submit">Submit</button>
          </div>
        </footer>*/