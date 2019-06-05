import {Link} from 'react-router-dom';
import Map from './map';
import axios from 'axios';
import {googleMapApi} from '../../../../config';
import SearchVetItem from './searchvetitem';
import React, {Component} from 'react';
import './searchVet.scss';
import queryString from 'query-string';

class SearchVet extends Component {
    state = {
        data: [],
        error: false,
        message: ''
    };

    componentDidMount(){
        if(this.props.location.search){
            const searchInput = queryString.parse(this.props.location.search);

            this.handleSearch(searchInput);
        }
    }

    handleClick = () => {
        const searchInput = document.getElementsByClassName('vetSearchInput')[0].value;
        const searchInputQuery = {
            location: searchInput
        };

        this.props.history.push('/searchvet?' + queryString.stringify(searchInputQuery));

        this.handleSearch(searchInput);
    };

    async handleSearch(searchInput){
        if(!searchInput){
            this.setState({
                error: true,
                message: 'Please provide city, state or zip code'
            });
        } else {
            const result = await axios.post('/api/yelp/businesses', {
                location: searchInput
            });

            this.setState({
                data: result.data.result.businesses
            });
        }
    }
    render() {

        const businessList = this.state.data.map(item => {
            return <SearchVetItem phone={item.display_phone} key={item.id} image={item.image_url} location={item.location} id={item.id} name={item.name} queryString={this.props.location.search}/>
        });

        return (
            <div className="bottomContainer">
                <div className="vetMapContainer">
                    <Map data={this.state.data} queryString={this.props.location.search}/>
                </div>

                <div className="searchContainer row">
                    <input className="vetSearchInput col s6 offset-s1" type="text" placeholder="City, State or Zip Code"/>
                    <button className="vetSearchBtn" onClick={this.handleClick}>Search</button>
                </div>
                <div className="vetListContainer">
                    {businessList}
                </div>
            </div>

        )
    }
}

export default SearchVet;

