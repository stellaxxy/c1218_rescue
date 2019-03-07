import '../../assets/css/searchVet.scss';
import React, {Component} from 'react';
import GoogleMapImage from '../../assets/images/GoogleMap.jpg';
import PetImage from '../../assets/images/image8.jpg';
import {Link} from 'react-router-dom';
import Map from '../map';
import axios from 'axios';
import {yelpApi} from '../../../../config';

class SearchVet extends Component {
    state = {
        data: []
    };

    async componentDidMount(){
        const apiKey = yelpApi.yelpApi;
        //axios.defaults.headers.common['Authorization'] = 'Bearer' + apiKey;

        const response = await axios.get('https://api.yelp.com/v3/businesses/search?term=vet&location=irvine', {
            headers: {
                "Authorization": 'Bearer ' + apiKey,
                "Access-Control-Allow-Origin": "*"
            }
        });

        //console.log('search vet response:', response);
    }

    handleClick(){
        const searchZip = document.getElementsByClassName('vetSearchInput')[0].value;


        console.log('api key:', yelpApi.yelpApi);
        console.log(searchZip);
    }

    render() {

        return (
            <div className="w3-container">
                <div className="mapContainer">
                    <Map/>
                </div>

                <div className="searchContainer row">
                    <input className="vetSearchInput col s7 offset-s1" type="text" placeholder="City, State, Zip Code"/>
                    <button className="col s3" onClick={this.handleClick}>Search</button>
                </div>

                <div className="listContainer">
                    <div className="card horizontal">
                        <div className="card-image">
                            <Link to="/vetinfo">
                                <img src={PetImage} className="image"/>
                            </Link>
                        </div>
                        <div className="card-content">
                            <p>Vet Office</p>
                            <p>111 Jefferey Rd.</p>
                            <p>Rating:4.9</p>
                        </div>
                    </div>
                    <div>
                        <div className="card horizontal">
                            <div className="card-image">
                                <Link to="/vetinfo">
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
            </div>


        )
    }


}

export default SearchVet;