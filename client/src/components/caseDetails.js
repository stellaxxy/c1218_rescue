import '../assets/css/casedetails.scss';
import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import queryString from 'query-string';

class CaseDetails extends Component {

    state = {
        data: null,
        query: {}
    }

    async componentDidMount() {

        const queryObj = queryString.parse(this.props.location.search);
        console.log('case details url:', queryObj);
        const {id} = queryObj;

        delete queryObj.id;
        //console.log('case details url after:', queryObj);

        const response = await axios.get('/api/casedetails?id=' + id);

        this.setState({
            data: response.data.data,
            query: queryObj
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

        var caseUrl = "/contactPage/" + this.state.data.id;

        console.log('case details state', this.state.query);
        const goBackUrl = queryString.stringify(this.state.query);
        console.log('case details gobackurl', goBackUrl);
        return (

            <div>
                <div className="container case-details">
                    <main>
                        <h5 className="header ">Please help me</h5>
                        <div className="w3-container w3-half">
                            <img className="responsive-img" src={this.state.data.coverImg}/>
                        </div>

                        <table className="centered striped">
                            <thead>
                            <tr>
                                <th>Case type:{this.state.data.caseType.toUpperCase()} </th>
                            </tr>
                            <tr>
                                <th>City:{this.state.data.location.city} </th>
                            </tr>
                            <tr>
                                <th>Area last seen: {this.state.data.location.location}</th>
                            </tr>
                            <tr>
                                <th>Zip code: {this.state.data.location.zipcode}</th>
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
                            </thead>

                        </table>

                    </main>

                </div>
                <footer className="page-footer">
                    <div className="btn-panel">

                    <Link to={`/search?${goBackUrl}`} className="waves-effect waves-light btn btn-action deep-orange accent-4">Go Back</Link>
                    <Link to={"/contactPage/"+this.state.data.id} className="waves-effect waves-light btn btn-action deep-orange accent-4"
                          float="right">Contact</Link>

                    </div>
                </footer>

            </div>


        );

    }

}

export default CaseDetails;

