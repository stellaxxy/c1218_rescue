import '../../assets/css/searchVet.scss';
import React, {Component} from 'react';
import GoogleMapImage from '../../assets/images/GoogleMap.jpg';
import PetImage from '../../assets/images/image8.jpg';
import {Link} from 'react-router-dom';
import Map from '../map';
import axios from 'axios';
import {googleMapApi} from '../../../../config';

class SearchVet extends Component {
    state = {
        data: [],
        error: false,
        message: ''
    };

    async componentDidMount(){

    }

    async handleClick(){
        const searchInput = document.getElementsByClassName('vetSearchInput')[0].value;
        const mapApi = googleMapApi.googleMapApi;

        if(isNaN(searchInput)){
            let searchInputArray = searchInput.split(' ');
            console.log(searchInputArray);
            if(searchInputArray.length !== 2){

            }
        }

        let geocodingQuery = `https://maps.googleapis.com/maps/api/geocode/json?key=${mapApi}&address=`;


        geocodingQuery = geocodingQuery;

        //const lnglat = await axios.get('');

       // const result = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/output?key=${mapApi}&input=vet&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:2500@`);
    }

    renderError(){
        return(
            <div>Please provide both city and state.</div>
        );
    }

    render() {
        let extraInformation =

        if(this.state.error){

        }
        return (
            <div className="w3-container">
                <div className="mapContainer">
                    <Map/>
                </div>

                <div className="searchContainer row">
                    <input className="vetSearchInput col s6 offset-s1" type="text" placeholder="City, State or Zip Code"/>
                    <button className="col s4" onClick={this.handleClick}>Search</button>
                </div>


            </div>


        )
    }


}

export default SearchVet;


/*
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
 */