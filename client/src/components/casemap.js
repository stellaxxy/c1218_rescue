import React, {Component} from 'react';
import '../assets/css/casemap.scss';
import axios from 'axios';
import config from '../../../config/api';
import foundIcon from '../assets/images/icons8-region-filled-48.png';
import lostIcon from '../assets/images/icons8-region-48.png';
import connect from "react-redux/es/connect/connect";
import queryString from 'query-string';


class CaseMap extends Component {

    state = {
        error: false,
        cases: []
    };

    componentDidMount() {
        window.initMap = this.initMap.bind(this);
        loadJS('https://maps.googleapis.com/maps/api/js?key='+config.googleMapApi+'&callback=initMap');

        this.setState({
            cases: this.props.cases || []
        })
    }

    async componentDidUpdate(prevProps){
        if(prevProps != this.props && this.props.cases && this.props.cases.length >= 0){
            window.initMap = this.initMap.bind(this);
            loadJS('https://maps.googleapis.com/maps/api/js?key='+config.googleMapApi+'&callback=initMap');

            this.setState({
                cases: this.props.cases
            })
        }
    }

    async renderMarkers(params) {
        try {
            const icons = {
                found: foundIcon,
                lost: lostIcon
            };

            const markers = this.props.allCases.map(item => {
                const longitude = item.location.longitude;
                const latitude = item.location.latitude;

                let marker = new google.maps.Marker({
                    position: new google.maps.LatLng(latitude, longitude),
                    icon: icons[item.caseType],
                    map: this.renderedMap
                });

                // To add the marker to the map, call setMap();
                marker.setMap(this.renderedMap);

                const img = item.coverImg;
                let contentString = '';

                const urlstring = queryString.stringify(this.props.url);

                if (item.caseType === 'found'){
                    contentString = `<a href="/flyer${this.props.searchUrl}&id=${item.id}"><img src=${img} alt="pet picture"/></Link><div><p>Found on ${item.location.location}, ${item.location.zipcode}</p></div>`;
                } else if(item.caseType === 'lost') {
                    contentString = `<a href="/flyer${this.props.searchUrl}&id=${item.id}"><img src=${img} alt="pet picture"/></Link><div><p>Last seen on ${item.location.location}, ${item.location.zipcode}</p></div>`;
                }


                const infowindow = new google.maps.InfoWindow({
                    content: contentString
                });

                marker.addListener('click', () => {
                    infowindow.open(this.renderedMap, marker);
                });

                return marker;
            });

            const markerCluster = new MarkerClusterer(this.renderedMap, markers,
                {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
        } catch(error) {
            this.setState({
                error: true
            });
        }

    }

    async initMap() {
        try {
            console.log('map search url', this.props);
            let center = {
                lat: 33.6846,
                lng: -117.8265
            };
            let geocoder = new google.maps.Geocoder();
            if (this.props.cases && this.props.cases.length) {
                const firstLocation = this.props.cases[0].location;
                if (firstLocation.latitude) {
                    center = {
                        lat: firstLocation.latitude,
                        lng: firstLocation.longitude
                    }
                }

            } else if(this.props.cases.length === 0) {
                const address = await this.getLatLng(this.props.url.zipcode, geocoder);
                center = {
                    lat: address[0].geometry.viewport.ma.l,
                    lng: address[0].geometry.viewport.ga.l
                };
            }
            this.renderedMap = new google.maps.Map(document.getElementById("map"), {
                center: center,
                zoom: 10,
                gestureHandling: 'greedy'
            });

            this.renderMarkers();
        } catch(error) {
            this.setState({
                error: true
            });
        }

    }

    getLatLng(zip, geocoder) {
        return new Promise((resolve, reject)=>{
            geocoder.geocode({'address': zip}, (results, status) => {
               if(status === google.maps.GeocoderStatus.OK){
                   resolve(results);
               } else {
                   reject(status);
               }
            });
        });
    }

    render() {
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


function mapStateToProps(state) {
    return {
        filterValues: state.caseFilters.values
    }
}

export default connect(mapStateToProps)(CaseMap);



