import React, {Component} from 'react';
import {Map, GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';
import config from '../../../../config/api';

class MapContainer extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    };
    //-----------------------------------------------------------------------------------------
    // HANDLE MARKER CLICK
    //-----------------------------------------------------------------------------------------
    onMarkerClick = (props, marker) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })
    };
    //-----------------------------------------------------------------------------------------
    // CLOSE INFO WINDOW
    //-----------------------------------------------------------------------------------------
    onClose = props => {
        if(this.state.showingInfoWindow){
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };
    //-----------------------------------------------------------------------------------------
    // RENDER
    //-----------------------------------------------------------------------------------------
    render(){
        let defaultPosition = {lat: 33.6846, lng: -117.8265};
        let name = '';
        const urlString = `/flyer${this.props.url}`;
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