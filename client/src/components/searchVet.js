import '../assets/css/searchVet.scss';
import React, {Component} from 'react';
import GoogleMapImage from '../assets/images/GoogleMap.jpg';
import PetImage from '../assets/images/image8.jpg';
import {Link} from 'react-router-dom';



class SearchVet extends Component {

    render() {

        return (
            <div>
                <div className="w3-container">
                    <div>
                        <img src={GoogleMapImage}/>
                    </div>
                    <div>
                        <div className="card horizontal">
                            <div className="card-image">
                                <Link to="/casedetails">
                                <img src={PetImage} className="image"/>
                                </Link>
                            </div>
                            <div className="card-content">
                                <p>Vet Office</p>
                                <p>111 Jefferey Rd.</p>
                                <p>Rating:4.9</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w3-container">
                    <div className="card horizontal">
                        <div className="card-image">
                            <Link to="/casedetails">
                            <img src={PetImage} className="image"/>
                            </Link>
                        </div>

                        <div className="card-content">
                            <p>Vet Office</p>
                            <p>111 Jefferey Rd.</p>
                            <p>Rating:4.9</p>
                        </div>

                    </div>
                </div>
            </div>
        )
    }


}

export default SearchVet;