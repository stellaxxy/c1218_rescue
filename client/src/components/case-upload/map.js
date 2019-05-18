/*
import React, {Component} from 'react';
import '../../assets/css/casemap.scss';
import axios from 'axios';
import config from '../../../../config/api';
import foundIcon from '../../assets/images/icons8-region-filled-48.png';
import lostIcon from '../../assets/images/icons8-region-48.png';
import connect from "react-redux/es/connect/connect";
import queryString from 'query-string';


class Map extends Component {

    state = {
        error: false,
        data: null
    };

    async componentDidMount() {

        loadJS('https://maps.googleapis.com/maps/api/js?key='+config.googleMapApi+'&callback=initMap');

        const urlValue = queryString.parse(this.props.location.search);
        const {id} = urlValue;

        const response = await axios.post('/api/casedetails', {caseid: id});

        this.setState({
            data: response.data.data || []
        })
        window.initMap = this.initMap.bind(this);
    }

    renderMarker() {
        try {
            const icons = {
                found: foundIcon,
                lost: lostIcon
            };

            const longitude = this.state.data.location.longitude;
            const latitude = this.state.data.location.latitude;

            const marker = new google.maps.Marker({
                position: new google.maps.LatLng(latitude, longitude),
                icon: icons[this.state.data.caseType],
                map: this.renderedMap
            });

            // To add the marker to the map, call setMap();
            marker.setMap(this.renderedMap);

            const img = this.state.data.coverImg;
            let contentString = '';

            const urlString = `/flyer${this.props.location.search}`;

            if (this.state.data.caseType === 'found'){
                contentString = `<a href=${urlString}><img src=${img} alt="pet picture"/></Link><div><p>Found on ${this.state.data.location.location}, ${this.state.data.location.zipcode}</p></div>`;
            } else if(this.state.data.caseType === 'lost') {
                contentString = `<a href=${urlString}><img src=${img} alt="pet picture"/></Link><div><p>Last seen on ${this.state.data.location.location}, ${this.state.data.location.zipcode}</p></div>`;
            }

            const infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            marker.addListener('click', () => {
                infowindow.open(this.renderedMap, marker);
            });

            return marker;
        } catch(error) {
            this.setState({
                error: true
            });
        }

    }

   initMap() {
        try {
            let center = {
                lat: 33.6846,
                lng: -117.8265
            };
            //let geocoder = new google.maps.Geocoder();
            if (this.state.data) {
                const location = this.state.data.location;
                console.log(location);
                center = {
                    lat: location.latitude,
                    lng: location.longitude
                }

            }
            this.renderedMap = new google.maps.Map(document.getElementById("map"), {
                center: center,
                zoom: 10,
                gestureHandling: 'greedy'
            });

            this.renderMarker();
        } catch(error) {
            this.setState({
                error: true
            });
        }

    }

    render() {
        console.log('map data:', this.state.data);

        if(this.props.error === true){
            return (
                <div className="mapContainer errorOnMap">
                    <h4>Sorry an error has occurred. Please try again later.</h4>
                </div>
            );
        }

        return (
            <div className="mapContainer">
                <div id="map">
                </div>
            </div>
        );
    }
}

function loadJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
}

export default Map;

*/

import React, {Component} from 'react';
import {Map, GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';
import config from '../../../../config/api';
import queryString from 'query-string';
import axios from 'axios';
import {Link} from 'react-router-dom';

class MapContainer extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    };

    onMarkerClick = (props, marker) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })
    };

    onClose = props => {
        if(this.state.showingInfoWindow){
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };



    async componentDidMount() {
        //const urlValue = queryString.parse(this.props.location.search);
        //const {id} = urlValue;

        //const response = await axios.post('/api/casedetails', {caseid: id});
/*
        this.setState({
            data: response.data.data || []
        });
        console.log('component did mount')
        */

    }

    render(){
        let defaultPosition = {lat: 33.6846, lng: -117.8265};
        let name = '';
        const urlString = `/flyer${this.props.url}`;//this.props.location.search
        let img = '';

        if(this.props.data){
            const longitude = this.props.data.location.longitude;
            const latitude = this.props.data.location.latitude;

            defaultPosition = {
                lat: latitude,
                lng: longitude
            };

            if (this.props.data.caseType === 'found'){
                name = `Found on ${this.props.data.location.location}, ${this.props.data.location.zipcode}`;
            } else if(this.props.data.caseType === 'lost') {
                name = `Last seen on ${this.props.data.location.location}, ${this.props.data.location.zipcode}`;
            }
            img = this.props.data.coverImg;
        }

        if(this.props.data === null){
            return (
                <div className="mapContainer">
                   Loading
                </div>
            );
        }

        return (
            <div className="mapContainer">
                <Map
                    google={this.props.google}
                    zoom={12}
                    className={'map'}
                    initialCenter={defaultPosition}
                >
                    <Marker onClick={this.onMarkerClick} name={name}/>
                    <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow} onClose={this.onClose}>
                        <div>
                            <a href={urlString}>
                                <img src={img}/>
                                <p>{name}</p>
                            </a>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: config.googleMapApi
})(MapContainer);