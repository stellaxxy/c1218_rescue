import '../../assets/css/searchVet.scss';
import React, {Component} from 'react';
import GoogleMapImage from '../../assets/images/GoogleMap.jpg';
import PetImage from '../../assets/images/image8.jpg';
import {Link} from 'react-router-dom';
import Map from '../map';
import axios from 'axios';
import {googleMapApi} from '../../../../config';
import SearchVetItem from './searchvetitem';

class SearchVet extends Component {
    state = {
        data: [],
        error: false,
        message: ''
    };

    async componentDidMount(){

    }

    handleClick = async () => {
        const searchInput = document.getElementsByClassName('vetSearchInput')[0].value;

        if(!searchInput){
            this.setState({
                error: true,
                message: 'Please provide city, state or zip code'
            });
        } else {
            const result = await axios.post('/api/yelp/businesses', {
                location: searchInput
            });
            //console.log(result.data.result.businesses);
            this.setState({
                data: result.data.result.businesses
            });
        }
    }

    renderError(){
        return(
            <div>Please provide both city and state.</div>
        );
    }

    render() {
/*
        if(this.state.error){

        }
        */
        //console.log('search vet data:', this.state.data);


        const businessList = this.state.data.map(item => {
            //console.log(item);
            return <SearchVetItem phone={item.display_phone} key={item.id} image={item.image_url} location={item.location} id={item.id} name={item.name}/>
        });

        return (
            <div className="w3-container">
                <div className="mapContainer">
                    <Map data={this.state.data}/>
                </div>

                <div className="searchContainer row">
                    <input className="vetSearchInput col s6 offset-s1" type="text" placeholder="City, State or Zip Code"/>
                    <button className="col s4" onClick={this.handleClick}>Search</button>
                </div>
                <div className="vetListContainer">
                    {businessList}
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