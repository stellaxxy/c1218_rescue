import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PetImage from "../assets/images/image11.jpg";


class OfficeInfo extends Component {
    render() {
        return (

            <div className="w3-container">
                <div>
                    <h4>Vet Office</h4>
                    <div>Address: 111 jefferey Road</div>
                    <div>Rating: 4.0</div>
                    <div>Hours: 9am to 6pm(Mon to sat)</div>
                    <div>Reviews: good services</div>
                </div>
                <div className="card horizontal">
                    <img src={PetImage} className="image"/>
                </div>
                <div>
                    <Link to="/casedetails" className="waves-effect waves-light btn orange text-white call">Call</Link>
                </div>
            </div>


        )
    }
}

export default OfficeInfo;