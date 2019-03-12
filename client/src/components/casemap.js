import React, {Component} from 'react';
import '../assets/css/casemap.scss';
import axios from 'axios';
import config from '../../../config/api';
import foundIcon from '../assets/images/icons8-region-filled-48.png';
import lostIcon from '../assets/images/icons8-region-48.png';
import connect from "react-redux/es/connect/connect";


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
        if(prevProps != this.props && this.props.cases && this.props.cases.length > 0){
            window.initMap = this.initMap.bind(this);
            loadJS('https://maps.googleapis.com/maps/api/js?key='+config.googleMapApi+'&callback=initMap');

            this.setState({
                cases: this.props.cases
            })
        }
    }

    async renderMarkers(params) {
        if(!this.props.cases || this.props.cases.length === 0){
            return(
                <div>Loading</div>
            );
        }

        const icons = {
            found: foundIcon,
            lost: lostIcon
        };



        const markers = this.props.cases.map(item => {
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

            if (item.caseType === 'found'){
                contentString = `<a href="/casedetails/?id=${item.id}&mode=map"><img src=${img} alt="pet picture"/></a><div><p>Found on ${item.location.location}, ${item.location.zipcode}</p></div>`;
            } else if(item.caseType === 'lost') {
                contentString = `<a href="/casedetails/?id=${item.id}&mode=map"><img src=${img} alt="pet picture"/></a><div><p>Last seen on ${item.location.location}, ${item.location.zipcode}</p></div>`;
            }


            const infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            marker.addListener('click', () => {
                infowindow.open(this.renderedMap, marker);
            })


            return marker;
        });

        const markerCluster = new MarkerClusterer(this.renderedMap, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    }

    initMap() {
        let center = {
            lat: 33.6846,
            lng: -117.8265
        }

        if (this.props.cases && this.props.cases.length) {
            const firstLocation = this.props.cases[0].location;
            if (firstLocation.latitude) {
                center = {
                    lat: firstLocation.latitude,
                    lng: firstLocation.longitude
                }
            }
        }

        this.renderedMap = new google.maps.Map(document.getElementById("map"), {

            center: center,
            zoom: 10,
            gestureHandling: 'greedy'
        });

        this.renderMarkers();
    }

    render() {
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



